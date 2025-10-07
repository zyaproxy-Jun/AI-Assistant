# 🎯 divination-mcp-server 最终部署指南

## 📦 项目状态

**✅ 项目完全就绪！所有功能已测试通过！**

- 版本: v1.0.1
- 状态: 生产就绪 (Production Ready)
- 测试通过率: 100% (10/10)
- 最后更新: 2025-01-06

---

## 🚀 5分钟快速部署

### 步骤 1: 克隆项目（如果还没有）

```bash
git clone <your-repo-url>
cd divination-mcp-server
```

### 步骤 2: 安装和构建

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 验证构建
npm run start
# 应该看到: "Divination MCP Server running on stdio"
# 按 Ctrl+C 退出
```

### 步骤 3: 快速测试

```bash
# 运行快速测试
node quick-test.js
```

**期望输出**:
```
✓ 服务器连接成功
✓ 发现 7 个工具
✓ 塔罗占卜正常
✓ 易经卜卦正常
✓ 八字命理正常
✅ 所有基础功能测试通过！
```

### 步骤 4: 配置 Claude Desktop

#### 4.1 找到配置文件

根据操作系统：

**macOS**:
```bash
open ~/Library/Application\ Support/Claude/
# 编辑 claude_desktop_config.json
```

**Windows**:
```powershell
explorer %APPDATA%\Claude
# 编辑 claude_desktop_config.json
```

**Linux**:
```bash
nano ~/.config/Claude/claude_desktop_config.json
```

#### 4.2 添加配置

复制以下内容，**替换路径为你的实际路径**：

```json
{
  "mcpServers": {
    "divination": {
      "command": "node",
      "args": [
        "/你的实际路径/divination-mcp-server/dist/index.js"
      ]
    }
  }
}
```

**获取实际路径**:
```bash
# 在项目目录运行
echo $(pwd)/dist/index.js
# 复制输出的路径
```

#### 4.3 重启 Claude Desktop

完全退出 Claude Desktop，然后重新启动。

### 步骤 5: 开始使用！

在 Claude Desktop 中输入：

```
请给我占卜一下今天的运势
```

如果看到占卜结果，恭喜！🎉 配置成功！

---

## 📚 所有可用命令

### 在 Claude Desktop 中使用

你可以用自然语言与 Claude 交互，Claude 会自动调用合适的占卜工具。

#### 塔罗牌

```
"给我抽一张塔罗牌"
"用塔罗牌看看我的感情运势"
"用凯尔特十字牌阵分析我的事业"
```

#### 易经

```
"用易经占卜：我应该换工作吗？"
"解读易经第1卦"
"用硬币法起一卦"
```

#### 八字

```
"分析 1990年5月20日上午10点出生的人的八字"
"看看我的五行缺什么"
```

#### 紫微斗数

```
"排一个紫微斗数命盘"
"2000年8月16日下午2点出生的女性，紫微命盘怎么样"
```

#### 西洋占星

```
"生成我的星盘"
"1990年5月20日14:30在北京出生的星盘"
```

#### 梦境解析

```
"解析我的梦：我梦见自己在飞"
"梦见水和鱼是什么意思"
```

---

## 🔧 高级配置

### 启用 AI 增强梦境解析

1. 获取 OpenAI API Key
2. 在配置中添加：

```json
{
  "mcpServers": {
    "divination": {
      "command": "node",
      "args": [
        "/你的路径/dist/index.js"
      ],
      "env": {
        "OPENAI_API_KEY": "sk-你的密钥"
      }
    }
  }
}
```

### 性能优化

限制内存使用：

```json
{
  "mcpServers": {
    "divination": {
      "command": "node",
      "args": [
        "--max-old-space-size=512",
        "/你的路径/dist/index.js"
      ]
    }
  }
}
```

### 调试模式

启用详细日志：

```json
{
  "mcpServers": {
    "divination": {
      "command": "node",
      "args": [
        "/你的路径/dist/index.js"
      ],
      "env": {
        "DEBUG": "true",
        "LOG_LEVEL": "debug"
      }
    }
  }
}
```

---

## 🐛 常见问题解决

### Q1: Claude Desktop 找不到服务器

**检查清单**:
```bash
# 1. 验证路径正确
ls /你的路径/dist/index.js

# 2. 测试服务器可以启动
node /你的路径/dist/index.js
# 应该显示: Divination MCP Server running on stdio

# 3. 检查配置文件语法
cat ~/.config/Claude/claude_desktop_config.json | jq .
# 应该没有语法错误

# 4. 检查权限
ls -la /你的路径/dist/index.js
```

### Q2: 某个占卜功能报错

**解决步骤**:
```bash
# 1. 重新构建
cd divination-mcp-server
npm run build

# 2. 运行测试
node quick-test.js

# 3. 检查依赖
npm list iztro lunar-javascript
```

### Q3: 性能慢或卡顿

**优化建议**:
```bash
# 1. 确保使用 Node.js 20+
node --version

