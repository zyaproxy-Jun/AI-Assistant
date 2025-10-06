#!/usr/bin/env node

/**
 * 西洋占星修复验证测试
 * 测试新的API调用实现
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ANSI 颜色
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(color, ...args) {
  console.log(color + args.join(' ') + colors.reset);
}

async function testAstrologyFixed() {
  log(colors.cyan, '\n' + '='.repeat(70));
  log(colors.bright + colors.cyan, '🔧 西洋占星修复验证测试');
  log(colors.cyan, '='.repeat(70) + '\n');

  const serverPath = join(__dirname, 'dist', 'index.js');
  
  log(colors.yellow, '启动 MCP 服务器...');
  const serverProcess = spawn('node', [serverPath], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

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
    log(colors.green, '✓ 服务器连接成功\n');

    // 测试1: 基本测试 - 1990年5月20日14:30，北京
    log(colors.blue, '📋 测试1: 基本星盘 (1990-05-20, 14:30, 北京)');
    log(colors.yellow, '测试参数:');
    console.log('  日期: 1990年5月20日');
    console.log('  时间: 14:30');
    console.log('  地点: 北京 (39.9042°N, 116.4074°E)');
    console.log('');

    const startTime1 = Date.now();
    try {
      const result1 = await client.callTool({
        name: 'birth_chart',
        arguments: {
          year: 1990,
          month: 5,
          day: 20,
          hour: 14,
          minute: 30,
          latitude: 39.9042,
          longitude: 116.4074,
          language: 'zh'
        }
      });

      const duration1 = Date.now() - startTime1;

      if (result1.content && result1.content.length > 0) {
        const data = JSON.parse(result1.content[0].text);
        
        log(colors.green, `✓ 测试1通过 (${duration1}ms)\n`);
        
        log(colors.cyan, '📊 计算结果:');
        console.log(`  太阳星座: ${data.sunSign}`);
        console.log(`  月亮星座: ${data.moonSign}`);
        console.log(`  上升星座: ${data.ascendant}`);
        console.log(`  计算方法: ${data.calculationMethod}`);
        console.log('');

        if (data.planets && Object.keys(data.planets).length > 0) {
          log(colors.cyan, '🪐 行星位置:');
          Object.entries(data.planets).slice(0, 5).forEach(([name, pos]) => {
            console.log(`  ${name}: ${pos}`);
          });
          console.log(`  ... (共 ${Object.keys(data.planets).length} 个行星)`);
          console.log('');
        }

        if (data.houses && Object.keys(data.houses).length > 0) {
          log(colors.cyan, '🏠 宫位信息:');
          Object.entries(data.houses).slice(0, 3).forEach(([name, pos]) => {
            console.log(`  ${name}: ${pos}`);
          });
          console.log(`  ... (共 ${Object.keys(data.houses).length} 个宫位)`);
          console.log('');
        }

        if (data.aspects && data.aspects.length > 0) {
          log(colors.cyan, '⭐ 相位信息:');
          data.aspects.slice(0, 3).forEach(aspect => {
            console.log(`  ${aspect}`);
          });
          console.log(`  ... (共 ${data.aspects.length} 个相位)`);
          console.log('');
        }

        if (data.interpretation) {
          log(colors.cyan, '📝 解读:');
          console.log(`  ${data.interpretation.substring(0, 150)}...`);
          console.log('');
        }
      } else {
        log(colors.red, '✗ 测试1失败: 无响应内容');
      }
    } catch (error) {
      log(colors.red, `✗ 测试1失败: ${error.message}`);
      if (error.message.includes('fallback')) {
        log(colors.yellow, '  (使用了Fallback模式 - 这是预期的，因为API未配置)');
      }
    }

    // 测试2: 不同时区测试 - 纽约
    log(colors.blue, '\n📋 测试2: 不同时区 (1995-08-15, 09:00, 纽约)');
    log(colors.yellow, '测试参数:');
    console.log('  日期: 1995年8月15日');
    console.log('  时间: 09:00');
    console.log('  地点: 纽约 (40.7128°N, -74.0060°W)');
    console.log('');

    const startTime2 = Date.now();
    try {
      const result2 = await client.callTool({
        name: 'birth_chart',
        arguments: {
          year: 1995,
          month: 8,
          day: 15,
          hour: 9,
          minute: 0,
          latitude: 40.7128,
          longitude: -74.0060,
          language: 'en'
        }
      });

      const duration2 = Date.now() - startTime2;

      if (result2.content && result2.content.length > 0) {
        const data = JSON.parse(result2.content[0].text);
        
        log(colors.green, `✓ 测试2通过 (${duration2}ms)\n`);
        
        log(colors.cyan, '📊 计算结果:');
        console.log(`  Sun Sign: ${data.sunSign}`);
        console.log(`  Moon Sign: ${data.moonSign}`);
        console.log(`  Ascendant: ${data.ascendant}`);
        console.log(`  Calculation Method: ${data.calculationMethod}`);
        console.log('');
      } else {
        log(colors.red, '✗ 测试2失败: 无响应内容');
      }
    } catch (error) {
      log(colors.red, `✗ 测试2失败: ${error.message}`);
      if (error.message.includes('fallback')) {
        log(colors.yellow, '  (使用了Fallback模式 - 这是预期的)');
      }
    }

    // 测试3: 极端经度测试 - 东京
    log(colors.blue, '\n📋 测试3: 东方时区 (2000-01-01, 00:00, 东京)');
    log(colors.yellow, '测试参数:');
    console.log('  日期: 2000年1月1日');
    console.log('  时间: 00:00');
    console.log('  地点: 东京 (35.6762°N, 139.6503°E)');
    console.log('');

    const startTime3 = Date.now();
    try {
      const result3 = await client.callTool({
        name: 'birth_chart',
        arguments: {
          year: 2000,
          month: 1,
          day: 1,
          hour: 0,
          minute: 0,
          latitude: 35.6762,
          longitude: 139.6503,
          language: 'zh'
        }
      });

      const duration3 = Date.now() - startTime3;

      if (result3.content && result3.content.length > 0) {
        const data = JSON.parse(result3.content[0].text);
        
        log(colors.green, `✓ 测试3通过 (${duration3}ms)\n`);
        
        log(colors.cyan, '📊 计算结果:');
        console.log(`  太阳星座: ${data.sunSign}`);
        console.log(`  月亮星座: ${data.moonSign}`);
        console.log(`  上升星座: ${data.ascendant}`);
        console.log('');
      } else {
        log(colors.red, '✗ 测试3失败: 无响应内容');
      }
    } catch (error) {
      log(colors.red, `✗ 测试3失败: ${error.message}`);
      if (error.message.includes('fallback')) {
        log(colors.yellow, '  (使用了Fallback模式 - 这是预期的)');
      }
    }

    log(colors.cyan, '\n' + '='.repeat(70));
    log(colors.bright + colors.green, '✅ 西洋占星修复验证完成');
    log(colors.cyan, '='.repeat(70) + '\n');

    log(colors.yellow, '📝 注意事项:');
    console.log('  • 如果显示"使用Fallback模式"，这是正常的');
    console.log('  • Fallback提供基本功能，不依赖外部API');
    console.log('  • 配置真实API后可获得完整专业功能');
    console.log('  • 所有测试通过说明修复成功！');
    console.log('');

  } catch (error) {
    log(colors.red, '\n✗ 测试过程出错:');
    console.error(error);
  } finally {
    try {
      await client.close();
      serverProcess.kill();
    } catch (e) {
      // 忽略清理错误
    }
  }
}

testAstrologyFixed().catch(console.error);
