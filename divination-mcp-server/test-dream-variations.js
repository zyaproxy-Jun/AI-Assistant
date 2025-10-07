/**
 * 测试多个不同梦境是否返回不同结果
 */

const testCases = [
  {
    name: "测试1：飞翔梦境",
    dream_description: "我梦见自己在飞翔，飞过高山和海洋，感觉很自由。",
    emotions: ["自由", "兴奋"],
    recurring: false
  },
  {
    name: "测试2：追赶梦境",
    dream_description: "我被一个陌生人追赶，跑得很快但总是甩不掉他，心里很害怕。",
    emotions: ["恐惧", "焦虑"],
    recurring: true
  },
  {
    name: "测试3：考试梦境",
    dream_description: "我在学校考试，但完全没有准备，看着试卷一片空白，感到非常紧张。",
    emotions: ["紧张", "焦虑", "无助"],
    recurring: false
  },
  {
    name: "测试4：水中梦境",
    dream_description: "我在大海里游泳，海水很深，有时候感觉要沉下去，又奋力游回水面。",
    emotions: ["挣扎", "不安"],
    recurring: false
  },
  {
    name: "测试5：家人梦境",
    dream_description: "我梦见已故的奶奶，她坐在老房子里对我微笑，我感到很温暖也很难过。",
    emotions: ["温暖", "悲伤", "怀念"],
    recurring: false
  }
];

async function testDream(testCase) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🧪 ${testCase.name}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`梦境: ${testCase.dream_description}`);
  console.log(`情绪: ${testCase.emotions.join('、')}`);
  console.log(`重复: ${testCase.recurring ? '是' : '否'}`);
  console.log(`\n⏳ 正在解析...`);

  try {
    const response = await fetch('http://localhost:3000/api/dream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dream_description: testCase.dream_description,
        emotions: testCase.emotions,
        recurring: testCase.recurring,
        language: 'zh-CN'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`\n❌ HTTP 错误 ${response.status}:`);
      console.log(errorText);
      return null;
    }

    const data = await response.json();
    
    // 解析响应（API 直接返回结果）
    let result;
    if (data.content && data.content[0] && data.content[0].text) {
      // MCP 格式
      result = JSON.parse(data.content[0].text);
    } else if (data.error) {
      // 错误格式
      console.log(`\n❌ API 错误: ${data.error}`);
      return null;
    } else {
      // 直接结果
      result = data;
    }

    console.log(`\n✅ 解析成功！`);
    
    // 关键指标检查
    console.log(`\n📊 关键指标:`);
    console.log(`   • dream 字段: ${result.dream ? '✓' : '✗'}`);
    console.log(`   • 字符数: ${result.dream ? result.dream.length : 0}`);
    console.log(`   • emotions: ${JSON.stringify(result.emotions)}`);
    console.log(`   • symbols 数量: ${result.symbols ? result.symbols.length : 0}`);
    
    if (result.symbols && result.symbols.length > 0) {
      console.log(`\n🔮 识别的符号:`);
      result.symbols.forEach(symbol => {
        console.log(`   • ${symbol.symbol}: ${symbol.meaning.substring(0, 30)}...`);
      });
    }
    
    console.log(`\n💭 心理洞察片段:`);
    const insights = result.psychological_insights || result.interpretation || '无';
    console.log(`   ${insights.substring(0, 100)}...`);
    console.log(`   (总长度: ${insights.length} 字符)`);
    
    return result;

  } catch (error) {
    console.log(`\n❌ 错误: ${error.message}`);
    return null;
  }
}

