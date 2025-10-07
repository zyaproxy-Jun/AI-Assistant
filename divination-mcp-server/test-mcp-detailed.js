#!/usr/bin/env node

/**
 * 详细测试所有 MCP 占卜工具
 * Detailed test of all MCP divination tools
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testAllTools() {
  console.log('╔══════════════════════════════════════════════════════════════════════╗');
  console.log('║         🔮 MCP 占卜服务器详细测试 - Detailed MCP Test              ║');
  console.log('╚══════════════════════════════════════════════════════════════════════╝\n');

  const serverPath = join(__dirname, 'dist', 'index.js');
  const transport = new StdioClientTransport({
    command: 'node',
    args: [serverPath]
  });

  const client = new Client({
    name: 'mcp-test-client',
    version: '1.0.0'
  }, {
    capabilities: {}
  });

  try {
    console.log('🚀 连接 MCP 服务器...\n');
    await client.connect(transport);
    console.log('✅ 服务器连接成功！\n');

    // 列出所有工具
    const tools = await client.listTools();
    console.log(`📋 发现 ${tools.tools.length} 个占卜工具：\n`);
    tools.tools.forEach((tool, idx) => {
      console.log(`   ${idx + 1}. ${tool.name}`);
    });
    console.log('\n' + '═'.repeat(70) + '\n');

    const results = [];
    
    // ========== 测试 1: 塔罗占卜 ==========
    console.log('🃏 测试 1: 塔罗占卜 (Tarot Reading)');
    console.log('─'.repeat(70));
    try {
      const startTime = Date.now();
      const result = await client.callTool({
        name: 'tarot_reading',
        arguments: {
          spread_type: 'three_card',
          question: '我的事业发展如何？',
          language: 'zh-CN'
        }
      });
      const duration = Date.now() - startTime;
      
      const data = JSON.parse(result.content[0].text);
      console.log(`✅ 成功 (${duration}ms)`);
      console.log(`   问题: ${data.question}`);
      console.log(`   牌阵: ${data.spread}`);
      console.log(`   抽到 ${data.cards.length} 张牌:`);
      data.cards.forEach((card, idx) => {
        console.log(`      ${idx + 1}. ${card.nameCN || card.name} (${card.reversed ? '逆位' : '正位'})`);
      });
      results.push({ name: '塔罗占卜', success: true, duration });
    } catch (error) {
      console.log(`❌ 失败: ${error.message}`);
      results.push({ name: '塔罗占卜', success: false, error: error.message });
    }
    console.log('');

    // ========== 测试 2: 紫微斗数 ==========
    console.log('⭐ 测试 2: 紫微斗数 (Ziwei Astrology)');
    console.log('─'.repeat(70));
    try {
      const startTime = Date.now();
      const result = await client.callTool({
        name: 'ziwei_chart',
        arguments: {
          solar_date: '1995-08-15',
          birth_hour: 14,
          gender: '女',
          language: 'zh-CN'
        }
      });
      const duration = Date.now() - startTime;
      
      const data = JSON.parse(result.content[0].text);
      console.log(`✅ 成功 (${duration}ms)`);
      console.log(`   出生日期: ${data.basic_info.solar_date}`);
      console.log(`   农历: ${data.basic_info.lunar_date}`);
      console.log(`   命主: ${data.soul_and_body.soul}`);
      console.log(`   身主: ${data.soul_and_body.body}`);
      console.log(`   五行: ${data.five_elements.class}`);
      results.push({ name: '紫微斗数', success: true, duration });
    } catch (error) {
      console.log(`❌ 失败: ${error.message}`);
      results.push({ name: '紫微斗数', success: false, error: error.message });
    }
    console.log('');

    // ========== 测试 3: 西洋占星 ==========
    console.log('🌌 测试 3: 西洋占星 (Western Astrology)');
    console.log('─'.repeat(70));
    try {
      const startTime = Date.now();
      const result = await client.callTool({
        name: 'birth_chart',
        arguments: {
          birth_date: '1988-03-15',
          birth_time: '08:30',
          latitude: 31.2304,
          longitude: 121.4737,
          timezone: 'Asia/Shanghai'
        }
      });
      const duration = Date.now() - startTime;
      
      const data = JSON.parse(result.content[0].text);
      console.log(`✅ 成功 (${duration}ms)`);
      console.log(`   太阳星座: ${data.sunSign || '未知'}`);
      console.log(`   月亮星座: ${data.moonSign || '未知'}`);
      console.log(`   上升星座: ${data.ascendant || '未知'}`);
      console.log(`   计算方法: ${data.calculationMethod || '标准'}`);
      results.push({ name: '西洋占星', success: true, duration });
    } catch (error) {
      console.log(`❌ 失败: ${error.message}`);
      results.push({ name: '西洋占星', success: false, error: error.message });
    }
    console.log('');

    // ========== 测试 4: 梦境解析 ==========
    console.log('💭 测试 4: 梦境解析 (Dream Interpretation)');
    console.log('─'.repeat(70));
    try {
      const startTime = Date.now();
      const result = await client.callTool({
        name: 'interpret_dream',
        arguments: {
          dream_content: '我梦见自己在飞翔，穿过云层，看到了美丽的日出。',
          emotional_tone: '快乐',
          language: 'zh-CN'
        }
      });
      const duration = Date.now() - startTime;
      
      const data = JSON.parse(result.content[0].text);
      console.log(`✅ 成功 (${duration}ms)`);
      console.log(`   梦境主题: ${data.themes?.join('、') || '未知'}`);
      console.log(`   情感基调: ${data.emotional_tone || '未知'}`);
      console.log(`   解析长度: ${data.interpretation?.length || 0} 字符`);
      results.push({ name: '梦境解析', success: true, duration });
    } catch (error) {
      console.log(`❌ 失败: ${error.message}`);
      results.push({ name: '梦境解析', success: false, error: error.message });
    }
    console.log('');

    // ========== 测试 5: 八字命理 ==========
    console.log('🎋 测试 5: 八字命理 (BaZi Analysis)');
    console.log('─'.repeat(70));
    try {
      const startTime = Date.now();
      const result = await client.callTool({
        name: 'bazi_analysis',
        arguments: {
          solar_date: '1992-06-20',
          birth_hour: 18,
          gender: '男',
          language: 'zh-CN'
        }
      });
      const duration = Date.now() - startTime;
      
      const data = JSON.parse(result.content[0].text);
      console.log(`✅ 成功 (${duration}ms)`);
      console.log(`   出生日期: ${data.birth_info?.solar_date || '未知'}`);
      console.log(`   农历: ${data.birth_info?.lunar_date || '未知'}`);
      console.log(`   年柱: ${data.four_pillars?.year_pillar || '未知'}`);
      console.log(`   日主: ${data.day_master?.element || '未知'}${data.day_master?.polarity || ''}`);
      results.push({ name: '八字命理', success: true, duration });
    } catch (error) {
      console.log(`❌ 失败: ${error.message}`);
      results.push({ name: '八字命理', success: false, error: error.message });
    }
    console.log('');

    // ========== 测试 6: 易经卜卦 ==========
    console.log('☯️  测试 6: 易经卜卦 (I-Ching Divination)');
    console.log('─'.repeat(70));
    try {
      const startTime = Date.now();
      const result = await client.callTool({
        name: 'iching_divination',
        arguments: {
          question: '我应该换工作吗？',
          method: 'yarrow',
          language: 'zh-CN'
        }
      });
      const duration = Date.now() - startTime;
      
      const data = JSON.parse(result.content[0].text);
      console.log(`✅ 成功 (${duration}ms)`);
      console.log(`   问题: ${data.question || '未知'}`);
      console.log(`   本卦: ${data.primary_hexagram?.name || '未知'}`);
      console.log(`   变卦: ${data.transformed_hexagram?.name || '无变化'}`);
      console.log(`   卦象: ${data.primary_hexagram?.symbol || ''}`);
      results.push({ name: '易经卜卦', success: true, duration });
    } catch (error) {
      console.log(`❌ 失败: ${error.message}`);
      results.push({ name: '易经卜卦', success: false, error: error.message });
    }
    console.log('');

    // ========== 测试 7: 易经卦象查询 ==========
    console.log('☯️  测试 7: 易经卦象查询 (I-Ching Hexagram Lookup)');
    console.log('─'.repeat(70));
    try {
      const startTime = Date.now();
      const result = await client.callTool({
        name: 'iching_hexagram',
        arguments: {
          hexagram_number: 1,
          language: 'zh-CN'
        }
      });
      const duration = Date.now() - startTime;
      
      const data = JSON.parse(result.content[0].text);
      console.log(`✅ 成功 (${duration}ms)`);
      console.log(`   卦名: ${data.name || '未知'}`);
      console.log(`   卦象: ${data.symbol || ''}`);
      console.log(`   卦序: ${data.number || '未知'}`);
      results.push({ name: '易经卦象', success: true, duration });
    } catch (error) {
      console.log(`❌ 失败: ${error.message}`);
      results.push({ name: '易经卦象', success: false, error: error.message });
    }
    console.log('');

    // ========== 测试汇总 ==========
    console.log('═'.repeat(70));
    console.log('📊 测试结果汇总');
    console.log('═'.repeat(70));
    
    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;
    const totalTests = results.length;
    const passRate = ((successCount / totalTests) * 100).toFixed(1);
    
    console.log(`\n总测试数: ${totalTests}`);
    console.log(`✅ 通过: ${successCount}`);
    console.log(`❌ 失败: ${failCount}`);
    console.log(`通过率: ${passRate}%\n`);
    
    console.log('详细结果：');
    console.log('─'.repeat(70));
    console.log('系统\t\t\t状态\t耗时');
    console.log('─'.repeat(70));
    results.forEach(result => {
      const status = result.success ? '✅' : '❌';
      const duration = result.duration ? `${result.duration}ms` : 'N/A';
      const name = result.name.padEnd(16, '\t');
      console.log(`${name}\t${status}\t${duration}`);
      if (!result.success && result.error) {
        console.log(`  错误: ${result.error}`);
      }
    });
    
    console.log('\n' + '═'.repeat(70));
    if (failCount === 0) {
      console.log('🎉 所有测试通过！MCP 占卜服务器完全正常！');
    } else {
      console.log(`⚠️  ${failCount} 个测试失败，请检查错误信息。`);
    }
    console.log('═'.repeat(70) + '\n');

    await client.close();
    process.exit(failCount > 0 ? 1 : 0);
  } catch (error) {
    console.error('❌ 测试运行失败:', error.message);
    console.error(error);
    process.exit(1);
  }
}

testAllTools();
