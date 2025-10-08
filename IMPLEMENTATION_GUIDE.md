# 🚀 四智能体系统实施指南

## 📋 当前进度

### ✅ 已完成
1. **系统设计文档** - `FOUR_AGENTS_SYSTEM_REDESIGN.md`
2. **对话与导购智能体** - 基础目录结构创建
3. **占卜计算智能体** - `divination-mcp-server` (已存在，需重构)
4. **交易与订单智能体** - `transaction-order-agent` (已存在，已修复)
5. **交付、评价与分享智能体** - `fulfillment-review-agent` (已存在，需扩展)

### 🔄 需要执行的操作

## 第一步：完成对话与导购智能体

### 1.1 安装依赖
```powershell
cd C:\Users\HUAWEI\Desktop\AI-Assistant\conversation-recommendation-agent
npm install
```

### 1.2 创建核心服务文件

需要创建以下关键文件：

#### `src/services/mcp-client.ts`
- 连接到占卜计算智能体 (MCP Server)
- 调用占卜 API
- 处理响应和错误

#### `src/services/product-matcher.ts`
- 基于占卜结果匹配商品
- 实现智能匹配算法
- 计算匹配分数

#### `src/services/conversation-manager.ts`
- 管理多轮对话状态
- 收集用户输入参数
- 引导对话流程

#### `src/services/multimodal-renderer.ts`
- 渲染多模态内容
- 生成商品卡片
- 嵌入图像和动画

#### `src/actions/trigger-divination.ts`
- 触发占卜请求
- 验证参数
- 调用 MCP Server

#### `src/actions/match-products.ts`
- 执行商品匹配
- 返回推荐列表

#### `src/integration.definition.ts`
- Botpress 集成定义
- 使用 Zod schemas
- 定义 actions 和 channels

#### `src/index.ts`
- 主入口文件
- 导出 integration definition
- 注册 action handlers

### 1.3 商品数据
创建 `src/data/products.json` 包含商品列表

## 第二步：重构占卜计算智能体

### 2.1 当前状态
- 目录：`divination-mcp-server`
- 已有部分占卜功能实现
- 需要标准化为 MCP Server

### 2.2 需要添加的功能
1. **MCP 协议实现**
   - 实现标准 MCP 协议
   - 工具注册
   - 上下文管理

2. **多模态输出**
   - 集成图像生成 API (DALL-E/Midjourney)
   - 动画生成
   - 可视化渲染

3. **占卜引擎完善**
   - 确保 6 种占卜类型都完整实现
   - 优化算法
   - 提高准确性

### 2.3 API 端点标准化
```
POST /api/v1/divination/dream
POST /api/v1/divination/tarot
POST /api/v1/divination/iching
POST /api/v1/divination/ziwei
POST /api/v1/divination/bazi
POST /api/v1/divination/astrology
GET /api/v1/health
```

## 第三步：扩展交易与订单智能体

### 3.1 当前状态
- 目录：`transaction-order-agent`
- ✅ MongoDB 连接已修复
- ✅ 5 种支付网关已集成
- ✅ 订单管理已实现

### 3.2 需要添加的功能
1. **定制表单系统**
   ```typescript
   // src/routes/customization.ts
   POST /api/forms/customize
   - 收集用户定制需求
   - 验证表单数据
   - 计算价格
   ```

2. **从对话智能体接收数据**
   ```typescript
   // src/controllers/integration-controller.ts
   - 接收占卜上下文
   - 关联订单和占卜结果
   - 存储到 MongoDB
   ```

3. **商家通知系统**
   ```typescript
   // src/services/merchant-notification.ts
   - Webhook 通知
   - 邮件通知
   - 短信通知 (可选)
   ```

## 第四步：扩展交付、评价与分享智能体

### 4.1 当前状态
- 目录：`fulfillment-review-agent`
- 基础框架存在
- 需要添加核心功能

### 4.2 需要实现的功能

#### 1. 数字商品交付系统
```typescript
// src/services/digital-delivery.ts
export class DigitalDeliveryService {
  async sendDownloadLink(orderId: string, userEmail: string)
  async generateAccessCode(orderId: string)
  async trackDownloads(orderId: string)
}
```

