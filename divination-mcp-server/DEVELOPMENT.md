# Divination MCP Server 开发指南

## 快速开始

### 1. 安装依赖

```bash
cd divination-mcp-server
npm install
```

### 2. 构建项目

```bash
npm run build
```

### 3. 配置环境变量

复制 `.env.example` 为 `.env` 并配置：

```bash
cp .env.example .env
```

如需使用 AI 增强的梦境解析功能，请在 `.env` 中配置 OpenAI API 密钥：

```
OPENAI_API_KEY=your_openai_api_key
```

### 4. 配置 MCP 客户端

#### Claude Desktop 配置示例

编辑 Claude Desktop 配置文件（位置依操作系统而定）：

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

**Linux**: `~/.config/Claude/claude_desktop_config.json`

添加以下配置：

```json
{
  "mcpServers": {
    "divination": {
      "command": "node",
      "args": ["/absolute/path/to/divination-mcp-server/dist/index.js"],
      "env": {
        "OPENAI_API_KEY": "your_openai_key_here"
      }
    }
  }
}
```

## 功能说明

### 1. 塔罗占卜 (tarot_reading)

支持三种牌阵：
- `single`: 单张牌 - 快速洞察
- `three_card`: 三张牌 - 过去/现在/未来
- `celtic_cross`: 凯尔特十字 - 完整深入分析

示例：
```typescript
{
  "spread_type": "three_card",
  "question": "我这个月应该关注什么？",
  "language": "zh-CN"
}
```

### 2. 紫微斗数 (ziwei_chart)

生成完整的紫微斗数命盘，包括：
- 十二宫位分析
- 主星配置
- 五行局
- 大运流年

示例：
```typescript
{
  "solar_date": "2000-08-16",
  "birth_hour": 14,
  "gender": "female",
  "language": "zh-CN"
}
```

### 3. 西洋占星 (birth_chart)

计算和解读西洋占星星盘：
- 太阳/月亮/上升星座
- 行星配置
- 宫位系统
- 相位分析

示例：
```typescript
{
  "date": "1990-05-20",
  "time": "14:30",
  "latitude": 39.9042,
  "longitude": 116.4074,
  "timezone": "Asia/Shanghai",
  "language": "zh-CN"
}
```

### 4. 梦境解析 (interpret_dream)

AI 驱动的梦境分析：
- 象征意义解读
- 心理学视角
- 潜意识信息
- 实用建议

示例：
```typescript
{
  "dream_description": "我梦见自己在飞翔，越过大海",
  "emotions": ["喜悦", "自由"],
  "recurring": false,
  "language": "zh-CN"
}
```

### 5. 八字命理 (bazi_analysis)

四柱八字详细分析：
- 年月日时四柱
- 五行分布
- 十神配置
- 日主强弱

示例：
```typescript
{
  "solar_date": "1990-05-20",
  "birth_hour": 10,
  "gender": "male",
  "language": "zh-CN"
}
```

### 6. 易经卜卦 (iching_divination)

传统易经占卜：
- 三种起卦方法（硬币/蓍草/随机）
- 本卦与变卦解析
- 爻辞详解

示例：
```typescript
{
  "question": "我应该接受这个工作机会吗？",
  "method": "coins",
  "language": "zh-CN"
}
```

### 7. 卦象解读 (iching_hexagram)

解读指定卦象：

示例：
```typescript
{
  "hexagram_number": 1,
  "changing_lines": [2, 5],
  "language": "zh-CN"
}
```

## 开发建议

### 扩展功能

1. **添加更多卦象**：在 `iching.ts` 中的 `initializeHexagrams()` 方法添加完整的64卦
2. **增强塔罗牌解读**：在 `tarot.ts` 中添加更详细的牌意解释
3. **改进星盘计算**：集成更精确的天文历算库
4. **多语言支持**：扩展翻译文件支持更多语言

### 测试

```bash
# 运行开发服务器
npm run dev

# 在另一个终端测试
node -e "const client = require('@modelcontextprotocol/sdk/client/index.js'); console.log('Test')"
```

## 常见问题

### Q: 为什么需要 OpenAI API 密钥？

A: OpenAI API 用于增强梦境解析功能。如果不配置，系统会使用基于规则的解析方法。

### Q: 如何获取准确的经纬度？

A: 可以使用 Google Maps 或其他地图服务查找出生地的精确坐标。

### Q: 农历和阳历如何转换？

A: 项目使用 `lunar-javascript` 库进行精确的农历阳历转换。

### Q: 支持哪些语言？

A: 目前支持简体中文(zh-CN)、繁体中文(zh-TW)和英文(en)。

## 技术栈

- **TypeScript**: 类型安全的开发体验
- **MCP SDK**: Model Context Protocol 集成
- **iztro**: 紫微斗数计算引擎
- **lunar-javascript**: 农历阳历转换
- **OpenAI API**: AI 增强的梦境解析

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎提交 Issue。
