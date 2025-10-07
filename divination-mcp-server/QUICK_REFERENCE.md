# 🔮 占卜MCP服务器 - 快速参考卡

## ⚠️ 重要提示

```
┌─────────────────────────────────────────────────────────────┐
│  ❌ Web页面 (http://localhost:8080) 是静态演示            │
│                                                             │
│  ✅ 实际占卜功能需要通过MCP协议调用                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 3种实际调用方法

### 1️⃣ 命令行测试（最快）

```bash
# 快速验证
node quick-test.js

# 单个功能测试
node test-tarot-call.js

# 完整演示
node demo-live-calls.js

# 所有功能测试
node test-all-features.js
```

### 2️⃣ Claude Desktop（推荐日常使用）

**配置一次，永久使用**

1. 编辑配置文件：`%APPDATA%\Claude\claude_desktop_config.json`
2. 重启Claude Desktop
3. 在对话中说："帮我抽一张塔罗牌"

详见：`CLAUDE_DESKTOP_SETUP.md`

### 3️⃣ 编程调用（开发者）

```javascript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';

const result = await client.callTool({
  name: 'tarot_reading',
  arguments: {
    spread_type: 'single',
    question: '我的运势如何？',
    language: 'zh-CN'
  }
});
```

参考：`test-tarot-call.js`

---

## 📊 测试结果

```
✅ 所有7个占卜系统 - 100%通过
✅ 塔罗占卜   - 4ms    (极快)
✅ 紫微斗数   - 111ms  (良好)
✅ 西洋占星   - 10s    (正常)
✅ 梦境解析   - 7ms    (极快)
✅ 八字命理   - 22ms   (快速)
✅ 易经卜卦   - 2ms    (极快)
✅ 易经查询   - 1ms    (极快)
```

---

## 🎯 7个可用工具

| 工具 | 名称 | 响应速度 |
|------|------|---------|
| 🃏 | `tarot_reading` | ⚡ 极快 |
| ⭐ | `ziwei_chart` | ✅ 良好 |
| 🌌 | `birth_chart` | ✅ 正常 |
| 💭 | `interpret_dream` | ⚡ 极快 |
| 🎋 | `bazi_analysis` | ⚡ 快速 |
| ☯️ | `iching_divination` | ⚡ 极快 |
| ☯️ | `iching_hexagram` | ⚡ 极快 |

---

## 📚 文档清单

✅ **ACTUAL_USAGE_GUIDE.md** - 实际使用完整指南（推荐阅读）  
✅ **MCP_TEST_REPORT.md** - 详细测试报告  
✅ **CLAUDE_DESKTOP_SETUP.md** - Claude Desktop配置  
✅ **test-tarot-call.js** - 调用示例代码  
✅ **demo-live-calls.js** - 完整演示脚本  

---

## ❓ 常见问题

**Q: Web页面为什么不能占卜？**  
A: Web页面仅用于展示参数，实际功能需要MCP调用。

**Q: 如何快速验证服务器？**  
A: 运行 `node quick-test.js`

**Q: 如何查看调用示例？**  
A: 运行 `node demo-live-calls.js`

**Q: 如何在Claude中使用？**  
A: 参考 `CLAUDE_DESKTOP_SETUP.md` 配置

---

## 🎉 系统状态

```
🟢 MCP服务器：正常运行
🟢 所有占卜系统：测试通过
🟢 文档：完整齐全
🟢 示例代码：可直接运行
```

**✨ 生产就绪，可放心使用！**

---

最后更新：2025-10-07  
服务器版本：1.0.1
