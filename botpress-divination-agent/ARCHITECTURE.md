# Ether AI Assistant - 系统架构图

## 整体架构

```
┌─────────────────────────────────────────────────────────────────────┐
│                         用户层 (User Layer)                          │
│                                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │   Web    │  │  Mobile  │  │  WeChat  │  │ Telegram │  ...      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘           │
└───────┼─────────────┼─────────────┼─────────────┼──────────────────┘
        │             │             │             │
        └─────────────┴─────────────┴─────────────┘
                        │
                        ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    Botpress Cloud (智能体层)                         │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │              对话引擎 (Conversation Engine)                 │   │
│  │  • 自然语言理解 (NLU)                                       │   │
│  │  • 意图识别 (Intent Recognition)                            │   │
│  │  • 对话流管理 (Flow Management)                             │   │
│  │  • 多轮对话追踪 (Context Tracking)                          │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │        Ether Divination Agent (本项目集成层)                │   │
│  │                                                             │   │
│  │  ┌──────────────────┐         ┌───────────────────────┐  │   │
│  │  │  占卜动作处理器   │         │  商品推荐处理器        │  │   │
│  │  │  (Divination)    │         │  (Product Recommendation)│ │   │
│  │  │                  │         │                         │  │   │
│  │  │ • performDivination       │ • recommendProducts     │  │   │
│  │  │ • formatResult            │ • searchProducts        │  │   │
│  │  └──────────────────┘         │ • handleProductView     │  │   │
│  │                               │ • handleProductPurchase │  │   │
│  │                               └───────────────────────┘  │   │
│  │                                                             │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │            服务层 (Service Layer)                   │  │   │
│  │  │                                                      │  │   │
│  │  │  ┌──────────────────┐    ┌──────────────────────┐ │  │   │
│  │  │  │  MCP Client      │    │  Product Matcher     │ │  │   │
│  │  │  │                  │    │                      │ │  │   │
│  │  │  │ • 6种占卜方法     │    │ • 智能匹配算法        │ │  │   │
│  │  │  │ • 健康检查        │    │ • 评分系统           │ │  │   │
│  │  │  │ • 错误处理        │    │ • 关键词提取         │ │  │   │
│  │  │  └──────────────────┘    └──────────────────────┘ │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └────────────────────────────────────────────────────────────┘   │
└──────────┬────────────────────────────┬──────────────────────────┘
           │                            │
           ↓                            ↓
┌──────────────────────┐    ┌─────────────────────────┐
│   MCP Server API     │    │   商品数据层             │
│   (占卜服务)          │    │   (Product Data)        │
│                      │    │                         │
│  ┌────────────────┐ │    │  ┌───────────────────┐ │
│  │ Dream Service  │ │    │  │  products.json    │ │
│  │ Tarot Service  │ │    │  │  matching-rules   │ │
│  │ I-Ching Service│ │    │  │                   │ │
│  │ Ziwei Service  │ │    │  │  10 商品          │ │
│  │ BaZi Service   │ │    │  │  10 匹配规则      │ │
│  │ Astrology Svc  │ │    │  └───────────────────┘ │
│  └────────────────┘ │    │                         │
│                      │    │  可扩展为:              │
│  端口: 3000          │    │  • MongoDB             │
│  协议: HTTP REST     │    │  • PostgreSQL          │
└──────────────────────┘    └─────────────────────────┘
```

## 数据流图

### 流程 1: 占卜请求流程

```
用户输入
    ↓
意图识别 (Botpress NLU)
    ↓
选择占卜类型
    ↓
收集必要信息 (多轮对话)
    ↓
调用 performDivination Action
    ↓
MCP Client 发送 HTTP 请求
    ↓
MCP Server 处理占卜
    ↓
返回占卜结果
    ↓
formatDivinationResult 格式化
    ↓
触发 divinationCompleted 事件
    ↓
显示结果给用户 (多模态)
```

### 流程 2: 商品推荐流程

