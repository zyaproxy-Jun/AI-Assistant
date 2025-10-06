#!/usr/bin/env node

/**
 * 塔罗占卜测试
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testTarot() {
  console.log('======================================================================');
  console.log('🃏 塔罗占卜测试 - Tarot Reading Test');
  console.log('======================================================================\n');

  // 启动服务器
  console.log('🚀 启动 MCP 服务器...');
  const serverPath = join(__dirname, 'dist', 'index.js');
  const transport = new StdioClientTransport({
    command: 'node',
    args: [serverPath]
  });

  const client = new Client({
    name: 'tarot-test-client',
    version: '1.0.0'
  }, {
    capabilities: {}
  });

  try {
    await client.connect(transport);
    console.log('✅ 服务器连接成功\n');

    // 测试参数
    const testParams = {
      spread_type: 'single',
      question: '我今天的运势如何？'
    };

    console.log('📋 测试参数：');
    console.log(JSON.stringify(testParams, null, 2));
    console.log('');

    console.log('🔮 正在抽取塔罗牌...\n');

    const startTime = Date.now();
    const result = await client.callTool({
      name: 'tarot_reading',
      arguments: testParams
    });
    const duration = Date.now() - startTime;

    if (result.isError) {
      console.error('❌ 测试失败！');
      console.error('错误信息：', result.content);
      process.exit(1);
    }

    console.log('✅ 塔罗占卜成功！');
    console.log(`⏱️  耗时: ${duration}ms\n`);

    console.log('======================================================================');
    console.log('📊 塔罗占卜结果：');
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

    // 显示占卜信息
    console.log('🎴 抽牌信息：');
    console.log('----------------------------------------------------------------------');
    console.log(`  问题: ${testParams.question}`);
    console.log(`  牌阵: ${testParams.spread_type === 'single' ? '单张牌' : testParams.spread_type}`);
    console.log('');

    if (data.cards && data.cards.length > 0) {
      console.log('🃏 抽到的牌：');
      data.cards.forEach((card, index) => {
        console.log(`\n  ${index + 1}. ${card.name || '未知'}`);
        if (card.meaning) {
          console.log(`     含义: ${card.meaning}`);
        }
        if (card.description) {
          console.log(`     描述: ${card.description.substring(0, 100)}...`);
        }
      });
    }

    console.log('\n📄 完整数据：');
    console.log('----------------------------------------------------------------------');
    console.log(JSON.stringify(data, null, 2));

    console.log('\n======================================================================');
    console.log('✅ 塔罗占卜测试完成！');
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
testTarot().catch(error => {
  console.error('未捕获的错误：', error);
  process.exit(1);
});
