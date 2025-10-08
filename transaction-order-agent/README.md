# Transaction & Order Agent

交易与订单智能体 - 支持多网关支付和订单管理

## 核心功能

### 1. 多支付网关集成
- **Stripe** - 信用卡支付
- **PayPal** - PayPal 账户支付
- **Alipay** - 支付宝支付
- **WeChat Pay** - 微信支付
- **USDC** - 加密货币支付

### 2. 订单管理
- 订单创建和追踪
- 订单状态更新
- 订单历史查询
- MongoDB 数据持久化

### 3. 定制表单
- 实物商品定制（地址、尺寸、颜色等）
- 数字商品定制（邮箱、格式等）
- 表单验证和清洗

### 4. Webhook 系统
- 支付成功通知
- 商家通知
- 交付智能体触发
- 用户状态更新

### 5. Botpress 集成
- Botpress Actions
- Botpress Events
- 无缝对话流程

## 快速开始

### 安装依赖
```bash
npm install
```

### 配置环境
```bash
cp .env.example .env
# 编辑 .env 填入 API 密钥
```

### 构建项目
```bash
npm run build
```

### 启动服务
```bash
npm start
```

## API 端点

### POST /api/orders/create
创建订单

### POST /api/orders/:orderId/pay
处理支付

### GET /api/orders/:orderId/status
查询订单状态

### POST /api/webhooks/payment-success
支付成功 Webhook

### POST /api/webhooks/payment-failed
支付失败 Webhook

## 项目结构

```
transaction-order-agent/
├── src/
│   ├── index.ts                    # 主入口
│   ├── server.ts                   # Express Server
│   ├── botpress-integration/       # Botpress 集成
│   │   ├── integration.definition.ts
│   │   ├── actions/
│   │   │   ├── create-order.ts
│   │   │   ├── process-payment.ts
│   │   │   └── check-status.ts
│   │   └── events/
│   │       ├── payment-success.ts
│   │       └── payment-failed.ts
│   ├── payment/                    # 支付网关
│   │   ├── gateway-factory.ts
│   │   ├── stripe-gateway.ts
│   │   ├── paypal-gateway.ts
│   │   ├── alipay-gateway.ts
│   │   ├── wechat-gateway.ts
│   │   └── usdc-gateway.ts
│   ├── orders/                     # 订单管理
│   │   ├── order-service.ts
│   │   ├── order-model.ts
│   │   └── order-repository.ts
│   ├── forms/                      # 表单处理
│   │   ├── customization-form.ts
│   │   ├── validation.ts
│   │   └── sanitization.ts
│   ├── webhooks/                   # Webhook 处理
│   │   ├── webhook-manager.ts
│   │   ├── merchant-notifier.ts
│   │   └── fulfillment-trigger.ts
│   └── database/
│       ├── mongodb-client.ts
│       └── schemas/
│           ├── order.schema.ts
│           └── payment.schema.ts
```

## 集成到 Botpress

```typescript
// Botpress 调用创建订单
const result = await bp.actions.createOrder({
  userId: ctx.user.id,
  divinationResult: ctx.state.divinationResult,
  selectedProducts: ctx.state.selectedProducts,
  customization: ctx.state.customization
})

// 显示支付二维码
await ctx.send({
  type: 'image',
  imageUrl: result.qrCodeUrl,
  caption: '请扫码支付'
})
```

## 技术栈

- **Botpress SDK**: Integration & Extensions
- **Express**: HTTP API Server
- **MongoDB**: Database
- **Stripe**: Credit Card Payment
- **PayPal**: PayPal Payment
- **Alipay**: Alipay Payment
- **WeChat Pay**: WeChat Payment
- **Web3.js**: USDC Payment

## License

MIT
