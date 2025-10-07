# Claude Desktop 集成配置指南

## 📋 前置要求

- ✅ 已安装 Claude Desktop
- ✅ 已完成项目构建 (`npm run build`)
- ✅ Node.js 20+ 已安装

---

## 🚀 配置步骤

### 1. 找到配置文件位置

根据您的操作系统，找到 Claude Desktop 的配置文件：

#### macOS
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

#### Windows
```powershell
%APPDATA%\Claude\claude_desktop_config.json
```

#### Linux
```bash
~/.config/Claude/claude_desktop_config.json
```

### 2. 编辑配置文件

打开配置文件并添加以下内容：

```json
{
  "mcpServers": {
    "divination": {
      "command": "node",
      "args": [
        "/workspaces/AI-Assistant/divination-mcp-server/dist/index.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

**⚠️ 重要**：请将路径替换为您的实际项目路径！

#### 获取项目路径

在项目目录下运行：

```bash
pwd
# 或者
echo $(pwd)/dist/index.js
```

### 3. 可选：配置 OpenAI API（用于梦境解析）

如果要使用 AI 增强的梦境解析，添加环境变量：

```json
{
  "mcpServers": {
    "divination": {
      "command": "node",
      "args": [
        "/完整路径/divination-mcp-server/dist/index.js"
      ],
      "env": {
        "NODE_ENV": "production",
        "OPENAI_API_KEY": "sk-your-api-key-here"
      }
    }
  }
}
```

### 4. 重启 Claude Desktop

完全退出并重新启动 Claude Desktop 应用。

---

## ✅ 验证安装

### 方法 1：在 Claude Desktop 中测试

重启后，在 Claude Desktop 中输入：

```
请列出可用的占卜工具
```

如果配置成功，Claude 会显示可用的占卜工具列表。

### 方法 2：测试单个功能

尝试以下命令：

#### 塔罗占卜
```
用塔罗牌给我占卜一下今天的运势
```

#### 易经卜卦
```
用易经占卜：我应该换工作吗？
```

#### 八字分析
```
帮我分析一下 1990年5月20日上午10点出生的人的八字
```

#### 紫微斗数
```
用紫微斗数分析 2000年8月16日下午2点出生的女性命盘
```

---

## 🎯 使用示例

### 基础用法

```
# 简单请求
"给我抽一张塔罗牌"

# 指定详细参数
"用塔罗牌凯尔特十字牌阵分析我的感情问题"

# 多种占卜结合
"先用塔罗牌看看大方向，再用易经确认一下"
```

### 高级用法

```
# 综合分析
"用紫微斗数和八字命理综合分析我的命格"

# 对比分析
"用塔罗和易经分别占卜同一个问题，看看结果是否一致"

# 详细解读
"解读易经第1卦（乾卦），并说明在当前情况下的含义"
```

---

## 🐛 故障排查

### 问题 1：Claude Desktop 找不到服务器

**症状**：Claude 无法识别占卜工具

**解决方案**：
1. 检查配置文件路径是否正确
2. 确认使用了绝对路径（不是相对路径）
3. 检查 dist/index.js 文件是否存在
4. 完全重启 Claude Desktop（不是刷新）

### 问题 2：服务器启动失败

**症状**：看到错误提示或服务器无响应

**解决方案**：
```bash
# 1. 检查构建是否成功
npm run build

# 2. 手动测试服务器
node dist/index.js
# 应该看到: "Divination MCP Server running on stdio"

# 3. 检查 Node.js 版本
node --version
# 应该是 v20 或更高
```

### 问题 3：部分功能不可用

**症状**：某些占卜方法报错

**解决方案**：
1. **紫微斗数/八字错误**：检查 iztro 和 lunar-javascript 是否正确安装
   ```bash
   npm list iztro lunar-javascript
   ```

2. **梦境解析错误**：如果没有 OpenAI API Key，会降级到规则解析（正常）

3. **易经占卜错误**：确认已构建最新版本
   ```bash
   npm run build
   ```

### 问题 4：权限错误

**症状**：无法执行或读取文件

**解决方案**：
```bash
# 给予执行权限
chmod +x dist/index.js

# 检查文件权限
ls -la dist/index.js
```

---

## 📊 性能优化

### 提高响应速度

1. **使用 SSD 存储项目**
2. **确保 Node.js 是最新版本**
3. **减少不必要的日志输出**

### 减少内存占用

在配置中添加 Node.js 参数：

```json
{
  "mcpServers": {
    "divination": {
      "command": "node",
      "args": [
        "--max-old-space-size=512",
        "/完整路径/divination-mcp-server/dist/index.js"
      ]
    }
  }
}
```

---

## 🔒 安全建议

1. **不要在配置文件中存储敏感信息**
   - 使用环境变量或 .env 文件
   
2. **定期更新依赖**
   ```bash
   npm audit
   npm update
   ```

3. **限制文件权限**
   ```bash
   chmod 600 ~/.config/Claude/claude_desktop_config.json
   ```

---

## 📝 配置模板

### 最小配置（推荐）

```json
{
  "mcpServers": {
    "divination": {
      "command": "node",
      "args": ["/完整路径/dist/index.js"]
    }
  }
}
```

### 完整配置（包含所有选项）

```json
{
  "mcpServers": {
    "divination": {
      "command": "node",
      "args": [
        "--max-old-space-size=512",
        "/完整路径/divination-mcp-server/dist/index.js"
      ],
      "env": {
        "NODE_ENV": "production",
        "OPENAI_API_KEY": "sk-your-key",
        "LOG_LEVEL": "info"
      },
      "disabled": false
    }
  }
}
```

### 多个 MCP 服务器配置

```json
{
  "mcpServers": {
    "divination": {
      "command": "node",
      "args": ["/path/to/divination-mcp-server/dist/index.js"]
    },
    "other-server": {
      "command": "node",
      "args": ["/path/to/other-server/index.js"]
    }
  }
}
```

---

## 🎓 使用技巧

### 1. 自然语言交互

Claude 可以理解自然语言，无需记忆具体参数：

```
"帮我看看最近的运势"
→ Claude 会自动选择合适的占卜方法

"我想知道这个决定是否正确"
→ Claude 可能会用易经或塔罗
```

### 2. 组合使用

```
"先用塔罗看看大方向，如果结果是正面的，再用易经确认细节"
```

### 3. 深度分析

```
"用紫微斗数分析我的命盘，特别关注事业宫和财帛宫"
```

---

## 📞 获取帮助

如果遇到问题：

1. 📖 查看 [USAGE_GUIDE.md](USAGE_GUIDE.md)
2. 🔍 查看 [故障排查](#故障排查) 部分
3. 🐛 提交 GitHub Issue
4. 💬 查看项目文档

---

## ✨ 高级功能

### 自定义快捷命令

在 Claude Desktop 中创建常用命令：

```
# 设置别名（在对话中）
"当我说'每日一卦'时，用易经随机起一卦并解读"
```

### 批量占卜

```
"用塔罗牌分别占卜以下三个问题：1) 事业 2) 感情 3) 健康"
```

---

## 🎉 开始使用

配置完成后，您可以：

1. ✅ 在 Claude Desktop 中使用所有 6 种占卜方法
2. ✅ 自然语言交互，无需记忆命令
3. ✅ 组合使用多种占卜方法
4. ✅ 获得专业的占卜解读

**祝您占卜愉快！🔮**

---

*最后更新: 2025-01-06*  
*版本: 1.0.1*
