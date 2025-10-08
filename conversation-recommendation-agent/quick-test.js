/**
 * 快速测试脚本 - 测试完整流程
 * 运行: node quick-test.js
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:4000';

// 测试数据
const testCases = [
  {
    name: '解梦占卜',
    type: 'dream',
    parameters: {
      dream_description: '我梦见自己在飞翔，飞过高山和大海，感觉非常自由快乐',
      emotions: ['快乐', '兴奋']
    }
  },
  {
    name: '塔罗占卜',
    type: 'tarot',
    parameters: {
      question: '我的事业发展如何？',
      spread: 'three'
    }
  },
  {
    name: '易经占卜',
    type: 'iching',
    parameters: {
      question: '这个决定是否正确？',
      method: 'coins'
    }
  }
];

async function testHealthCheck() {
  console.log('\n🔍 测试 1: 健康检查');
  try {
    const response = await axios.get(`${BASE_URL}/health`);
    console.log('✅ 健康检查通过:', response.data);
    return true;
  } catch (error) {
    console.error('❌ 健康检查失败:', error.message);
    return false;
  }
}

async function testDivinationForm(type) {
  console.log(`\n🔍 测试 2: 获取占卜表单 (${type})`);
  try {
    const response = await axios.get(`${BASE_URL}/api/divination/forms/${type}`);
    console.log('✅ 表单获取成功');
    console.log(`   表单标题: ${response.data.form.title}`);
    console.log(`   字段数量: ${response.data.form.fields.length}`);
    return true;
  } catch (error) {
    console.error('❌ 表单获取失败:', error.message);
    return false;
  }
}

async function testFullFlow(testCase) {
  console.log(`\n🔍 测试 3: 完整流程 - ${testCase.name}`);
  try {
    const response = await axios.post(`${BASE_URL}/api/test/full-flow`, {
      type: testCase.type,
      parameters: testCase.parameters,
      userId: 'test-user-001'
    });

    if (response.data.success) {
      console.log('✅ 完整流程测试通过');
      
      // 显示占卜结果
      const divResult = response.data.flow.step1_divination.result;
      console.log('\n   📍 步骤 1: 占卜结果');
      console.log(`      类型: ${divResult.type}`);
      console.log(`      主题: ${divResult.themes.join(', ')}`);
      console.log(`      情感: ${divResult.sentiment}`);
      console.log(`      置信度: ${(divResult.confidence * 100).toFixed(0)}%`);
      
      // 显示商品推荐
      const recommendations = response.data.flow.step2_products.recommendations;
      console.log('\n   📍 步骤 2: 商品推荐');
      console.log(`      推荐数量: ${recommendations.length}`);
      recommendations.forEach((rec, index) => {
        console.log(`      ${index + 1}. ${rec.product.name} (匹配度: ${(rec.matchScore * 100).toFixed(0)}%)`);
        console.log(`         理由: ${rec.matchReasons[0]}`);
      });
      
      return true;
    } else {
      console.error('❌ 流程测试失败:', response.data.error);
      return false;
    }
  } catch (error) {
    console.error('❌ 流程测试失败:', error.message);
    if (error.response) {
      console.error('   错误详情:', error.response.data);
    }
    return false;
  }
}

async function runAllTests() {
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║   对话与导购智能体 - 完整流程测试                      ║');
  console.log('╚══════════════════════════════════════════════════════╝');

  let passedTests = 0;
  let totalTests = 0;

  // 测试 1: 健康检查
  totalTests++;
  if (await testHealthCheck()) passedTests++;

  // 测试 2: 获取表单
  totalTests++;
  if (await testDivinationForm('dream')) passedTests++;

  // 测试 3: 完整流程测试 (选择第一个测试用例)
  totalTests++;
  if (await testFullFlow(testCases[0])) passedTests++;

  // 输出测试结果
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║   测试结果汇总                                        ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log(`\n✅ 通过: ${passedTests}/${totalTests}`);
  console.log(`❌ 失败: ${totalTests - passedTests}/${totalTests}`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 所有测试通过！系统运行正常！');
    process.exit(0);
  } else {
    console.log('\n⚠️  部分测试失败，请检查日志');
    process.exit(1);
  }
}

// 运行测试
console.log('⏳ 等待 2 秒，确保服务启动...\n');
setTimeout(runAllTests, 2000);
