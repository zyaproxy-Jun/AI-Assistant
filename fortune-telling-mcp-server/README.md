# Fortune-Telling Computation Agent (占卜计算智能体)

## 项目概述

基于 MCP (Model Context Protocol) 的占卜计算服务，作为 MCP host/client 提供专业的占卜 API，集成到 Botpress 通过 API 调用。

## 核心职责

### 流程 1: 占卜核心计算
- 🔮 基于用户输入生成占卜结果
- 🎨 支持多模态输出（文本 + 图像 + 动画）
- 📊 六大占卜系统：
  - 塔罗牌 (Tarot)
  - 星座占卜 (Astrology)
  - 易经 (I-Ching)
  - 解梦 (Dream)
  - 紫微斗数 (Ziwei)
  - 八字 (BaZi)

### MCP 协议集成
- 🔌 作为 MCP Server 提供工具接口
- 💬 注入占卜数据用于商品匹配
- 🤝 为其他智能体提供上下文

## 系统架构

```
┌─────────────────────────────────────────────┐
│         MCP Client (Botpress Agent)         │
│    对话与导购智能体                          │
└────────────────┬────────────────────────────┘
                 │ MCP Protocol
                 │ (JSON-RPC 2.0)
                 ↓
┌─────────────────────────────────────────────┐
│    Fortune-Telling MCP Server (本项目)      │
│                                             │
│  ┌────────────────────────────────────┐   │
│  │    MCP Tools Registry              │   │
│  │  • tools/list                      │   │
│  │  • tools/call                      │   │
│  │  • resources/list                  │   │
│  │  • resources/read                  │   │
│  └────────────────────────────────────┘   │
│                                             │
│  ┌────────────────────────────────────┐   │
│  │    Divination Engine               │   │
│  │  • Tarot Calculator                │   │
│  │  • Astrology Calculator            │   │
│  │  • I-Ching Calculator              │   │
│  │  • Dream Interpreter               │   │
│  │  • Ziwei Calculator                │   │
│  │  • BaZi Calculator                 │   │
│  └────────────────────────────────────┘   │
│                                             │
│  ┌────────────────────────────────────┐   │
│  │    Multimodal Output Generator     │   │
│  │  • Text Formatter                  │   │
│  │  • Image Generator (DALL-E/SD)     │   │
│  │  • Animation Generator             │   │
│  │  • SVG Card Renderer               │   │
│  └────────────────────────────────────┘   │
│                                             │
│  ┌────────────────────────────────────┐   │
│  │    Context Provider                │   │
│  │  • Divination Results Cache        │   │
│  │  • Product Matching Context        │   │
│  │  • User History Context            │   │
│  └────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

## MCP 工具定义

### 1. calculate_tarot
塔罗牌占卜计算

**输入**:
```json
{
  "question": "我的事业发展如何",
  "spread": "three_card",
  "output_format": ["text", "image"]
}
```

**输出**:
```json
{
  "cards": [
    {
      "name": "魔术师",
      "position": "正位",
      "meaning": "创造力、新开始",
      "image_url": "https://..."
    }
  ],
  "interpretation": "...",
  "context_for_products": {
    "keywords": ["创造", "新开始"],
    "sentiment": "positive",
    "elements": ["fire"]
  }
}
```

### 2. calculate_astrology
星座占卜计算

**输入**:
```json
{
  "birth_date": "1990-01-01",
  "birth_time": "12:00",
  "birth_place": "北京",
  "report_type": "natal_chart",
  "output_format": ["text", "chart_image"]
}
```

### 3. calculate_iching
易经占卜计算

### 4. interpret_dream
解梦服务

### 5. calculate_ziwei
紫微斗数计算

### 6. calculate_bazi
八字计算

## 多模态输出

### 文本输出
- 结构化 Markdown
- JSON 格式
- 纯文本

### 图像输出
- 塔罗牌卡图
- 星盘图
- 易经卦象图
- SVG 动态图表

### 动画输出
- 抽牌动画 (Lottie JSON)
- 星盘旋转动画
- 卦象变化动画

## 快速开始

### 安装

```bash
cd fortune-telling-mcp-server
npm install
```

### 配置

```bash
cp .env.example .env
# 编辑 .env
```

### 启动服务

```bash
# 作为 MCP Server 启动 (stdio)
npm run mcp

