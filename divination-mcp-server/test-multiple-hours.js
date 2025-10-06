#!/usr/bin/env node

/**
 * 紫微斗数多时辰测试
 * 测试不同时辰的转换和命盘生成
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 中文时辰对照表
const HOUR_TO_SHICHEN = {
  0: '子时 (23-01时)', 1: '丑时 (01-03时)', 2: '丑时 (01-03时)',
  3: '寅时 (03-05时)', 4: '寅时 (03-05时)', 5: '卯时 (05-07时)',
  6: '卯时 (05-07时)', 7: '辰时 (07-09时)', 8: '辰时 (07-09时)',
  9: '巳时 (09-11时)', 10: '巳时 (09-11时)', 11: '午时 (11-13时)',
  12: '午时 (11-13时)', 13: '未时 (13-15时)', 14: '未时 (13-15时)',
  15: '申时 (15-17时)', 16: '申时 (15-17时)', 17: '酉时 (17-19时)',
  18: '酉时 (17-19时)', 19: '戌时 (19-21时)', 20: '戌时 (19-21时)',
  21: '亥时 (21-23时)', 22: '亥时 (21-23时)', 23: '子时 (23-01时)'
};

async function testMultipleHours() {
  console.log('======================================================================');
  console.log('⭐ 紫微斗数多时辰测试');
  console.log('======================================================================\n');

  // 测试的时辰列表：覆盖上午、下午、边界情况
  const testHours = [
    0,   // 子时（午夜）
    6,   // 卯时（早晨）
    12,  // 午时（正午）- 边界
    14,  // 未时（下午）- 13-23时转换
    16,  // 申时（下午）- 用户提供的参数
    20,  // 戌时（晚上）
    23   // 子时（深夜）
  ];

  console.log('📋 测试计划：');
  console.log(`测试时辰: ${testHours.join(', ')}`);
  console.log(`测试日期: 2000-01-01`);
  console.log(`测试性别: 男\n`);

  // 启动服务器
  console.log('🚀 启动 MCP 服务器...');
  const serverPath = join(__dirname, 'dist', 'index.js');
  const transport = new StdioClientTransport({
    command: 'node',
    args: [serverPath]
  });

  const client = new Client({
    name: 'multi-hour-test',
    version: '1.0.0'
  }, {
    capabilities: {}
  });

  try {
    await client.connect(transport);
    console.log('✅ 服务器连接成功\n');

    console.log('======================================================================');
    console.log('开始测试...');
    console.log('======================================================================\n');

    const results = [];

    for (const hour of testHours) {
      console.log(`\n🔮 测试时辰: ${hour}时 (${HOUR_TO_SHICHEN[hour]})`);
      console.log('----------------------------------------------------------------------');

      const testParams = {
        solar_date: '2000-01-01',
        birth_hour: hour,
        gender: '男',
        language: 'zh-CN'
      };

      try {
        const startTime = Date.now();
        const result = await client.callTool({
          name: 'ziwei_chart',
          arguments: testParams
        });
        const duration = Date.now() - startTime;

        if (result.isError) {
          console.log(`❌ 失败: ${JSON.stringify(result.content)}`);
          results.push({
            hour,
            status: 'failed',
            error: result.content
          });
        } else {
          // 解析结果
          const content = result.content[0];
          let data;
          
          if (content.type === 'text') {
            try {
              data = JSON.parse(content.text);
            } catch {
              data = content.text;
            }
          } else {
            data = content;
          }

          console.log(`✅ 成功 (${duration}ms)`);
          
          if (data.basic_info) {
            console.log(`   农历: ${data.basic_info.lunar_date}`);
            console.log(`   干支: ${data.basic_info.chinese_date}`);
          }
          
          if (data.soul_and_body) {
            console.log(`   命主: ${data.soul_and_body.soul}`);
            console.log(`   身主: ${data.soul_and_body.body}`);
          }
          
          if (data.five_elements) {
            console.log(`   五行: ${data.five_elements.class}`);
          }

          results.push({
            hour,
            status: 'success',
            duration,
            soul: data.soul_and_body?.soul,
            body: data.soul_and_body?.body,
            element: data.five_elements?.class
          });
        }
      } catch (error) {
        console.log(`❌ 异常: ${error.message}`);
        results.push({
          hour,
          status: 'error',
          error: error.message
        });
      }
    }

    // 汇总结果
    console.log('\n======================================================================');
    console.log('📊 测试结果汇总');
    console.log('======================================================================\n');

    const successCount = results.filter(r => r.status === 'success').length;
    const failedCount = results.filter(r => r.status === 'failed').length;
    const errorCount = results.filter(r => r.status === 'error').length;

    console.log(`总测试数: ${results.length}`);
    console.log(`✅ 成功: ${successCount}`);
    console.log(`❌ 失败: ${failedCount}`);
    console.log(`⚠️  异常: ${errorCount}\n`);

    // 详细结果表格
    console.log('详细结果：');
    console.log('----------------------------------------------------------------------');
    console.log('时辰\t状态\t耗时\t命主\t\t身主\t\t五行');
    console.log('----------------------------------------------------------------------');
    
    results.forEach(r => {
      const hour = `${r.hour}时`.padEnd(4);
      const status = r.status === 'success' ? '✅' : '❌';
      const duration = r.duration ? `${r.duration}ms` : '-';
      const soul = r.soul || '-';
      const body = r.body || '-';
      const element = r.element || '-';
      
      console.log(`${hour}\t${status}\t${duration}\t${soul}\t${body}\t${element}`);
    });

    console.log('\n======================================================================');
    
    if (successCount === results.length) {
      console.log('✅ 所有测试通过！时辰转换功能完全正常！');
    } else {
      console.log('⚠️  部分测试失败，请检查详细日志');
    }
    
    console.log('======================================================================\n');

    await client.close();
    process.exit(successCount === results.length ? 0 : 1);

  } catch (error) {
    console.error('\n❌ 测试过程中发生错误：');
    console.error(error.message);
    console.error('\n堆栈跟踪：');
    console.error(error.stack);
    process.exit(1);
  }
}

// 运行测试
testMultipleHours().catch(error => {
  console.error('未捕获的错误：', error);
  process.exit(1);
});
