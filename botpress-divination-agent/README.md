# Ether AI Assistant - 对话与导购智能体

## 项目概述

基于 Botpress 构建的智能占卜导购助手，集成 MCP Server 的 API 以提供多种占卜服务并推荐相关商品。

## 核心功能

### 流程 1: 深度对话与占卜
- 🤖 **多智能体系统**: 用户可选择不同的占卜智能体
- 🔮 **六大占卜方式**:
  - Dream (解梦 - SomniumSage)
  - Tarot (塔罗牌)
  - I-Ching (易经)
  - Ziwei (紫微斗数)
  - BaZi (八字)
  - Astrology (西方占星)
- 💬 **深度沟通**: 多轮对话收集用户信息
- 🎨 **多模态输出**: 文本 + 图像展示占卜结果

### 流程 2: 智能商品推荐
- 🛍️ **基于占卜结果的商品匹配**
- 📦 **商品类型**:
  - 实物商品 (水晶、塔罗牌、风水摆件等)
  - 数字商品 (定制占卜报告、视频课程等)
- 🖼️ **多模态商品展示**: 图片 + 详细信息
- 💡 **智能推荐引擎**: 根据占卜结果匹配最合适的商品

## 技术架构

```
┌─────────────────────────────────────────────┐
│          用户前端界面 (Web/Mobile)            │
└────────────────┬────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────┐
│         Botpress 智能体引擎                   │
│  ┌─────────────────────────────────────┐   │
│  │  对话流管理 (Conversation Flows)      │   │
│  │  - 智能体选择                          │   │
│  │  - 信息收集                            │   │
│  │  - 结果展示                            │   │
│  │  - 商品推荐                            │   │
│  └─────────────────────────────────────┘   │
└────────────────┬────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────┐
│        集成层 (Integration Layer)            │
│  ┌─────────────────┐  ┌──────────────────┐ │
│  │  MCP Server API │  │  商品数据库 API   │ │
│  └─────────────────┘  └──────────────────┘ │
└─────────────────────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────┐
│            数据服务层                         │
│  - Divination MCP Server (占卜服务)         │
│  - Product Database (商品数据库)             │
│  - Image Generation Service (图像生成)       │
└─────────────────────────────────────────────┘
```

## 项目结构

```
botpress-divination-agent/
├── README.md                          # 项目文档
├── package.json                       # 依赖配置
├── botpress.config.ts                 # Botpress 配置
├── integration.definition.ts          # 集成定义
├── src/
│   ├── index.ts                       # 入口文件
│   ├── actions/                       # 自定义动作
│   │   ├── divination.ts              # 占卜相关动作
│   │   ├── product.ts                 # 商品推荐动作
│   │   └── multimodal.ts              # 多模态处理
│   ├── flows/                         # 对话流
│   │   ├── welcome.json               # 欢迎流程
│   │   ├── agent-selection.json       # 智能体选择
│   │   ├── dream-divination.json      # 解梦流程
│   │   ├── tarot-divination.json      # 塔罗流程
│   │   ├── iching-divination.json     # 易经流程
│   │   ├── ziwei-divination.json      # 紫微流程
│   │   ├── bazi-divination.json       # 八字流程
│   │   ├── astrology-divination.json  # 占星流程
│   │   └── product-recommendation.json # 商品推荐流程
│   ├── services/                      # 服务层
│   │   ├── mcp-client.ts              # MCP Server 客户端
│   │   ├── product-matcher.ts         # 商品匹配引擎
│   │   └── image-handler.ts           # 图像处理
│   ├── types/                         # 类型定义
│   │   ├── divination.ts              # 占卜类型
│   │   └── product.ts                 # 商品类型
│   └── utils/                         # 工具函数
│       ├── formatters.ts              # 格式化工具
│       └── validators.ts              # 验证工具
├── data/
│   ├── products.json                  # 商品数据
│   └── matching-rules.json            # 匹配规则
└── assets/
    ├── images/                        # 图片资源
    └── templates/                     # 模板文件
```

## 快速开始

### 1. 安装依赖

```bash
cd botpress-divination-agent
npm install
```

### 2. 配置环境变量

创建 `.env` 文件:

```env
# MCP Server 配置
MCP_SERVER_URL=http://localhost:3000
MCP_SERVER_API_KEY=your_api_key_here

# Botpress 配置
BOTPRESS_WORKSPACE_ID=your_workspace_id
BOTPRESS_BOT_ID=your_bot_id

# 商品数据库配置
PRODUCT_DB_URL=your_database_url
PRODUCT_DB_API_KEY=your_db_api_key

# 图像服务配置 (可选)
IMAGE_SERVICE_URL=your_image_service_url
IMAGE_SERVICE_API_KEY=your_image_api_key
```

### 3. 启动 MCP Server

```bash
cd ../divination-mcp-server
node api-server.js
```

### 4. 部署 Botpress 集成

```bash
cd ../botpress-divination-agent
bp deploy
```

### 5. 测试智能体

访问 Botpress Studio 或使用 CLI 测试:

```bash
bp chat
```

## 使用指南

### 用户交互流程

1. **欢迎界面**: 用户进入聊天，看到智能体介绍
2. **选择智能体**: 用户选择占卜类型（解梦、塔罗、易经等）
3. **信息收集**: 智能体通过多轮对话收集必要信息
4. **占卜执行**: 调用 MCP Server API 执行占卜
5. **结果展示**: 以多模态形式展示占卜结果（文字 + 图像）
6. **商品推荐**: 基于占卜结果智能推荐相关商品
7. **深度咨询**: 用户可继续询问或选择其他占卜方式

