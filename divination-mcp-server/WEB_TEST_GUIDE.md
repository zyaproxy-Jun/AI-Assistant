# 🔮 前端页面测试指南

## 📋 概述

本项目提供了交互式前端页面，可以直接测试所有占卜功能。

## 🚀 快速开始

### 方法1：完整功能测试（推荐）

需要同时启动两个服务器：

#### 步骤 1：启动 Web Server

```powershell
node "C:\Users\HUAWEI\Desktop\AI-Assistant\divination-mcp-server\web-server.js"
```

#### 步骤 2：启动 API Server（新终端）

```powershell
node "C:\Users\HUAWEI\Desktop\AI-Assistant\divination-mcp-server\api-server.js"
```

#### 步骤 3：打开浏览器

访问：http://localhost:8080/test-interactive.html

### 方法2：命令行测试

如果不需要前端页面，可以直接使用命令行测试：

```powershell
# 快速测试所有功能
node quick-test.js

# 详细功能测试
node test-all-features.js

# MCP 协议详细测试
node test-mcp-detailed.js
```

## 🌐 可用页面

| 页面 | 地址 | 说明 |
|------|------|------|
| **交互式测试** | http://localhost:8080/test-interactive.html | ✅ 可实际调用所有占卜功能 |
| **静态展示** | http://localhost:8080/index.html | 📄 查看系统参数说明 |
| **API 健康检查** | http://localhost:3000/health | 🔌 检查 API 服务状态 |

## 💡 功能说明

### 交互式测试页面特性

1. **🃏 塔罗占卜**
   - 输入问题
   - 抽取 3 张塔罗牌（过去、现在、未来）
   - 获得详细解读

2. **⭐ 紫微斗数**
   - 输入出生日期和时辰
   - 自动排盘计算
   - 显示命盘详情

3. **🌌 西洋占星**
   - 输入出生时间和地点（经纬度）
   - 计算本命盘
   - 分析行星位置

4. **💭 梦境解析**
   - 描述梦境内容
   - AI 心理分析
   - 深层含义解读

5. **🎋 八字命理**
   - 输入出生时间
   - 四柱排盘
   - 五行分析

6. **☯️ 易经占卜**
   - 输入问题
   - 选择卜卦方法
   - 获得卦象解析

## 🔧 故障排除

### API Server 无法启动

如果 `api-server.js` 启动失败，可以使用命令行直接测试：

```powershell
# 这些脚本不需要 API Server
node quick-test.js
node test-all-features.js
```

### 端口被占用

如果端口 8080 或 3000 被占用：

```powershell
# 检查占用情况
Get-NetTCPConnection -LocalPort 8080
Get-NetTCPConnection -LocalPort 3000

# 关闭占用进程
Stop-Process -Id <进程ID> -Force
```

### 功能异常

1. **确保已编译**
   ```powershell
   npm run build
   ```

2. **检查依赖**
   ```powershell
   npm install
   ```

3. **运行测试**
   ```powershell
   node quick-test.js
   ```

## 📊 测试状态

所有占卜系统均已测试通过：

- ✅ 塔罗占卜 - 78张完整塔罗牌
- ✅ 紫微斗数 - 中国传统命理
- ✅ 西洋占星 - 专业星盘计算  
- ✅ 梦境解析 - AI心理分析
- ✅ 八字命理 - 四柱推算
- ✅ 易经占卜 - 六十四卦系统

## 🎯 示例数据

页面中内置了"填充示例"按钮，可以快速填入测试数据：

- **日期示例**：1990年5月15日
- **时辰示例**：午时 (11:00-13:00)
- **地点示例**：北京（39.9042°N, 116.4074°E）
- **问题示例**："我的事业发展如何？"

## 📝 注意事项

1. **网络要求**：所有计算都在本地完成，无需互联网连接
2. **浏览器兼容性**：推荐使用 Chrome、Edge 或 Firefox
3. **数据隐私**：所有数据仅在本地处理，不会上传到服务器
4. **计算时间**：
   - 塔罗/易经：< 1秒
   - 八字/紫微：< 1秒
   - 占星：5-10秒（需要天文计算）

## 🔗 相关文档

- [快速参考](QUICK_REFERENCE.md) - 所有工具的快速查询
- [实际使用指南](ACTUAL_USAGE_GUIDE.md) - 详细的使用说明
- [Claude Desktop 配置](CLAUDE_DESKTOP_SETUP.md) - MCP 集成配置

## 🎉 开始测试

1. **启动服务器**
   ```powershell
   node web-server.js
   ```

2. **打开浏览器**
   访问：http://localhost:8080/test-interactive.html

3. **选择占卜系统**
   点击顶部标签页切换

4. **填写表单**
   输入必要信息或点击"填充示例"

5. **查看结果**
   点击提交按钮，等待结果显示

---

**提示**：如果 API Server 无法启动，建议使用命令行测试脚本（`quick-test.js`、`test-all-features.js`），功能完全相同且更稳定。
