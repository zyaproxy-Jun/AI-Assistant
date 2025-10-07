# 🌐 访问占卜系统Web界面

## ✅ 服务器状态

两个服务器都在正常运行：
- **API服务器**: 运行在 `localhost:3000` (PID 8642)
- **Web服务器**: 运行在 `localhost:8080` (PID 13543)

## 🔍 测试结果

所有API功能都已验证通过：
- ✅ 西洋占星: 摩羯座/白羊座/天秤座
- ✅ 八字命理: 庚午/壬午/庚辰/癸未
- ✅ 梦境解析: 情绪和符号都有数据

## 🌐 访问方式

### 方法1: VS Code内置浏览器（推荐）

1. 在VS Code中，按 `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. 输入 "Simple Browser"
3. 输入URL: `http://localhost:8080`

或者直接点击VS Code右下角通知中的"在浏览器中打开"链接。

### 方法2: 外部浏览器

如果您想在外部浏览器访问：

1. **查看端口转发**
   - 在VS Code底部，找到"端口"标签
   - 查看端口8080是否已转发
   - 如果没有，点击"添加端口"，输入 `8080`

2. **获取转发URL**
   - 在端口列表中，找到8080端口
   - 点击"地球"图标或复制"转发的地址"
   - 该地址通常是: `https://xxx-8080.preview.app.github.dev`

3. **访问页面**
   - 主页: `转发地址/`
   - 测试结果: `转发地址/test-results.html`

### 方法3: 命令行测试

如果浏览器访问有问题，可以使用命令行测试：

```bash
# 测试所有功能
cd /workspaces/AI-Assistant/divination-mcp-server
./test-fixes-simple.sh

# 或单独测试
curl -X POST http://localhost:3000/api/astrology -H "Content-Type: application/json" -d '{...}'
```

## 📊 可用页面

- **主页**: `http://localhost:8080/`
  - 展示所有占卜系统
  - 包含API调用示例

- **测试结果页**: `http://localhost:8080/test-results.html`
  - 显示修复验证结果
  - 漂亮的UI展示

- **详细报告**: `http://localhost:8080/FIX_3_ISSUES_REPORT.md`
  - 完整修复文档

## 🐛 故障排除

### "ERR_CONNECTION_REFUSED"

**原因**: 您在dev container中，需要端口转发才能从外部访问。

**解决方案**:
1. 使用VS Code内置的Simple Browser（方法1）
2. 或设置端口转发（方法2）

### 端口未转发

```bash
# 检查服务器状态
ps aux | grep node

# 检查端口监听
netstat -tlnp | grep 8080

# 重启服务器
pkill -f "node.*web-server"
cd /workspaces/AI-Assistant/divination-mcp-server
node web-server.js > /tmp/web-server.log 2>&1 &
```

## 📝 相关命令

```bash
# 查看服务器日志
tail -f /tmp/web-server.log
tail -f /tmp/api-server.log

# 重启所有服务
cd /workspaces/AI-Assistant/divination-mcp-server
pkill -f "node.*(api-server|web-server)"
node api-server.js > /tmp/api-server.log 2>&1 &
sleep 2
node web-server.js > /tmp/web-server.log 2>&1 &

# 测试API
curl http://localhost:8080/
curl http://localhost:3000/api/health
```

## ✨ 下一步

1. **在VS Code内置浏览器中打开**: `http://localhost:8080`
2. 测试所有6个占卜系统
3. 验证3个修复的问题都已解决

---

**提示**: 由于您在GitHub Codespaces/dev container中，推荐使用VS Code的内置Simple Browser进行访问，这样不需要配置端口转发。
