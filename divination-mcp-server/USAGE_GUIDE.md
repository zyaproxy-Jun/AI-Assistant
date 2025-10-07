# 综合占卜 MCP Server 使用指南

## 项目概述

这是一个集成了多种占卜系统的 MCP (Model Context Protocol) 服务器，整合了以下占卜方法：

1. **塔罗占卜** - 基于传统塔罗牌系统
2. **紫微斗数** - 中国传统命理学
3. **西洋占星** - 星盘分析
4. **梦境解析** - AI辅助的梦境分析
5. **八字命理** - 四柱八字分析
6. **易经卜卦** - 周易六十四卦

## 快速安装

### 1. 安装 Node.js

确保已安装 Node.js 18 或更高版本：

```bash
node --version  # 应该显示 v18.0.0 或更高
```

### 2. 安装项目依赖

```bash
cd /workspaces/AI-Assistant/divination-mcp-server
npm install
```

### 3. 构建项目

```bash
npm run build
```

### 4. 配置环境变量（可选）

如果要使用 AI 增强的梦境解析：

```bash
cp .env.example .env
# 编辑 .env 文件，添加 OpenAI API Key
```

## 配置 MCP 客户端

### Claude Desktop 配置

1. 找到配置文件位置：
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

2. 编辑配置文件：

```json
{
  "mcpServers": {
    "divination": {
      "command": "node",
      "args": ["/workspaces/AI-Assistant/divination-mcp-server/dist/index.js"]
    }
  }
}
```

3. 重启 Claude Desktop

## 使用示例

### 📍 塔罗占卜

**单张牌解读**：
```
请使用 tarot_reading 进行单张塔罗牌占卜，问题是"今天的运势如何"
```

**三张牌过去现在未来**：
```
使用 tarot_reading 工具：
- spread_type: "three_card"
- question: "我的事业发展方向"
- language: "zh-CN"
```

**凯尔特十字完整牌阵**：
```
进行凯尔特十字塔罗占卜，关于感情问题
```

### 🌟 紫微斗数

```
使用 ziwei_chart 生成紫微命盘：
- solar_date: "2000-08-16"
- birth_hour: 14 (下午2点)
- gender: "女"
- language: "zh-CN"
```

### ⭐ 西洋占星

```
使用 birth_chart 生成星盘：
- date: "1990-05-20"
- time: "14:30"
- latitude: 39.9042 (北京)
- longitude: 116.4074
- timezone: "Asia/Shanghai"
- language: "zh-CN"
```

### 💭 梦境解析

```
使用 interpret_dream 解析梦境：
- dream_description: "我梦见自己在飞翔，飞过大海和高山"
- emotions: ["兴奋", "自由", "轻松"]
- recurring: false
- language: "zh-CN"
```

### 🎋 八字命理

```
使用 bazi_analysis 分析八字：
- solar_date: "1990-05-20"
- birth_hour: 10 (上午10点)
- gender: "男"
- language: "zh-CN"
```

### ☯️ 易经卜卦

**起卦占卜**：
```
使用 iching_divination 占卜：
- question: "我应该接受这个新工作吗？"
- method: "coins" (硬币法)
- language: "zh-CN"
```

**解读特定卦象**：
```
使用 iching_hexagram 解读：
- hexagram_number: 1 (乾卦)
- language: "zh-CN"
```

## 功能详解

### 塔罗牌阵类型

1. **single** (单张牌)
   - 适合：日常指引、快速洞察
   - 时间：1-2分钟

2. **three_card** (三张牌)
   - 位置：过去、现在、未来
   - 适合：事件发展、趋势分析
   - 时间：5-10分钟

3. **celtic_cross** (凯尔特十字)
   - 10个位置的完整分析
   - 适合：复杂问题、深度探索
   - 时间：15-20分钟

### 时辰对照表

中国传统时辰（用于紫微斗数和八字）：

| 时辰 | 现代时间 | 小时数 |
|------|---------|--------|
| 子时 | 23:00-01:00 | 0 |
| 丑时 | 01:00-03:00 | 2 |
| 寅时 | 03:00-05:00 | 4 |
| 卯时 | 05:00-07:00 | 6 |
| 辰时 | 07:00-09:00 | 8 |
| 巳时 | 09:00-11:00 | 10 |
| 午时 | 11:00-13:00 | 12 |
| 未时 | 13:00-15:00 | 14 |
| 申时 | 15:00-17:00 | 16 |
| 酉时 | 17:00-19:00 | 18 |
| 戌时 | 19:00-21:00 | 20 |
| 亥时 | 21:00-23:00 | 22 |

### 易经起卦方法

1. **coins** (硬币法)
   - 抛三枚硬币六次
   - 最快速简单
   - 适合日常占卜

2. **yarrow** (蓍草法)
   - 传统方法
   - 更具仪式感
   - 概率分布不同

3. **random** (随机法)
   - 完全随机
   - 最快速

## 注意事项

### 占卜准确性

1. **心诚则灵**：占卜时保持专注和诚意
2. **问题明确**：提问要具体清晰
3. **时机适当**：不要频繁占卜同一问题
4. **参考辅助**：结果仅供参考，不应作为唯一决策依据

### 出生信息准确性

- **时间准确**：尽量精确到分钟
- **地点准确**：经纬度会影响星盘结果
- **农历阳历**：注意区分农历和阳历日期
- **闰月处理**：农历闰月需要特别标注

### 隐私保护

- 本地运行，数据不上传
- OpenAI API 仅用于梦境解析（可选）
- 占卜记录不会被保存

## 故障排查

### 常见问题

**Q: 安装依赖失败**
```bash
# 尝试清除缓存
npm cache clean --force
npm install
```

**Q: 构建失败**
```bash
# 检查 TypeScript 版本
npm list typescript
# 重新安装
rm -rf node_modules package-lock.json
npm install
```

**Q: MCP 连接失败**
```bash
# 检查路径是否正确
node /workspaces/AI-Assistant/divination-mcp-server/dist/index.js
# 应该显示: Divination MCP Server running on stdio
```

**Q: 紫微斗数计算错误**
```bash
# 确保 iztro 正确安装
npm list iztro
# 如果需要，重新安装
npm install iztro
```

## 进阶使用

### 批量占卜

可以连续使用多个工具进行综合分析：

1. 先用塔罗牌了解大方向
2. 再用紫微斗数看命理格局
3. 配合八字分析五行喜忌
4. 最后易经卜卦确认决策

### 自定义配置

编辑 `src/services/` 下的各个服务文件可以：
- 添加更多卦象解释
- 扩展塔罗牌意
- 调整解读风格
- 增加新的占卜方法

## 许可与免责

本项目仅供学习和娱乐使用。占卜结果仅供参考，不应作为医疗、法律、财务等重要决策的唯一依据。

## 技术支持

遇到问题或有建议？欢迎：
1. 查看详细文档：`DEVELOPMENT.md`
2. 提交 Issue
3. 参与贡献

---

祝您占卜愉快！🌟
