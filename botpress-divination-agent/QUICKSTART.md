# 快速启动指南

## 前置要求

1. **Node.js**: >= 18.0.0
2. **Botpress CLI**: 安装最新版本
3. **MCP Server**: 确保 divination-mcp-server 正在运行

## 步骤 1: 安装依赖

```bash
cd botpress-divination-agent
npm install
```

## 步骤 2: 配置环境变量

复制 `.env.example` 为 `.env`:

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入必要的配置:

```env
MCP_SERVER_URL=http://localhost:3000
BOTPRESS_WORKSPACE_ID=your_workspace_id
BOTPRESS_BOT_ID=your_bot_id
```

## 步骤 3: 启动 MCP Server

在另一个终端窗口:

```bash
cd ../divination-mcp-server
node api-server.js
```

确认 MCP Server 在 `http://localhost:3000` 运行成功。

## 步骤 4: 构建项目

```bash
npm run build
```

## 步骤 5: 部署到 Botpress

```bash
npm run deploy
```

或者使用 Botpress CLI:

```bash
bp deploy
```

## 步骤 6: 测试智能体

### 使用 CLI 测试

```bash
npm run chat
```

### 使用 Botpress Studio

1. 登录 [Botpress Cloud](https://app.botpress.cloud)
2. 进入你的 Workspace
3. 选择已部署的智能体
4. 在右侧聊天窗口测试

## 测试场景

### 场景 1: 解梦

```
用户: 我想解个梦
智能体: 🌙 好的！请告诉我您梦到了什么？
用户: 我梦见自己在天上飞
智能体: [显示解梦结果 + 推荐商品]
```

### 场景 2: 塔罗占卜

```
用户: 帮我用塔罗牌占卜
智能体: 🃏 请告诉我您想要占卜的问题
用户: 我的事业发展如何
智能体: [显示塔罗结果 + 推荐商品]
```

### 场景 3: 商品咨询

```
用户: 有什么水晶推荐吗
智能体: [显示水晶商品列表]
```

## 常见问题

### Q: MCP Server 连接失败

**A**: 检查以下几点:
1. MCP Server 是否正在运行
2. 端口 3000 是否被占用
3. `.env` 中的 `MCP_SERVER_URL` 是否正确

### Q: 部署失败

**A**: 确认:
1. 已安装 `@botpress/cli`
2. 已登录 Botpress: `bp login`
3. 工作区 ID 配置正确

### Q: 商品推荐不准确

**A**: 调整 `data/matching-rules.json` 中的匹配规则和权重。

## 开发模式

### 监听文件变化

```bash
npm run dev
```

### 运行测试

```bash
npm test
```

### 代码格式化

```bash
npm run format
```

### 代码检查

```bash
npm run lint
```

## 下一步

- 📖 阅读完整文档: [README.md](README.md)
- 🔧 自定义对话流: 编辑 `src/flows/*.json`
- 🛍️ 添加商品: 编辑 `data/products.json`
- 🎨 自定义界面: 在 Botpress Studio 中调整

## 获取帮助

- Discord: [Botpress Community](https://discord.gg/botpress)
- Issues: [GitHub Issues](https://github.com/zyaproxy-Jun/AI-Assistant/issues)
- 文档: [Botpress Docs](https://botpress.com/docs)
