# 🌟 Ether AI Assistant - 四智能体系统重新设计

## 📋 系统架构总览

本文档详细描述了基于用户需求的四智能体系统重新设计方案。

### 🎯 核心智能体

1. **对话与导购智能体** (Conversation & Recommendation Agent)
2. **占卜计算智能体** (Fortune-Telling Computation Agent)
3. **交易与订单智能体** (Transaction & Order Management Agent)
4. **交付、评价与分享智能体** (Fulfillment, Review & Sharing Agent)

---

## 🔄 核心功能流程总览

### 完整用户旅程 (6个核心流程)

#### 🎯 流程 1: 占卜触发与结果展示
```
用户点击 Ether 前端 UI 6个占卜按钮
    ↓
深度对话收集参数
    ↓
触发占卜请求
    ↓
映射到 MCP Server 中 6 种对应的占卜方式
    ↓
多模态展示占卜结果 (文本 + 图像 + 动画)
```

**6种占卜方式**:
1. 🌙 解梦 (Dream Interpretation)
2. 🃏 塔罗牌 (Tarot Reading)
3. 📿 易经 (I-Ching)
4. ⭐ 紫微斗数 (Ziwei Doushu)
5. 🎋 八字 (BaZi/Four Pillars)
6. 🌌 西方占星 (Western Astrology)

**涉及智能体**: 对话与导购智能体 + 占卜计算智能体

---

#### 🛍️ 流程 2: 智能商品匹配与推荐
```
占卜结果 (包含主题、关键词、情感分析)
    ↓
智能匹配算法计算
    ↓
匹配实物商品 + 数字商品
    ↓
生成超高商业转化的商品详情页
    ↓
用户浏览并选择商品
```

**商品类型**:
- 实物商品: 水晶、塔罗牌、饰品、书籍等
- 数字商品: 电子书、在线课程、定制报告、会员服务等

**商品详情页特色**:
- 多模态展示 (图片轮播、视频介绍)
- 基于占卜结果的个性化推荐理由
- 用户评价和案例展示
- 实时库存和优惠信息
- 一键加入购物车

**涉及智能体**: 对话与导购智能体

---

#### 📝 流程 3: 定制表单与支付
```
用户选择商品
    ↓
生成定制表单 (根据商品类型)
    ↓
用户填写定制表单
    - 实物商品: 收货地址、联系方式、定制需求
    - 数字商品: 邮箱、定制参数、使用场景
    ↓
选择支付方式 (5种支付网关)
    ↓
支付处理
```

**5种支付网关**:
1. 💳 Stripe (国际信用卡)
2. 🅿️ PayPal (国际支付)
3. 🇨🇳 支付宝 (Alipay)
4. 💬 微信支付 (WeChat Pay)
5. 💰 USDC (加密货币)

**涉及智能体**: 交易与订单智能体

---

#### ✅ 流程 4: 订单处理与商家通知
```
支付成功
    ↓
生成订单号
    ↓
订单信息入库 (MongoDB)
    ↓
发送商家通知
    - Webhook 通知
    - 邮件通知
    - 短信通知 (可选)
    ↓
向用户反馈订单状态
```

**订单信息包含**:
- 订单号、用户信息、商品信息
- 支付金额、支付方式、支付时间
- 关联的占卜结果 (用于个性化服务)
- 定制需求详情
- 交付地址 (实物) 或联系方式 (数字)

**涉及智能体**: 交易与订单智能体

---

#### 📦 流程 5: 商品交付与用户评价
```
订单完成信号触发
    ↓
商品类型判断
    ↓
数字商品: 发送下载链接/访问码到邮箱
    ↓
实物商品: 物流追踪 (顺丰、DHL、FedEx)
    ↓
用户确认收货
    ↓
引导填写评价表单
    - 星级评分 (1-5星)
    - 文字评价
    - 图片上传 (可选)
```

**物流追踪功能**:
- 实时查询物流状态
- 预计送达时间
- 物流轨迹展示
- 异常情况通知

**涉及智能体**: 交付、评价与分享智能体

---

