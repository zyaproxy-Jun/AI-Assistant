# 三智能体系统测试指南

## 测试架构

```
测试流程
├── 1. 单元测试 (Unit Tests)
│   ├── 占卜引擎测试
│   ├── 支付网关测试
│   └── 评价系统测试
│
├── 2. 集成测试 (Integration Tests)
│   ├── MCP 协议通信测试
│   ├── 数据库操作测试
│   └── API 端点测试
│
├── 3. 端到端测试 (E2E Tests)
│   ├── 完整用户流程测试
│   ├── 多智能体协作测试
│   └── 异常场景测试
│
└── 4. 性能测试 (Performance Tests)
    ├── 负载测试
    ├── 压力测试
    └── 并发测试
```

## 测试准备

### 1. 安装测试工具
```bash
# 安装全局测试工具
npm install -g jest supertest artillery

# 进入项目目录安装测试依赖
cd fortune-telling-mcp-server
npm install --save-dev jest @types/jest supertest
```

### 2. 配置测试环境
```bash
# 创建测试环境配置
cp .env.example .env.test

# 编辑测试配置
nano .env.test

# 使用测试数据库
MONGODB_URI=mongodb://localhost:27017/divination-test
NODE_ENV=test
```

## 测试脚本

### 智能体 1: 占卜计算智能体测试

#### 创建测试文件: `test-fortune-telling.js`

```javascript
const axios = require('axios')

const API_BASE = 'http://localhost:3000'

async function testTarotReading() {
  console.log('\n🔮 测试塔罗牌占卜...')
  
  try {
    const response = await axios.post(`${API_BASE}/api/divination/tarot`, {
      question: '我的事业发展如何？',
      spread: 'three_card',
      output_format: ['text', 'image'],
      user_id: 'test_user_001'
    })

    console.log('✅ 塔罗牌占卜成功')
    console.log('结果:', JSON.stringify(response.data, null, 2))
    console.log('商品上下文:', response.data.context_for_products)
    
    return response.data
  } catch (error) {
    console.error('❌ 塔罗牌占卜失败:', error.message)
    throw error
  }
}

async function testAstrologyReading() {
  console.log('\n⭐ 测试星座占星...')
  
  try {
    const response = await axios.post(`${API_BASE}/api/divination/astrology`, {
      birth_date: '1990-05-15',
      birth_time: '14:30',
      location: {
        latitude: 39.9042,
        longitude: 116.4074,
        timezone: 'Asia/Shanghai'
      },
      output_format: ['text']
    })

    console.log('✅ 星座占星成功')
    console.log('结果:', JSON.stringify(response.data, null, 2))
    
    return response.data
  } catch (error) {
    console.error('❌ 星座占星失败:', error.message)
    throw error
  }
}

async function runTests() {
  console.log('🚀 开始测试占卜计算智能体\n')
  console.log('=''.repeat(60))

  try {
    // 测试健康检查
    console.log('\n❤️  测试健康检查...')
    const healthResponse = await axios.get(`${API_BASE}/health`)
    console.log('✅ 服务状态:', healthResponse.data.status)

    // 测试塔罗牌
    await testTarotReading()

    // 测试星座
    await testAstrologyReading()

    console.log('\n' + '='.repeat(60))
    console.log('🎉 所有测试通过!')
  } catch (error) {
    console.error('\n💥 测试失败:', error.message)
    process.exit(1)
  }
}

runTests()
```

#### 运行测试
```bash
cd fortune-telling-mcp-server
npm run api  # 先启动服务
node ../test-fortune-telling.js
```

### 智能体 2: 交易与订单智能体测试

#### 创建测试文件: `test-transaction-order.js`

