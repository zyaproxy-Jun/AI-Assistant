# 🔮 占卜MCP服务器 - 实际调用指南
# Divination MCP Server - Actual Usage Guide

## 📌 重要区分

### ❌ 静态演示 vs ✅ 实际调用

| 项目 | Web界面 (http://localhost:8080) | MCP实际调用 |
|------|--------------------------------|------------|
| **性质** | ❌ 静态HTML演示页面 | ✅ 实际功能调用 |
| **功能** | 仅展示参数格式和说明 | 真正执行占卜计算 |
| **结果** | 无实际占卜结果 | 返回真实占卜数据 |
| **用途** | 学习参数、查看文档 | 生产环境使用 |

---

## ✅ 实际调用方法

### 方法1: 命令行测试（推荐新手）

#### 快速测试所有功能
```bash
node quick-test.js
```

#### 测试单个占卜系统
```bash
# 塔罗占卜
node test-tarot-call.js

# 紫微斗数
node test-ziwei.js

# 西洋占星
node test-birth-chart.js

# 综合测试
node test-all-features.js

# 详细测试报告
node test-mcp-detailed.js

# 实际调用演示
node demo-live-calls.js
```

---

### 方法2: 在Claude Desktop中使用（推荐日常使用）

#### 步骤1: 配置Claude Desktop

编辑 Claude Desktop 配置文件:
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "divination": {
      "command": "node",
      "args": [
        "C:\\Users\\HUAWEI\\Desktop\\AI-Assistant\\divination-mcp-server\\dist\\index.js"
      ]
    }
  }
}
```

#### 步骤2: 重启Claude Desktop

关闭并重新打开 Claude Desktop 应用。

#### 步骤3: 在对话中使用

直接在Claude Desktop中说：

```
"帮我抽一张塔罗牌，问题是：我今天的运势如何？"

"帮我排一个紫微命盘，生日是1990年5月20日，早上10点出生，女性"

"帮我算一下八字，1988年3月15日早上8点出生，男性"

"帮我解梦：我梦见在海边散步，遇到一只会说话的海豚"

"帮我卜一卦，问题是：我应该换工作吗？"
```

Claude会自动调用相应的MCP工具，并返回真实的占卜结果。

**详细配置指南**: 查看 `CLAUDE_DESKTOP_SETUP.md`

---

### 方法3: 编程方式调用（开发者）

#### Node.js 示例

```javascript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

// 创建MCP客户端
const transport = new StdioClientTransport({
  command: 'node',
  args: ['./dist/index.js']
});

const client = new Client({
  name: 'my-app',
  version: '1.0.0'
}, {
  capabilities: {}
});

// 连接服务器
await client.connect(transport);

// 调用塔罗占卜
const result = await client.callTool({
  name: 'tarot_reading',
  arguments: {
    spread_type: 'three_card',
    question: '我今天的运势如何？',
    language: 'zh-CN'
  }
});

