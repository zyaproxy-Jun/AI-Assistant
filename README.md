# 🌟 Ether AI Assistant - 四智能体系统

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/zyaproxy-Jun/AI-Assistant.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

> 基于四智能体架构的完整 AI 占卜电商系统

---

## 📋 目录

- [系统概览](#系统概览)
- [核心智能体](#核心智能体)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [核心流程](#核心流程)
- [文档](#文档)
- [开发状态](#开发状态)

---

## 🎯 系统概览

Ether AI Assistant 是一个完整的 AI 占卜电商系统，采用四智能体协作架构，提供从占卜到商品推荐、支付、交付和社交分享的完整用户旅程。

### 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                    用户前端 (6 个占卜按钮)                     │
│      🌙 解梦 | 🃏 塔罗 | 📿 易经 | ⭐ 紫微 | 🎋 八字 | 🌌 星座   │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ↓                ↓                ↓
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ 对话与导购    │  │ 占卜计算      │  │ 交易与订单    │
│ 智能体        │◄─┤ 智能体        │  │ 智能体        │
│ (端口 4000)   │  │ (端口 3000)   │  │ (端口 5000)   │
└──────┬───────┘  └──────────────┘  └──────┬───────┘
       │                                    │
       │          ┌─────────────────────────┘
       │          │
       ↓          ↓
┌──────────────────────────────────────────────┐
│     交付、评价与分享智能体 (端口 6000)        │
│     • 数字/实物交付                           │
│     • 评价系统                                │
│     • 13 种社交媒体分享                       │
└──────────────────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────────────┐
│         MongoDB 数据库 (端口 27017)           │
│    • 商品数据  • 订单数据  • 用户数据         │
└──────────────────────────────────────────────┘
```

---

## 🤖 核心智能体

### 1️⃣ 对话与导购智能体 (Conversation & Recommendation)
**目录**: `conversation-recommendation-agent/`  
**端口**: 4000  
**状态**: ✅ 已完成，运行中

**功能**:
- ✅ 流程 1: 占卜触发与结果展示
  - 6 种占卜类型支持
  - 动态参数收集表单
  - 多模态结果渲染 (文本 + 图像 + 动画)
  
- ✅ 流程 2: 智能商品匹配与推荐
  - 4 维度加权匹配算法 (主题 40% + 关键词 30% + 情感 20% + 权重 10%)
  - 实物 + 数字商品推荐
  - 个性化推荐理由生成

**技术栈**: TypeScript + Express + MongoDB + Axios

---

### 2️⃣ 占卜计算智能体 (Fortune-Telling Computation)
**目录**: `divination-mcp-server/`  
**端口**: 3000  
**状态**: ✅ 已完成，待启动

**功能**:
- 🌙 解梦 (Dream Interpretation)
- 🃏 塔罗牌 (Tarot Reading)
- 📿 易经 (I-Ching)
- ⭐ 紫微斗数 (Ziwei Doushu)
- 🎋 八字 (BaZi/Four Pillars)
- 🌌 西方占星 (Western Astrology)

**技术栈**: JavaScript + Express + MCP Protocol

---

### 3️⃣ 交易与订单智能体 (Transaction & Order)
**目录**: `transaction-order-agent/`  
**端口**: 5000  
**状态**: ✅ 已完成，待启动

**功能**:
- ✅ 流程 3: 定制表单与支付
  - 动态表单生成 (实物/数字商品)
  - 5 种支付网关 (Stripe, PayPal, Alipay, WeChat Pay, USDC)
  
- ✅ 流程 4: 订单处理与商家通知
  - MongoDB 订单管理
  - Webhook + 邮件 + 短信通知

**技术栈**: TypeScript + Express + MongoDB + Payment Gateways

---

### 4️⃣ 交付、评价与分享智能体 (Fulfillment, Review & Sharing)
**目录**: `fulfillment-review-agent/`  
**端口**: 6000  
**状态**: ✅ 已完成，待启动

**功能**:
- ✅ 流程 5: 商品交付与用户评价
  - 数字商品: 下载链接/访问码
  - 实物商品: 物流追踪 (SF, DHL, FedEx, EMS)
  - 星级评价 + 文字 + 图片上传
  
- ✅ 流程 6: 评价提交与社交分享
  - 13 种社交媒体 LOGO
  - 分享内容生成 (文本 + 图片 + QR 码)
  - 手动复制分享机制

**技术栈**: TypeScript + Express + MongoDB + Logistics APIs

---

## 🛠️ 技术栈

### 后端框架
- **Node.js** v18+
- **Express** - REST API 服务器
- **TypeScript** - 类型安全

### 数据库
- **MongoDB** - 主数据库
- **Docker** - 容器化部署

### 支付网关
- **Stripe** - 国际信用卡
- **PayPal** - 国际支付
- **Alipay** - 支付宝
- **WeChat Pay** - 微信支付
- **USDC** - 加密货币

### 社交平台集成
- Matrix, Telegram, Shorts-Stack, TikTok
- Discord, Discourse, Reddit, X (Twitter)
- Facebook, YouTube, Pinterest, Instagram, Fiverr

---

## 🚀 快速开始

### 前置要求

```bash
- Node.js v18+ 
- Docker Desktop (用于 MongoDB)
- Git
```

### 1. 克隆项目

```bash
git clone https://github.com/zyaproxy-Jun/AI-Assistant.git
cd AI-Assistant
```

### 2. 启动 MongoDB

```powershell
# Windows PowerShell
.\start-mongodb-docker.ps1

# 或者手动启动
docker run -d -p 27017:27017 --name mongodb `
  -e MONGO_INITDB_ROOT_USERNAME=admin `
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 `
  mongo:6.0
```

### 3. 启动各个智能体

#### 对话与导购智能体 (必需)
```bash
cd conversation-recommendation-agent
npm install
npm run build
npm start
# 运行在 http://localhost:4000
```

#### 占卜计算智能体 (必需)
```bash
cd divination-mcp-server
npm install
node api-server.js
# 运行在 http://localhost:3000
```

#### 交易与订单智能体 (可选)
```bash
cd transaction-order-agent
npm install
npm run build
npm start
# 运行在 http://localhost:5000
```

#### 交付、评价与分享智能体 (可选)
```bash
cd fulfillment-review-agent
npm install
npm run build
npm start
# 运行在 http://localhost:6000
```

### 4. 验证系统

```powershell
# 运行系统检查脚本
.\check-four-agents-system.ps1

# 或者快速检查
.\quick-check.ps1
```

---

## 📁 项目结构

```
AI-Assistant/
│
├── 📄 README.md - 项目主文档
├── 📄 FOUR_AGENTS_SYSTEM_REDESIGN.md - 系统设计
├── 📄 CORE_FLOWS_DETAILED.md - 详细流程
├── 📄 IMPLEMENTATION_GUIDE.md - 实施指南
├── 📄 CODING_COMPLETE_SUMMARY.md - 开发完成总结
├── 📄 ENV_CONFIGURATION_GUIDE.md - 环境配置
├── 📄 TESTING_GUIDE.md - 测试指南
├── 📄 DEPLOYMENT_GUIDE.md - 部署指南
├── 📄 PROJECT_CLEANUP_PLAN.md - 清理计划
├── 📄 PROJECT_CLEANUP_COMPLETE.md - 清理完成报告
│
├── 🛠️ quick-check.ps1 - 快速检查
├── 🛠️ check-services.ps1 - 服务检查
├── 🛠️ check-four-agents-system.ps1 - 系统检查
├── 🛠️ start-mongodb-docker.ps1 - MongoDB 启动
│
├── 📁 conversation-recommendation-agent/ - ✅ 运行中
│   ├── src/
│   │   ├── actions/ - 占卜触发 & 商品匹配
│   │   ├── services/ - MCP Client, Product Matcher, Renderer
│   │   ├── types/ - TypeScript 类型定义
│   │   ├── data/ - 商品数据 (10 个)
│   │   └── index.ts - 主入口
│   ├── dist/ - 编译后的 JS
│   ├── import-products.js - 数据导入脚本
│   ├── quick-test.js - 快速测试
│   └── package.json
│
├── 📁 divination-mcp-server/ - ✅ 已完成
│   ├── src/
│   │   ├── dream/ - 解梦引擎
│   │   ├── tarot/ - 塔罗牌
│   │   ├── iching/ - 易经
│   │   ├── ziwei/ - 紫微斗数
│   │   ├── bazi/ - 八字
│   │   └── astrology/ - 西方占星
│   ├── api-server.js - API 服务器
│   ├── quick-test.js - 测试脚本
│   ├── test-all-divinations.js - 完整测试
│   ├── showcase-somniumsage.js - 展示脚本
│   └── README.md
│
├── 📁 transaction-order-agent/ - ✅ 已完成
│   ├── src/
│   │   ├── orders/ - 订单管理
│   │   ├── payment/ - 支付网关
│   │   ├── database/ - MongoDB 客户端
│   │   └── index.ts - 主入口
│   ├── dist/ - 编译后的 JS
│   └── package.json
│
└── 📁 fulfillment-review-agent/ - ✅ 已完成
    ├── src/
    │   ├── delivery/ - 交付管理
    │   ├── review/ - 评价系统
    │   ├── sharing/ - 社交分享
    │   └── index.ts - 主入口
    ├── dist/ - 编译后的 JS
    └── package.json
```

**📊 项目清理统计** (2025-10-08):
- ✅ 删除了 73 个冗余文件
- ✅ 释放约 8 MB 磁盘空间
- ✅ 文件数量减少 76% (从 84 → 20 核心文件)
- ✅ 文档从 35 个精简到 10 个核心文档

---

## 🔄 核心流程

### 流程 1: 占卜触发 (✅ 已实现)
```
用户点击 6 个占卜按钮
    ↓
对话收集参数 (动态表单)
    ↓
MCP Client 调用占卜服务
    ↓
多模态展示 (文本 + 图像 + 动画)
```

### 流程 2: 商品匹配 (✅ 已实现)
```
占卜结果 (主题 + 关键词 + 情感)
    ↓
智能匹配算法 (4 维度加权)
    ↓
MongoDB 查询商品
    ↓
商品轮播展示 + 推荐理由
```

### 流程 3-6 (⏳ 待集成测试)
详见 [CORE_FLOWS_DETAILED.md](CORE_FLOWS_DETAILED.md)

---

## 📚 文档

### 系统设计
- [FOUR_AGENTS_SYSTEM_REDESIGN.md](FOUR_AGENTS_SYSTEM_REDESIGN.md) - 完整系统设计
- [CORE_FLOWS_DETAILED.md](CORE_FLOWS_DETAILED.md) - 流程可视化
- [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) - 实施指南

### 开发文档
- [CODING_COMPLETE_SUMMARY.md](CODING_COMPLETE_SUMMARY.md) - 开发总结
- [ENV_CONFIGURATION_GUIDE.md](ENV_CONFIGURATION_GUIDE.md) - 环境配置
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - 测试指南

### 运维文档
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - 部署指南

### 项目清理
- [PROJECT_CLEANUP_PLAN.md](PROJECT_CLEANUP_PLAN.md) - 清理计划
- [PROJECT_CLEANUP_COMPLETE.md](PROJECT_CLEANUP_COMPLETE.md) - 清理完成报告

---

## 📊 开发状态

### 总体进度
```
流程 1 (占卜触发):   ████████████████████████ 100%
流程 2 (商品匹配):   ████████████████████████ 100%
流程 3 (支付流程):   ████████████████████████ 100% (待测试)
流程 4 (订单处理):   ████████████████████████ 100% (待测试)
流程 5 (商品交付):   ████████████████████████ 100% (待测试)
流程 6 (社交分享):   ████████████████████████ 100% (待测试)
───────────────────────────────────────────────────
总体进度:            ████████████████████████ 100% (代码完成)
集成测试:            ████████░░░░░░░░░░░░░░░░  33% (进行中)
项目清理:            ████████████████████████ 100% (已完成)
```

### 智能体状态
- ✅ **对话与导购智能体**: 运行中 (端口 4000)
- ⏳ **占卜计算智能体**: 待启动 (端口 3000)
- ⏳ **交易与订单智能体**: 待启动 (端口 5000)
- ⏳ **交付评价分享智能体**: 待启动 (端口 6000)
- ✅ **MongoDB 数据库**: 运行中 (端口 27017)

---

## 🧪 测试

### 快速测试
```powershell
# 系统健康检查
.\quick-check.ps1

# 完整系统检查
.\check-four-agents-system.ps1

# 对话与导购智能体测试
cd conversation-recommendation-agent
npm run test:quick
```

### API 测试
```bash
# 健康检查
curl http://localhost:4000/health

# 获取解梦表单
curl http://localhost:4000/api/divination/forms/dream

# 完整流程测试
curl -X POST http://localhost:4000/api/test/full-flow \
  -H "Content-Type: application/json" \
  -d '{"type":"dream","userId":"test-001","parameters":{"dream_description":"我梦见自己在飞翔"}}'
```

---

## 🤝 贡献

欢迎贡献！请阅读 [贡献指南](CONTRIBUTING.md) 了解详情。

---

## 📝 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 👥 团队

- **项目负责人**: [Your Name]
- **开发团队**: Ether AI Team
- **技术支持**: GitHub Copilot

---

## 📞 联系方式

- **GitHub**: [@zyaproxy-Jun](https://github.com/zyaproxy-Jun)
- **Email**: dev@ether.ai (示例)
- **文档**: [GitHub Wiki](https://github.com/zyaproxy-Jun/AI-Assistant/wiki)

---

## 🎉 致谢

感谢所有为本项目做出贡献的开发者！

---

**最后更新**: 2025-10-08  
**版本**: v1.0.0  
**状态**: ✅ 代码完成，项目结构已优化  
**项目清理**: ✅ 73 个冗余文件已删除 (76% 减少)