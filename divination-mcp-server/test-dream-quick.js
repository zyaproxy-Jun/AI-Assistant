/**
 * 简单测试：查看梦境描述是否正确传递
 */

const baseURL = 'http://localhost:3000';

async function quickTest() {
  console.log('🔍 测试梦境描述参数传递...\n');

  const testDream = '我梦见自己在飞翔，飞过高山和海洋，感觉很自由。';
  
  console.log('输入参数:');
  console.log(`  dream_description: "${testDream}"`);
  console.log(`  emotions: ["自由", "兴奋"]`);
  console.log(`  recurring: false\n`);

  try {
    const response = await fetch(`${baseURL}/api/divination`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tool: 'interpret_dream',
        args: {
          dream_description: testDream,
          emotions: ['自由', '兴奋'],
          recurring: false
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    const dreamResult = JSON.parse(result.content[0].text);

    console.log('返回结果分析:\n');
    console.log(`1. dream 字段: ${dreamResult.dream ? '✓' : '✗'}`);
    if (dreamResult.dream) {
      console.log(`   内容: "${dreamResult.dream}"`);
    }

    console.log(`\n2. symbols 识别:`);
    console.log(`   数量: ${dreamResult.symbols?.length || 0}`);
    if (dreamResult.symbols && dreamResult.symbols.length > 0) {
      dreamResult.symbols.forEach(s => {
        console.log(`   - ${s.symbol}: ${s.meaning.substring(0, 40)}...`);
      });
      
      // 检查是否只有默认符号
      const hasDefaultOnly = dreamResult.symbols.length === 1 && 
                            dreamResult.symbols[0].symbol === '梦境元素';
      if (hasDefaultOnly) {
        console.log(`   ⚠️  只有默认符号，说明没有识别到具体内容！`);
      }
    }

    console.log(`\n3. psychological_insights:`);
    const insights = dreamResult.psychological_insights || '';
    console.log(`   长度: ${insights.length} 字符`);
    
    // 检查是否是通用内容
    const isGeneric = insights.includes('梦境反映了您当前的心理状态') && 
                     !insights.includes('思考：');
    console.log(`   ${isGeneric ? '⚠️  通用内容（无反思问题）' : '✓ 包含针对性内容'}`);
    
    if (insights.length > 0) {
      console.log(`   预览: ${insights.substring(0, 100)}...`);
    }

    console.log(`\n4. emotions 字段:`);
    console.log(`   实际值: [${dreamResult.emotions?.join('、') || ''}]`);

    // 诊断
    console.log('\n🔍 问题诊断:');
    if (!dreamResult.dream || dreamResult.dream.length === 0) {
      console.log('   ❌ 梦境描述未传递到服务器！');
      console.log('   → 检查 API 参数名是否正确');
    } else if (dreamResult.symbols?.length === 1 && dreamResult.symbols[0].symbol === '梦境元素') {
      console.log('   ❌ 符号识别失败 - 梦境内容可能为空或未传递');
      console.log('   → 检查 dreamDescription 参数');
    } else {
      console.log('   ✅ 一切正常！');
    }

  } catch (error) {
    console.log(`❌ 测试失败: ${error.message}`);
  }
}

quickTest().catch(console.error);