// 解析结果
const data = JSON.parse(result.content[0].text);
console.log('抽到的牌:', data.cards[0].nameCN);
console.log('解读:', data.interpretation);
```

---

## 🎯 所有可用工具

### 1. 🃏 tarot_reading (塔罗占卜)

```javascript
{
  name: 'tarot_reading',
  arguments: {
    spread_type: 'single',        // 牌阵: single, three_card, celtic_cross
    question: '我的爱情运势？',    // 占卜问题
    language: 'zh-CN'              // 语言: zh-CN 或 en
  }
}
```

**返回数据**:
- `cards`: 抽到的牌数组
- `positions`: 牌位名称
- `interpretation`: 整体解读
- `spread`: 使用的牌阵
- `question`: 提出的问题

---

### 2. ⭐ ziwei_chart (紫微斗数)

```javascript
{
  name: 'ziwei_chart',
  arguments: {
    solar_date: '1990-05-20',     // 公历出生日期
    birth_hour: 10,                // 出生时辰 (0-23)
    gender: '女',                  // 性别: 男/女
    language: 'zh-CN'              // 语言
  }
}
```

**返回数据**:
- `basic_info`: 基本信息（公历、农历、生肖等）
- `soul_and_body`: 命主、身主
- `five_elements`: 五行局
- `palaces`: 12宫位详细信息
- `decadal_fortune`: 大运

---

### 3. 🌌 birth_chart (西洋占星)

```javascript
{
  name: 'birth_chart',
  arguments: {
    birth_date: '1995-08-15',     // 出生日期
    birth_time: '14:30',           // 出生时间 (HH:mm)
    latitude: 39.9042,             // 纬度
    longitude: 116.4074,           // 经度
    timezone: 'Asia/Shanghai'      // 时区
  }
}
```

**返回数据**:
- `sunSign`: 太阳星座
- `moonSign`: 月亮星座
- `ascendant`: 上升星座
- `planets`: 行星位置
- `houses`: 宫位信息
- `aspects`: 相位关系

---

### 4. 💭 interpret_dream (梦境解析)

```javascript
{
  name: 'interpret_dream',
  arguments: {
    dream_content: '我梦见...',   // 梦境内容
    emotional_tone: '平静',        // 情感基调（可选）
    language: 'zh-CN'              // 语言
  }
}
```

**返回数据**:
- `dream_content`: 梦境内容
- `themes`: 主题分析
- `symbols`: 符号解读
- `interpretation`: 心理学解释
- `emotional_tone`: 情感分析

---

### 5. 🎋 bazi_analysis (八字命理)

```javascript
{
  name: 'bazi_analysis',
  arguments: {
    solar_date: '1988-03-15',     // 公历出生日期
    birth_hour: 8,                 // 出生时辰 (0-23)
    gender: '男',                  // 性别
    language: 'zh-CN'              // 语言
  }
}
```

**返回数据**:
- `birth_info`: 出生信息
- `four_pillars`: 四柱（年月日时）
- `day_master`: 日主信息
- `ten_gods`: 十神分析
- `five_elements`: 五行强弱

---

### 6. ☯️ iching_divination (易经卜卦)

```javascript
{
  name: 'iching_divination',
  arguments: {
    question: '我应该换工作吗？', // 占卜问题
    method: 'coins',               // 起卦方法: coins 或 yarrow
    language: 'zh-CN'              // 语言
  }
}
```

**返回数据**:
- `question`: 问题
- `primary_hexagram`: 本卦信息
- `transformed_hexagram`: 变卦信息（如有）
- `changing_lines`: 变爻
- `interpretation`: 卦象解读

---

### 7. ☯️ iching_hexagram (易经卦象查询)

```javascript
{
  name: 'iching_hexagram',
  arguments: {
    hexagram_number: 1,            // 卦序 (1-64)
    language: 'zh-CN'              // 语言
  }
}
```

**返回数据**:
- `number`: 卦序
- `name`: 卦名
- `symbol`: 卦象
- `judgment`: 卦辞
- `image`: 象辞
- `lines`: 爻辞

---

## 🚀 实际调用示例

### 示例1: 塔罗三张牌占卜

```bash
# 运行测试
node test-tarot-call.js
```

**输出**:
```
✅ 调用成功！
抽到的牌 (共 3 张):

1. 愚者 (正位)
   关键词: new beginnings、innocence、adventure、spontaneity
   
2. 力量 (正位)
   关键词: courage、patience、compassion、strength
   
3. 星星 (逆位)
   关键词: hope、inspiration、faith、renewal

💬 整体解读:
过去的你充满冒险精神，现在需要内在力量，
未来要保持希望和信念...
```

### 示例2: 紫微命盘推算

```bash
node test-ziwei.js
```

**输出**:
```
✅ 命盘生成成功！
基本信息:
  出生日期: 1990-05-20
  农历: 一九九零年四月廿六
  命主: 武曲
  身主: 天机
  五行: 木三局
  
12宫位信息已生成，包含主星、副星、大运等完整数据
```

### 示例3: 八字分析

```javascript
// 实际调用代码
const result = await client.callTool({
  name: 'bazi_analysis',
  arguments: {
    solar_date: '1988-03-15',
    birth_hour: 8,
    gender: '男',
    language: 'zh-CN'
  }
});