#### 🌐 流程 6: 评价提交与社交分享
```
用户确认收货
    ↓
提交评价 (存入 MongoDB)
    ↓
显示 13 种社交媒体 LOGO 分享按钮
    ↓
用户选择分享平台
    ↓
生成分享文本和图片
    ↓
用户手动复制分享 (避免 API 滥用)
```

**13种社交媒体平台**:
1. 🔷 Matrix
2. ✈️ Telegram
3. 📹 Shorts-Stack
4. 🎵 TikTok
5. 💬 Discord
6. 💭 Discourse
7. 🔴 Reddit
8. ❌ X (Twitter)
9. 📘 Facebook
10. ▶️ YouTube
11. 📌 Pinterest
12. 📷 Instagram
13. 💼 Fiverr

**分享内容示例**:
```
🌟 我在 Ether AI Assistant 完成了 [占卜类型] 占卜！
✨ 获得了 [商品名称]，体验超棒！
🔮 推荐指数: ⭐⭐⭐⭐⭐
👉 点击了解更多: [分享链接]
```

**涉及智能体**: 交付、评价与分享智能体

---

## 1️⃣ 对话与导购智能体 (Conversation & Recommendation Agent)

### 🔧 技术栈
- **主框架**: Botpress v12+
- **集成**: MCP Server API
- **多模态**: 支持文本、图像、卡片、轮播
- **数据库**: MongoDB (商品数据)

### 📌 核心职责

#### 流程 1: 深度沟通与占卜触发
```
用户点击智能体 → 深度对话 → 触发占卜 → 路由到 MCP Server → 获取结果 → 多模态展示
```

**实现要点**:
- 用户意图识别 (NLU)
- 占卜类型选择界面
- 参数收集 (生辰、问题等)
- 调用 MCP Server API
- 结果渲染 (文本 + 图像)

#### 流程 2: 商品匹配与推荐
```
占卜结果 → 内部逻辑匹配 → 查询商品数据库 → 生成多模态商品页 → 多轮深度沟通
```

**实现要点**:
- 基于占卜结果的智能匹配算法
- 商品详情页生成 (实物/数字定制)
- 图像化商品展示
- 聊天中嵌入商品图片
- 支持多轮对话辅助选择

### 📁 文件结构
```
conversation-recommendation-agent/
├── src/
│   ├── index.ts                          # Botpress 主入口
│   ├── integration.definition.ts         # 集成定义
│   ├── flows/
│   │   ├── divination-flow.json         # 占卜流程
│   │   ├── recommendation-flow.json     # 推荐流程
│   │   └── conversation-flow.json       # 对话流程
│   ├── actions/
│   │   ├── trigger-divination.ts        # 触发占卜
│   │   ├── fetch-divination-result.ts   # 获取占卜结果
│   │   ├── match-products.ts            # 匹配商品
│   │   ├── render-product-page.ts       # 渲染商品页
│   │   └── handle-conversation.ts       # 处理多轮对话
│   ├── services/
│   │   ├── mcp-client.ts                # MCP Server 客户端
│   │   ├── product-matcher.ts           # 商品匹配引擎
│   │   ├── multimodal-renderer.ts       # 多模态渲染
│   │   └── conversation-manager.ts      # 对话管理
│   ├── types/
│   │   ├── divination.ts                # 占卜类型定义
│   │   ├── product.ts                   # 商品类型定义
│   │   └── conversation.ts              # 对话类型定义
│   └── data/
│       └── products.json                # 商品数据
├── package.json
├── tsconfig.json
└── README.md
```

### 🔌 API 接口

#### 调用 MCP Server
```typescript
POST /api/divination/{type}
{
  "userId": "string",
  "parameters": {
    // 根据占卜类型不同
    "dream_description"?: "string",
    "birth_date"?: "string",
    "question"?: "string"
  },
  "language": "zh-CN" | "en-US"
}

Response:
{
  "success": boolean,
  "result": {
    "interpretation": "string",
    "visualization": "string (image URL)",
    "details": object
  }
}
```

#### 商品匹配
```typescript
POST /api/products/match
{
  "divinationResult": object,
  "userPreferences": object
}

Response:
{
  "products": [
    {
      "id": "string",
      "name": "string",
      "type": "physical" | "digital",
      "description": "string",
      "price": number,
      "images": ["string"],
      "matchScore": number
    }
  ]
}
```