# 作为 HTTP API 启动 (用于测试)
npm run api

# 开发模式
npm run dev
```

### 测试

```bash
# 测试所有占卜功能
npm test

# 测试 MCP 协议
npm run test:mcp

# 测试多模态输出
npm run test:multimodal
```

## MCP 客户端集成示例

### Botpress 集成

```typescript
import { MCPClient } from '@modelcontextprotocol/sdk/client'

const client = new MCPClient({
  name: 'fortune-telling-client',
  version: '1.0.0'
})

// 连接到 MCP Server
await client.connect({
  command: 'node',
  args: ['dist/mcp-server.js'],
  env: process.env
})

// 列出可用工具
const tools = await client.listTools()

// 调用塔罗牌占卜
const result = await client.callTool({
  name: 'calculate_tarot',
  arguments: {
    question: '我的事业发展如何',
    spread: 'three_card',
    output_format: ['text', 'image']
  }
})

// 获取占卜上下文用于商品推荐
const context = result.context_for_products
```

## API 端点 (测试用)

```
POST /api/divination/tarot
POST /api/divination/astrology
POST /api/divination/iching
POST /api/divination/dream
POST /api/divination/ziwei
POST /api/divination/bazi

GET /api/tools/list
POST /api/tools/call
GET /api/resources/list
POST /api/resources/read
```

## 项目结构

```
fortune-telling-mcp-server/
├── src/
│   ├── mcp-server.ts           # MCP Server 主入口
│   ├── api-server.ts           # HTTP API (测试用)
│   ├── tools/                  # MCP Tools 定义
│   │   ├── tarot.ts
│   │   ├── astrology.ts
│   │   ├── iching.ts
│   │   ├── dream.ts
│   │   ├── ziwei.ts
│   │   └── bazi.ts
│   ├── engines/                # 占卜引擎
│   │   ├── tarot-engine.ts
│   │   ├── astrology-engine.ts
│   │   ├── iching-engine.ts
│   │   ├── dream-engine.ts
│   │   ├── ziwei-engine.ts
│   │   └── bazi-engine.ts
│   ├── multimodal/             # 多模态生成器
│   │   ├── text-formatter.ts
│   │   ├── image-generator.ts
│   │   ├── animation-generator.ts
│   │   └── svg-renderer.ts
│   ├── context/                # 上下文提供者
│   │   ├── context-provider.ts
│   │   ├── product-context.ts
│   │   └── history-context.ts
│   └── types/
│       ├── mcp.ts
│       ├── divination.ts
│       └── multimodal.ts
├── data/
│   ├── tarot-cards.json
│   ├── astrology-data.json
│   └── iching-hexagrams.json
├── tests/
│   ├── mcp.test.ts
│   ├── tools.test.ts
│   └── multimodal.test.ts
└── docs/
    ├── MCP_PROTOCOL.md
    ├── TOOLS_REFERENCE.md
    └── INTEGRATION_GUIDE.md
```

## 技术栈

- **MCP SDK**: @modelcontextprotocol/sdk
- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Image Generation**: DALL-E API / Stable Diffusion
- **SVG**: D3.js
- **Animation**: Lottie
- **Testing**: Jest

## 性能指标

- **响应时间**: < 500ms (不含图像生成)
- **图像生成**: < 5s
- **并发支持**: 100+ 请求/秒
- **准确度**: 基于专业占卜算法

## 安全性

- API Key 验证
- 速率限制
- 输入验证
- 输出过滤

## 许可证

MIT License