```javascript
const axios = require('axios')

const API_BASE = 'http://localhost:3002'

async function testCreateOrder() {
  console.log('\n📝 测试创建订单...')
  
  try {
    const response = await axios.post(`${API_BASE}/api/orders/create`, {
      userId: 'test_user_001',
      userInfo: {
        name: '张三',
        email: 'zhangsan@example.com',
        phone: '13800138000'
      },
      divinationResult: {
        type: 'tarot',
        timestamp: new Date().toISOString(),
        data: {
          question: '我的事业发展如何？',
          cards: ['愚者', '魔术师', '女教皇']
        },
        interpretation: '你正处于新的开始阶段...'
      },
      selectedProducts: ['product_001'],
      customization: {
        productType: 'physical',
        physicalProduct: {
          deliveryAddress: {
            recipientName: '张三',
            phone: '13800138000',
            country: '中国',
            province: '北京市',
            city: '朝阳区',
            street: '建国路88号',
            postalCode: '100000'
          },
          deliveryMethod: 'express'
        }
      }
    })

    console.log('✅ 订单创建成功')
    console.log('订单号:', response.data.orderNumber)
    console.log('订单ID:', response.data.orderId)
    
    return response.data
  } catch (error) {
    console.error('❌ 订单创建失败:', error.response?.data || error.message)
    throw error
  }
}

async function testProcessPayment(orderId) {
  console.log('\n💳 测试支付处理...')
  
  try {
    const response = await axios.post(`${API_BASE}/api/orders/${orderId}/pay`, {
      gateway: 'alipay',
      returnUrl: 'https://example.com/success',
      cancelUrl: 'https://example.com/cancel'
    })

    console.log('✅ 支付创建成功')
    console.log('支付链接:', response.data.paymentUrl || response.data.qrCode)
    
    return response.data
  } catch (error) {
    console.error('❌ 支付处理失败:', error.response?.data || error.message)
    throw error
  }
}

async function testWebhook(orderId) {
  console.log('\n🔔 测试支付成功回调...')
  
  try {
    const response = await axios.post(`${API_BASE}/api/webhooks/payment-success`, {
      type: 'payment.success',
      timestamp: new Date().toISOString(),
      orderId: orderId,
      data: {
        transactionId: 'txn_' + Date.now(),
        amount: 199,
        currency: 'CNY',
        gateway: 'alipay'
      }
    })

    console.log('✅ Webhook 处理成功')
    console.log('结果:', response.data)
    
    return response.data
  } catch (error) {
    console.error('❌ Webhook 处理失败:', error.response?.data || error.message)
    throw error
  }
}

async function runTests() {
  console.log('🚀 开始测试交易与订单智能体\n')
  console.log('='.repeat(60))

  try {
    // 测试健康检查
    console.log('\n❤️  测试健康检查...')
    const healthResponse = await axios.get(`${API_BASE}/health`)
    console.log('✅ 服务状态:', healthResponse.data.status)

    // 创建订单
    const order = await testCreateOrder()

    // 处理支付
    await testProcessPayment(order.orderId)

    // 模拟 Webhook
    await testWebhook(order.orderId)

    console.log('\n' + '='.repeat(60))
    console.log('🎉 所有测试通过!')
  } catch (error) {
    console.error('\n💥 测试失败:', error.message)
    process.exit(1)
  }
}

runTests()
```

#### 运行测试
```bash
cd transaction-order-agent
npm start  # 先启动服务
node ../test-transaction-order.js
```

### 智能体 3: 交付评价分享智能体测试

#### 创建测试文件: `test-fulfillment-review.js`

