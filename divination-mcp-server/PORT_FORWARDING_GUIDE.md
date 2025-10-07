# 🌐 访问占卜系统 - 端口转发完整指南

## ⚠️ 问题说明

您看到的错误：
```
ERR_CONNECTION_REFUSED
localhost 拒绝了我们的连接请求
```

**原因**: 您在 GitHub Codespaces/Dev Container 环境中，`localhost` 只能在容器内部访问，外部浏览器无法直接连接。

**解决**: 需要通过端口转发将容器内的端口映射到公网URL。

---

## ✅ 解决方案（3种方法）

### 🥇 方法1: VS Code 端口转发（推荐给外部浏览器）

#### 📋 详细步骤：

**步骤1: 打开端口面板**
```
在 VS Code 窗口底部，找到面板标签栏：
[终端] [问题] [输出] [调试控制台] [端口] ← 点击这个
```

**步骤2: 查看当前端口**
```
端口面板会显示：
┌──────┬───────────────────┬─────────────────────────────────┬──────────┐
│ 端口 │ 本地地址          │ 转发的地址                       │ 可见性   │
├──────┼───────────────────┼─────────────────────────────────┼──────────┤
│ 8080 │ localhost:8080    │ https://xxx-8080.app.github.dev │ Private  │
└──────┴───────────────────┴─────────────────────────────────┴──────────┘
```

如果没有看到端口 8080：
- 点击面板右上角的 **"添加端口"** 按钮（或 ➕ 图标）
- 输入：`8080`
- 按 Enter

**步骤3: 设置端口为 Public**
```
1. 右键点击 8080 端口行
2. 选择 "端口可见性" (Port Visibility)
3. 选择 "Public" （让外部可以访问）
```

**步骤4: 获取转发URL**
```
在"转发的地址"列，会显示类似：
https://symmetrical-space-computing-machine-xxx-8080.app.github.dev

点击这个URL，或：
- 鼠标悬停会显示"在浏览器中打开"图标 🌐
- 点击图标在外部浏览器打开
- 或右键 → "在浏览器中打开"
```

**步骤5: 访问页面**
```
在外部浏览器中，您应该能看到：
- 主页: <转发URL>/
- 测试结果: <转发URL>/test-results.html
```

---

### 🥈 方法2: VS Code Simple Browser（最简单）

如果您不需要在外部浏览器访问，直接在 VS Code 内查看：

**步骤：**
```
1. 按 Ctrl+Shift+P (Mac: Cmd+Shift+P)
2. 输入: "Simple Browser"
3. 选择: "Simple Browser: Show"
4. 在URL框中输入: http://localhost:8080
5. 按 Enter
```

✅ 这样就可以在 VS Code 编辑器内直接查看网页了！

---

### 🥉 方法3: 使用 GitHub CLI（高级）

如果您熟悉命令行：

```bash
# 设置端口为 public
gh codespace ports visibility 8080:public

# 查看转发URL
gh codespace ports
```

---

## 🔍 验证服务器状态

运行以下命令确认服务器正在运行：

```bash
# 检查进程
ps aux | grep -E "node.*(web-server|api-server)" | grep -v grep

# 检查端口
netstat -tlnp | grep -E ":(3000|8080)"

# 测试API
curl http://localhost:8080/
```

预期结果：
```
✅ node api-server.js (PID: 8642, 端口 3000)
✅ node web-server.js (PID: 13543, 端口 8080)
✅ API响应正常
```

---

## 📱 访问测试页面

成功转发后，可以访问：

1. **主页**: `<转发URL>/`
   - 展示所有占卜系统
   - API调用示例

2. **测试结果**: `<转发URL>/test-results.html`
   - 修复验证报告
   - 漂亮的UI展示

3. **API文档**: `<转发URL>/FIX_3_ISSUES_REPORT.md`
   - 详细修复说明

---

## 🐛 故障排除

### Q: 端口面板中没有 8080 端口

**A**: 手动添加
```
1. 点击端口面板右上角的 "➕" 或 "添加端口"
2. 输入: 8080
3. 按 Enter
```

### Q: 转发URL访问显示 404

**A**: 检查路径
```
确保访问根路径: https://xxx-8080.app.github.dev/
不要包含 localhost: https://xxx-8080.app.github.dev/localhost:8080 ❌
```

### Q: 端口可见性是 Private，无法访问

**A**: 改为 Public
```
右键端口 8080 → 端口可见性 → Public
```

### Q: 服务器没有运行

**A**: 重启服务器
```bash
cd /workspaces/AI-Assistant/divination-mcp-server

# 停止旧进程
pkill -f "node.*web-server"
pkill -f "node.*api-server"

# 启动新进程
node api-server.js > /tmp/api-server.log 2>&1 &
node web-server.js > /tmp/web-server.log 2>&1 &

# 验证
ps aux | grep node
```

---

## 💡 快速参考

| 需求 | 方法 | 适用场景 |
|------|------|----------|
| 外部浏览器访问 | 方法1: 端口转发 | Chrome/Firefox等 |
| VS Code内查看 | 方法2: Simple Browser | 快速测试 |
| 命令行操作 | 方法3: gh CLI | 自动化脚本 |

---

## 🎯 推荐流程

**首次访问**:
1. 使用 **方法2 (Simple Browser)** 快速验证功能正常
2. 如需分享或完整测试，使用 **方法1 (端口转发)**

**日常使用**:
- 开发调试: Simple Browser
- 演示分享: 端口转发 + 外部浏览器

---

## 📞 还有问题？

运行快速诊断：
```bash
cd /workspaces/AI-Assistant/divination-mcp-server
./test-fixes-simple.sh
```

查看日志：
```bash
tail -f /tmp/web-server.log
tail -f /tmp/api-server.log
```

---

**✨ 服务器已就绪，等待您的访问！**