# 2. 清理并重新安装
rm -rf node_modules package-lock.json
npm install

# 3. 使用生产模式
NODE_ENV=production npm start
```

### Q4: 梦境解析不工作

**说明**: 不配置 OpenAI API 时，使用规则基础解析（正常行为）

**如需 AI 解析**:
1. 获取 OpenAI API Key
2. 在配置中添加 `OPENAI_API_KEY`

---

## 📖 完整文档索引

| 文档 | 用途 | 位置 |
|------|------|------|
| README.md | 项目概述（英文） | 根目录 |
| README.zh-CN.md | 项目概述（中文） | 根目录 |
| USAGE_GUIDE.md | 详细使用指南 | 根目录 |
| CLAUDE_DESKTOP_SETUP.md | Claude 配置详解 | 根目录 |
| TEST_REPORT.md | 测试报告 | 根目录 |
| DEVELOPMENT.md | 开发文档 | 根目录 |
| ICHING_REFERENCE.md | 易经速查 | 根目录 |
| CHANGELOG.md | 版本历史 | 根目录 |

---

## 🎯 使用技巧

### 技巧 1: 组合占卜

```
"先用塔罗牌看看大方向，再用易经确认具体行动"
```

Claude 会自动：
1. 执行塔罗占卜
2. 分析结果
3. 执行易经占卜
4. 综合两种占卜的结果

### 技巧 2: 深度分析

```
"用紫微斗数和八字命理综合分析我的命格，
重点看事业和财运"
```

### 技巧 3: 持续对话

```
你: "给我占卜一下今天的运势"
Claude: [塔罗占卜结果]
你: "这张牌具体是什么意思？"
Claude: [详细解释]
你: "那我应该注意什么？"
Claude: [建议]
```

### 技巧 4: 指定方法

```
"用易经硬币法占卜"  # 指定硬币法
"用塔罗凯尔特十字牌阵"  # 指定牌阵
"解读易经第64卦"  # 指定卦象
```

---

## 🌟 最佳实践

### 占卜建议

1. **心诚则灵** - 保持专注和诚意
2. **问题明确** - 具体清晰的问题
3. **适度占卜** - 不要频繁占卜同一问题
4. **理性对待** - 结果仅供参考

### 技术建议

1. **定期更新** - `git pull && npm install && npm run build`
2. **检查日志** - Claude Desktop 的控制台输出
3. **备份配置** - 保存配置文件副本
4. **版本控制** - 记录当前使用的版本

---

## 🎊 成功案例

### 示例 1: 日常占卜

**用户**: "早安！给我占卜一下今天的运势"

**Claude**: [执行 tarot_reading]
```
您抽到了：太阳 (The Sun)
这是一张非常积极的牌...
```

### 示例 2: 决策参考

**用户**: "我在考虑是否要接受一个新工作机会，用易经帮我看看"

**Claude**: [执行 iching_divination]
```
本卦：升 (Pushing Upward)
象征上升、晋升...
```

### 示例 3: 命理分析

**用户**: "帮我分析 1990年5月20日10:00 出生的八字"

**Claude**: [执行 bazi_analysis]
```
年柱：庚午
月柱：辛巳
...
```

---

## 📊 项目统计

- **总代码**: 2,269 行 TypeScript
- **64卦数据**: 640 行完整数据
- **文档**: 11 个完整文档
- **测试通过率**: 100%
- **工具数量**: 7 个占卜工具
- **占卜方法**: 6 种传统占卜

---

## 🎯 下一步

### 现在就可以做

✅ 在 Claude Desktop 中使用所有占卜功能  
✅ 探索不同的占卜方法  
✅ 结合多种占卜进行综合分析  
✅ 学习传统占卜文化知识  

### 未来可以期待

⏳ 更精确的西洋占星算法  
⏳ 更多占卜方法（奇门遁甲、六爻等）  
⏳ Web UI 界面  
⏳ 历史记录功能  

---

## 🔗 有用链接

- 📖 [Model Context Protocol 文档](https://modelcontextprotocol.io/)
- 🔮 [易经基础知识](ICHING_REFERENCE.md)
- 🎴 [塔罗牌入门](https://tarot.com/)
- ⭐ [紫微斗数介绍](https://iztro.netlify.app/)

---

## 💝 感谢使用

感谢您选择 divination-mcp-server！

如果您觉得有帮助：
- ⭐ 给项目一个 Star
- 🐛 报告问题或建议
- 🤝 参与贡献

---

## 📞 需要帮助？

1. 📖 查看完整文档
2. 🔍 搜索已有 Issues
3. 💬 创建新 Issue
4. 📧 联系维护者

---

**🔮 祝您占卜愉快！May the stars guide you! 🔮**

---

*部署指南版本: 1.0*  
*最后更新: 2025-01-06*  
*状态: ✅ 生产就绪*