```javascript
const axios = require('axios')

const API_BASE = 'http://localhost:3003'

async function testDigitalDelivery() {
  console.log('\n📧 测试数字商品交付...')
  
  try {
    const response = await axios.post(`${API_BASE}/api/fulfillment/digital`, {
      orderId: 'test_order_001',
      orderNumber: 'ORD20250101001',
      email: 'customer@example.com',
      productName: '数字占卜报告',
      fileFormat: 'pdf',
      fileSize: 2048000
    })

    console.log('✅ 数字商品交付成功')
    console.log('下载链接:', response.data.downloadLink)
    console.log('过期时间:', response.data.expiresAt)
    
    return response.data
  } catch (error) {
    console.error('❌ 数字商品交付失败:', error.response?.data || error.message)
    throw error
  }
}

async function testLogisticsTracking() {
  console.log('\n📦 测试物流追踪...')
  
  try {
    const response = await axios.get(`${API_BASE}/api/logistics/track/SF1234567890`)

    console.log('✅ 物流查询成功')
    console.log('状态:', response.data.status)
    console.log('当前位置:', response.data.currentLocation)
    console.log('预计送达:', response.data.estimatedDelivery)
    
    return response.data
  } catch (error) {
    console.error('❌ 物流查询失败:', error.response?.data || error.message)
    throw error
  }
}

async function testSubmitReview() {
  console.log('\n⭐ 测试提交评价...')
  
  try {
    const response = await axios.post(`${API_BASE}/api/reviews/submit`, {
      orderId: 'test_order_001',
      userId: 'test_user_001',
      rating: 5,
      categories: {
        productQuality: 5,
        divinationAccuracy: 5,
        serviceAttitude: 5,
        deliverySpeed: 4
      },
      comment: '非常准确的占卜，商品质量也很好！物流速度快，包装精美。强烈推荐！',
      tags: ['准确', '专业', '快速'],
      images: ['https://example.com/image1.jpg'],
      isAnonymous: false,
      isPublic: true
    })

    console.log('✅ 评价提交成功')
    console.log('评价ID:', response.data._id)
    console.log('获得积分:', response.data.rewardPoints + response.data.bonusPoints)
    
    return response.data
  } catch (error) {
    console.error('❌ 评价提交失败:', error.response?.data || error.message)
    throw error
  }
}

async function testSharingPlatforms() {
  console.log('\n📱 测试社交分享平台...')
  
  try {
    const response = await axios.get(`${API_BASE}/api/sharing/platforms`, {
      params: {
        orderId: 'test_order_001',
        orderNumber: 'ORD20250101001'
      }
    })

    console.log('✅ 分享平台获取成功')
    console.log('平台数量:', response.data.platforms.length)
    response.data.platforms.slice(0, 3).forEach(platform => {
      console.log(`  - ${platform.name}: ${platform.shareUrl}`)
    })
    
    return response.data
  } catch (error) {
    console.error('❌ 分享平台获取失败:', error.response?.data || error.message)
    throw error
  }
}

async function runTests() {
  console.log('🚀 开始测试交付评价分享智能体\n')
  console.log('='.repeat(60))

  try {
    // 测试健康检查
    console.log('\n❤️  测试健康检查...')
    const healthResponse = await axios.get(`${API_BASE}/health`)
    console.log('✅ 服务状态:', healthResponse.data.status)

    // 数字商品交付
    await testDigitalDelivery()

    // 物流追踪
    await testLogisticsTracking()

    // 提交评价
    await testSubmitReview()

    // 社交分享
    await testSharingPlatforms()

    console.log('\n' + '='.repeat(60))
    console.log('🎉 所有测试通过!')
  } catch (error) {
    console.error('\n💥 测试失败:', error.message)
    process.exit(1)
  }
}

runTests()
```

#### 运行测试
```bash
cd fulfillment-review-agent
npm start  # 先启动服务
node ../test-fulfillment-review.js
```

## 端到端测试

### 完整用户流程测试

#### 创建测试文件: `test-e2e-flow.js`

