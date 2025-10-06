#!/usr/bin/env node

/**
 * 综合测试脚本 - 测试所有6个占卜系统
 * 
 * 包括新修复的西洋占星功能
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { URL } from 'url';

const __filename = fileURLToPath(new URL(import.meta.url));
const __dirname = dirname(__filename);

// ANSI 颜色代码
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(color, ...args) {
  console.log(color + args.join(' ') + colors.reset);
}

function printHeader(title) {
  console.log('\n' + colors.cyan + '═'.repeat(80) + colors.reset);
  console.log(colors.bright + colors.cyan + '  ' + title + colors.reset);
  console.log(colors.cyan + '═'.repeat(80) + colors.reset + '\n');
}

function printSubHeader(title) {
  console.log('\n' + colors.blue + '─'.repeat(80) + colors.reset);
  console.log(colors.bright + colors.blue + '  ' + title + colors.reset);
  console.log(colors.blue + '─'.repeat(80) + colors.reset + '\n');
}

async function testTarotReading(client) {
  printSubHeader('1. 塔罗占卜测试');
  
  try {
    const startTime = Date.now();
    const result = await client.callTool({
      name: 'tarot_reading',
      arguments: {
        spread_type: 'single',
        question: '今天的整体运势如何？'
      }
    });
    const duration = Date.now() - startTime;
    
    log(colors.green, '✓ 塔罗占卜成功');
    console.log(`响应时间: ${duration}ms`);
    
    const data = JSON.parse(result.content[0].text);
    if (data.cards && data.cards.length > 0) {
      console.log(`抽到的牌: ${data.cards[0].name} ${data.cards[0].reversed ? '(逆位)' : '(正位)'}`);
      console.log(`牌义: ${data.interpretation.substring(0, 100)}...`);
    }
    
    return { success: true, duration, system: '塔罗占卜' };
  } catch (error) {
    log(colors.red, '✗ 塔罗占卜失败:', error.message);
    return { success: false, duration: 0, system: '塔罗占卜', error: error.message };
  }
}

async function testZiweiChart(client) {
  printSubHeader('2. 紫微斗数测试');
  
  try {
    const startTime = Date.now();
    const result = await client.callTool({
      name: 'ziwei_chart',
      arguments: {
        solar_date: '2000-01-01',
        birth_hour: 14,
        gender: '男'
      }
    });
    const duration = Date.now() - startTime;
    
    log(colors.green, '✓ 紫微斗数成功');
    console.log(`响应时间: ${duration}ms`);
    
    const data = JSON.parse(result.content[0].text);
    console.log(`命主: ${data.soul}`);
    console.log(`身主: ${data.body}`);
    console.log(`五行局: ${data.fiveElementsClass}`);
    console.log(`生肖: ${data.zodiac}, 星座: ${data.sign}`);
    console.log(`时辰转换: 14时 → ${data.time_info || '未时'}`);
    
    return { success: true, duration, system: '紫微斗数' };
  } catch (error) {
    log(colors.red, '✗ 紫微斗数失败:', error.message);
    return { success: false, duration: 0, system: '紫微斗数', error: error.message };
  }
}

async function testBirthChart(client) {
  printSubHeader('3. 西洋占星测试 (新修复)');
  
  try {
    const startTime = Date.now();
    const result = await client.callTool({
      name: 'birth_chart',
      arguments: {
        birth_date: '1990-05-20',
        birth_time: '14:30',
        latitude: 39.9042,
        longitude: 116.4074,
        timezone: 'Asia/Shanghai'
      }
    });
    const duration = Date.now() - startTime;
    
    log(colors.green, '✓ 西洋占星成功 (已修复!)');
    console.log(`响应时间: ${duration}ms`);
    
    const data = JSON.parse(result.content[0].text);
    console.log(`太阳星座: ${data.sunSign}`);
    console.log(`月亮星座: ${data.moonSign}`);
    console.log(`上升星座: ${data.ascendant}`);
    console.log(`计算方法: ${data.calculationMethod}`);
    
    if (data.planets) {
      const planetCount = Object.keys(data.planets).length;
      console.log(`行星位置: ${planetCount} 个天体`);
    }
    
    if (data.aspects) {
      console.log(`相位数量: ${data.aspects.length} 个`);
    }
    
    return { success: true, duration, system: '西洋占星' };
  } catch (error) {
    log(colors.red, '✗ 西洋占星失败:', error.message);
    return { success: false, duration: 0, system: '西洋占星', error: error.message };
  }
}

async function testDreamInterpretation(client) {
  printSubHeader('4. 梦境解析测试');
  
  try {
    const startTime = Date.now();
    const result = await client.callTool({
      name: 'interpret_dream',
      arguments: {
        dream_description: '梦见在天空中飞翔'
      }
    });
    const duration = Date.now() - startTime;
    
    log(colors.green, '✓ 梦境解析成功');
    console.log(`响应时间: ${duration}ms`);
    
    const data = JSON.parse(result.content[0].text);
    console.log(`解析长度: ${data.interpretation.length} 字符`);
    console.log(`梦境主题: ${data.dream_description.substring(0, 50)}...`);
    
    return { success: true, duration, system: '梦境解析' };
  } catch (error) {
    log(colors.red, '✗ 梦境解析失败:', error.message);
    return { success: false, duration: 0, system: '梦境解析', error: error.message };
  }
}

async function testBaziAnalysis(client) {
  printSubHeader('5. 八字命理测试');
  
  try {
    const startTime = Date.now();
    const result = await client.callTool({
      name: 'bazi_analysis',
      arguments: {
        solar_date: '1990-05-20',
        birth_hour: 14
      }
    });
    const duration = Date.now() - startTime;
    
    log(colors.green, '✓ 八字命理成功');
    console.log(`响应时间: ${duration}ms`);
    
    const data = JSON.parse(result.content[0].text);
    console.log(`四柱: ${data.four_pillars?.year || '未知'} ${data.four_pillars?.month || ''} ${data.four_pillars?.day || ''} ${data.four_pillars?.hour || ''}`);
    console.log(`五行: ${data.five_elements || '未知'}`);
    
    return { success: true, duration, system: '八字命理' };
  } catch (error) {
    log(colors.red, '✗ 八字命理失败:', error.message);
    return { success: false, duration: 0, system: '八字命理', error: error.message };
  }
}

async function testIChingDivination(client) {
  printSubHeader('6. 易经卜卦测试');
  
  try {
    const startTime = Date.now();
    const result = await client.callTool({
      name: 'iching_divination',
      arguments: {
        question: '事业发展方向'
      }
    });
    const duration = Date.now() - startTime;
    
    log(colors.green, '✓ 易经卜卦成功');
    console.log(`响应时间: ${duration}ms`);
    
    const data = JSON.parse(result.content[0].text);
    console.log(`本卦: ${data.hexagram?.name || '未知'} (${data.hexagram?.number || ''})`);
    if (data.changing_hexagram) {
      console.log(`变卦: ${data.changing_hexagram.name} (${data.changing_hexagram.number})`);
    }
    
    return { success: true, duration, system: '易经卜卦' };
  } catch (error) {
    log(colors.red, '✗ 易经卜卦失败:', error.message);
    return { success: false, duration: 0, system: '易经卜卦', error: error.message };
  }
}

async function runTests() {
  printHeader('🎯 综合占卜系统测试 - 所有6个系统');
  
  log(colors.yellow, '正在启动 MCP 客户端...');
  
  const serverPath = join(__dirname, 'dist', 'index.js');
  const serverProcess = spawn('node', [serverPath], {
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  const transport = new StdioClientTransport({
    stdin: serverProcess.stdin,
    stdout: serverProcess.stdout,
    stderr: serverProcess.stderr
  });
  
  const client = new Client({
    name: 'test-client',
    version: '1.0.0'
  }, {
    capabilities: {}
  });
  
  await client.connect(transport);
  log(colors.green, '✓ MCP 客户端已连接\n');
  
  // 运行所有测试
  const results = [];
  
  results.push(await testTarotReading(client));
  results.push(await testZiweiChart(client));
  results.push(await testBirthChart(client));
  results.push(await testDreamInterpretation(client));
  results.push(await testBaziAnalysis(client));
  results.push(await testIChingDivination(client));
  
  // 生成测试报告
  printHeader('📊 测试结果汇总');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log('\n' + colors.bright + '系统状态：' + colors.reset);
  results.forEach(result => {
    const icon = result.success ? colors.green + '✓' : colors.red + '✗';
    const status = result.success ? colors.green + '成功' : colors.red + '失败';
    const time = result.success ? `${result.duration}ms` : '-';
    console.log(`  ${icon} ${result.system.padEnd(12)} ${status} ${colors.reset} ${colors.cyan}${time}${colors.reset}`);
    if (!result.success && result.error) {
      console.log(`    ${colors.red}错误: ${result.error}${colors.reset}`);
    }
  });
  
  console.log('\n' + colors.bright + '统计数据：' + colors.reset);
  console.log(`  总测试数: ${colors.cyan}${results.length}${colors.reset}`);
  console.log(`  成功: ${colors.green}${successful.length}${colors.reset}`);
  console.log(`  失败: ${colors.red}${failed.length}${colors.reset}`);
  console.log(`  成功率: ${colors.bright}${((successful.length / results.length) * 100).toFixed(1)}%${colors.reset}`);
  
  if (successful.length > 0) {
    const avgTime = successful.reduce((sum, r) => sum + r.duration, 0) / successful.length;
    console.log(`  平均响应时间: ${colors.cyan}${avgTime.toFixed(0)}ms${colors.reset}`);
  }
  
  // 特别标注西洋占星的修复状态
  const astrologyResult = results.find(r => r.system === '西洋占星');
  if (astrologyResult?.success) {
    console.log('\n' + colors.green + colors.bright + '🎉 西洋占星功能已成功修复并通过测试！' + colors.reset);
  }
  
  console.log('\n' + colors.cyan + '═'.repeat(80) + colors.reset + '\n');
  
  // 清理
  await client.close();
  serverProcess.kill();
  
  // 退出代码
  process.exit(failed.length > 0 ? 1 : 0);
}

// 运行测试
runTests().catch(error => {
  log(colors.red, '测试运行失败:', error);
  process.exit(1);
});
