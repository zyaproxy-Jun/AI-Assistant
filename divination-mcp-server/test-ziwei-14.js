#!/usr/bin/env node

/**
 * 紫微斗数测试 - 14时测试
 * 验证时辰转换功能（14时应该转换为2时 = 丑时/寅时）
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

async function testZiwei() {
  console.log('======================================================================');
  console.log('⭐ 紫微斗数测试 - 14时（下午2点）');
  console.log('======================================================================\n');

  // 启动服务器
  console.log('🚀 启动 MCP 服务器...');
  const serverPath = join(__dirname, 'dist', 'index.js');
  const transport = new StdioClientTransport({
    command: 'node',
    args: [serverPath]
  });

  const client = new Client({
    name: 'ziwei-test-client',
    version: '1.0.0'
  }, {
    capabilities: {}
  });

  try {
    await client.connect(transport);
    console.log('✅ 服务器连接成功\n');

    // 测试参数
    const testParams = {
      solar_date: '2000-01-01',
      birth_hour: 14,  // 下午2点（未时）
      gender: '男',
      language: 'zh-CN'
    };

    console.log('📋 测试参数：');
    console.log(JSON.stringify(testParams, null, 2));
    console.log('');
    console.log('💡 提示：birth_hour 使用24小时制（0-23）');
    console.log('   - 0-12时：直接使用');
    console.log('   - 13-23时：自动转换为下午时辰');
    console.log('   - 14时 → 2时 → 未时 (13-15时)');
    console.log('');

    console.log('🔮 正在生成紫微命盘...\n');

    const startTime = Date.now();
    const result = await client.callTool({
      name: 'ziwei_chart',
      arguments: testParams
    });
    const endTime = Date.now();

    if (result.isError) {
      console.error('❌ 测试失败！');
      console.error('错误信息：', result.content);
      process.exit(1);
    }

    console.log('✅ 命盘生成成功！');
    console.log(`⏱️  耗时: ${endTime - startTime}ms\n`);

    console.log('======================================================================');
    console.log('📊 紫微命盘结果：');
    console.log('======================================================================\n');

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

    // 显示基本信息
    console.log('👤 基本信息：');
    console.log('----------------------------------------------------------------------');
    console.log(`  出生日期: ${testParams.solar_date}`);
    console.log(`  出生时辰: ${testParams.birth_hour}时 (${HOUR_TO_SHICHEN[testParams.birth_hour]})`);
    console.log(`  性别: ${testParams.gender}`);
    
    if (data.basic_info) {
      console.log(`  农历: ${data.basic_info.lunar_date}`);
      console.log('');
      
      console.log('🌟 命盘信息：');
      console.log(`  阳历: ${data.basic_info.solar_date}`);
      console.log(`  农历: ${data.basic_info.lunar_date}`);
      console.log(`  干支: ${data.basic_info.chinese_date}`);
      console.log(`  生肖: ${data.basic_info.zodiac}`);
      console.log(`  星座: ${data.basic_info.sign}`);
      console.log('');
      
      if (data.soul_and_body) {
        console.log('命理：');
        console.log(`  命主: ${data.soul_and_body.soul}`);
        console.log(`  身主: ${data.soul_and_body.body}`);
        console.log(`  命宫地支: ${data.soul_and_body.earthly_branch_of_soul_palace}`);
        console.log(`  身宫地支: ${data.soul_and_body.earthly_branch_of_body_palace}`);
      }
      
      if (data.five_elements) {
        console.log(`  五行局: ${data.five_elements.class}`);
      }
    }

    console.log('');
    console.log('📄 完整数据：');
    console.log('----------------------------------------------------------------------');
    console.log(JSON.stringify(data, null, 2).substring(0, 2000) + '...');

    console.log('');
    console.log('======================================================================');
    console.log('✅ 紫微斗数测试完成！');
    console.log('======================================================================');

    await client.close();
    process.exit(0);

  } catch (error) {
    console.error('\n❌ 测试过程中发生错误：');
    console.error(error.message);
    console.error('\n堆栈跟踪：');
    console.error(error.stack);
    process.exit(1);
  }
}

// 运行测试
testZiwei().catch(error => {
  console.error('未捕获的错误：', error);
  process.exit(1);
});