```
占卜结果
    ↓
调用 recommendProducts Action
    ↓
ProductMatcher 分析结果
    ↓
提取关键词和符号
    ↓
计算匹配分数 (4个维度)
    │
    ├─ 占卜类型匹配 (30%)
    ├─ 情感基调匹配 (25%)
    ├─ 关键词匹配 (25%)
    └─ 符号匹配 (20%)
    ↓
排序 + 筛选前 N 个
    ↓
创建商品卡片/轮播
    ↓
显示给用户
    ↓
用户操作 (查看/购买)
    ↓
触发 productViewed/productPurchased 事件
```

## 组件交互图

```
┌─────────────────────────────────────────────────────────┐
│                    Botpress Agent                        │
│                                                          │
│  index.ts (主入口)                                       │
│    ↓                                                     │
│  registerActions()                                       │
│    ├─→ performDivination ─→ divination.ts              │
│    ├─→ recommendProducts ─→ product.ts                 │
│    ├─→ searchProducts   ─→ product.ts                  │
│    ├─→ handleProductView ─→ product.ts                 │
│    └─→ handleProductPurchase ─→ product.ts             │
│                                                          │
│  handler()                                               │
│    ├─→ handleMessage() ─→ detectIntent()                │
│    │                   ├─→ divination_request           │
│    │                   ├─→ product_inquiry              │
│    │                   └─→ help                         │
│    │                                                     │
│    └─→ handleEvent() ─→ divinationCompleted            │
│                     ├─→ productViewed                   │
│                     └─→ productPurchased                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              Service Layer (服务层)                      │
│                                                          │
│  mcp-client.ts                                          │
│    ├─ MCPClient                                         │
│    │   ├─ interpretDream()                              │
│    │   ├─ readTarot()                                   │
│    │   ├─ consultIChing()                               │
│    │   ├─ calculateZiwei()                              │
│    │   ├─ calculateBazi()                               │
│    │   ├─ calculateAstrology()                          │
│    │   └─ healthCheck()                                 │
│    └─ createMCPClient()                                 │
│                                                          │
│  product-matcher.ts                                     │
│    ├─ ProductMatcher                                    │
│    │   ├─ matchProducts()                               │
│    │   ├─ calculateMatchScore()                         │
│    │   ├─ extractKeywords()                             │
│    │   ├─ getPopularProducts()                          │
│    │   └─ searchProducts()                              │
│    └─ createProductMatcher()                            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                 Data Layer (数据层)                      │
│                                                          │
│  data/products.json                                     │
│    ├─ 10 个商品记录                                      │
│    └─ 每个商品包含:                                      │
│        • id, name, type, category                       │
│        • price, currency, description                   │
│        • images, tags, popularity                       │
│        • matchingRules (占卜类型、关键词、符号、情感)     │
│                                                          │
│  data/matching-rules.json                               │
│    ├─ 10 条匹配规则                                      │
│    └─ 每条规则包含:                                      │
│        • conditions (占卜类型、情感、关键词、符号)        │
│        • productIds (推荐的商品ID列表)                   │
│        • weight (规则权重)                               │
└─────────────────────────────────────────────────────────┘
```

## 评分算法详解

### 商品匹配评分公式

```
总分 = Σ (维度分数 × 权重)

维度 1: 占卜类型匹配
  if (product.matchingRules.divinationTypes.includes(type))
    score += 30

维度 2: 情感基调匹配
  if (product.matchingRules.sentiment.includes(result.sentiment.tone))
    score += 25

维度 3: 关键词匹配
  matchedKeywords = intersection(product.keywords, extracted.keywords)
  score += (matchedKeywords.length / total.keywords) × 25

维度 4: 符号匹配
  matchedSymbols = intersection(product.symbols, result.symbols)
  score += (matchedSymbols.length / total.symbols) × 20

最终分数 = round(score)  // 0-100
```

### 匹配示例

**输入**: 解梦结果
- 占卜类型: dream
- 情感基调: POSITIVE
- 关键词: ["飞", "自由", "天空"]
- 符号: ["飞"]

