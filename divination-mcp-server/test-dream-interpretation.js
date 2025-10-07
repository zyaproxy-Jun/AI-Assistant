/**
 * 梦境解析功能测试
 * 测试各种参数组合，检查返回结果的完整性
 */

const baseURL = 'http://localhost:3000';

async function testDreamInterpretation() {
  console.log('🧪 开始测试梦境解析功能...\n');

  // 测试用例
  const testCases = [
    {
      name: '基础测试 - 简单梦境',
      params: {
        dream_description: '我梦见自己在飞翔，飞过高山和海洋，感觉很自由。'
      }
    },
    {
      name: '完整参数测试',
      params: {
        dream_description: '我梦见在黑暗的森林里迷路了，四周都是高大的树木，我感到害怕和孤独。突然看到远处有一盏灯光。',
        emotions: ['害怕', '孤独', '希望'],
        recurring: true
      }
    },
    {
      name: '英文测试',
      params: {
        dream_description: 'I dreamed I was flying over mountains and oceans, feeling very free.',
        language: 'en'
      }
    },
    {
      name: '复杂梦境测试',
      params: {
        dream_description: '梦见回到了小时候的家，但房子里的布局都变了。我在找什么东西，但不记得是什么。遇到了已故的亲人，他们对我微笑。醒来后感觉很温暖。',
        emotions: ['怀念', '困惑', '温暖']
      }
    }
  ];

  for (const testCase of testCases) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📋 测试: ${testCase.name}`);
    console.log(`${'='.repeat(60)}\n`);

    try {
      const response = await fetch(`${baseURL}/api/divination`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tool: 'interpret_dream',
          args: testCase.params
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ API 调用成功\n');

      // 解析返回的 JSON 字符串
      let dreamResult;
      try {
        dreamResult = JSON.parse(result.content[0].text);
      } catch (e) {
        console.log('⚠️  返回不是标准 JSON，尝试直接使用:', result);
        dreamResult = result;
      }

      // 检查返回结果的结构
      console.log('📊 返回结构检查:');
      console.log(`   - dream: ${dreamResult.dream ? '✓' : '✗'}`);
      console.log(`   - emotions: ${dreamResult.emotions ? '✓' : '✗'}`);
      console.log(`   - recurring: ${typeof dreamResult.recurring !== 'undefined' ? '✓' : '✗'}`);
      console.log(`   - interpretation: ${dreamResult.interpretation ? '✓' : '✗'}`);
      console.log(`   - symbols: ${dreamResult.symbols ? '✓' : '✗'}`);
      console.log(`   - psychological_insights: ${dreamResult.psychological_insights ? '✓' : '✗'}`);
      console.log(`   - timestamp: ${dreamResult.timestamp ? '✓' : '✗'}`);

      // 显示解析内容（前 500 字符）
      if (dreamResult.interpretation) {
        console.log('\n💭 解析内容预览:');
        const preview = dreamResult.interpretation.substring(0, 500);
        console.log(preview);
        if (dreamResult.interpretation.length > 500) {
          console.log(`\n   ...(共 ${dreamResult.interpretation.length} 字符)`);
        }
      }

      // 显示符号信息
      if (dreamResult.symbols && dreamResult.symbols.length > 0) {
        console.log('\n🔮 识别的符号:');
        dreamResult.symbols.slice(0, 3).forEach(symbol => {
          console.log(`   • ${symbol.symbol}: ${symbol.meaning.substring(0, 50)}...`);
        });
        if (dreamResult.symbols.length > 3) {
          console.log(`   ...(共 ${dreamResult.symbols.length} 个符号)`);
        }
      }

      // 检查潜在问题
      console.log('\n🔍 问题检查:');
      const issues = [];
      
      if (!dreamResult.interpretation || dreamResult.interpretation.length < 50) {
        issues.push('解析内容过短或缺失');
      }
      
      if (!dreamResult.symbols || dreamResult.symbols.length === 0) {
        issues.push('未识别到梦境符号');
      }
      
      if (dreamResult.interpretation && dreamResult.interpretation.includes('无法生成解析')) {
        issues.push('解析失败或使用默认回复');
      }

      if (issues.length > 0) {
        console.log('   ⚠️  发现问题:');
        issues.forEach(issue => console.log(`      - ${issue}`));
      } else {
        console.log('   ✅ 未发现明显问题');
      }

    } catch (error) {
      console.log(`❌ 测试失败: ${error.message}`);
      console.log('详细错误:', error);
    }

    // 等待一下，避免请求过快
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log('🎉 所有测试完成！');
  console.log(`${'='.repeat(60)}\n`);
}

// 运行测试
testDreamInterpretation().catch(console.error);
