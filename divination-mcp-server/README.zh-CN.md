# 🔮 综合占卜 MCP Server

<div align="center">

**一个集成多种占卜系统的 Model Context Protocol 服务器**

[![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)](https://github.com/yourusername/divination-mcp-server)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node.js-20+-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

[English](README.md) | 简体中文

</div>

---

## 📖 项目简介

这是一个完整的 Model Context Protocol (MCP) 服务器，整合了 6 种不同的占卜系统，让您可以通过 Claude Desktop 或其他 MCP 客户端方便地进行各种占卜。

### 🌟 支持的占卜方法

| 占卜系统 | 描述 | 完整度 | 数据来源 |
|---------|------|--------|---------|
| 🃏 **塔罗占卜** | 78张完整塔罗牌，5种牌阵 | ✅ 100% | [tarotcardapi](https://github.com/zyaproxy-Jun/tarotcardapi) |
| ⭐ **紫微斗数** | 中国传统命理学，十二宫位分析 | ✅ 100% | [iztro](https://github.com/SylarLong/iztro) |
| 🌌 **西洋占星** | 出生星盘，行星相位分析 | ⚠️ 80% | 传统占星学 |
| 💭 **梦境解析** | AI专业prompt+符号数据库 | ✅ 100% | [dream-interpretation](https://github.com/zyaproxy-Jun/dream-interpretation) |
| 🎋 **八字命理** | 四柱八字，五行十神分析 | ✅ 100% | [lunar-javascript](https://github.com/6tail/lunar-javascript) |
| ☯️ **易经卜卦** | 完整64卦，三种起卦方法 | ✅ 100% | 周易原文+[i-ching.el](https://github.com/zyaproxy-Jun/i-ching) |

---

## ✨ 核心特性

- 🎯 **多系统集成** - 6种占卜方法一站式服务
- 🤖 **AI增强** - 结合传统智慧与现代AI
- 🌍 **多语言支持** - 中文简体、繁体、英文
- 📊 **完整数据** - 专业准确的占卜数据
- 🔒 **本地运行** - 隐私保护，数据不上传
- 🚀 **易于集成** - 标准MCP协议，即插即用

---

## 🚀 快速开始

### 前置要求

- Node.js 20 或更高版本
- npm 或 yarn 包管理器
- Claude Desktop（或其他 MCP 客户端）

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/yourusername/divination-mcp-server.git
cd divination-mcp-server
```

2. **安装依赖**
```bash
npm install
```

3. **构建项目**
```bash
npm run build
```

4. **配置 Claude Desktop**

编辑 Claude Desktop 配置文件：
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

添加以下配置：
```json
{
  "mcpServers": {
    "divination": {
      "command": "node",
      "args": ["/完整路径/divination-mcp-server/dist/index.js"]
    }
  }
}
```

5. **重启 Claude Desktop**

---

## 📚 使用示例

### 塔罗占卜

```
用塔罗牌凯尔特十字牌阵帮我分析感情问题
```

### 紫微斗数

```
请用紫微斗数分析 2000年8月16日下午2点出生的女性命盘
```

### 西洋占星

```
生成 1990年5月20日14:30 在北京出生的星盘
```

### 梦境解析

```
解析我的梦境：我梦见自己在飞翔，飞过大海和高山，感觉很自由
```

### 八字命理

```
分析 1990年5月20日上午10点出生男性的八字
```

### 易经卜卦

```
用易经硬币法占卜：我应该接受这个新工作机会吗？
```

---

## 🛠️ 可用工具

### 1. tarot_reading
塔罗牌占卜

**参数：**
- `spread_type`: 牌阵类型（single/three_card/celtic_cross）
- `question`: 占卜问题
- `language`: 语言（zh-CN/zh-TW/en）

### 2. ziwei_chart
紫微斗数命盘

**参数：**
- `solar_date`: 阳历日期（YYYY-MM-DD）
- `birth_hour`: 出生时辰（0-23）
- `gender`: 性别（男/女）
- `language`: 语言

### 3. birth_chart
西洋占星星盘

**参数：**
- `date`: 出生日期
- `time`: 出生时间
- `latitude`: 纬度
- `longitude`: 经度
- `timezone`: 时区
- `language`: 语言

### 4. interpret_dream
梦境解析

**参数：**
- `dream_description`: 梦境描述
- `emotions`: 情绪列表
- `recurring`: 是否重复梦境
- `language`: 语言

### 5. bazi_analysis
八字命理分析

**参数：**
- `solar_date`: 阳历日期
- `birth_hour`: 出生时辰
- `gender`: 性别
- `language`: 语言

### 6. iching_divination
易经起卦占卜

**参数：**
- `question`: 占卜问题
- `method`: 起卦方法（coins/yarrow/random）
- `language`: 语言

### 7. iching_hexagram
易经卦象解读

**参数：**
- `hexagram_number`: 卦象编号（1-64）
- `changing_lines`: 变爻位置
- `language`: 语言

---

## 📁 项目结构

```
divination-mcp-server/
├── src/
│   ├── data/
│   │   └── hexagrams.ts        # 完整64卦数据
│   ├── services/
│   │   ├── tarot.ts            # 塔罗占卜服务
│   │   ├── ziwei.ts            # 紫微斗数服务
│   │   ├── astrology.ts        # 西洋占星服务
│   │   ├── dream.ts            # 梦境解析服务
│   │   ├── bazi.ts             # 八字命理服务
│   │   └── iching.ts           # 易经卜卦服务
│   └── index.ts                # MCP 服务器入口
├── dist/                        # 编译输出
├── docs/
│   ├── README.zh-CN.md         # 中文说明（本文件）
│   ├── USAGE_GUIDE.md          # 使用指南
│   ├── DEVELOPMENT.md          # 开发文档
│   ├── ICHING_REFERENCE.md     # 易经速查手册
│   ├── CHANGELOG.md            # 更新日志
│   ├── COMPLETION_SUMMARY.md   # 完成总结
│   └── ITERATION_SUMMARY.md    # 迭代总结
├── package.json
├── tsconfig.json
└── test-mcp.sh                 # 测试脚本
```

---

## 🎯 功能完整度

| 功能 | 状态 | 说明 |
|------|------|------|
| 塔罗牌数据 | ✅ | 78张完整卡牌 |
| 紫微斗数 | ✅ | 集成iztro库 |
| 西洋占星 | ⚠️ | 使用简化算法 |
| 梦境符号 | ✅ | 100+符号字典 |
| 八字算法 | ✅ | 完整四柱计算 |
| 易经卦象 | ✅ | 完整64卦数据 |

**整体完成度：97%**

---

## 🔧 开发

### 开发模式

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

### 运行测试

```bash
./test-mcp.sh
```

---

## 📝 文档

- 📖 [使用指南](USAGE_GUIDE.md) - 详细使用说明
- 🛠️ [开发文档](DEVELOPMENT.md) - 开发者指南
- ☯️ [易经速查](ICHING_REFERENCE.md) - 64卦速查表
- 📋 [更新日志](CHANGELOG.md) - 版本变更记录
- ✅ [完成总结](COMPLETION_SUMMARY.md) - 项目状态
- 🔄 [迭代总结](ITERATION_SUMMARY.md) - 开发历程

---

## ⚠️ 注意事项

### 占卜准确性

本项目提供的占卜功能：
- ✅ 基于传统占卜理论和数据
- ✅ 结合现代AI技术辅助解读
- ⚠️ 结果仅供参考和娱乐
- ❌ 不应作为重要决策的唯一依据

### 隐私保护

- ✅ 完全本地运行
- ✅ 数据不会上传到外部服务器
- ⚠️ OpenAI API（梦境解析）是可选的
- ✅ 不保存占卜历史记录

---

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 🐛 问题反馈

如果您遇到问题或有建议：
- 📧 提交 GitHub Issue
- 💬 查看 [常见问题](USAGE_GUIDE.md#常见问题)
- 📚 阅读 [开发文档](DEVELOPMENT.md)

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---

## 🙏 致谢

### 开源项目
- [Model Context Protocol](https://modelcontextprotocol.io/) - MCP 协议
- [iztro](https://github.com/SylarLong/iztro) - 紫微斗数库
- [lunar-javascript](https://github.com/6tail/lunar-javascript) - 农历转换库
- [OpenAI](https://openai.com/) - AI 能力支持

### 参考资料
- 《周易》及历代注疏
- 塔罗牌传统解读
- 中国传统命理学典籍
- 西方占星学理论

---

## 🌟 Star History

如果这个项目对您有帮助，请给我们一个 Star！⭐

---

## 📞 联系方式

- 🐛 问题反馈: [GitHub Issues](https://github.com/yourusername/divination-mcp-server/issues)
- 💡 功能建议: [GitHub Discussions](https://github.com/yourusername/divination-mcp-server/discussions)
- 📧 邮件联系: your.email@example.com

---

<div align="center">

**🔮 愿古老的智慧指引您的道路 🔮**

Made with ❤️ by divination-mcp-server team

[⬆ 回到顶部](#-综合占卜-mcp-server)

</div>
