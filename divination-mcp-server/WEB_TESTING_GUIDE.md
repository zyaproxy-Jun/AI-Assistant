# 🔮 网页测试界面使用指南

## 📖 简介

这是一个美观的网页界面，用于演示和测试 Divination MCP Server 的所有6个占卜系统功能。

## 🚀 快速启动

### 方法1：使用内置服务器（推荐）

```bash
# 启动测试服务器
node web-server.js

# 浏览器访问
http://localhost:3000
```

### 方法2：直接打开HTML文件

```bash
# 在浏览器中打开
open test-web.html  # macOS
xdg-open test-web.html  # Linux
start test-web.html  # Windows
```

## 🎯 支持的占卜系统

### 1. 🃏 塔罗占卜
- **数据来源**: [zyaproxy-Jun/tarotcardapi](https://github.com/zyaproxy-Jun/tarotcardapi)
- **功能**: 78张完整塔罗牌，支持3种牌阵
  - 单张牌：快速指引
  - 三张牌：过去-现在-未来
  - 凯尔特十字：深度分析

### 2. ⭐ 紫微斗数
- **数据来源**: [zyaproxy-Jun/iztro](https://github.com/zyaproxy-Jun/iztro)
- **功能**: 中国传统命理学
  - 十二宫位分析
  - 星耀排布
  - 命盘解读

### 3. 🌌 西洋占星
- **数据来源**: [zyaproxy-Jun/Astrologer-API](https://github.com/zyaproxy-Jun/Astrologer-API)
- **功能**: 专业出生星盘
  - 10大行星位置
  - 12宫位分析
  - 行星相位

### 4. 💭 梦境解析
- **数据来源**: [zyaproxy-Jun/dream-interpretation](https://github.com/zyaproxy-Jun/dream-interpretation)
- **功能**: AI驱动的梦境分析
  - 心理学视角
  - 符号解读
  - 情绪分析

### 5. 🎋 八字命理
- **数据来源**: [zyaproxy-Jun/lunar-javascript](https://github.com/zyaproxy-Jun/lunar-javascript)
- **功能**: 四柱八字分析
  - 年月日时四柱
  - 五行分析
  - 十神推算

### 6. ☯️ 易经卜卦
- **数据来源**: [zyaproxy-Jun/i-ching](https://github.com/zyaproxy-Jun/i-ching)
- **功能**: 传统易经占卜
  - 64卦完整数据
  - 3种起卦方法
  - 卦辞爻辞

## 📋 使用说明

### 网页界面特点

✅ **响应式设计** - 支持桌面和移动设备  
✅ **美观界面** - 渐变色彩，现代化设计  
✅ **分类标签** - 6个占卜系统独立页面  
✅ **实时预览** - 表单验证和参数展示  
✅ **加载动画** - 流畅的用户体验  

### 重要提示

⚠️ **这是一个演示页面**

由于浏览器的安全限制，网页无法直接调用 MCP 服务器。要实际使用占卜功能：

1. **通过 Claude Desktop 使用**
   ```bash
   # 配置 Claude Desktop 的 MCP 服务器
   # 然后在对话中直接使用占卜功能
   ```

2. **使用命令行测试**
   ```bash
   node quick-test.js
   ```

3. **使用 MCP 客户端**
   ```bash
   # 使用 MCP SDK 创建自定义客户端
   ```

### 网页的作用

✅ **参数参考** - 查看每个占卜系统需要哪些参数  
✅ **功能展示** - 了解系统支持的所有功能  
✅ **界面预览** - 体验占卜系统的交互流程  
✅ **文档说明** - 每个系统都有详细的说明  

## 🎨 界面预览

### 主要区域

1. **顶部导航** - 6个占卜系统切换标签
2. **信息框** - 每个系统的介绍和数据来源
3. **表单区** - 输入占卜所需参数
4. **结果区** - 显示占卜结果（JSON格式）
5. **底部** - 项目信息和链接

### 配色方案

- **主色调**: 紫色渐变 (#667eea → #764ba2)
- **背景**: 白色卡片 + 半透明效果
- **强调色**: 蓝色、绿色、红色
- **文字**: 深灰色 (#333)

## 🛠️ 技术实现

### 前端技术

- **纯 HTML5** - 无需任何框架
- **CSS3** - 现代化样式，动画效果
- **原生 JavaScript** - 无依赖，轻量级

### 服务器

```javascript
// 使用 Node.js 内置 HTTP 模块
import http from 'http';
import fs from 'fs';
import path from 'path';

// 端口: 3000
// 主机: 0.0.0.0（允许网络访问）
```

## 📝 文件说明

### test-web.html
- **大小**: ~35KB
- **功能**: 完整的测试界面
- **依赖**: 无（可独立运行）

### web-server.js
- **大小**: ~3KB
- **功能**: HTTP 服务器
- **依赖**: Node.js 内置模块

## 🔧 自定义配置

### 修改端口

编辑 `web-server.js`:

```javascript
const PORT = 3000;  // 改为你想要的端口
```

### 修改主机

```javascript
const HOST = '0.0.0.0';  // '0.0.0.0' 允许网络访问
                          // 'localhost' 只允许本地访问
```

### 修改样式

编辑 `test-web.html` 中的 `<style>` 部分：

```css
/* 修改主色调 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* 修改按钮颜色 */
.btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 📊 性能指标

- **加载时间**: < 1秒
- **文件大小**: 35KB（HTML）
- **浏览器兼容**: Chrome, Firefox, Safari, Edge
- **移动设备**: 完全支持

## 🐛 常见问题

### Q1: 点击占卜按钮没有反应？
**A**: 这是正常的！网页只是演示界面，实际调用需要通过 MCP 协议。

### Q2: 如何实际使用占卜功能？
**A**: 有三种方式：
1. 在 Claude Desktop 中使用（推荐）
2. 使用命令行工具 `quick-test.js`
3. 编写自定义 MCP 客户端

### Q3: 可以修改网页样式吗？
**A**: 当然可以！`test-web.html` 中的所有 CSS 都可以自定义。

### Q4: 服务器占用端口怎么办？
**A**: 修改 `web-server.js` 中的 `PORT` 变量。

### Q5: 能在移动设备上查看吗？
**A**: 可以！界面是响应式的，支持手机和平板。

## 🔗 相关链接

- **项目主页**: [AI-Assistant](https://github.com/zyaproxy-Jun/AI-Assistant)
- **MCP 协议**: [Model Context Protocol](https://modelcontextprotocol.io/)
- **Claude Desktop**: [Anthropic Claude](https://claude.ai/)

## 📞 反馈

如有问题或建议，请：
- 提交 [GitHub Issue](https://github.com/zyaproxy-Jun/AI-Assistant/issues)
- 查看项目 [README](../README.md)

## 📄 许可证

MIT License - 详见项目根目录 LICENSE 文件

---

<div align="center">

**🔮 享受占卜体验！**

Made with ❤️ by @zyaproxy-Jun

</div>
