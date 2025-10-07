#!/usr/bin/env node

/**
 * 实际调用塔罗占卜功能演示
 * Demonstrates actual tarot reading function call
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function callTarotReading() {
  console.log('╔══════════════════════════════════════════════════════════════════════╗');
  console.log('║             🃏 实际调用塔罗占卜功能演示                              ║');
  console.log('╚══════════════════════════════════════════════════════════════════════╝\n');

  // 启动MCP服务器
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
    console.log('🚀 连接 MCP 服务器...\n');
    await client.connect(transport);
    console.log('✅ 服务器连接成功！\n');

    // 准备调用参数
    const callParams = {
      spread_type: "three_card",
      question: "我今天的运势如何？",
      language: "zh-CN"
    };

    console.log('📋 调用参数:');
    console.log('─'.repeat(70));
    console.log('Tool: tarot_reading');
    console.log('Args:', JSON.stringify(callParams, null, 2));
    console.log('─'.repeat(70));
    console.log('\n🔮 正在调用塔罗占卜...\n');

    const startTime = Date.now();
    
    // 实际调用
    const result = await client.callTool({
      name: 'tarot_reading',
      arguments: callParams
    });
    
    const duration = Date.now() - startTime;

    console.log('✅ 调用成功！');
    console.log(`⏱️  耗时: ${duration}ms\n`);

    // 解析结果
    const data = JSON.parse(result.content[0].text);

    console.log('═'.repeat(70));
    console.log('📊 塔罗占卜结果:');
    console.log('═'.repeat(70));
    console.log(`\n🎴 问题: ${data.question}`);
    console.log(`📐 牌阵: ${data.spread} (${data.positions.join('、')})`);
    console.log(`\n🃏 抽到的牌 (共 ${data.cards.length} 张):\n`);

    data.cards.forEach((card, idx) => {
      console.log(`${idx + 1}. ${card.nameCN || card.name}`);
      console.log(`   英文名: ${card.name}`);
      console.log(`   位置: ${data.positions[idx] || '未知'}`);
      console.log(`   方向: ${card.reversed ? '逆位 ⬇️' : '正位 ⬆️'}`);
      console.log(`   关键词: ${card.keywords.join('、')}`);
      console.log(`   描述: ${card.description.substring(0, 100)}...`);
      console.log('');
    });

    console.log('💬 整体解读:');
    console.log('─'.repeat(70));
    console.log(data.interpretation);
    console.log('');

    console.log('═'.repeat(70));
    console.log('📄 完整JSON数据:');
    console.log('═'.repeat(70));
    console.log(JSON.stringify(data, null, 2));
    console.log('');

    console.log('═'.repeat(70));
    console.log('✅ 塔罗占卜调用测试完成！');
    console.log('═'.repeat(70));
    console.log('\n💡 提示:');
    console.log('   • 这是实际的MCP工具调用，不是静态页面演示');
    console.log('   • 每次调用都会随机抽取不同的牌');
    console.log('   • 可以修改参数 (spread_type, question, language) 进行不同测试');
    console.log('   • 支持的牌阵: single, three_card, celtic_cross\n');

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ 调用失败:', error.message);
    console.error(error);
    process.exit(1);
  }
}

callTarotReading();
