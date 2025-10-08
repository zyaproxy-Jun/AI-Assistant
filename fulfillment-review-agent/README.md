# Fulfillment, Review & Sharing Agent

交付、评价与分享智能体 - 处理订单交付、评价收集和社交分享

## 核心功能

### 1. 交付管理
- **数字商品交付**: 自动生成下载链接，邮件发送
- **实物商品交付**: 通知商家发货，追踪物流

### 2. 物流追踪集成
支持 8 家主流快递公司：
- 顺丰速运 (SF Express)
- EMS
- 圆通速递 (YTO)
- 中通快递 (ZTO)
- 申通快递 (STO)
- FedEx
- UPS
- DHL

### 3. 评价系统
- 多维度评分（商品质量、占卜准确度、服务态度、配送速度）
- 评论和图片上传
- 匿名评价支持
- 评价奖励机制

### 4. 社交分享系统
支持 13 个社交平台（仅显示 LOGO，引导用户手动分享）：
- Matrix
- Telegram
- Shorts-Stack
- TikTok
- Discord
- Discourse
- Reddit
- X (Twitter)
- Facebook
- YouTube
- Pinterest
- Instagram
- Fiverr

### 5. Botpress 集成
- Botpress Extension
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

### POST /api/fulfillment/trigger
触发交付流程

### POST /api/fulfillment/digital
数字商品交付

### POST /api/fulfillment/physical
实物商品交付

### GET /api/logistics/track/:trackingNumber
查询物流状态

### POST /api/reviews/submit
提交评价

### GET /api/sharing/platforms
获取分享平台列表

## 项目结构

```
fulfillment-review-agent/
├── src/
│   ├── index.ts                    # 主入口
│   ├── botpress-extension/         # Botpress 扩展
│   │   ├── extension.definition.ts
│   │   ├── actions/
│   │   │   ├── deliver-product.ts
│   │   │   ├── track-shipment.ts
│   │   │   ├── submit-review.ts
│   │   │   └── share-experience.ts
│   │   └── flows/
│   │       ├── delivery-flow.json
│   │       ├── review-flow.json
│   │       └── sharing-flow.json
│   ├── fulfillment/                # 交付管理
│   │   ├── fulfillment-manager.ts
│   │   ├── digital-delivery.ts
│   │   └── physical-delivery.ts
│   ├── logistics/                  # 物流追踪
│   │   ├── logistics-tracker.ts
│   │   ├── providers/
│   │   │   ├── sf-express.ts
│   │   │   ├── fedex.ts
│   │   │   └── ...
│   │   └── tracking-service.ts
│   ├── review/                     # 评价系统
│   │   ├── review-manager.ts
│   │   ├── review-model.ts
│   │   └── reward-system.ts
│   ├── sharing/                    # 分享系统
│   │   ├── sharing-manager.ts
│   │   ├── platform-configs.ts
│   │   └── link-generator.ts
│   └── database/
│       └── models/
└── assets/
    └── logos/                      # 社交平台 LOGO
        ├── matrix.svg
        ├── telegram.svg
        ├── tiktok.svg
        └── ...
```

## 集成到 Botpress

```typescript
// Botpress 调用交付
await bp.actions.deliverProduct({
  orderId: ctx.state.orderId,
  orderType: 'digital'
})

// 显示物流追踪
const tracking = await bp.actions.trackShipment({
  trackingNumber: ctx.state.trackingNumber
})

// 引导评价
await bp.actions.submitReview({
  orderId: ctx.state.orderId,
  rating: 5
})

// 显示分享面板
await bp.actions.shareExperience({
  orderId: ctx.state.orderId
})
```

## 技术栈

- **Botpress SDK**: Extension Module
- **Express**: HTTP API Server
- **MongoDB**: Database
- **Nodemailer**: Email Delivery
- **Axios**: HTTP Client for Logistics APIs

## License

MIT
