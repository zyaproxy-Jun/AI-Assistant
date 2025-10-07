/**
 * SomniumSage Integration Test
 * Tests new sentiment analysis features
 */

const http = require('http');

const testDreams = [
  {
    name: '正面梦境 - 飞翔',
    dream: '我在天空中自由飞翔，感觉无比快乐和自由',
    expectedSentiment: 'POSITIVE',
    expectedSymbols: ['飞', '自由']
  },
  {
    name: '负面梦境 - 坠落',
    dream: '我从高处坠落，感到恐惧和无助',
    expectedSentiment: 'NEGATIVE',
    expectedSymbols: ['坠落', '恐惧']
  },
  {
    name: '中性梦境 - 水',
    dream: '我站在海边看着波浪',
    expectedSentiment: 'NEUTRAL',
    expectedSymbols: ['海', '水']
  },
  {
    name: 'Positive Dream - Flying',
    dream: 'I was flying over beautiful mountains, feeling completely free and happy',
    expectedSentiment: 'POSITIVE',
    expectedSymbols: ['flying', 'freedom']
  },
  {
    name: 'Negative Dream - Chase',
    dream: 'Someone was chasing me and I felt terrified and trapped',
    expectedSentiment: 'NEGATIVE',
    expectedSymbols: ['chase', 'fear']
  }
];

function testDream(dream, index) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      system: 'dream',
      dream: dream.dream,
      language: dream.dream.match(/[\u4e00-\u9fa5]/) ? 'zh-CN' : 'en-US'
    });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/divination',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve({ dream, result, index });
        } catch (error) {
          reject(new Error(`Parse error for test ${index + 1}: ${error.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║  🧪 SomniumSage Integration Test     ║');
  console.log('╚════════════════════════════════════════╝\n');

  let passCount = 0;
  let failCount = 0;

  for (let i = 0; i < testDreams.length; i++) {
    const testCase = testDreams[i];
    console.log(`\n📋 Test ${i + 1}/${testDreams.length}: ${testCase.name}`);
    console.log('   Dream:', testCase.dream.substring(0, 60) + '...');

    try {
      const { result } = await testDream(testCase, i);
      
      // Check sentiment
      const sentimentMatch = result.sentiment?.tone === testCase.expectedSentiment;
      console.log(`   ✓ Sentiment: ${result.sentiment?.tone} (expected ${testCase.expectedSentiment})`);
      console.log(`     Confidence: ${(result.sentiment?.confidence * 100).toFixed(1)}%`);
      console.log(`     Description: ${result.sentiment?.description}`);
      
      // Check symbols
      const foundSymbols = result.symbols?.map(s => s.symbol) || [];
      console.log(`   ✓ Symbols: ${foundSymbols.join(', ')}`);
      
      // Check interpretation
      console.log(`   ✓ Method: ${result.method}`);
      console.log(`   ✓ Interpretation: ${result.interpretation.substring(0, 80)}...`);
      
      // Verify sentiment is in interpretation
      const hasSentimentInText = result.interpretation.includes(result.sentiment?.label) ||
                                  result.interpretation.includes(result.sentiment?.description);
      
      if (sentimentMatch && hasSentimentInText) {
        console.log('   ✅ PASS - Sentiment analysis working correctly');
        passCount++;
      } else {
        console.log('   ⚠️  PARTIAL - Some checks failed');
        if (!sentimentMatch) console.log('      - Sentiment mismatch');
        if (!hasSentimentInText) console.log('      - Sentiment not in interpretation');
        failCount++;
      }
      
    } catch (error) {
      console.log(`   ❌ FAIL: ${error.message}`);
      failCount++;
    }
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n╔════════════════════════════════════════╗');
  console.log('║           Test Summary                 ║');
  console.log('╚════════════════════════════════════════╝');
  console.log(`✅ Passed: ${passCount}/${testDreams.length}`);
  console.log(`❌ Failed: ${failCount}/${testDreams.length}`);
  console.log(`📊 Success Rate: ${((passCount / testDreams.length) * 100).toFixed(1)}%`);
  
  if (passCount === testDreams.length) {
    console.log('\n🎉 All tests passed! SomniumSage integration successful!');
  } else {
    console.log('\n⚠️  Some tests failed. Review the results above.');
  }
}

// Run tests
runTests().catch(console.error);
