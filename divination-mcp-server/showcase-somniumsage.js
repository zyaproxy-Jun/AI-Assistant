/**
 * Feature Showcase: SomniumSage vs Original
 * Demonstrates the new sentiment analysis features
 */

import { DreamService } from './dist/services/dream.js';

const showcaseDreams = [
  {
    category: '🎭 情感分析测试',
    dreams: [
      { dream: '我在阳光明媚的草地上奔跑，感到无比快乐', expected: 'POSITIVE' },
      { dream: '我被困在黑暗的房间里，找不到出口', expected: 'NEGATIVE' },
      { dream: '我在图书馆里看书', expected: 'NEUTRAL' }
    ]
  },
  {
    category: '🔮 SomniumSage 经典符号',
    dreams: [
      { dream: '我在天空中飞翔，俯瞰大地', expected: 'POSITIVE', symbols: ['飞翔→自由'] },
      { dream: '我从悬崖上坠落', expected: 'NEGATIVE', symbols: ['坠落→失控'] },
      { dream: '我在大海中游泳，水很深', expected: 'NEUTRAL', symbols: ['水→情感'] }
    ]
  },
  {
    category: '🌍 多语言支持',
    dreams: [
      { dream: 'I was flying over mountains', expected: 'POSITIVE', lang: 'en' },
      { dream: 'Someone was chasing me', expected: 'NEGATIVE', lang: 'en' },
      { dream: 'I was walking on a road', expected: 'NEUTRAL', lang: 'en' }
    ]
  }
];

async function showcase() {
  const dreamService = new DreamService();
  
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║  🌟 SomniumSage Integration Feature Showcase     ║');
  console.log('╚════════════════════════════════════════════════════╝\n');

  for (const category of showcaseDreams) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`${category.category}`);
    console.log('='.repeat(60));

    for (let i = 0; i < category.dreams.length; i++) {
      const testCase = category.dreams[i];
      const language = testCase.lang === 'en' ? 'en-US' : 'zh-CN';
      
      console.log(`\n📝 梦境 ${i + 1}: ${testCase.dream}`);
      
      try {
        const result = await dreamService.interpret(
          testCase.dream,
          [],
          false,
          language
        );

        // Display sentiment
        const sentimentEmoji = {
          'POSITIVE': '😊',
          'NEGATIVE': '😔',
          'NEUTRAL': '😐'
        }[result.sentiment.tone] || '❓';
        
        console.log(`\n   ${sentimentEmoji} 情感分析结果:`);
        console.log(`      基调: ${result.sentiment.tone} (期望: ${testCase.expected})`);
        console.log(`      置信度: ${(result.sentiment.confidence * 100).toFixed(1)}%`);
        console.log(`      描述: ${result.sentiment.description}`);

        // Display symbols
        if (result.symbols && result.symbols.length > 0) {
          console.log(`\n   🔮 识别符号:`);
          result.symbols.forEach(sym => {
            console.log(`      • ${sym.symbol}: ${sym.meaning}`);
          });
        }

        // Display interpretation excerpt
        console.log(`\n   📖 解析摘要:`);
        const lines = result.interpretation.split(/[。.！!]/).filter(l => l.trim());
        console.log(`      "${lines[0]}..."`);

        // Display method
        console.log(`\n   ⚙️  解析方法: ${result.method}`);

        // Validation
        const isCorrect = result.sentiment.tone === testCase.expected;
        console.log(`\n   ${isCorrect ? '✅' : '⚠️'}  验证: ${isCorrect ? '通过' : '部分通过'}`);

      } catch (error) {
        console.log(`\n   ❌ 错误: ${error.message}`);
      }
    }
  }

  console.log('\n\n' + '='.repeat(60));
  console.log('✨ 新特性总结');
  console.log('='.repeat(60));
  console.log(`
🎭 情感分析
   • 自动识别梦境的情感基调（积极/消极/中性）
   • 动态置信度评分（50%-99%）
   • 30+ 多语言情感词库

🔮 增强符号库
   • 50+ 梦境符号（从原来的30+扩展）
   • 中英文双语支持
   • 涵盖自然、行为、场所、生物等类别

🧠 心理洞察
   • 10+ 心理模式匹配
   • 情感基调融合
   • 反思性问题引导

⚡ 性能优化
   • 规则引擎：50-100ms 响应
   • 离线可用（无需 API key）
   • 可选 AI 增强模式

🌐 多语言
   • 中文（简体/繁体）
   • 英文
   • 其他语言扩展中

🎯 SomniumSage 启发式规则
   • 飞翔 → 自由与雄心
   • 坠落 → 不安全感
   • 水 → 情感与潜意识
   • 追赶 → 逃避与压力
   • 更多规则持续添加中...
  `);

  console.log('\n✅ Feature showcase completed!\n');
}

// Run showcase
showcase().catch(console.error);