---

## 2️⃣ 占卜计算智能体 (Fortune-Telling Computation Agent)

### 🔧 技术栈
- **框架**: 自定义 MCP Server (Node.js/TypeScript)
- **协议**: Model Context Protocol
- **多模态**: 文本生成 + 图像生成 API
- **AI模型**: Claude/GPT-4 (占卜解释), DALL-E/Midjourney (图像)

### 📌 核心职责

#### 流程 1 核心计算
```
接收用户输入 → 计算占卜结果 → 生成解释文本 → 生成可视化图像 → 返回多模态输出
```

**支持的占卜类型**:
1. 🌙 解梦 (Dream Interpretation)
2. 🃏 塔罗牌 (Tarot Reading)
3. 📿 易经 (I-Ching)
4. ⭐ 紫微斗数 (Ziwei Doushu)
5. 🎋 八字 (BaZi/Four Pillars)
6. 🌌 西方占星 (Western Astrology)

### 📁 文件结构
```
fortune-telling-mcp-server/
├── src/
│   ├── index.ts                          # MCP Server 主入口
│   ├── server.ts                         # Express 服务器
│   ├── mcp/
│   │   ├── protocol-handler.ts          # MCP 协议处理
│   │   ├── context-provider.ts          # 上下文提供
│   │   └── tool-registry.ts             # 工具注册
│   ├── engines/
│   │   ├── dream-interpreter.ts         # 解梦引擎
│   │   ├── tarot-reader.ts              # 塔罗牌引擎
│   │   ├── iching-calculator.ts         # 易经引擎
│   │   ├── ziwei-calculator.ts          # 紫微斗数引擎
│   │   ├── bazi-calculator.ts           # 八字引擎
│   │   └── astrology-calculator.ts      # 占星引擎
│   ├── services/
│   │   ├── ai-service.ts                # AI 模型调用
│   │   ├── image-generator.ts           # 图像生成服务
│   │   ├── context-manager.ts           # 上下文管理
│   │   └── cache-service.ts             # 缓存服务
│   ├── types/
│   │   ├── mcp-types.ts                 # MCP 协议类型
│   │   ├── divination-types.ts          # 占卜类型定义
│   │   └── result-types.ts              # 结果类型定义
│   └── data/
│       ├── tarot-cards.json             # 塔罗牌数据
│       ├── iching-hexagrams.json        # 易经卦象数据
│       └── astrology-data.json          # 占星数据
├── package.json
├── tsconfig.json
└── README.md
```

### 🔌 MCP 协议接口

#### 工具定义
```typescript
// MCP Tools
tools: [
  {
    name: "interpret_dream",
    description: "解析梦境含义",
    input_schema: {
      type: "object",
      properties: {
        dream_description: { type: "string" },
        emotions: { type: "array" },
        language: { type: "string" }
      }
    }
  },
  {
    name: "read_tarot",
    description: "塔罗牌占卜",
    input_schema: {
      type: "object",
      properties: {
        question: { type: "string" },
        spread: { type: "string" }, // three, celtic, etc.
        language: { type: "string" }
      }
    }
  },
  // ... 其他占卜工具
]
```

#### REST API (供 Botpress 调用)
```typescript
POST /api/v1/divination/dream
POST /api/v1/divination/tarot
POST /api/v1/divination/iching
POST /api/v1/divination/ziwei
POST /api/v1/divination/bazi
POST /api/v1/divination/astrology

// 通用响应格式
{
  "success": boolean,
  "result": {
    "type": "dream" | "tarot" | ...,
    "interpretation": "string",
    "visualization": {
      "imageUrl": "string",
      "animationUrl": "string (optional)"
    },
    "details": object,
    "context": object // 用于商品匹配
  },
  "metadata": {
    "timestamp": "string",
    "processingTime": number
  }
}
```

---

## 3️⃣ 交易与订单智能体 (Transaction & Order Management Agent)

