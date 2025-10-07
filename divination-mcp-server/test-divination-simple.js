/**
 * 简化版占卜系统测试 - 直接显示结果
 */

import http from 'http';

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║  🔮 占卜系统功能测试                                  ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

// Test configuration
const tests = [
  {
    name: '💭 梦境解析 (SomniumSage)',
    endpoint: '/api/dream',
    data: { dream_description: '我在天空中自由飞翔，感觉无比快乐和自由', language: 'zh-CN' }
  },
  {
    name: '🃏 塔罗占卜',
    endpoint: '/api/tarot',
    data: { question: '我的事业发展如何？', spread: 'three-card' }
  },
  {
    name: '⭐ 紫微斗数',
    endpoint: '/api/ziwei',
    data: { birth_year: 1990, birth_month: 5, birth_day: 15, birth_hour: 14, gender: 'male' }
  }
];

function makeRequest(test) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(test.data);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: test.endpoint,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const startTime = Date.now();
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        const time = Date.now() - startTime;
        try {
          const result = JSON.parse(data);
          resolve({ result, time });
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('🌐 服务器: http://localhost:3000\n');
  console.log('⏳ 开始测试...\n');

  for (const test of tests) {
    console.log('='.repeat(70));
    console.log(`\n${test.name}`);
    console.log(`端点: ${test.endpoint}\n`);

    try {
      const { result, time } = await makeRequest(test);
      
      console.log(`✅ 状态: 成功`);
      console.log(`⚡ 响应时间: ${time}ms\n`);
      
      // Display based on system
      if (test.endpoint === '/api/dream') {
        console.log('🎭 情感分析:');
        if (result.sentiment) {
          console.log(`   基调: ${result.sentiment.tone || 'N/A'}`);
          console.log(`   置信度: ${((result.sentiment.confidence || 0) * 100).toFixed(1)}%`);
          console.log(`   描述: ${result.sentiment.description || 'N/A'}`);
        }
        
        console.log(`\n🔮 识别符号: ${result.symbols?.length || 0} 个`);
        if (result.symbols && result.symbols.length > 0) {
          result.symbols.forEach(s => {
            console.log(`   • ${s.symbol}: ${s.meaning.substring(0, 40)}...`);
          });
        }
        
        console.log(`\n📖 解析方法: ${result.method || 'N/A'}`);
        console.log(`\n解析内容:`);
        console.log(result.interpretation?.substring(0, 150) + '...\n');
        
      } else {
        // Other systems - show first few fields
        console.log('📊 返回数据:');
        const keys = Object.keys(result).slice(0, 8);
        keys.forEach(key => {
          let value = result[key];
          if (typeof value === 'object') {
            value = JSON.stringify(value, null, 2).substring(0, 100);
          } else if (typeof value === 'string' && value.length > 80) {
            value = value.substring(0, 80) + '...';
          }
          console.log(`   ${key}: ${value}`);
        });
        console.log();
      }
      
    } catch (error) {
      console.log(`❌ 错误: ${error.message}\n`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('='.repeat(70));
  console.log('\n✨ 测试完成！\n');
  console.log('🌐 访问 Web 界面进行完整测试: http://localhost:3000');
  console.log('   在浏览器中可以看到更加美观的结果展示\n');
  console.log('💡 特别说明:');
  console.log('   • 梦境解析已升级到 SomniumSage v2.0');
  console.log('   • 包含情感分析、符号识别、心理洞察');
  console.log('   • Web 界面展示结构化卡片布局\n');
}

runTests().catch(console.error);