### 示例对话

```
智能体: 🌟 欢迎来到 Ether AI Assistant！我是您的专属占卜导购助手。

智能体: 我可以为您提供以下占卜服务：
1. 🌙 解梦 (Dream)
2. 🃏 塔罗牌 (Tarot)
3. 📿 易经 (I-Ching)
4. ⭐ 紫微斗数 (Ziwei)
5. 🎋 八字 (BaZi)
6. 🌌 西方占星 (Astrology)

请选择您感兴趣的占卜方式，或告诉我您想了解什么？

用户: 我想解个梦

智能体: 🌙 好的！请告诉我您梦到了什么？请尽可能详细地描述您的梦境。

用户: 我梦见自己在天上飞

智能体: ✨ 收到！让我为您解析这个梦境...

[调用 MCP Server Dream API]

智能体: 📊 解梦结果：

🎭 情感分析:
   基调: POSITIVE
   置信度: 90.0%
   描述: 您的梦境传递着积极、向上的信息

🔮 识别符号: 1 个
   • 飞: 自由、超越、灵性追求、摆脱束缚

📖 解析内容:
您的梦境象征着对自由的向往和对现实束缚的超越...

[显示相关图像]

智能体: 💡 根据您的梦境解析，我为您推荐以下商品：

🛍️ 推荐商品 1: 天空蓝水晶手链
   - 寓意: 提升灵性，助您追求自由
   - 价格: ¥299
   - [查看详情]

🛍️ 推荐商品 2: 《梦境解析完整指南》电子书
   - 内容: 深度解读飞翔梦境的心理学含义
   - 价格: ¥49
   - [立即购买]

智能体: 您对这些商品感兴趣吗？或者想了解更多关于您梦境的信息？
```

## API 集成

### MCP Server 端点

所有占卜 API 都通过 `http://localhost:3000` 访问:

- POST `/divination/dream` - 解梦
- POST `/divination/tarot` - 塔罗牌
- POST `/divination/iching` - 易经
- POST `/divination/ziwei` - 紫微斗数
- POST `/divination/bazi` - 八字
- POST `/divination/astrology` - 西方占星

### 请求示例

```javascript
// 解梦请求
const response = await fetch('http://localhost:3000/divination/dream', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    dream_description: "我梦见自己在天上飞",
    language: "zh-CN",
    emotions: ["excited", "free"]
  })
});

const result = await response.json();
```

## 商品匹配规则

商品推荐基于以下维度匹配：

1. **占卜类型**: 不同占卜方式推荐不同类别商品
2. **情感基调**: POSITIVE/NEGATIVE/NEUTRAL 影响商品选择
3. **关键符号**: 特定符号匹配特定商品
4. **用户画像**: 结合历史互动数据个性化推荐

## 开发指南

### 添加新的占卜方式

1. 在 `src/flows/` 创建新的对话流 JSON
2. 在 `src/actions/divination.ts` 添加对应的动作
3. 在 `data/matching-rules.json` 配置商品匹配规则
4. 更新 `src/flows/agent-selection.json` 添加选项

### 添加新商品

在 `data/products.json` 添加商品数据:

```json
{
  "id": "product_001",
  "name": "天空蓝水晶手链",
  "type": "physical",
  "category": "crystal",
  "price": 299,
  "currency": "CNY",
  "description": "提升灵性，助您追求自由",
  "images": [
    "/assets/images/products/crystal_001.jpg"
  ],
  "tags": ["freedom", "spiritual", "positive"],
  "matchingRules": {
    "divinationTypes": ["dream"],
    "keywords": ["飞", "自由", "翱翔"],
    "sentiment": ["POSITIVE"]
  }
}
```

## 多模态支持

### 图像展示

智能体支持在对话中嵌入图像:

```typescript
// 在 action 中发送图像
await bp.createMessage({
  conversationId,
  userId,
  type: 'image',
  payload: {
    imageUrl: 'https://example.com/image.jpg',
    title: '占卜结果可视化'
  }
});
```

### 富文本卡片

使用 Botpress 的卡片组件展示商品:

```typescript
await bp.createMessage({
  conversationId,
  userId,
  type: 'card',
  payload: {
    title: product.name,
    subtitle: product.description,
    imageUrl: product.images[0],
    actions: [
      {
        label: '查看详情',
        action: 'postback',
        value: `view_product_${product.id}`
      },
      {
        label: '立即购买',
        action: 'postback',
        value: `buy_product_${product.id}`
      }
    ]
  }
});
```

## 测试

运行测试套件:

```bash
npm test
```

测试单个占卜流程:

```bash
npm run test:dream
npm run test:tarot
```

## 部署

### 开发环境

```bash
bp deploy
```

### 生产环境

```bash
bp deploy --public
```

## 故障排除

### MCP Server 连接失败

1. 确认 MCP Server 正在运行: `http://localhost:3000`
2. 检查防火墙设置
3. 验证 API 密钥配置

### 商品推荐不准确

1. 检查 `data/matching-rules.json` 配置
2. 审查占卜结果的关键字提取
3. 调整匹配算法权重

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 联系方式

- 项目主页: https://github.com/zyaproxy-Jun/AI-Assistant
- 问题反馈: https://github.com/zyaproxy-Jun/AI-Assistant/issues