const data = JSON.parse(result.content[0].text);
console.log('日主:', data.day_master.element);
console.log('四柱:', data.four_pillars);
```

---

## 📊 性能对比

| 占卜系统 | 命令行调用 | Web页面 | Claude Desktop |
|---------|-----------|---------|----------------|
| 塔罗占卜 | ✅ 4ms | ❌ 不可用 | ✅ 实时 |
| 紫微斗数 | ✅ 111ms | ❌ 不可用 | ✅ 实时 |
| 西洋占星 | ✅ 10s | ❌ 不可用 | ✅ 实时 |
| 梦境解析 | ✅ 7ms | ❌ 不可用 | ✅ 实时 |
| 八字命理 | ✅ 22ms | ❌ 不可用 | ✅ 实时 |
| 易经卜卦 | ✅ 2ms | ❌ 不可用 | ✅ 实时 |

---

## ❓ 常见问题

### Q1: Web页面为什么不能直接占卜？

**A**: Web页面 (http://localhost:8080) 是**静态演示页面**，仅用于：
- 📖 展示所有占卜系统的参数格式
- 📝 提供使用说明和示例
- 🎨 展示界面设计

**实际占卜功能**需要通过：
- ✅ MCP协议调用（Claude Desktop）
- ✅ 命令行测试脚本
- ✅ 编程方式集成

### Q2: 如何验证MCP服务器是否正常工作？

**A**: 运行快速测试：
```bash
node quick-test.js
```

如果看到 `✅ 所有基础功能测试通过！` 说明MCP服务器完全正常。

### Q3: Claude Desktop配置后不起作用？

**A**: 检查清单：
1. ✅ 配置文件路径正确
2. ✅ JSON格式有效
3. ✅ 文件路径使用绝对路径
4. ✅ 已重启Claude Desktop
5. ✅ 运行 `npm run build` 构建项目

### Q4: 如何查看详细的测试结果？

**A**: 运行详细测试：
```bash
node test-mcp-detailed.js
```

生成的 `MCP_TEST_REPORT.md` 包含完整的测试报告。

---

## 🎯 推荐使用流程

### 初次使用者

1. **验证安装**
   ```bash
   npm install
   npm run build
   ```

2. **快速测试**
   ```bash
   node quick-test.js
   ```

3. **尝试单个功能**
   ```bash
   node test-tarot-call.js
   ```

4. **查看完整演示**
   ```bash
   node demo-live-calls.js
   ```

### 日常使用者

1. **配置Claude Desktop** (一次性设置)
   - 参考 `CLAUDE_DESKTOP_SETUP.md`

2. **在Claude中直接使用**
   - 自然语言提问
   - Claude自动调用MCP工具
   - 获得占卜结果

### 开发者

1. **查看源码**
   - `src/index.ts` - 主服务器
   - `src/services/` - 各占卜系统实现

2. **集成到应用**
   - 使用MCP SDK
   - 参考 `test-tarot-call.js` 示例

3. **扩展功能**
   - 添加新的占卜工具
   - 自定义返回格式

---

## 📚 相关文档

- **配置指南**: `CLAUDE_DESKTOP_SETUP.md`
- **开发文档**: `DEVELOPMENT.md`
- **测试报告**: `MCP_TEST_REPORT.md`
- **使用指南**: `USAGE_GUIDE.md`
- **部署指南**: `DEPLOYMENT_GUIDE.md`

---

## ✨ 总结

| 使用场景 | 推荐方法 | 优势 |
|---------|---------|------|
| **快速测试** | `node quick-test.js` | 1秒验证所有功能 |
| **学习参数** | 打开Web页面 | 直观查看参数格式 |
| **日常占卜** | Claude Desktop | 自然语言交互 |
| **开发集成** | MCP SDK | 编程方式调用 |
| **功能演示** | `node demo-live-calls.js` | 完整展示所有系统 |

---

**🎉 记住: Web页面是静态演示，真正的占卜功能通过MCP协议调用！**

---

**更新日期**: 2025-10-07  
**版本**: 1.0.1  
**作者**: Divination MCP Server Team
