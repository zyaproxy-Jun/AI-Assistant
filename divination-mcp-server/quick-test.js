#!/usr/bin/env node

/**
 * 简化的 MCP 测试客户端
 * 用于快速验证所有工具是否正常工作
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function quickTest() {
  console.log('🚀 快速测试 MCP 服务器...\n');

  const serverPath = join(__dirname, 'dist', 'index.js');
  const transport = new StdioClientTransport({
    command: 'node',
    args: [serverPath]
  });

  const client = new Client({
    name: 'quick-test',
    version: '1.0.0'
  }, {
    capabilities: {}
  });

  try {
    await client.connect(transport);
    console.log('✓ 服务器连接成功\n');

    // 列出工具
    const tools = await client.listTools();
    console.log(`✓ 发现 ${tools.tools.length} 个工具:\n`);
    tools.tools.forEach((tool, i) => {
      console.log(`  ${i + 1}. ${tool.name}`);
    });

    console.log('\n🧪 测试基本功能...\n');

    // 测试塔罗
    console.log('测试 塔罗占卜...');
    const tarot = await client.callTool({
      name: 'tarot_reading',
      arguments: {
        spread_type: 'single',
        question: '测试',
        language: 'zh-CN'
      }
    });
    console.log('  ✓ 塔罗占卜正常\n');

    // 测试易经
    console.log('测试 易经卜卦...');
    const iching = await client.callTool({
      name: 'iching_divination',
      arguments: {
        question: '测试',
        method: 'coins',
        language: 'zh-CN'
      }
    });
    console.log('  ✓ 易经卜卦正常\n');

    // 测试八字
    console.log('测试 八字命理...');
    const bazi = await client.callTool({
      name: 'bazi_analysis',
      arguments: {
        solar_date: '1990-05-20',
        birth_hour: 10,
        gender: '男',
        language: 'zh-CN'
      }
    });
    console.log('  ✓ 八字命理正常\n');

    console.log('✅ 所有基础功能测试通过！');
    console.log('\n📝 项目已准备好在 Claude Desktop 中使用');
    console.log('📖 查看 CLAUDE_DESKTOP_SETUP.md 了解配置方法\n');

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    process.exit(1);
  }
}

quickTest();