```javascript
const axios = require('axios')

// 配置 API 端点
const FORTUNE_API = 'http://localhost:3000'
const TRANSACTION_API = 'http://localhost:3002'
const FULFILLMENT_API = 'http://localhost:3003'

async function runE2ETest() {
  console.log('🚀 开始端到端测试\n')
  console.log('=''.repeat(80))

  try {
    // 步骤 1: 用户请求占卜
    console.log('\n📖 步骤 1: 用户请求塔罗牌占卜')
    const divinationResponse = await axios.post(`${FORTUNE_API}/api/divination/tarot`, {
      question: '我的感情运势如何？',
      spread: 'three_card',
      user_id: 'e2e_test_user'
    })
    console.log('✅ 占卜完成')
    console.log('商品推荐关键词:', divinationResponse.data.context_for_products.keywords.slice(0, 5))

    // 步骤 2: 创建订单
    console.log('\n🛒 步骤 2: 基于占卜结果推荐商品，用户下单')
    const orderResponse = await axios.post(`${TRANSACTION_API}/api/orders/create`, {
      userId: 'e2e_test_user',
      userInfo: {
        name: '李四',
        email: 'lisi@example.com',
        phone: '13900139000'
      },
      divinationResult: divinationResponse.data,
      selectedProducts: ['product_002'],
      customization: {
        productType: 'physical',
        physicalProduct: {
          deliveryAddress: {
            recipientName: '李四',
            phone: '13900139000',
            country: '中国',
            province: '上海市',
            city: '浦东新区',
            street: '世纪大道123号',
            postalCode: '200120'
          },
          deliveryMethod: 'express'
        }
      }
    })
    console.log('✅ 订单创建成功:', orderResponse.data.orderNumber)

    // 步骤 3: 处理支付
    console.log('\n💳 步骤 3: 用户支付订单')
    const paymentResponse = await axios.post(
      `${TRANSACTION_API}/api/orders/${orderResponse.data.orderId}/pay`,
      {
        gateway: 'wechat',
        returnUrl: 'https://example.com/success'
      }
    )
    console.log('✅ 支付链接生成:', paymentResponse.data.qrCode ? '微信支付二维码' : paymentResponse.data.paymentUrl)

    // 模拟支付成功回调
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('\n🔔 步骤 4: 支付成功，触发 Webhook')
    const webhookResponse = await axios.post(`${TRANSACTION_API}/api/webhooks/payment-success`, {
      type: 'payment.success',
      timestamp: new Date().toISOString(),
      orderId: orderResponse.data.orderId,
      data: {
        transactionId: 'wxpay_' + Date.now(),
        amount: 299,
        currency: 'CNY',
        gateway: 'wechat'
      }
    })
    console.log('✅ Webhook 处理完成，订单状态已更新')

    // 步骤 5: 触发交付
    console.log('\n📦 步骤 5: 商家发货，开始物流追踪')
    const fulfillmentResponse = await axios.post(`${FULFILLMENT_API}/api/fulfillment/physical`, {
      orderId: orderResponse.data.orderId,
      orderNumber: orderResponse.data.orderNumber,
      trackingNumber: 'SF' + Date.now(),
      provider: 'sf',
      recipientName: '李四',
      deliveryAddress: '上海市浦东新区世纪大道123号'
    })
    console.log('✅ 物流追踪已启动:', fulfillmentResponse.data.trackingNumber)

    // 步骤 6: 用户确认收货
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('\n📨 步骤 6: 用户确认收货')

    // 步骤 7: 提交评价
    console.log('\n⭐ 步骤 7: 用户提交评价')
    const reviewResponse = await axios.post(`${FULFILLMENT_API}/api/reviews/submit`, {
      orderId: orderResponse.data.orderId,
      userId: 'e2e_test_user',
      rating: 5,
      categories: {
        productQuality: 5,
        divinationAccuracy: 5,
        serviceAttitude: 5,
        deliverySpeed: 4
      },
      comment: '占卜非常准确，商品也很精美！整体体验非常好！',
      tags: ['准确', '精美', '专业'],
      images: ['https://example.com/review1.jpg']
    })
    console.log('✅ 评价提交成功，获得积分:', reviewResponse.data.rewardPoints + reviewResponse.data.bonusPoints)

    // 步骤 8: 社交分享
    console.log('\n📱 步骤 8: 引导用户分享到社交媒体')
    const sharingResponse = await axios.get(`${FULFILLMENT_API}/api/sharing/platforms`, {
      params: {
        orderId: orderResponse.data.orderId,
        orderNumber: orderResponse.data.orderNumber
      }
    })
    console.log('✅ 分享选项已生成，支持', sharingResponse.data.platforms.length, '个平台')

    console.log('\n' + '='.repeat(80))
    console.log('🎉 端到端测试完成！所有流程正常！')
    console.log('\n流程总结:')
    console.log('1. ✅ 占卜计算')
    console.log('2. ✅ 商品推荐')
    console.log('3. ✅ 创建订单')
    console.log('4. ✅ 支付处理')
    console.log('5. ✅ Webhook 回调')
    console.log('6. ✅ 商品交付')
    console.log('7. ✅ 用户评价')
    console.log('8. ✅ 社交分享')

  } catch (error) {
    console.error('\n💥 测试失败:', error.message)
    if (error.response) {
      console.error('错误详情:', error.response.data)
    }
    process.exit(1)
  }
}

runE2ETest()
```

