/**
 * Direct MCP Test for SomniumSage Integration
 * Tests dream service directly without HTTP layer
 */

import { DreamService } from './dist/services/dream.js';

const testDreams = [
  {
    name: '正面梦境 - 飞翔',
    dream: '我在天空中自由飞翔，感觉无比快乐和自由',
    expectedSentiment: 'POSITIVE',
    language: 'zh-CN'
  },
  {
    name: '负面梦境 - 坠落',
    dream: '我从高处坠落，感到恐惧和无助',
    expectedSentiment: 'NEGATIVE',
    language: 'zh-CN'
  },
  {
    name: '中性梦境 - 水',
    dream: '我站在海边看着波浪',
    expectedSentiment: 'NEUTRAL',
    language: 'zh-CN'
  },
  {
    name: 'Positive Dream - Flying',
    dream: 'I was flying over beautiful mountains, feeling completely free and happy',
    expectedSentiment: 'POSITIVE',
    language: 'en-US'
  },
  {
    name: 'Negative Dream - Chase',
    dream: 'Someone was chasing me and I felt terrified and trapped',
    expectedSentiment: 'NEGATIVE',
    language: 'en-US'
  },
  {
    name: 'Water Symbol Test',
    dream: 'I was swimming in the ocean, the water was very deep',
    expectedSentiment: 'NEUTRAL',
    language: 'en-US'
  }
];

async function runTests() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║  🧪 SomniumSage Direct MCP Test      ║');
  console.log('╚════════════════════════════════════════╝\n');

  const dreamService = new DreamService();
  let passCount = 0;
  let failCount = 0;

  for (let i = 0; i < testDreams.length; i++) {
    const testCase = testDreams[i];
    console.log(`\n📋 Test ${i + 1}/${testDreams.length}: ${testCase.name}`);
    console.log(`   Dream: ${testCase.dream.substring(0, 60)}...`);

    try {
      const result = await dreamService.interpret(
        testCase.dream,
        [],
        false,
        testCase.language
      );
      
      // Verify result structure
      console.log(`\n   📊 Result Structure:`);
      console.log(`      ✓ Dream: ${result.dream ? 'Present' : 'Missing'}`);
      console.log(`      ✓ Sentiment: ${result.sentiment ? 'Present' : 'Missing'}`);
      console.log(`      ✓ Interpretation: ${result.interpretation ? 'Present' : 'Missing'}`);
      console.log(`      ✓ Symbols: ${result.symbols?.length || 0} found`);
      console.log(`      ✓ Psychological Insights: ${result.psychological_insights ? 'Present' : 'Missing'}`);
      console.log(`      ✓ Method: ${result.method}`);
      
      // Check sentiment details
      console.log(`\n   🎭 Sentiment Analysis:`);
      console.log(`      Tone: ${result.sentiment?.tone} (expected: ${testCase.expectedSentiment})`);
      console.log(`      Confidence: ${(result.sentiment?.confidence * 100).toFixed(1)}%`);
      console.log(`      Description: ${result.sentiment?.description}`);
      
      const sentimentMatch = result.sentiment?.tone === testCase.expectedSentiment;
      
      // Check symbols
      console.log(`\n   🔮 Symbols Detected:`);
      result.symbols?.forEach(sym => {
        console.log(`      - ${sym.symbol}: ${sym.meaning.substring(0, 40)}...`);
      });
      
      // Check interpretation includes sentiment
      console.log(`\n   📝 Interpretation Preview:`);
      console.log(`      ${result.interpretation.substring(0, 100)}...`);
      
      const hasSentimentInText = 
        result.interpretation.includes(result.sentiment?.tone) ||
        result.interpretation.includes(result.sentiment?.description.substring(0, 20));
      
      // Check psychological insights
      console.log(`\n   🧠 Psychological Insights Preview:`);
      console.log(`      ${result.psychological_insights.substring(0, 80)}...`);
      
      // Validation
      if (sentimentMatch && result.symbols && result.interpretation && result.psychological_insights) {
        console.log(`\n   ✅ PASS - All SomniumSage features working!`);
        passCount++;
      } else {
        console.log(`\n   ⚠️  PARTIAL - Some features incomplete`);
        if (!sentimentMatch) console.log(`      - Expected sentiment ${testCase.expectedSentiment}, got ${result.sentiment?.tone}`);
        failCount++;
      }
      
    } catch (error) {
      console.log(`\n   ❌ FAIL: ${error.message}`);
      console.error(error);
      failCount++;
    }
  }

  console.log('\n\n╔════════════════════════════════════════╗');
  console.log('║           Test Summary                 ║');
  console.log('╚════════════════════════════════════════╝');
  console.log(`✅ Passed: ${passCount}/${testDreams.length}`);
  console.log(`❌ Failed: ${failCount}/${testDreams.length}`);
  console.log(`📊 Success Rate: ${((passCount / testDreams.length) * 100).toFixed(1)}%\n`);
  
  if (passCount === testDreams.length) {
    console.log('🎉 All tests passed! SomniumSage integration successful!\n');
    console.log('✨ Key Features Validated:');
    console.log('   - Sentiment analysis (POSITIVE/NEGATIVE/NEUTRAL)');
    console.log('   - Multi-language support (Chinese & English)');
    console.log('   - Symbol extraction and interpretation');
    console.log('   - Psychological pattern matching');
    console.log('   - Rule-based interpretation (SomniumSage method)');
  } else {
    console.log('⚠️  Some tests failed. Review the results above.\n');
  }
}

// Run tests
runTests().catch(console.error);