#### 2. 物流追踪系统
```typescript
// src/services/logistics-tracker.ts
export class LogisticsTracker {
  async trackShipment(trackingNumber: string, carrier: string)
  async getDeliveryStatus(orderId: string)
  async notifyDeliveryUpdate(orderId: string, status: string)
}
```

#### 3. 评价系统
```typescript
// src/services/review-service.ts
export class ReviewService {
  async submitReview(review: Review)
  async getProductReviews(productId: string)
  async moderateReview(reviewId: string)
}
```

#### 4. 社交分享系统
```typescript
// src/services/social-renderer.ts
export class SocialShareRenderer {
  renderShareButtons(): HTML
  generateShareText(order: Order, product: Product): string
  // 只渲染 LOGO，不调用 API
}
```

#### 5. 社交媒体 LOGO 资源
需要准备 13 个社交媒体的 LOGO 图片：
```
src/assets/social-logos/
├── matrix.png
├── telegram.png
├── shorts-stack.png
├── tiktok.png
├── discord.png
├── discourse.png
├── reddit.png
├── twitter-x.png
├── facebook.png
├── youtube.png
├── pinterest.png
├── instagram.png
└── fiverr.png
```

## 第五步：智能体集成

### 5.1 数据流配置

#### MongoDB Collections
确保以下 collections 存在：
```javascript
// users collection
db.createCollection("users")

// products collection
db.createCollection("products")

// orders collection
db.createCollection("orders")

// reviews collection
db.createCollection("reviews")

// divination_history collection
db.createCollection("divination_history")
```

#### 导入初始数据
```powershell
# 导入商品数据
mongoimport --uri "mongodb://admin:admin123@localhost:27017/ether-ai?authSource=admin" --collection products --file products.json --jsonArray

# 导入测试用户
mongoimport --uri "mongodb://admin:admin123@localhost:27017/ether-ai?authSource=admin" --collection users --file test-users.json --jsonArray
```

### 5.2 智能体间通信

#### Event Bus (可选 - 使用 Redis 或 RabbitMQ)
```typescript
// 或者使用简单的 HTTP Webhook
interface AgentEvent {
  source: string // 'conversation' | 'divination' | 'transaction' | 'fulfillment'
  event: string // 'divination.completed' | 'payment.success' | 'delivery.completed'
  data: any
  timestamp: string
}
```

#### Webhook 配置
```typescript
// conversation-recommendation-agent
WEBHOOK_DIVINATION_COMPLETE=http://localhost:3001/webhooks/divination-complete

// transaction-order-agent
WEBHOOK_PAYMENT_SUCCESS=http://localhost:3003/webhooks/payment-success

// fulfillment-review-agent
WEBHOOK_DELIVERY_COMPLETE=http://localhost:3001/webhooks/delivery-complete
```

## 第六步：测试流程

### 6.1 单元测试
每个智能体都应有完整的单元测试：
```powershell
# 对话与导购智能体
cd conversation-recommendation-agent
npm test

# 占卜计算智能体
cd ../divination-mcp-server
npm test

# 交易与订单智能体
cd ../transaction-order-agent
npm test

# 交付、评价与分享智能体
cd ../fulfillment-review-agent
npm test
```

### 6.2 集成测试
创建端到端测试：
```javascript
// test-full-flow.js
describe('Complete User Journey', () => {
  it('should complete divination → recommendation → purchase → delivery → review flow', async () => {
    // 1. 用户选择占卜
    const divinationRequest = await conversation.triggerDivination(...)
    
    // 2. 获取占卜结果
    const divinationResult = await mcp.performDivination(...)
    
    // 3. 匹配商品
    const products = await conversation.matchProducts(divinationResult)
    
    // 4. 用户选择商品
    const order = await transaction.createOrder(...)
    
    // 5. 支付处理
    const payment = await transaction.processPayment(...)
    
    // 6. 交付商品
    const delivery = await fulfillment.deliverProduct(...)
    
    // 7. 用户评价
    const review = await fulfillment.submitReview(...)
    
    // 8. 社交分享
    const shareButtons = await fulfillment.renderSocialShare(...)
  })
})
```

### 6.3 性能测试
```javascript
// 测试并发占卜请求
// 测试支付高峰
// 测试数据库查询性能
```

