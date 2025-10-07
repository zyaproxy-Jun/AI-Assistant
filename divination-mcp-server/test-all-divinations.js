/**
 * 全面测试所有占卜系统
 * Comprehensive test for all divination systems
 */

import http from 'http';

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║  🔮 全面占卜系统测试 - Comprehensive Test            ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

// Test data for all systems
const tests = [
  {
    system: 'dream',
    name: '💭 梦境解析 (SomniumSage)',
    endpoint: '/api/dream',
    data: {
      dream: '我在天空中自由飞翔，感觉无比快乐和自由',
      language: 'zh-CN'
    },
    validate: (result) => {
      return result.sentiment && 
             result.symbols && 
             result.interpretation &&
             result.method === 'SomniumSage';
    }
  },
  {
    system: 'tarot',
    name: '🃏 塔罗占卜',
    endpoint: '/api/tarot',
    data: {
      question: '我的事业发展如何？',
      spread: 'three-card'
    },
    validate: (result) => {
      return result.cards && result.interpretation;
    }
  },
  {
    system: 'ziwei',
    name: '⭐ 紫微斗数',
    endpoint: '/api/ziwei',
    data: {
      birth_year: 1990,
      birth_month: 5,
      birth_day: 15,
      birth_hour: 14,
      gender: 'male',
      language: 'zh-CN'
    },
    validate: (result) => {
      return result.life_palace || result.destiny;
    }
  },
  {
    system: 'astrology',
    name: '🌟 西方占星',
    endpoint: '/api/astrology',
    data: {
      birth_year: 1990,
      birth_month: 5,
      birth_day: 15,
      birth_hour: 14,
      birth_minute: 30,
      timezone: 'Asia/Shanghai'
    },
    validate: (result) => {
      return result.sun_sign || result.planets;
    }
  },
  {
    system: 'bazi',
    name: '🎋 八字命理',
    endpoint: '/api/bazi',
    data: {
      birth_year: 1990,
      birth_month: 5,
      birth_day: 15,
      birth_hour: 14,
      gender: 'male'
    },
    validate: (result) => {
      return result.four_pillars || result.elements;
    }
  },
  {
    system: 'iching',
    name: '☯️ 易经占卜',
    endpoint: '/api/iching',
    data: {
      question: '我是否应该做出这个决定？',
      method: 'random'
    },
    validate: (result) => {
      return result.hexagram || result.interpretation;
    }
  }
];

// Make HTTP request
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
      
      res.on('data', chunk => {
        data += chunk;
      });
      
      res.on('end', () => {
        const time = Date.now() - startTime;
        try {
          const result = JSON.parse(data);
          resolve({ result, time, statusCode: res.statusCode });
        } catch (error) {
          reject(new Error(`解析错误: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`请求错误: ${error.message}`));
    });

    req.write(postData);
    req.end();
  });
}

// Run all tests
async function runAllTests() {
  console.log('📋 开始测试所有占卜系统...\n');
  console.log('🌐 服务器: http://localhost:3000\n');
  
  let passCount = 0;
  let failCount = 0;
  const results = [];

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    
    console.log(`\n${'='.repeat(70)}`);
    console.log(`测试 ${i + 1}/${tests.length}: ${test.name}`);
    console.log('='.repeat(70));
    console.log(`端点: ${test.endpoint}`);
    console.log(`请求数据:`, JSON.stringify(test.data, null, 2));
    
    try {
      const { result, time, statusCode } = await makeRequest(test);
      
      console.log(`\n✅ 响应状态: ${statusCode}`);
      console.log(`⚡ 响应时间: ${time}ms`);
      
      // Validate result
      const isValid = test.validate(result);
      
      if (isValid) {
        console.log('✅ 数据验证: 通过');
        passCount++;
        
        // Show key fields for each system
        if (test.system === 'dream') {
          console.log(`\n🎭 情感分析:`);
          console.log(`   基调: ${result.sentiment?.tone || 'N/A'}`);
          console.log(`   置信度: ${((result.sentiment?.confidence || 0) * 100).toFixed(1)}%`);
          console.log(`   符号数: ${result.symbols?.length || 0}`);
          console.log(`   方法: ${result.method || 'N/A'}`);
        } else {
          console.log(`\n📊 关键字段:`);
          const keys = Object.keys(result).slice(0, 5);
          keys.forEach(key => {
            const value = result[key];
            const display = typeof value === 'object' 
              ? JSON.stringify(value).substring(0, 50) + '...'
              : String(value).substring(0, 50);
            console.log(`   ${key}: ${display}`);
          });
        }
        
        results.push({
          system: test.system,
          name: test.name,
          status: '✅ 通过',
          time: time
        });
      } else {
        console.log('⚠️  数据验证: 失败（缺少必需字段）');
        failCount++;
        results.push({
          system: test.system,
          name: test.name,
          status: '⚠️  部分通过',
          time: time
        });
      }
      
    } catch (error) {
      console.log(`\n❌ 测试失败: ${error.message}`);
      failCount++;
      results.push({
        system: test.system,
        name: test.name,
        status: '❌ 失败',
        time: 0
      });
    }
    
    // Rate limiting
    if (i < tests.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // Summary
  console.log('\n\n' + '='.repeat(70));
  console.log('📊 测试总结');
  console.log('='.repeat(70));
  
  console.log(`\n✅ 通过: ${passCount}/${tests.length}`);
  console.log(`❌ 失败: ${failCount}/${tests.length}`);
  console.log(`📈 成功率: ${((passCount / tests.length) * 100).toFixed(1)}%\n`);
  
  console.log('📋 详细结果:\n');
  console.log('┌────────────────────────────────────┬──────────┬──────────┐');
  console.log('│ 系统                               │ 状态     │ 响应时间 │');
  console.log('├────────────────────────────────────┼──────────┼──────────┤');
  
  results.forEach(r => {
    const name = r.name.padEnd(34);
    const status = r.status.padEnd(8);
    const time = r.time > 0 ? `${r.time}ms`.padStart(8) : '    -   ';
    console.log(`│ ${name} │ ${status} │ ${time} │`);
  });
  
  console.log('└────────────────────────────────────┴──────────┴──────────┘\n');

  if (passCount === tests.length) {
    console.log('🎉 所有测试通过！所有占卜系统运行正常！\n');
  } else if (passCount > 0) {
    console.log('⚠️  部分测试通过。请检查失败的系统。\n');
  } else {
    console.log('❌ 所有测试失败。请检查服务器状态。\n');
  }

  console.log('🌐 Web 界面访问: http://localhost:3000');
  console.log('📝 在浏览器中打开上述地址，选择不同的占卜系统进行测试。\n');
  
  console.log('✨ SomniumSage 特别提示:');
  console.log('   梦境解析已升级到 SomniumSage v2.0');
  console.log('   包含情感分析、符号识别和心理洞察功能\n');
}

// Run tests
console.log('⏳ 准备开始测试...\n');
setTimeout(() => {
  runAllTests().catch(error => {
    console.error('❌ 测试运行错误:', error);
    process.exit(1);
  });
}, 1000);