**商品**: 天空蓝水晶手链
- divinationTypes: ["dream"]
- sentiment: ["POSITIVE"]
- keywords: ["飞", "自由", "翱翔", "天空"]
- symbols: ["飞", "鸟", "天空"]

**计算**:
- 占卜类型: ✅ +30
- 情感基调: ✅ +25
- 关键词: 3/4 = 75% → +18.75
- 符号: 1/3 = 33% → +6.67
- **总分: 80.42 → 80分**

## 事件系统

```
┌──────────────────────────────────────────────┐
│              Event Bus (事件总线)             │
│                                              │
│  divinationCompleted                         │
│    ├─ userId                                 │
│    ├─ divinationType                         │
│    ├─ timestamp                              │
│    └─ result                                 │
│       → 触发时机: 占卜成功完成                 │
│       → 用途: 记录用户占卜历史                 │
│                                              │
│  productViewed                               │
│    ├─ userId                                 │
│    ├─ productId                              │
│    └─ timestamp                              │
│       → 触发时机: 用户查看商品详情             │
│       → 用途: 统计商品浏览量                  │
│                                              │
│  productPurchased                            │
│    ├─ userId                                 │
│    ├─ productId                              │
│    ├─ amount                                 │
│    └─ timestamp                              │
│       → 触发时机: 用户完成购买                │
│       → 用途: 订单记录、销售统计              │
└──────────────────────────────────────────────┘
```

## 部署架构

### 选项 1: Botpress Cloud (推荐)

```
GitHub Repository
      ↓
   git push
      ↓
Botpress CLI
      ↓
   bp deploy
      ↓
Botpress Cloud
      ├─ Auto Scaling
      ├─ Load Balancing
      ├─ Monitoring
      └─ Multi-Channel Support
```

### 选项 2: 自托管

```
┌─────────────────────────────────────┐
│           Nginx (反向代理)           │
│         SSL Termination             │
│       port: 80/443                  │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│        Node.js Application          │
│         (PM2 管理)                   │
│        port: 3001                   │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  Botpress Agent              │  │
│  └──────────────────────────────┘  │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│        MCP Server                   │
│        port: 3000                   │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  Divination Services         │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│         Database (可选)              │
│    MongoDB / PostgreSQL             │
│        port: 27017 / 5432           │
└─────────────────────────────────────┘
```

## 技术栈总览

```
┌─────────────────────────────────────────────┐
│              Frontend (前端)                 │
│  • Botpress SDK                             │
│  • Multi-Channel Support                    │
│  • Rich UI Components                       │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│            Backend (后端 - 本项目)           │
│  • Node.js 18+                              │
│  • TypeScript 5.3+                          │
│  • Axios (HTTP Client)                      │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│           External Services (外部服务)       │
│  • MCP Server (占卜 API)                    │
│  • Product Database (商品数据)               │
│  • Image Service (可选图像生成)              │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│              Data Storage (存储)             │
│  • JSON Files (开发/小规模)                  │
│  • MongoDB (生产/大规模)                     │
│  • PostgreSQL (关系型需求)                   │
└─────────────────────────────────────────────┘
```

## 扩展性设计

### 水平扩展

```
         Load Balancer
              |
    ┌─────────┼─────────┐
    ↓         ↓         ↓
[Agent 1] [Agent 2] [Agent 3]
    ↓         ↓         ↓
    └─────────┼─────────┘
              ↓
         Redis Cache
              ↓
         MCP Server
              ↓
          Database
```

### 模块化设计

```
Core Module
    ├─ Divination Module (可插拔)
    │   ├─ Dream
    │   ├─ Tarot
    │   └─ ... (易于添加新占卜类型)
    │
    ├─ Product Module (可插拔)
    │   ├─ Matcher Engine
    │   ├─ Search Engine
    │   └─ ... (易于更换推荐算法)
    │
    └─ Integration Module (可插拔)
        ├─ MCP Client
        ├─ Payment Gateway
        └─ ... (易于添加新集成)
```

---

**文档版本**: 1.0.0  
**最后更新**: 2025-01-07  
**维护者**: Ether AI Team