async function runAllTests() {
  console.log(`\n${'*'.repeat(60)}`);
  console.log(`   🔍 梦境解析多样性测试`);
  console.log(`   测试 ${testCases.length} 个不同梦境是否返回不同结果`);
  console.log(`${'*'.repeat(60)}\n`);

  const results = [];
  
  for (const testCase of testCases) {
    const result = await testDream(testCase);
    results.push({
      name: testCase.name,
      result: result,
      dreamText: testCase.dream_description
    });
    
    // 等待一下，避免请求过快
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // 对比分析
  console.log(`\n\n${'='.repeat(60)}`);
  console.log(`📊 对比分析`);
  console.log(`${'='.repeat(60)}`);

  // 检查 dream 字段是否都相同
  const dreamTexts = results.map(r => r.result?.dream).filter(Boolean);
  const uniqueDreamTexts = [...new Set(dreamTexts)];
  
  console.log(`\n1️⃣ dream 字段检查:`);
  console.log(`   总数: ${dreamTexts.length}`);
  console.log(`   唯一值: ${uniqueDreamTexts.length}`);
  if (uniqueDreamTexts.length === 1) {
    console.log(`   ❌ 所有梦境的 dream 字段都相同！`);
    console.log(`   值: "${uniqueDreamTexts[0].substring(0, 50)}..."`);
  } else {
    console.log(`   ✅ dream 字段各不相同`);
  }

  // 检查 symbols 是否都相同
  const symbolsArrays = results.map(r => {
    if (!r.result?.symbols) return [];
    return r.result.symbols.map(s => s.symbol).sort().join(',');
  }).filter(s => s.length > 0);
  const uniqueSymbols = [...new Set(symbolsArrays)];
  
  console.log(`\n2️⃣ symbols 字段检查:`);
  console.log(`   总数: ${symbolsArrays.length}`);
  console.log(`   唯一值: ${uniqueSymbols.length}`);
  if (uniqueSymbols.length === 1) {
    console.log(`   ❌ 所有梦境的 symbols 都相同！`);
    console.log(`   值: [${uniqueSymbols[0]}]`);
  } else if (uniqueSymbols.length === symbolsArrays.length) {
    console.log(`   ✅ 每个梦境的 symbols 都不同`);
    uniqueSymbols.forEach((symbols, idx) => {
      console.log(`      ${results[idx].name}: [${symbols}]`);
    });
  } else {
    console.log(`   ⚠️ 部分梦境的 symbols 相同`);
  }

  // 检查 psychological_insights 是否都相同
  const insights = results.map(r => r.result?.psychological_insights || r.result?.interpretation || '').filter(Boolean);
  const uniqueInsights = [...new Set(insights)];
  
  console.log(`\n3️⃣ psychological_insights 检查:`);
  console.log(`   总数: ${insights.length}`);
  console.log(`   唯一值: ${uniqueInsights.length}`);
  if (uniqueInsights.length === 1) {
    console.log(`   ❌ 所有梦境的心理洞察都相同！`);
    console.log(`   前100字符: "${uniqueInsights[0].substring(0, 100)}..."`);
  } else if (uniqueInsights.length === insights.length) {
    console.log(`   ✅ 每个梦境的心理洞察都不同`);
  } else {
    console.log(`   ⚠️ 部分梦境的心理洞察相同`);
  }

  // 最终诊断
  console.log(`\n\n${'='.repeat(60)}`);
  console.log(`🎯 最终诊断`);
  console.log(`${'='.repeat(60)}`);

  const allDreamsSame = uniqueDreamTexts.length === 1;
  const allSymbolsSame = uniqueSymbols.length === 1;
  const allInsightsSame = uniqueInsights.length === 1;

  if (allDreamsSame || allSymbolsSame || allInsightsSame) {
    console.log(`\n❌ 发现问题！`);
    if (allDreamsSame) {
      console.log(`   • dream 字段：所有梦境都返回相同内容`);
      console.log(`     → 可能原因：参数未正确传递到服务`);
    }
    if (allSymbolsSame) {
      console.log(`   • symbols 字段：所有梦境都返回相同符号`);
      console.log(`     → 可能原因：符号提取逻辑未从梦境描述中读取`);
    }
    if (allInsightsSame) {
      console.log(`   • psychological_insights：所有梦境都返回相同洞察`);
      console.log(`     → 可能原因：洞察生成未使用梦境内容`);
    }
  } else {
    console.log(`\n✅ 一切正常！`);
    console.log(`   每个梦境都返回了独特的解析结果`);
  }

  console.log(`\n`);
}

// 运行测试
runAllTests().catch(console.error);