### 🔧 技术栈
- **框架**: Botpress Integrations + Node.js/Express
- **支付网关**: Stripe, PayPal, Alipay, WeChat Pay, USDC
- **数据库**: MongoDB (订单存储)
- **MCP**: 支付上下文工具注入

### 📌 核心职责

#### 流程 3: 定制表单与支付
```
用户填写表单 → 验证信息 → 选择支付方式 → 调用支付 API → 处理支付结果
```

#### 流程 4: 订单生成与入库
```
支付成功 → 生成订单号 → 入库 MongoDB → 通知商家 → 反馈给用户
```

### 📁 文件结构
```
transaction-order-agent/
├── src/
│   ├── index.ts                          # 主入口
│   ├── server.ts                         # Express 服务器
│   ├── routes/
│   │   ├── forms.ts                     # 表单路由
│   │   ├── payments.ts                  # 支付路由
│   │   ├── orders.ts                    # 订单路由
│   │   └── webhooks.ts                  # Webhook 路由
│   ├── controllers/
│   │   ├── form-controller.ts           # 表单控制器
│   │   ├── payment-controller.ts        # 支付控制器
│   │   ├── order-controller.ts          # 订单控制器
│   │   └── webhook-controller.ts        # Webhook 控制器
│   ├── services/
│   │   ├── payment-gateways/
│   │   │   ├── stripe-service.ts        # Stripe 集成
│   │   │   ├── paypal-service.ts        # PayPal 集成
│   │   │   ├── alipay-service.ts        # 支付宝集成
│   │   │   ├── wechat-service.ts        # 微信支付集成
│   │   │   └── usdc-service.ts          # USDC 加密货币支付
│   │   ├── order-service.ts             # 订单服务
│   │   ├── notification-service.ts      # 通知服务
│   │   └── mcp-payment-tools.ts         # MCP 支付工具
│   ├── models/
│   │   ├── order.model.ts               # 订单模型
│   │   ├── payment.model.ts             # 支付模型
│   │   └── form.model.ts                # 表单模型
│   ├── types/
│   │   ├── payment-types.ts             # 支付类型
│   │   ├── order-types.ts               # 订单类型
│   │   └── form-types.ts                # 表单类型
│   └── utils/
│       ├── validators.ts                # 数据验证
│       ├── encryption.ts                # 加密工具
│       └── logger.ts                    # 日志工具
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

### 🔌 API 接口

#### 表单管理
```typescript
POST /api/forms/customize
{
  "productId": "string",
  "type": "physical" | "digital",
  "customization": {
    "text": "string (optional)",
    "design": "string (optional)",
    "specifications": object
  },
  "userInfo": {
    "name": "string",
    "email": "string",
    "phone": "string (optional)",
    "address": object // 仅实物商品
  }
}

Response:
{
  "formId": "string",
  "validationStatus": "valid" | "invalid",
  "errors": ["string"],
  "estimatedPrice": number
}
```

#### 支付处理
```typescript
POST /api/payments/initiate
{
  "formId": "string",
  "paymentMethod": "stripe" | "paypal" | "alipay" | "wechat" | "usdc",
  "amount": number,
  "currency": "USD" | "CNY" | "USDC"
}

Response:
{
  "paymentId": "string",
  "paymentUrl": "string", // 支付页面 URL
  "qrCode": "string (optional)", // 二维码 (支付宝/微信)
  "expiresAt": "string"
}
```

#### 订单管理
```typescript
GET /api/orders/{orderId}
POST /api/orders/{orderId}/status
{
  "status": "pending" | "paid" | "processing" | "completed" | "cancelled"
}