#### 运行端到端测试
```bash
# 确保三个服务都已启动
# 终端 1
cd fortune-telling-mcp-server && npm run api

# 终端 2
cd transaction-order-agent && npm start

# 终端 3
cd fulfillment-review-agent && npm start

# 终端 4 - 运行测试
node test-e2e-flow.js
```

## 性能测试

### 使用 Artillery 进行负载测试

#### 创建测试配置: `load-test.yml`

```yaml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10
      name: "Warm up"
    - duration: 120
      arrivalRate: 50
      name: "Sustained load"
    - duration: 60
      arrivalRate: 100
      name: "Peak load"
  defaults:
    headers:
      Content-Type: 'application/json'

scenarios:
  - name: "Tarot Reading"
    flow:
      - post:
          url: "/api/divination/tarot"
          json:
            question: "我的未来如何？"
            spread: "three_card"
            user_id: "load_test_user"
```

#### 运行负载测试
```bash
artillery run load-test.yml
```

## 测试总结

创建一个测试总结脚本 `run-all-tests.sh`:

```bash
#!/bin/bash

echo "🚀 开始运行所有测试..."
echo "=================================="

# 测试智能体 1
echo "\n📊 测试占卜计算智能体..."
node test-fortune-telling.js
if [ $? -ne 0 ]; then
    echo "❌ 占卜智能体测试失败"
    exit 1
fi

# 测试智能体 2
echo "\n📊 测试交易订单智能体..."
node test-transaction-order.js
if [ $? -ne 0 ]; then
    echo "❌ 交易智能体测试失败"
    exit 1
fi

# 测试智能体 3
echo "\n📊 测试交付评价智能体..."
node test-fulfillment-review.js
if [ $? -ne 0 ]; then
    echo "❌ 交付智能体测试失败"
    exit 1
fi

# 端到端测试
echo "\n📊 运行端到端测试..."
node test-e2e-flow.js
if [ $? -ne 0 ]; then
    echo "❌ 端到端测试失败"
    exit 1
fi

echo "\n=================================="
echo "🎉 所有测试通过！"
```

```bash
chmod +x run-all-tests.sh
./run-all-tests.sh
```

## 持续集成

### GitHub Actions 配置

创建 `.github/workflows/test.yml`:

```yaml
name: Test Three Agents

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:6.0
        ports:
          - 27017:27017

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies (Fortune Telling)
        working-directory: ./fortune-telling-mcp-server
        run: npm ci
      
      - name: Build Fortune Telling
        working-directory: ./fortune-telling-mcp-server
        run: npm run build
      
      - name: Test Fortune Telling
        working-directory: ./fortune-telling-mcp-server
        run: npm test
      
      - name: Install dependencies (Transaction)
        working-directory: ./transaction-order-agent
        run: npm ci
      
      - name: Build Transaction
        working-directory: ./transaction-order-agent
        run: npm run build
      
      - name: Test Transaction
        working-directory: ./transaction-order-agent
        run: npm test
      
      - name: Install dependencies (Fulfillment)
        working-directory: ./fulfillment-review-agent
        run: npm ci
      
      - name: Build Fulfillment
        working-directory: ./fulfillment-review-agent
        run: npm run build
      
      - name: Test Fulfillment
        working-directory: ./fulfillment-review-agent
        run: npm test
```

---

测试愉快！🎉
