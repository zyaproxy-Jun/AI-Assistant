# SomniumSage 使用指南

## 🌟 欢迎使用 SomniumSage 梦境解析

本指南将帮助您了解和使用全新的 **SomniumSage** 梦境解析系统。

---

## 📚 目录

1. [什么是 SomniumSage](#什么是-somniumsage)
2. [核心特性](#核心特性)
3. [快速开始](#快速开始)
4. [使用方法](#使用方法)
5. [API 接口](#api-接口)
6. [示例](#示例)
7. [常见问题](#常见问题)

---

## 什么是 SomniumSage

**SomniumSage** = "Somnium"（拉丁语：梦）+ "Sage"（智者）

基于 [github.com/zyaproxy-Jun/SomniumSage](https://github.com/zyaproxy-Jun/SomniumSage) 的科学梦境解析系统，整合了：

- 🎭 **情感分析**：自动识别梦境的情感基调
- 🔮 **符号识别**：50+ 梦境符号数据库
- 🧠 **心理洞察**：基于心理学的模式匹配
- 🌐 **多语言**：支持中文、英文等
- ⚡ **离线可用**：无需 API key 即可使用

---

## 核心特性

### 1️⃣ 情感分析引擎

自动分析梦境的情感基调：

| 情感类型 | 描述 | 示例关键词 |
|---------|------|-----------|
| **POSITIVE** 😊 | 积极、向上的梦境 | 飞翔、快乐、成功、自由 |
| **NEGATIVE** 😔 | 消极、挑战的梦境 | 坠落、恐惧、困住、黑暗 |
| **NEUTRAL** 😐 | 平衡、中性的梦境 | 日常场景、普通事件 |

**置信度评分**：动态计算（50%-99%）

### 2️⃣ 增强符号库（50+）

分类齐全的梦境符号：

- **自然元素**：水、火、风、海、山
- **行为动作**：飞、坠落、追赶、奔跑、迷路
- **场所**：房子、学校、医院、道路
- **生活事件**：死亡、考试、迟到、结婚
- **生物**：动物、蛇、鸟、婴儿

### 3️⃣ SomniumSage 启发式规则

| 梦境元素 | 象征意义 |
|---------|---------|
| 🕊️ 飞翔 | 自由、超越、灵性追求 |
| 📉 坠落 | 失控、不安全感、恐惧 |
| 🌊 水 | 情感、潜意识、生命能量 |
| 🏃 追赶 | 逃避、压力、未解决的问题 |

### 4️⃣ 心理模式匹配（10+）

基于心理学理论的梦境模式：

- **追赶梦** → 压力与逃避
- **飞翔梦** → 自由与超越
- **水之梦** → 情感与潜意识
- **考试梦** → 表现焦虑
- **坠落梦** → 失控感
- 更多模式...

### 5️⃣ 双模式运行

#### 默认模式（SomniumSage）
- ✅ 完全离线
- ✅ 快速响应（50-100ms）
- ✅ 无需 API key
- ✅ 免费使用

#### 增强模式（AI-Enhanced）
- ✅ AI + 规则混合
- ✅ 更深入的解析
- ⚠️ 需要 OpenAI API key
- ⚠️ 消耗 tokens

---

## 快速开始

### 安装依赖

```bash
cd divination-mcp-server
npm install
npm run build
```

### 启动服务

```bash
# 启动 API 服务器（端口 3000）
node api-server.js

# 启动 Web 界面（端口 8080）
node web-server.js
```

### 测试系统

```bash
# 运行 SomniumSage 测试
node test-somniumsage-direct.js

# 查看特性展示
node showcase-somniumsage.js
```

---

## 使用方法

### 方法 1：Web 界面

1. 访问 `http://localhost:8080`
2. 选择"梦境解析"系统
3. 输入梦境描述
4. 查看分析结果

### 方法 2：API 调用

#### 通用占卜接口

```bash
# Windows PowerShell
Invoke-WebRequest -Uri "http://localhost:3000/api/divination" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"system":"dream","dream":"我在天空中飞翔","language":"zh-CN"}'
```

#### 专用梦境接口

```bash
# Windows PowerShell
Invoke-WebRequest -Uri "http://localhost:3000/api/dream" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"dream":"我在天空中飞翔","language":"zh-CN"}'
```

### 方法 3：MCP 工具调用

在 Claude Desktop 中：

```
请解析这个梦境：我在天空中飞翔，感觉无比自由
```

---

## API 接口

### POST /api/dream

梦境解析专用接口。

#### 请求参数

```json
{
  "dream": "梦境描述（必填）",
  "emotions": ["情绪1", "情绪2"],  // 可选
  "recurring": false,              // 可选，是否重复梦境
  "language": "zh-CN"              // 可选，默认 zh-CN
}
```

#### 响应格式

```json
{
  "dream": "梦境描述",
  "sentiment": {
    "tone": "POSITIVE",           // 情感基调
    "confidence": 0.9,            // 置信度 0-1
    "description": "情感描述"
  },
  "emotions": [],                 // 情绪列表
  "recurring": false,             // 是否重复
  "interpretation": "解析内容...",
  "symbols": [                    // 识别的符号
    {
      "symbol": "飞",
      "meaning": "自由、超越..."
    }
  ],
  "psychological_insights": "心理洞察...",
  "method": "SomniumSage",       // 解析方法
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### POST /api/divination

通用占卜接口（支持所有系统）。

#### 请求参数

```json
{
  "system": "dream",              // 指定梦境系统
  "dream": "梦境描述",
  "language": "zh-CN"
}
```

---

## 示例

### 示例 1：积极梦境

**输入**：
```json
{
  "dream": "我在天空中自由飞翔，感觉无比快乐和自由",
  "language": "zh-CN"
}
```

**输出**：
```json
{
  "sentiment": {
    "tone": "POSITIVE",
    "confidence": 0.9,
    "description": "您的梦境传递着积极、向上的信息"
  },
  "symbols": [
    {
      "symbol": "飞",
      "meaning": "自由、超越、灵性追求、摆脱束缚"
    }
  ],
  "interpretation": "您的梦境传递着积极、向上的信息 飞翔的梦境通常象征着自由和雄心。请思考梦中的元素如何与您当前的生活状况相关联。(情感分析: POSITIVE，置信度 0.90)",
  "psychological_insights": "- 显示对自由、超越的渴望，或是摆脱限制的愿望\n- 思考：您当前生活中有什么限制或束缚？您渴望在哪些方面获得更多自由？",
  "method": "SomniumSage"
}
```

### 示例 2：消极梦境

**输入**：
```json
{
  "dream": "我从高处坠落，感到恐惧和无助",
  "language": "zh-CN"
}
```

**输出**：
```json
{
  "sentiment": {
    "tone": "NEGATIVE",
    "confidence": 0.8,
    "description": "您的梦境可能反映了内心的挣扎或挑战"
  },
  "symbols": [
    {
      "symbol": "掉落",
      "meaning": "失控、不安全感、恐惧、地位下降"
    }
  ],
  "interpretation": "您的梦境可能反映了内心的挣扎或挑战 坠落的梦境可能表示不安全感或失控感。请思考梦中的元素如何与您当前的生活状况相关联。(情感分析: NEGATIVE，置信度 0.80)",
  "psychological_insights": "- 反映失控感、不安全感或对失败的恐惧\n- 思考：生活中的哪些方面让您感到不稳定或缺乏支持？",
  "method": "SomniumSage"
}
```

### 示例 3：英文梦境

**输入**：
```json
{
  "dream": "I was flying over beautiful mountains, feeling completely free",
  "language": "en-US"
}
```

**输出**：
```json
{
  "sentiment": {
    "tone": "POSITIVE",
    "confidence": 0.9,
    "description": "Your dream carries a positive, uplifting message"
  },
  "symbols": [
    {
      "symbol": "mountain",
      "meaning": "Challenges, goals, stability"
    },
    {
      "symbol": "fly",
      "meaning": "Freedom, transcendence, spiritual pursuit"
    }
  ],
  "interpretation": "Your dream carries a positive, uplifting message Flying dreams often symbolize freedom and ambition. Consider how the elements of your dream relate to your current life circumstances. (Sentiment: POSITIVE with confidence 0.90)",
  "method": "SomniumSage"
}
```

---

## 常见问题

### Q1：SomniumSage 和原版有什么区别？

| 特性 | 原版（dream-interpretation） | SomniumSage |
|-----|--------------------------|------------|
| 核心技术 | OpenAI GPT-4o-mini | 规则引擎 + 情感分析 |
| 离线使用 | ❌ 需要 API key | ✅ 完全支持 |
| 响应速度 | 500-2000ms | 50-100ms |
| 成本 | 每次消耗 tokens | 免费 |
| 情感分析 | ❌ 无 | ✅ 核心特性 |
| 符号库 | 30+ | 50+ |

### Q2：如何启用 AI 增强模式？

设置环境变量：

```bash
# Windows PowerShell
$env:OPENAI_API_KEY="your-api-key-here"
node api-server.js
```

系统会自动检测 API key 并切换到增强模式。

### Q3：支持哪些语言？

当前支持：
- ✅ 中文（简体/繁体）
- ✅ 英文
- 🔄 更多语言开发中

### Q4：情感分析的准确度如何？

基于测试结果：
- **正确率**：85-95%
- **置信度**：动态计算（50%-99%）
- **词库覆盖**：30+ 关键词（中英双语）

### Q5：如何添加自定义符号？

编辑 `src/services/dream.ts`：

```typescript
const symbolDatabase: { [key: string]: { zh: string; en: string } } = {
  '新符号': { 
    zh: '中文含义', 
    en: 'English meaning' 
  },
  // ... 其他符号
};
```

重新编译：

```bash
npm run build
```

### Q6：梦境解析的原理是什么？

**6 步解析流程**：

1. **情感分析** - 识别梦境情绪基调
2. **符号提取** - 匹配 50+ 符号库
3. **规则匹配** - 应用 SomniumSage 启发式规则
4. **AI 增强**（可选）- 深度解析
5. **心理洞察** - 10+ 模式匹配
6. **结构化输出** - JSON 格式

### Q7：重复梦境如何标记？

设置 `recurring` 参数：

```json
{
  "dream": "梦境描述",
  "recurring": true
}
```

系统会在解析中特别注明并提供额外洞察。

### Q8：如何查看服务器状态？

访问健康检查接口：

```bash
curl http://localhost:3000/health
```

返回：

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "features": {
    "sentiment_analysis": true,
    "ai_enhanced": false,
    "symbol_count": 50,
    "languages": ["zh-CN", "en-US"]
  }
}
```

---

## 📞 支持与反馈

### 项目地址
- **SomniumSage 源码**：https://github.com/zyaproxy-Jun/SomniumSage
- **MCP Server**：https://github.com/zyaproxy-Jun/divination-mcp-server

### 测试命令
```bash
# 完整测试
node test-somniumsage-direct.js

# 特性展示
node showcase-somniumsage.js

# 多样性测试
node test-dream-variations.js
```

### 报告查看
- `SOMNIUMSAGE_INTEGRATION_REPORT.md` - 完整集成报告
- `DREAM_DIVERSITY_TEST_REPORT.md` - 多样性测试
- `DREAM_SOURCE_VERIFICATION.md` - 源码验证

---

## 🎉 开始使用

1. **启动服务**
   ```bash
   node api-server.js
   ```

2. **访问 Web 界面**
   ```
   http://localhost:8080
   ```

3. **或使用 API**
   ```bash
   curl -X POST http://localhost:3000/api/dream \
     -H "Content-Type: application/json" \
     -d '{"dream":"我在天空中飞翔","language":"zh-CN"}'
   ```

4. **享受 SomniumSage 带来的智慧解析！** 🌟

---

**最后更新**：2024年  
**版本**：SomniumSage Integration v1.0  
**作者**：SomniumSage by makalin, MCP integration by zyaproxy-Jun