Webhook 通知商家:
POST {MERCHANT_WEBHOOK_URL}
{
  "event": "order.created",
  "orderId": "string",
  "orderDetails": object,
  "timestamp": "string"
}
```

---

## 4️⃣ 交付、评价与分享智能体 (Fulfillment, Review & Sharing Agent)

### 🔧 技术栈
- **框架**: Botpress 后端扩展 + Node.js
- **MCP**: 交付工具注入
- **追踪**: 物流 API 集成 (顺丰、DHL 等)
- **数据库**: MongoDB (评价数据)
- **社交**: 13 种社交媒体 LOGO 渲染

### 📌 核心职责

#### 流程 5: 商品交付与评价
```
订单完成信号 → 数字商品发送链接 / 实物追踪物流 → 交付完成 → 引导评价
```

#### 流程 6: 确认收货与社交分享
```
用户确认收货 → 显示评价表单 → 提交评价 → 显示 13 种社交媒体 LOGO → 用户选择分享
```

**13 种社交媒体**:
1. Matrix
2. Telegram
3. Shorts-Stack
4. TikTok
5. Discord
6. Discourse
7. Reddit
8. X (Twitter)
9. Facebook
10. YouTube
11. Pinterest
12. Instagram
13. Fiverr

### 📁 文件结构
```
fulfillment-review-sharing-agent/
├── src/
│   ├── index.ts                          # 主入口
│   ├── server.ts                         # Express 服务器
│   ├── routes/
│   │   ├── fulfillment.ts               # 交付路由
│   │   ├── reviews.ts                   # 评价路由
│   │   └── sharing.ts                   # 分享路由
│   ├── controllers/
│   │   ├── fulfillment-controller.ts    # 交付控制器
│   │   ├── review-controller.ts         # 评价控制器
│   │   └── sharing-controller.ts        # 分享控制器
│   ├── services/
│   │   ├── digital-delivery.ts          # 数字商品交付
│   │   ├── logistics-tracker.ts         # 物流追踪
│   │   ├── review-service.ts            # 评价服务
│   │   ├── social-renderer.ts           # 社交媒体渲染
│   │   └── mcp-fulfillment-tools.ts     # MCP 交付工具
│   ├── models/
│   │   ├── fulfillment.model.ts         # 交付模型
│   │   └── review.model.ts              # 评价模型
│   ├── types/
│   │   ├── fulfillment-types.ts         # 交付类型
│   │   ├── review-types.ts              # 评价类型
│   │   └── social-types.ts              # 社交媒体类型
│   ├── assets/
│   │   └── social-logos/                # 13 种社交媒体 LOGO
│   │       ├── matrix.png
│   │       ├── telegram.png
│   │       ├── shorts-stack.png
│   │       ├── tiktok.png
│   │       ├── discord.png
│   │       ├── discourse.png
│   │       ├── reddit.png
│   │       ├── twitter-x.png
│   │       ├── facebook.png
│   │       ├── youtube.png
│   │       ├── pinterest.png
│   │       ├── instagram.png
│   │       └── fiverr.png
│   └── templates/
│       ├── review-form.html             # 评价表单模板
│       └── social-share.html            # 分享页面模板
├── package.json
├── tsconfig.json
└── README.md
```

### 🔌 API 接口

#### 交付管理
```typescript
POST /api/fulfillment/digital
{
  "orderId": "string",
  "productId": "string",
  "userEmail": "string"
}

Response:
{
  "deliveryStatus": "sent",
  "downloadLink": "string",
  "expiresAt": "string",
  "accessCode": "string (optional)"
}

POST /api/fulfillment/physical
{
  "orderId": "string",
  "trackingNumber": "string",
  "carrier": "sf" | "dhl" | "fedex"
}

GET /api/fulfillment/track/{orderId}
Response:
{
  "status": "shipped" | "in_transit" | "delivered",
  "location": "string",
  "estimatedDelivery": "string",
  "trackingHistory": [
    {
      "timestamp": "string",
      "location": "string",
      "status": "string"
    }
  ]
}
```

#### 评价系统
```typescript
POST /api/reviews/submit
{
  "orderId": "string",
  "userId": "string",
  "rating": number, // 1-5
  "comment": "string",
  "images": ["string (optional)"]
}

GET /api/reviews/{productId}
Response:
{
  "averageRating": number,
  "totalReviews": number,
  "reviews": [
    {
      "userId": "string",
      "rating": number,
      "comment": "string",
      "images": ["string"],
      "timestamp": "string"
    }
  ]
}
```

#### 社交分享
```typescript
GET /api/sharing/render
{
  "orderId": "string",
  "productName": "string"
}

