/**
 * 详细错误测试
 */

const baseURL = 'http://localhost:3000';

async function testWithError() {
  console.log('🔍 测试并捕获详细错误...\n');

  try {
    const response = await fetch(`${baseURL}/api/divination`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tool: 'interpret_dream',
        args: {
          dream_description: '我梦见自己在飞翔',
          emotions: ['开心'],
          recurring: false
        }
      })
    });

    console.log('HTTP Status:', response.status);
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

    const text = await response.text();
    console.log('\n响应内容:');
    console.log(text);

    if (!response.ok) {
      console.log('\n❌ 请求失败');
      try {
        const errorJson = JSON.parse(text);
        console.log('错误详情:', JSON.stringify(errorJson, null, 2));
      } catch (e) {
        console.log('无法解析错误 JSON');
      }
    } else {
      const result = JSON.parse(text);
      console.log('\n✅ 请求成功');
      console.log('返回结果:', JSON.stringify(result, null, 2));
    }

  } catch (error) {
    console.log('❌ 异常:', error.message);
    console.log('详情:', error);
  }
}

testWithError().catch(console.error);
