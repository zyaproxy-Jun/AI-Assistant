#!/usr/bin/env node

/**
 * 演示所有占卜系统的实际MCP调用
 * Demonstrates actual MCP calls for all divination systems
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function demonstrateAllSystems() {
  console.log('\n╔══════════════════════════════════════════════════════════════════════╗');
  console.log('║        🔮 所有占卜系统实际调用演示 - Live Demo                      ║');
  console.log('╚══════════════════════════════════════════════════════════════════════╝\n');

  const serverPath = join(__dirname, 'dist', 'index.js');
  const transport = new StdioClientTransport({
    command: 'node',
    args: [serverPath]
  });

  const client = new Client({
    name: 'demo-client',
    version: '1.0.0'
  }, {
    capabilities: {}
  });

  try {
    console.log('🚀 连接 MCP 服务器...\n');
    await client.connect(transport);
    console.log('✅ 服务器已连接\n');

    console.log('💡 这不是静态演示页面，这是实际的MCP工具调用！\n');
    console.log('═'.repeat(70));

    // 1. 塔罗占卜
    console.log('\n🃏 【演示1】塔罗占卜 - Tarot Reading');
    console.log('─'.repeat(70));
    console.log('📝 调用代码示例:');
    console.log('```javascript');
    console.log('await client.callTool({');
    console.log('  name: "tarot_reading",');
    console.log('  arguments: {');
    console.log('    spread_type: "single",');
    console.log('    question: "我的爱情运势如何？",');
    console.log('    language: "zh-CN"');
    console.log('  }');
    console.log('});');
    console.log('```\n');
    
    const tarot = await client.callTool({
      name: 'tarot_reading',
      arguments: {
        spread_type: 'single',
        question: '我的爱情运势如何？',
        language: 'zh-CN'
      }
    });
    const tarotData = JSON.parse(tarot.content[0].text);
    console.log(`✅ 成功调用！抽到: ${tarotData.cards[0].nameCN} (${tarotData.cards[0].reversed ? '逆位' : '正位'})`);

    // 2. 紫微斗数
    console.log('\n⭐ 【演示2】紫微斗数 - Ziwei Astrology');
    console.log('─'.repeat(70));
    console.log('📝 调用代码示例:');
    console.log('```javascript');
    console.log('await client.callTool({');
    console.log('  name: "ziwei_chart",');
    console.log('  arguments: {');
    console.log('    solar_date: "1990-05-20",');
    console.log('    birth_hour: 10,');
    console.log('    gender: "女",');
    console.log('    language: "zh-CN"');
    console.log('  }');
    console.log('});');
    console.log('```\n');
    
    const ziwei = await client.callTool({
      name: 'ziwei_chart',
      arguments: {
        solar_date: '1990-05-20',
        birth_hour: 10,
        gender: '女',
        language: 'zh-CN'
      }
    });
    const ziweiData = JSON.parse(ziwei.content[0].text);
    console.log(`✅ 成功调用！命主: ${ziweiData.soul_and_body.soul}, 五行: ${ziweiData.five_elements.class}`);

    // 3. 西洋占星
    console.log('\n🌌 【演示3】西洋占星 - Western Astrology');
    console.log('─'.repeat(70));
    console.log('📝 调用代码示例:');
    console.log('```javascript');
    console.log('await client.callTool({');
    console.log('  name: "birth_chart",');
    console.log('  arguments: {');
    console.log('    birth_date: "1995-08-15",');
    console.log('    birth_time: "14:30",');
    console.log('    latitude: 39.9042,');
    console.log('    longitude: 116.4074,');
    console.log('    timezone: "Asia/Shanghai"');
    console.log('  }');
    console.log('});');
    console.log('```\n');
    console.log('⏳ 正在计算星盘（可能需要10秒）...');
    
    const astrology = await client.callTool({
      name: 'birth_chart',
      arguments: {
        birth_date: '1995-08-15',
        birth_time: '14:30',
        latitude: 39.9042,
        longitude: 116.4074,
        timezone: 'Asia/Shanghai'
      }
    });
    const astrologyData = JSON.parse(astrology.content[0].text);
    console.log(`✅ 成功调用！太阳: ${astrologyData.sunSign}, 月亮: ${astrologyData.moonSign}, 上升: ${astrologyData.ascendant}`);

    // 4. 梦境解析
    console.log('\n💭 【演示4】梦境解析 - Dream Interpretation');
    console.log('─'.repeat(70));
    console.log('📝 调用代码示例:');
    console.log('```javascript');
    console.log('await client.callTool({');
    console.log('  name: "interpret_dream",');
    console.log('  arguments: {');
    console.log('    dream_content: "我梦见在海边散步，遇到一只会说话的海豚",');
    console.log('    emotional_tone: "平静",');
    console.log('    language: "zh-CN"');
    console.log('  }');
    console.log('});');
    console.log('```\n');
    
    const dream = await client.callTool({
      name: 'interpret_dream',
      arguments: {
        dream_content: '我梦见在海边散步，遇到一只会说话的海豚',
        emotional_tone: '平静',
        language: 'zh-CN'
      }
    });
    const dreamData = JSON.parse(dream.content[0].text);
    console.log(`✅ 成功调用！解析长度: ${dreamData.interpretation.length} 字符`);

    // 5. 八字命理
    console.log('\n🎋 【演示5】八字命理 - BaZi Analysis');
    console.log('─'.repeat(70));
    console.log('📝 调用代码示例:');
    console.log('```javascript');
    console.log('await client.callTool({');
    console.log('  name: "bazi_analysis",');
    console.log('  arguments: {');
    console.log('    solar_date: "1988-03-15",');
    console.log('    birth_hour: 8,');
    console.log('    gender: "男",');
    console.log('    language: "zh-CN"');
    console.log('  }');
    console.log('});');
    console.log('```\n');
    
    const bazi = await client.callTool({
      name: 'bazi_analysis',
      arguments: {
        solar_date: '1988-03-15',
        birth_hour: 8,
        gender: '男',
        language: 'zh-CN'
      }
    });
    const baziData = JSON.parse(bazi.content[0].text);
    console.log(`✅ 成功调用！日主: ${baziData.day_master.element}${baziData.day_master.polarity || ''}`);

    // 6. 易经卜卦
    console.log('\n☯️  【演示6】易经卜卦 - I-Ching Divination');
    console.log('─'.repeat(70));
    console.log('📝 调用代码示例:');
    console.log('```javascript');
    console.log('await client.callTool({');
    console.log('  name: "iching_divination",');
    console.log('  arguments: {');
    console.log('    question: "我应该投资这个项目吗？",');
    console.log('    method: "coins",');
    console.log('    language: "zh-CN"');
    console.log('  }');
    console.log('});');
    console.log('```\n');
    
    const iching = await client.callTool({
      name: 'iching_divination',
      arguments: {
        question: '我应该投资这个项目吗？',
        method: 'coins',
        language: 'zh-CN'
      }
    });
    const ichingData = JSON.parse(iching.content[0].text);
    console.log(`✅ 成功调用！本卦: ${ichingData.primary_hexagram?.name || '未知'}`);

    // 总结
    console.log('\n' + '═'.repeat(70));
    console.log('🎉 所有占卜系统实际调用演示完成！');
    console.log('═'.repeat(70));
    
    console.log('\n📌 重要说明:');
    console.log('─'.repeat(70));
    console.log('✅ 以上都是【实际的MCP工具调用】，不是静态页面');
    console.log('✅ 每次运行都会产生不同的结果（随机占卜）');
    console.log('✅ 这些调用可以在Claude Desktop中使用');
    console.log('✅ Web页面只是参数展示，真正调用需要通过MCP协议');
    
    console.log('\n🔧 如何在Claude Desktop中使用:');
    console.log('─'.repeat(70));
    console.log('1. 配置 Claude Desktop 的 MCP 设置');
    console.log('2. 在对话中直接说："帮我算塔罗牌"');
    console.log('3. Claude会自动调用相应的MCP工具');
    console.log('4. 参考文档: CLAUDE_DESKTOP_SETUP.md');
    
    console.log('\n💻 命令行测试方法:');
    console.log('─'.repeat(70));
    console.log('• node test-tarot-call.js     # 测试塔罗占卜');
    console.log('• node test-all-features.js   # 测试所有功能');
    console.log('• node quick-test.js          # 快速测试');
    console.log('• node test-mcp-detailed.js   # 详细测试报告');
    
    console.log('\n🌐 Web界面说明:');
    console.log('─'.repeat(70));
    console.log('• Web页面 (http://localhost:8080) 是【静态演示】');
    console.log('• 用于展示所有占卜系统的参数格式');
    console.log('• 实际调用需要通过MCP协议或命令行测试');
    console.log('');

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ 演示失败:', error.message);
    process.exit(1);
  }
}

demonstrateAllSystems();