Response (HTML):
<div class="social-share-buttons">
  <button data-platform="matrix">
    <img src="/assets/logos/matrix.png" alt="Matrix" />
  </button>
  <button data-platform="telegram">
    <img src="/assets/logos/telegram.png" alt="Telegram" />
  </button>
  <!-- ... 其他 11 个社交媒体 -->
</div>

// 前端点击后生成分享文本，用户手动复制分享
// 不直接调用社交 API，避免滥用
```

---

## 🔄 智能体协作流程

### 完整用户旅程

```mermaid
graph TD
    A[用户访问前端] --> B[对话与导购智能体]
    B --> C{选择占卜类型}
    C --> D[占卜计算智能体]
    D --> E[返回占卜结果 + 可视化]
    E --> B
    B --> F[匹配商品推荐]
    F --> G{用户选择商品}
    G --> H[填写定制表单]
    H --> I[交易与订单智能体]
    I --> J[处理支付]
    J --> K{支付成功?}
    K -->|是| L[生成订单 + 入库]
    K -->|否| H
    L --> M[交付、评价与分享智能体]
    M --> N{商品类型?}
    N -->|数字| O[发送下载链接]
    N -->|实物| P[追踪物流]
    O --> Q[用户确认收货]
    P --> Q
    Q --> R[填写评价]
    R --> S[显示社交分享按钮]
    S --> T[用户手动分享]
```

### 智能体间通信

#### 1. 对话与导购 → 占卜计算
```typescript
// Request
{
  "action": "performDivination",
  "type": "tarot",
  "parameters": {
    "question": "我的事业会如何发展？",
    "spread": "celtic"
  },
  "userId": "user123"
}

// Response
{
  "result": {
    "cards": [...],
    "interpretation": "...",
    "visualization": "https://..."
  },
  "context": {
    "themes": ["career", "growth"],
    "sentiment": "positive",
    "keywords": ["success", "opportunity"]
  }
}
```

#### 2. 对话与导购 → 交易与订单
```typescript
// Request
{
  "action": "createOrder",
  "productId": "prod456",
  "customization": {...},
  "userInfo": {...},
  "divinationContext": {...} // 来自占卜结果
}

// Response
{
  "orderId": "order789",
  "paymentUrl": "https://...",
  "status": "pending_payment"
}
```

#### 3. 交易与订单 → 交付、评价与分享
```typescript
// Webhook / Event
{
  "event": "payment.success",
  "orderId": "order789",
  "productType": "physical",
  "deliveryInfo": {...}
}

// 交付智能体监听此事件，启动交付流程
```

---

## 🗄️ 数据库设计

### MongoDB Collections

#### 1. users
```javascript
{
  _id: ObjectId,
  userId: "string",
  email: "string",
  name: "string",
  createdAt: Date,
  preferences: {
    language: "zh-CN",
    favoriteProducts: ["string"]
  },
  divinationHistory: [
    {
      type: "tarot",
      timestamp: Date,
      result: {...}
    }
  ]
}
```

#### 2. products
```javascript
{
  _id: ObjectId,
  productId: "string",
  name: "string",
  type: "physical" | "digital",
  description: "string",
  price: Number,
  currency: "USD",
  images: ["string"],
  category: "string",
  tags: ["string"],
  stock: Number,
  customizable: Boolean,
  divinationAffinity: {
    // 与占卜结果的匹配规则
    themes: ["career", "love"],
    keywords: ["success", "growth"]
  }
}
```

#### 3. orders
```javascript
{
  _id: ObjectId,
  orderId: "string",
  userId: "string",
  productId: "string",
  type: "physical" | "digital",
  customization: {...},
  amount: Number,
  currency: "USD",
  paymentMethod: "stripe",
  paymentStatus: "paid",
  fulfillmentStatus: "shipped",
  createdAt: Date,
  updatedAt: Date,
  trackingInfo: {
    carrier: "sf",
    trackingNumber: "string",
    status: "in_transit"
  },
  divinationContext: {...} // 关联的占卜结果
}
```

#### 4. reviews
```javascript
{
  _id: ObjectId,
  reviewId: "string",
  orderId: "string",
  productId: "string",
  userId: "string",
  rating: Number, // 1-5
  comment: "string",
  images: ["string"],
  createdAt: Date,
  helpful: Number // 其他用户点赞数
}
```

---

## 🚀 部署方案

### 服务端口分配
- **对话与导购智能体**: 端口 3001 (Botpress)
- **占卜计算智能体**: 端口 3000 (MCP Server)
- **交易与订单智能体**: 端口 3002 (Express)
- **交付、评价与分享智能体**: 端口 3003 (Express)
- **MongoDB**: 端口 27017
- **前端 Web UI**: 端口 8080

### 环境变量
```bash
# MCP Server
MCP_SERVER_URL=http://localhost:3000
MCP_API_KEY=your_mcp_api_key

