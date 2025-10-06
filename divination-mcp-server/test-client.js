#!/usr/bin/env node#!/usr/bin/env node



/**/**

 * MCP 客户端测试工具 * MCP Client Test Script

 * 用于测试 divination-mcp-server 的所有功能 * 用于测试 divination-mcp-server 的所有功能

 */ */



import { spawn } from 'child_process';import { Client } from '@modelcontextprotocol/sdk/client/index.js';

import { fileURLToPath } from 'url';import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

import { dirname, join } from 'path';import { spawn } from 'child_process';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);import { dirname, join } from 'path';

const __dirname = dirname(__filename);

const __filename = fileURLToPath(import.meta.url);

class MCPTestClient {const __dirname = dirname(__filename);

  constructor() {

    this.serverProcess = null;// ANSI 颜色代码

    this.messageId = 0;const colors = {

  }  reset: '\x1b[0m',

  bright: '\x1b[1m',

  async start() {  red: '\x1b[31m',

    console.log('🚀 启动 MCP 服务器...\n');  green: '\x1b[32m',

      yellow: '\x1b[33m',

    const serverPath = join(__dirname, 'dist', 'index.js');  blue: '\x1b[34m',

    this.serverProcess = spawn('node', [serverPath], {  magenta: '\x1b[35m',

      stdio: ['pipe', 'pipe', 'pipe']  cyan: '\x1b[36m',

    });};



    this.serverProcess.stderr.on('data', (data) => {function log(color, ...args) {

      console.error('Server Error:', data.toString());  console.log(color, ...args, colors.reset);

    });}



    // 等待服务器启动function header(text) {

    await new Promise(resolve => setTimeout(resolve, 1000));  console.log('\n' + '='.repeat(70));

      log(colors.bright + colors.cyan, text);

    console.log('✅ MCP 服务器已启动\n');  console.log('='.repeat(70) + '\n');

  }}



  async sendRequest(method, params = {}) {async function testTarotReading(client) {

    return new Promise((resolve, reject) => {  header('🃏 测试 1: 塔罗占卜 - 单张牌');

      const id = ++this.messageId;  

      const request = {  try {

        jsonrpc: '2.0',    const result = await client.callTool({

        id,      name: 'tarot_reading',

        method,      arguments: {

        params        spread_type: 'single',

      };        question: '今天的运势如何？',

        language: 'zh-CN'

      let responseData = '';      }

    });

      const timeout = setTimeout(() => {    

        reject(new Error('请求超时'));    log(colors.green, '✓ 塔罗占卜成功');

      }, 30000);    console.log(JSON.parse(result.content[0].text));

    return true;

      this.serverProcess.stdout.on('data', (data) => {  } catch (error) {

        responseData += data.toString();    log(colors.red, '✗ 塔罗占卜失败:', error.message);

            return false;

        // 尝试解析 JSON  }

        const lines = responseData.split('\n');}

        for (const line of lines) {

          if (line.trim()) {async function testTarotThreeCard(client) {

            try {  header('🃏 测试 2: 塔罗占卜 - 三张牌');

              const response = JSON.parse(line);  

              if (response.id === id) {  try {

                clearTimeout(timeout);    const result = await client.callTool({

                resolve(response);      name: 'tarot_reading',

                return;      arguments: {

              }        spread_type: 'three_card',

            } catch (e) {        question: '我的事业发展方向？',

              // 继续等待更多数据        language: 'zh-CN'

            }      }

          }    });

        }    

      });    log(colors.green, '✓ 三张牌占卜成功');

    const data = JSON.parse(result.content[0].text);

      // 发送请求    console.log(`过去: ${data.cards[0].name}`);

      this.serverProcess.stdin.write(JSON.stringify(request) + '\n');    console.log(`现在: ${data.cards[1].name}`);

    });    console.log(`未来: ${data.cards[2].name}`);

  }    return true;

  } catch (error) {

  async testListTools() {    log(colors.red, '✗ 三张牌占卜失败:', error.message);

    console.log('📋 测试 1: 列出所有工具\n');    return false;

    console.log('═'.repeat(60));  }

    }

    try {

      const response = await this.sendRequest('tools/list');async function testZiWei(client) {

        header('⭐ 测试 3: 紫微斗数');

      if (response.result && response.result.tools) {  

        console.log(`✅ 成功获取 ${response.result.tools.length} 个工具:\n`);  try {

        response.result.tools.forEach((tool, index) => {    const result = await client.callTool({

          console.log(`${index + 1}. ${tool.name}`);      name: 'ziwei_chart',

          console.log(`   描述: ${tool.description.substring(0, 60)}...`);      arguments: {

        });        solar_date: '2000-08-16',

      }        birth_hour: 14,

              gender: '女',

      console.log('\n✅ 测试通过\n');        language: 'zh-CN'

      return true;      }

    } catch (error) {    });

      console.error('❌ 测试失败:', error.message);    

      return false;    log(colors.green, '✓ 紫微斗数生成成功');

    }    const data = JSON.parse(result.content[0].text);

  }    console.log(`命宫: ${data.palaces?.命宫?.majorStars?.slice(0, 3).join(', ') || '计算中'}`);

    return true;

  async testTarotReading() {  } catch (error) {

    console.log('🃏 测试 2: 塔罗占卜\n');    log(colors.red, '✗ 紫微斗数失败:', error.message);

    console.log('═'.repeat(60));    return false;

      }

    try {}

      const response = await this.sendRequest('tools/call', {

        name: 'tarot_reading',async function testAstrology(client) {

        arguments: {  header('🌌 测试 4: 西洋占星');

          spread_type: 'single',  

          question: '今天的运势如何？',  try {

          language: 'zh-CN'    const result = await client.callTool({

        }      name: 'birth_chart',

      });      arguments: {

        date: '1990-05-20',

      if (response.result && response.result.content) {        time: '14:30',

        const result = JSON.parse(response.result.content[0].text);        latitude: 39.9042,

        console.log(`✅ 抽到的牌: ${result.cards[0].name}`);        longitude: 116.4074,

        console.log(`   位置: ${result.cards[0].position}`);        timezone: 'Asia/Shanghai',

        console.log(`   关键词: ${result.cards[0].keywords.join(', ')}`);        language: 'zh-CN'

        console.log(`\n📖 解读预览:`);      }

        console.log(result.interpretation.substring(0, 200) + '...\n');    });

      }    

          log(colors.green, '✓ 星盘生成成功');

      console.log('✅ 测试通过\n');    const data = JSON.parse(result.content[0].text);

      return true;    console.log(`太阳星座: ${data.sun_sign}`);

    } catch (error) {    console.log(`上升星座: ${data.ascendant_sign}`);

      console.error('❌ 测试失败:', error.message);    return true;

      return false;  } catch (error) {

    }    log(colors.red, '✗ 星盘生成失败:', error.message);

  }    return false;

  }

  async testIChing() {}

    console.log('☯️  测试 3: 易经卜卦\n');

    console.log('═'.repeat(60));async function testDream(client) {

      header('💭 测试 5: 梦境解析');

    try {  

      const response = await this.sendRequest('tools/call', {  try {

        name: 'iching_divination',    const result = await client.callTool({

        arguments: {      name: 'interpret_dream',

          question: '我应该接受这个新工作机会吗？',      arguments: {

          method: 'coins',        dream_description: '我梦见自己在飞翔，飞过大海和高山',

          language: 'zh-CN'        emotions: ['兴奋', '自由'],

        }        recurring: false,

      });        language: 'zh-CN'

      }

      if (response.result && response.result.content) {    });

        const result = JSON.parse(response.result.content[0].text);    

        console.log(`✅ 易经占卜完成`);    log(colors.green, '✓ 梦境解析成功');

        console.log(`   问题: ${result.question}`);    const data = JSON.parse(result.content[0].text);

        console.log(`   起卦方法: ${result.method}`);    console.log(`主要符号: ${data.symbols?.slice(0, 3).join(', ')}`);

        console.log(`   本卦: 第 ${result.original_hexagram} 卦`);    return true;

        if (result.changing_lines && result.changing_lines.length > 0) {  } catch (error) {

          console.log(`   变爻: 第 ${result.changing_lines.join('、')} 爻`);    log(colors.red, '✗ 梦境解析失败:', error.message);

        }    return false;

        console.log(`\n📖 解读预览:`);  }

        console.log(result.interpretation.substring(0, 200) + '...\n');}

      }

      async function testBaZi(client) {

      console.log('✅ 测试通过\n');  header('🎋 测试 6: 八字命理');

      return true;  

    } catch (error) {  try {

      console.error('❌ 测试失败:', error.message);    const result = await client.callTool({

      return false;      name: 'bazi_analysis',

    }      arguments: {

  }        solar_date: '1990-05-20',

        birth_hour: 10,

  async runAllTests() {        gender: '男',

    console.log('\n');        language: 'zh-CN'

    console.log('╔═══════════════════════════════════════════════════════════╗');      }

    console.log('║      🔮 综合占卜 MCP Server - 功能测试套件 🔮           ║');    });

    console.log('╚═══════════════════════════════════════════════════════════╝');    

    console.log('\n');    log(colors.green, '✓ 八字分析成功');

    const data = JSON.parse(result.content[0].text);

    await this.start();    console.log(`日柱: ${data.dayPillar?.stem}${data.dayPillar?.branch}`);

    console.log(`五行: ${Object.keys(data.fiveElements || {}).join(', ')}`);

    const tests = [    return true;

      { name: '列出工具', fn: () => this.testListTools() },  } catch (error) {

      { name: '塔罗占卜', fn: () => this.testTarotReading() },    log(colors.red, '✗ 八字分析失败:', error.message);

      { name: '易经卜卦', fn: () => this.testIChing() },    return false;

    ];  }

}

    const results = [];

async function testIChing(client) {

    for (const test of tests) {  header('☯️ 测试 7: 易经卜卦');

      try {  

        const passed = await test.fn();  try {

        results.push({ name: test.name, passed });    const result = await client.callTool({

      } catch (error) {      name: 'iching_divination',

        console.error(`\n❌ ${test.name} 测试异常:`, error.message);      arguments: {

        results.push({ name: test.name, passed: false });        question: '我应该接受这个新工作机会吗？',

      }        method: 'coins',

              language: 'zh-CN'

      // 等待一下，避免请求太快      }

      await new Promise(resolve => setTimeout(resolve, 1000));    });

    }    

    log(colors.green, '✓ 易经占卜成功');

    // 打印总结    const data = JSON.parse(result.content[0].text);

    console.log('\n');    console.log(`本卦: ${data.original_name}`);

    console.log('═'.repeat(60));    if (data.transformed_hexagram) {

    console.log('📊 测试总结');      console.log(`变卦: ${data.transformed_hexagram.name}`);

    console.log('═'.repeat(60));    }

    console.log('\n');    return true;

  } catch (error) {

    const passed = results.filter(r => r.passed).length;    log(colors.red, '✗ 易经占卜失败:', error.message);

    const total = results.length;    return false;

  }

    results.forEach((result, index) => {}

      const status = result.passed ? '✅' : '❌';

      console.log(`${status} ${index + 1}. ${result.name}`);async function testIChingHexagram(client) {

    });  header('☯️ 测试 8: 易经卦象解读');

  

    console.log('\n');  try {

    console.log(`总计: ${passed}/${total} 测试通过`);    const result = await client.callTool({

    console.log(`成功率: ${((passed / total) * 100).toFixed(1)}%`);      name: 'iching_hexagram',

    console.log('\n');      arguments: {

        hexagram_number: 1,

    if (passed === total) {        changing_lines: [],

      console.log('🎉 所有测试通过！项目功能正常！');        language: 'zh-CN'

    } else {      }

      console.log('⚠️  部分测试失败，请检查日志');    });

    }    

    log(colors.green, '✓ 卦象解读成功');

    console.log('\n');    const data = JSON.parse(result.content[0].text);

    this.stop();    console.log(`卦名: ${data.hexagram_name}`);

  }    console.log(`卦象: ${data.hexagram_symbol}`);

    return true;

  stop() {  } catch (error) {

    if (this.serverProcess) {    log(colors.red, '✗ 卦象解读失败:', error.message);

      this.serverProcess.kill();    return false;

      console.log('🛑 MCP 服务器已停止\n');  }

    }}

  }

}async function runAllTests() {

  header('🚀 启动 MCP 客户端测试');

// 运行测试  

const client = new MCPTestClient();  console.log('正在启动服务器...\n');

client.runAllTests().catch(error => {  

  console.error('测试运行失败:', error);  // 启动服务器进程

  process.exit(1);  const serverPath = join(__dirname, 'dist', 'index.js');

});  const serverProcess = spawn('node', [serverPath], {

    stdio: ['pipe', 'pipe', 'inherit']
  });

  // 创建传输层
  const transport = new StdioClientTransport({
    command: 'node',
    args: [serverPath]
  });

  // 创建客户端
  const client = new Client({
    name: 'divination-test-client',
    version: '1.0.0'
  }, {
    capabilities: {}
  });

  try {
    // 连接到服务器
    await client.connect(transport);
    log(colors.green, '✓ 成功连接到 MCP 服务器\n');

    // 列出可用工具
    const tools = await client.listTools();
    log(colors.blue, `发现 ${tools.tools.length} 个可用工具:`);
    tools.tools.forEach(tool => {
      console.log(`  - ${tool.name}: ${tool.description}`);
    });
    console.log();

    // 运行所有测试
    const tests = [
      { name: '塔罗单张', fn: testTarotReading },
      { name: '塔罗三张', fn: testTarotThreeCard },
      { name: '紫微斗数', fn: testZiWei },
      { name: '西洋占星', fn: testAstrology },
      { name: '梦境解析', fn: testDream },
      { name: '八字命理', fn: testBaZi },
      { name: '易经占卜', fn: testIChing },
      { name: '卦象解读', fn: testIChingHexagram },
    ];

    const results = [];
    for (const test of tests) {
      const success = await test.fn(client);
      results.push({ name: test.name, success });
      // 等待一下避免过快
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // 显示测试总结
    header('📊 测试总结');
    console.log();
    
    const passed = results.filter(r => r.success).length;
    const total = results.length;
    const percentage = Math.round((passed / total) * 100);

    results.forEach(result => {
      const icon = result.success ? '✓' : '✗';
      const color = result.success ? colors.green : colors.red;
      log(color, `${icon} ${result.name}`);
    });

    console.log();
    log(
      passed === total ? colors.green : colors.yellow,
      `测试通过: ${passed}/${total} (${percentage}%)`
    );

    if (passed === total) {
      console.log();
      log(colors.green + colors.bright, '🎉 所有测试通过！项目完全可用！');
    } else {
      console.log();
      log(colors.yellow, '⚠️  部分测试失败，请检查错误信息');
    }

    console.log();
    header('✅ 测试完成');

  } catch (error) {
    log(colors.red, '✗ 测试过程中发生错误:', error.message);
    console.error(error);
  } finally {
    // 关闭连接
    await client.close();
    serverProcess.kill();
    process.exit(0);
  }
}

// 运行测试
runAllTests().catch(error => {
  log(colors.red, '致命错误:', error.message);
  console.error(error);
  process.exit(1);
});
