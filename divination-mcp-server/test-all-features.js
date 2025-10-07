#!/usr/bin/env node

/**
 * 综合功能测试 - 测试所有6个占卜系统
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testAllFeatures() {
  console.log('╔══════════════════════════════════════════════════════════════════════╗');
  console.log('║               🔮 综合占卜系统功能测试                                    ║');
  console.log('╚══════════════════════════════════════════════════════════════════════╝\n');

  // 启动服务器
  console.log('🚀 启动 MCP 服务器...');
  const serverPath = join(__dirname, 'dist', 'index.js');
  const transport = new StdioClientTransport({
    command: 'node',
    args: [serverPath]
  });

  const client = new Client({
    name: 'comprehensive-test',
    version: '1.0.0'
  }, {
    capabilities: {}
  });

  const results = [];
  let totalTests = 0;
  let passedTests = 0;

  try {
    await client.connect(transport);
    console.log('✅ 服务器连接成功\n');

    console.log('══════════════════════════════════════════════════════════════════════');
    console.log('开始测试各个占卜系统...');
    console.log('══════════════════════════════════════════════════════════════════════\n');

    // 测试1: 塔罗占卜
    console.log('🃏 测试1: 塔罗占卜 (Tarot Reading)');
    console.log('──────────────────────────────────────────────────────────────────────');
    totalTests++;
    try {
      const startTime = Date.now();
      const result = await client.callTool({
        name: 'tarot_reading',
        arguments: {
          spread_type: 'single',
          question: '今天的运势如何？'
        }
      });
      const duration = Date.now() - startTime;

      if (!result.isError) {
        console.log(`✅ 成功 (${duration}ms)`);
        const content = JSON.parse(result.content[0].text);
        console.log(`   抽到的牌: ${content.cards?.[0]?.name || '未知'}`);
        passedTests++;
        results.push({ name: '塔罗占卜', status: 'pass', duration });
      } else {
        console.log(`❌ 失败: ${result.content[0].text}`);
        results.push({ name: '塔罗占卜', status: 'fail', error: result.content[0].text });
      }
    } catch (error) {
      console.log(`❌ 异常: ${error.message}`);
      results.push({ name: '塔罗占卜', status: 'error', error: error.message });
    }
    console.log('');

    // 测试2: 紫微斗数
    console.log('⭐ 测试2: 紫微斗数 (Zi Wei Dou Shu)');
    console.log('──────────────────────────────────────────────────────────────────────');
    totalTests++;
    try {
      const startTime = Date.now();
      const result = await client.callTool({
        name: 'ziwei_chart',
        arguments: {
          solar_date: '2000-01-01',
          birth_hour: 16,
          gender: '男',
          language: 'zh-CN'
        }
      });
      const duration = Date.now() - startTime;

      if (!result.isError) {
        console.log(`✅ 成功 (${duration}ms)`);
        const content = JSON.parse(result.content[0].text);
        console.log(`   命主: ${content.soul_and_body?.soul || '未知'}`);
        console.log(`   五行: ${content.five_elements?.class || '未知'}`);
        passedTests++;
        results.push({ name: '紫微斗数', status: 'pass', duration });
      } else {
        console.log(`❌ 失败: ${result.content[0].text}`);
        results.push({ name: '紫微斗数', status: 'fail', error: result.content[0].text });
      }
    } catch (error) {
      console.log(`❌ 异常: ${error.message}`);
      results.push({ name: '紫微斗数', status: 'error', error: error.message });
    }
    console.log('');

    // 测试3: 西洋占星
    console.log('🌌 测试3: 西洋占星 (Western Astrology)');
    console.log('──────────────────────────────────────────────────────────────────────');
    totalTests++;
    try {
      const startTime = Date.now();
      const result = await client.callTool({
        name: 'birth_chart',
        arguments: {
          birth_date: '2000-01-01',
          birth_time: '12:00',
          latitude: 39.9042,
          longitude: 116.4074,
          timezone: 'Asia/Shanghai'
        }
      });
      const duration = Date.now() - startTime;

      if (!result.isError) {
        console.log(`✅ 成功 (${duration}ms)`);
        const content = JSON.parse(result.content[0].text);
        console.log(`   太阳星座: ${content.sun?.sign || '未知'}`);
        console.log(`   月亮星座: ${content.moon?.sign || '未知'}`);
        passedTests++;
        results.push({ name: '西洋占星', status: 'pass', duration });
      } else {
        console.log(`❌ 失败: ${result.content[0].text}`);
        results.push({ name: '西洋占星', status: 'fail', error: result.content[0].text });
      }
    } catch (error) {
      console.log(`❌ 异常: ${error.message}`);
      results.push({ name: '西洋占星', status: 'error', error: error.message });
    }
    console.log('');

    // 测试4: 梦境解析
    console.log('💭 测试4: 梦境解析 (Dream Interpretation)');
    console.log('──────────────────────────────────────────────────────────────────────');
    totalTests++;
    try {
      const startTime = Date.now();
      const result = await client.callTool({
        name: 'interpret_dream',
        arguments: {
          dream_description: '我梦见自己在飞翔',
          emotional_state: '愉快',
          language: 'zh-CN'
        }
      });
      const duration = Date.now() - startTime;

      if (!result.isError) {
        console.log(`✅ 成功 (${duration}ms)`);
        const content = JSON.parse(result.content[0].text);
        console.log(`   解析主题: ${content.primary_symbols?.[0] || '未知'}`);
        passedTests++;
        results.push({ name: '梦境解析', status: 'pass', duration });
      } else {
        console.log(`❌ 失败: ${result.content[0].text}`);
        results.push({ name: '梦境解析', status: 'fail', error: result.content[0].text });
      }
    } catch (error) {
      console.log(`❌ 异常: ${error.message}`);
      results.push({ name: '梦境解析', status: 'error', error: error.message });
    }
    console.log('');

    // 测试5: 八字命理
    console.log('🎋 测试5: 八字命理 (BaZi/Four Pillars)');
    console.log('──────────────────────────────────────────────────────────────────────');
    totalTests++;
    try {
      const startTime = Date.now();
      const result = await client.callTool({
        name: 'bazi_analysis',
        arguments: {
          solar_date: '2000-01-01',
          birth_hour: 12,
          gender: '男',
          language: 'zh-CN'
        }
      });
      const duration = Date.now() - startTime;

      if (!result.isError) {
        console.log(`✅ 成功 (${duration}ms)`);
        const content = JSON.parse(result.content[0].text);
        console.log(`   年柱: ${content.year_pillar || '未知'}`);
        console.log(`   日主: ${content.day_master || '未知'}`);
        passedTests++;
        results.push({ name: '八字命理', status: 'pass', duration });
      } else {
        console.log(`❌ 失败: ${result.content[0].text}`);
        results.push({ name: '八字命理', status: 'fail', error: result.content[0].text });
      }
    } catch (error) {
      console.log(`❌ 异常: ${error.message}`);
      results.push({ name: '八字命理', status: 'error', error: error.message });
    }
    console.log('');

    // 测试6: 易经卜卦
    console.log('☯️  测试6: 易经卜卦 (I-Ching)');
    console.log('──────────────────────────────────────────────────────────────────────');
    totalTests++;
    try {
      const startTime = Date.now();
      const result = await client.callTool({
        name: 'iching_divination',
        arguments: {
          question: '事业发展如何？',
          method: 'random',
          language: 'zh-CN'
        }
      });
      const duration = Date.now() - startTime;

      if (!result.isError) {
        console.log(`✅ 成功 (${duration}ms)`);
        const content = JSON.parse(result.content[0].text);
        console.log(`   本卦: ${content.primary_hexagram?.name || '未知'}`);
        console.log(`   卦象: ${content.primary_hexagram?.number || '未知'}`);
        passedTests++;
        results.push({ name: '易经卜卦', status: 'pass', duration });
      } else {
        console.log(`❌ 失败: ${result.content[0].text}`);
        results.push({ name: '易经卜卦', status: 'fail', error: result.content[0].text });
      }
    } catch (error) {
      console.log(`❌ 异常: ${error.message}`);
      results.push({ name: '易经卜卦', status: 'error', error: error.message });
    }
    console.log('');

    // 汇总结果
    console.log('══════════════════════════════════════════════════════════════════════');
    console.log('📊 测试结果汇总');
    console.log('══════════════════════════════════════════════════════════════════════\n');

    console.log(`总测试数: ${totalTests}`);
    console.log(`✅ 通过: ${passedTests}`);
    console.log(`❌ 失败: ${totalTests - passedTests}`);
    console.log(`通过率: ${((passedTests / totalTests) * 100).toFixed(1)}%\n`);

    console.log('详细结果：');
    console.log('──────────────────────────────────────────────────────────────────────');
    console.log('系统\t\t状态\t耗时');
    console.log('──────────────────────────────────────────────────────────────────────');
    
    results.forEach(r => {
      const name = r.name.padEnd(8);
      const status = r.status === 'pass' ? '✅' : '❌';
      const duration = r.duration ? `${r.duration}ms` : '-';
      console.log(`${name}\t${status}\t${duration}`);
    });

    console.log('\n══════════════════════════════════════════════════════════════════════');
    
    if (passedTests === totalTests) {
      console.log('🎉 所有测试通过！综合占卜系统完全正常！');
    } else {
      console.log(`⚠️  ${totalTests - passedTests} 个测试失败，请检查详细日志`);
    }
    
    console.log('══════════════════════════════════════════════════════════════════════\n');

    await client.close();
    process.exit(passedTests === totalTests ? 0 : 1);

  } catch (error) {
    console.error('\n❌ 测试过程中发生错误：');
    console.error(error.message);
    console.error('\n堆栈跟踪：');
    console.error(error.stack);
    process.exit(1);
  }
}

// 运行测试
testAllFeatures().catch(error => {
  console.error('未捕获的错误：', error);
  process.exit(1);
});