# Botpress
BOTPRESS_URL=http://localhost:3001
BOTPRESS_API_KEY=your_botpress_api_key

# MongoDB
MONGODB_URI=mongodb://admin:admin123@localhost:27017/ether-ai?authSource=admin

# Payment Gateways
STRIPE_SECRET_KEY=sk_test_xxx
PAYPAL_CLIENT_ID=xxx
PAYPAL_CLIENT_SECRET=xxx
ALIPAY_APP_ID=xxx
WECHAT_PAY_MCH_ID=xxx
USDC_WALLET_ADDRESS=0x...

# AI Services
OPENAI_API_KEY=sk-xxx
ANTHROPIC_API_KEY=sk-ant-xxx
MIDJOURNEY_API_KEY=xxx

# Email / SMS
SENDGRID_API_KEY=xxx
TWILIO_ACCOUNT_SID=xxx
```

---

## 📦 实施步骤

### Phase 1: 基础设施
1. ✅ MongoDB 数据库配置
2. ⏳ 创建数据库 Schema
3. ⏳ 配置环境变量

### Phase 2: 占卜计算智能体
1. ⏳ 搭建 MCP Server 框架
2. ⏳ 实现 6 种占卜引擎
3. ⏳ 集成 AI 模型和图像生成
4. ⏳ 测试 MCP 协议

### Phase 3: 对话与导购智能体
1. ⏳ 配置 Botpress 项目
2. ⏳ 设计对话流程
3. ⏳ 集成 MCP Client
4. ⏳ 实现商品匹配逻辑
5. ⏳ 多模态渲染测试

### Phase 4: 交易与订单智能体
1. ✅ 创建 Express 服务器
2. ✅ 集成 5 种支付网关
3. ✅ 实现订单管理
4. ✅ Webhook 配置

### Phase 5: 交付、评价与分享智能体
1. ✅ 创建服务框架
2. ⏳ 实现数字商品交付
3. ⏳ 集成物流追踪 API
4. ⏳ 开发评价系统
5. ⏳ 设计社交分享界面 (13 个 LOGO)

### Phase 6: 集成测试
1. ⏳ 端到端测试
2. ⏳ 性能优化
3. ⏳ 安全审计

### Phase 7: 部署
1. ⏳ Docker 容器化
2. ⏳ CI/CD 配置
3. ⏳ 监控和日志

---

## 📝 待办清单

### 高优先级
- [ ] 重构对话与导购智能体为完整的 Botpress 项目
- [ ] 重构占卜计算智能体为标准 MCP Server
- [ ] 实现智能体间的通信协议
- [ ] 集成多模态输出 (图像生成)

### 中优先级
- [ ] 完善商品匹配算法
- [ ] 优化支付流程
- [ ] 实现物流追踪
- [ ] 设计社交分享 UI

### 低优先级
- [ ] 多语言支持
- [ ] 性能监控
- [ ] 数据分析仪表板

---

## 🎯 成功指标

- **对话与导购**: 占卜触发成功率 > 95%, 商品推荐点击率 > 30%
- **占卜计算**: 计算响应时间 < 3s, 图像生成成功率 > 90%
- **交易与订单**: 支付成功率 > 98%, 订单处理时间 < 1s
- **交付、评价与分享**: 数字商品交付成功率 100%, 评价提交率 > 40%, 社交分享率 > 20%

---

*文档版本: v2.0*  
*最后更新: 2025-10-08*  
*作者: Ether AI Team*
