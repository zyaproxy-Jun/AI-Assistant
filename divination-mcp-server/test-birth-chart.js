#!/usr/bin/env node

/**
 * 西洋占星测试
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testBirthChart() {
  console.log('======================================================================');
  console.log('🌌 西洋占星测试 - Birth Chart Test');
  console.log('======================================================================\n');

  // 启动服务器
  console.log('🚀 启动 MCP 服务器...');
  const serverPath = join(__dirname, 'dist', 'index.js');
  const transport = new StdioClientTransport({
    command: 'node',
    args: [serverPath]
  });

  const client = new Client({
    name: 'astrology-test-client',
    version: '1.0.0'
  }, {
    capabilities: {}
  });

  try {
    await client.connect(transport);
    console.log('✅ 服务器连接成功\n');

    // 测试参数 - 根据网页参数调整
    const testParams = {
      birth_date: '1990-05-20',
      birth_time: '14:30',
      latitude: 39.9042,
      longitude: 116.4074,
      timezone: 'Asia/Shanghai'  // 使用时区名称而不是数字
    };

    console.log('📋 测试参数：');
    console.log(JSON.stringify(testParams, null, 2));
    console.log('');
    console.log('💡 注意: timezone 应使用时区名称（如 Asia/Shanghai），而非数字');
    console.log('');

    console.log('🔮 正在生成星盘...\n');

    const startTime = Date.now();
    const result = await client.callTool({
      name: 'birth_chart',
      arguments: testParams
    });
    const duration = Date.now() - startTime;

    if (result.isError) {
      console.error('❌ 测试失败！');
      console.error('错误信息：', JSON.stringify(result.content, null, 2));
      process.exit(1);
    }

    console.log('✅ 星盘生成成功！');
    console.log(`⏱️  耗时: ${duration}ms\n`);

    console.log('======================================================================');
    console.log('📊 星盘结果：');
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

    // 显示星盘信息
    console.log('🌟 基本信息：');
    console.log('----------------------------------------------------------------------');
    console.log(`  出生日期: ${testParams.birth_date}`);
    console.log(`  出生时间: ${testParams.birth_time}`);
    console.log(`  地点: 北京 (${testParams.latitude}°N, ${testParams.longitude}°E)`);
    console.log('');

    if (data.sun) {
      console.log('☀️ 太阳: ' + (data.sun.sign || '未知'));
    }
    if (data.moon) {
      console.log('🌙 月亮: ' + (data.moon.sign || '未知'));
    }
    if (data.ascendant) {
      console.log('⬆️ 上升: ' + (data.ascendant.sign || '未知'));
    }

    console.log('\n📄 完整数据：');
    console.log('----------------------------------------------------------------------');
    console.log(JSON.stringify(data, null, 2).substring(0, 1000) + '...');

    console.log('\n======================================================================');
    console.log('✅ 西洋占星测试完成！');
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
testBirthChart().catch(error => {
  console.error('未捕获的错误：', error);
  process.exit(1);
});
