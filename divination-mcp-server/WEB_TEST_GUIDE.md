# 🌐 网页测试指南

## 📋 概述

本指南介绍如何使用网页界面测试所有占卜功能。与静态演示页面不同，此版本可以**实际调用 MCP 服务器**并返回真实的占卜结果。

## 🚀 快速开始

### 方法一：使用 npm 脚本（推荐）

```bash
cd divination-mcp-server
npm install
npm run build
npm run web
```

### 方法二：使用启动脚本

```bash
cd divination-mcp-server
./start-web.sh
```

### 方法三：直接运行

```bash
cd divination-mcp-server
npm install
npm run build
node web-server.js
```

服务器将在 `http://localhost:3000` 启动。

## 🎯 功能说明

### 支持的占卜系统

| 系统 | 图标 | 说明 |
|------|------|------|
| 塔罗占卜 | 🃏 | 78张完整塔罗牌，支持多种牌阵 |
| 紫微斗数 | ⭐ | 中国传统命理，十二宫位分析 |
| 西洋占星 | 🌌 | 专业星盘计算，基于天文算法 |
| 梦境解析 | 💭 | AI驱动的心理学分析 |
| 八字命理 | 🎋 | 四柱八字推算 |
| 易经卜卦 | ☯️ | 传统六十四卦占卜 |

## 📝 使用步骤

### 塔罗占卜

1. 选择牌阵类型（单张牌/三张牌/凯尔特十字）
2. 输入占卜问题
3. 选择语言（简体中文/繁体中文/English）
4. 点击 "🔮 开始占卜"
5. 等待1-2秒，查看结果

**返回结果包括**：
- 抽取的塔罗牌（名称、描述、正逆位）
- 牌位含义
- 综合解读

### 紫微斗数

1. 输入出生日期（阳历）
2. 输入出生时辰（0-23小时）
3. 选择性别
4. 选择语言
5. 点击 "⭐ 生成命盘"

**返回结果包括**：
- 基本信息（阳历、农历、生肖、星座）
- 命宫、身宫信息
- 五行局
- 十二宫位详细星耀配置
- 大限信息

### 西洋占星

1. 输入出生日期和时间
2. 输入出生地纬度和经度
3. 输入时区偏移（如北京时间为 +8）
4. 选择语言
5. 点击 "🌌 生成星盘"

**返回结果包括**：
- 太阳、月亮、上升星座
- 十大行星位置
- 宫位信息
- 相位分析

### 梦境解析

1. 详细描述梦境内容
2. 输入梦中情绪（多个情绪用逗号分隔）
3. 选择是否为重复梦境
4. 选择语言
5. 点击 "💭 解析梦境"

**返回结果包括**：
- 梦境符号分析
- 心理学解读
- 潜意识探索
- 建议和启示

### 八字命理

1. 输入出生日期（阳历）
2. 输入出生时辰（0-23小时）
3. 选择性别
4. 选择语言
5. 点击 "🎋 分析八字"

**返回结果包括**：
- 四柱八字
- 五行分析
- 十神配置
- 大运流年
- 命理解读

### 易经卜卦

1. 输入占卜问题
2. 选择起卦方法（硬币法/蓍草法/随机法）
3. 选择语言
4. 点击 "☯️ 开始卜卦"

**返回结果包括**：
- 本卦信息（卦名、卦象、卦辞）
- 变卦信息（如有动爻）
- 爻辞解读
- 象辞说明
- 综合解卦

## 🔧 技术架构

### 前端 (test-web.html)

- 纯 HTML + CSS + JavaScript
- 响应式设计，支持移动端
- Tab 切换界面
- 实时加载动画
- 结果格式化显示

### 后端 (web-server.js)

- Node.js HTTP 服务器
- MCP 客户端集成
- API 端点：`/api/divination`
- 请求格式：
  ```json
  {
    "tool": "tool_name",
    "args": { /* tool arguments */ }
  }
  ```
- 响应格式：
  ```json
  {
    "success": true,
    "result": "{ /* JSON result */ }"
  }
  ```

### MCP 服务器

- 7个占卜工具
- 标准 MCP 协议通信
- stdio 传输方式

## 🎨 界面特点

- **渐变紫色主题**：优雅的视觉体验
- **玻璃拟态效果**：现代化设计风格
- **平滑动画**：淡入、上浮等过渡效果
- **响应式布局**：自适应各种屏幕尺寸
- **直观操作**：清晰的标签和表单

## ⚠️ 注意事项

1. **端口占用**：默认使用 3000 端口，如被占用请修改 `web-server.js` 中的 `PORT` 变量

2. **MCP 服务器**：必须先构建项目（`npm run build`），确保 `dist/index.js` 存在

3. **API 密钥**：梦境解析功能需要 OpenAI API 密钥，请在项目根目录创建 `.env` 文件：
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. **网络延迟**：某些占卜（如梦境解析）需要调用外部 API，可能需要较长时间

5. **结果显示**：返回的 JSON 数据会以格式化方式显示，方便查看详细信息

## 🐛 故障排除

### 问题：服务器无法启动

**解决方案**：
- 检查是否已执行 `npm install`
- 检查是否已执行 `npm run build`
- 检查端口 3000 是否被占用

### 问题：API 调用失败

**解决方案**：
- 查看浏览器控制台错误信息
- 查看服务器终端日志
- 确认 MCP 客户端已成功连接

### 问题：梦境解析返回错误

**解决方案**：
- 检查 `.env` 文件是否配置了正确的 `OPENAI_API_KEY`
- 确认 API 密钥有效且有足够额度

## 📖 API 文档

### POST /api/divination

调用 MCP 占卜工具。

**请求体**：
```json
{
  "tool": "tarot_reading",
  "args": {
    "spread_type": "single",
    "question": "我今天的运势如何？",
    "language": "zh-CN"
  }
}
```

**成功响应**：
```json
{
  "success": true,
  "result": "{\"cards\":[...],\"interpretation\":\"...\"}"
}
```

**错误响应**：
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🔮 示例

### 塔罗占卜示例

```bash
curl -X POST http://localhost:3000/api/divination \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "tarot_reading",
    "args": {
      "spread_type": "single",
      "question": "我今天的运势如何？",
      "language": "zh-CN"
    }
  }'
```

### 易经卜卦示例

```bash
curl -X POST http://localhost:3000/api/divination \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "iching_divination",
    "args": {
      "question": "我应该接受这个新工作机会吗？",
      "method": "coins",
      "language": "zh-CN"
    }
  }'
```

## 📚 相关文档

- [项目 README](README.md)
- [Claude Desktop 配置指南](CLAUDE_DESKTOP_SETUP.md)
- [使用指南](USAGE_GUIDE.md)
- [网页界面展示](WEB_INTERFACE_SHOWCASE.md)
- [开发文档](DEVELOPMENT.md)

## 💡 提示

- 建议使用现代浏览器（Chrome、Firefox、Safari、Edge）
- 占卜结果仅供参考和娱乐
- 可以使用浏览器开发者工具查看详细的 API 请求和响应
- 页面加载完成后会在控制台输出提示信息

## 🎉 结语

现在您可以通过网页界面方便地测试所有占卜功能！这比使用命令行或配置 Claude Desktop 更加直观和友好。

祝您测试愉快！🔮✨