## 第七步：部署

### 7.1 Docker Compose 配置
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:6.0
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: admin123
  
  mcp-server:
    build: ./divination-mcp-server
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://admin:admin123@mongodb:27017/ether-ai?authSource=admin
  
  conversation-agent:
    build: ./conversation-recommendation-agent
    ports:
      - "3001:3001"
    environment:
      - MCP_SERVER_URL=http://mcp-server:3000
      - MONGODB_URI=mongodb://admin:admin123@mongodb:27017/ether-ai?authSource=admin
  
  transaction-agent:
    build: ./transaction-order-agent
    ports:
      - "3002:3002"
    environment:
      - MONGODB_URI=mongodb://admin:admin123@mongodb:27017/ether-ai?authSource=admin
  
  fulfillment-agent:
    build: ./fulfillment-review-agent
    ports:
      - "3003:3003"
    environment:
      - MONGODB_URI=mongodb://admin:admin123@mongodb:27017/ether-ai?authSource=admin
```

### 7.2 启动命令
```powershell
# 使用 Docker Compose
docker-compose up -d

# 或者手动启动每个服务
cd divination-mcp-server
npm start

cd ../conversation-recommendation-agent
npm start

cd ../transaction-order-agent
npm start

cd ../fulfillment-review-agent
npm start
```

## 第八步：监控和维护

### 8.1 日志系统
- 使用 Winston 或 Bunyan
- 集中式日志收集 (ELK Stack)

### 8.2 监控指标
- 响应时间
- 错误率
- 占卜请求量
- 订单转化率
- 支付成功率

### 8.3 告警配置
- 服务宕机告警
- 支付失败告警
- 数据库连接告警

## 📝 快速开始清单

### 最小可行产品 (MVP) 实施顺序

1. ✅ **MongoDB 配置** (已完成)
2. ⏳ **占卜计算智能体 API 完善** (优先级：高)
3. ⏳ **对话与导购智能体核心功能** (优先级：高)
4. ✅ **交易与订单智能体基础功能** (已完成)
5. ⏳ **交付、评价与分享智能体核心功能** (优先级：中)
6. ⏳ **智能体集成和测试** (优先级：高)

### 本周任务
- [ ] 完成对话与导购智能体的 MCP Client
- [ ] 实现商品匹配算法
- [ ] 测试占卜 → 推荐流程
- [ ] 添加定制表单功能到交易智能体
- [ ] 实现基础的交付通知功能

### 下周任务
- [ ] 完善多模态渲染
- [ ] 集成图像生成 API
- [ ] 实现物流追踪
- [ ] 开发评价系统
- [ ] 设计社交分享界面

---

## 🎯 关键决策点

### 1. Botpress vs 自定义后端
**决策**: 对话与导购智能体使用 Botpress，其他使用 Express
**原因**: Botpress 专长于对话管理，其他智能体需要更灵活的 REST API

### 2. MCP 协议实现方式
**决策**: 占卜计算智能体同时提供 MCP 协议和 REST API
**原因**: MCP 用于高级上下文共享，REST API 用于简单的占卜请求

### 3. 商品匹配算法
**决策**: 基于主题和关键词的加权匹配 + 机器学习优化 (未来)
**原因**: 初期使用规则引擎快速实现，后期可升级为 ML 模型

### 4. 支付网关优先级
**决策**: Stripe (国际) > Alipay/WeChat (中国) > USDC (加密货币)
**原因**: 根据目标市场和用户群体逐步接入

### 5. 社交分享方式
**决策**: 只渲染 LOGO 按钮，生成分享文本，用户手动复制
**原因**: 避免 API 滥用和复杂的 OAuth 认证流程

---

## 📞 支持和联系

如有问题或需要帮助，请参考：
- 系统设计文档: `FOUR_AGENTS_SYSTEM_REDESIGN.md`
- 原三智能体设计: `THREE_AGENTS_SYSTEM_DESIGN.md`
- MongoDB 配置: `MONGODB_SETUP_COMPLETE.md`
- 测试指南: `TESTING_GUIDE.md`

---

*最后更新: 2025-10-08*  
*版本: v1.0*
