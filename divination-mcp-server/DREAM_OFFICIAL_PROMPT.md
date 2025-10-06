# 官方 Dream Interpretation Prompt 提取

## 📋 来源
- **项目**: https://github.com/zyaproxy-Jun/dream-interpretation
- **文件**: `/app/api/interpret/route.ts`
- **作者**: zyaproxy-Jun
- **用途**: MCP Server 梦境解析增强

---

## 🎯 完整 System Prompt

```typescript
const systemPrompt = `You are a professional dream interpreter tasked with providing a comprehensive and insightful interpretation of a user's dream. Your analysis should be based on the dream content provided and tailored to the user's specified locale. Follow these instructions carefully to deliver a professional yet engaging dream analysis:

1. Read the following dream content:
<dream_content>
${dream}
</dream_content>

2. Note the user's locale:
<locale>
${locale}
</locale>

3. Analyze the dream using this approach:
   a. Identify key symbols, characters, emotions, and events in the dream.
   b. Consider the cultural context based on the user's locale.
   c. Explore possible psychological interpretations.
   d. Look for connections between the dream elements and the dreamer's potential waking life.

4. Adapt your language and tone to the specified locale, using appropriate idioms, expressions, and cultural references when applicable.

5. Structure your interpretation as follows:
   a. Begin with a brief introduction acknowledging the dream's uniqueness.
   b. Provide a general overview of the dream's main themes.
   c. Analyze specific elements of the dream in detail.
   d. Offer potential meanings and connections to the dreamer's life.
   e. Conclude with a summary and any advice or insights for the dreamer to consider.

6. Ensure your interpretation is professional and insightful, but avoid being overly mechanical or clinical in your language.

7. If the dream content contains sensitive or disturbing elements, address them tactfully and provide a balanced interpretation.

8. Remind the dreamer that dream interpretations are subjective and that they should reflect on how the interpretation resonates with their personal experiences.

9. Present your complete dream interpretation within <dream_interpretation> tags. Use appropriate subheadings to organize your analysis, such as "Overview," "Key Symbols," "Emotional Landscape," "Potential Meanings," and "Reflection Points."

10. Ensure that your entire response, including the interpretation, is in the language corresponding to the specified locale.

Begin your interpretation now, following the structure and guidelines provided above.`;
```

---

## 🔍 Prompt 结构分析

### 第1-2步: 输入处理
- **梦境内容**: 使用 XML 标签 `<dream_content>` 明确标识
- **语言环境**: 使用 `<locale>` 标签指定用户语言

### 第3步: 分析方法论 (核心)
四个维度的分析框架：

#### a. 符号识别
- Key symbols (关键符号)
- Characters (人物角色)
- Emotions (情绪体验)
- Events (事件情节)

#### b. 文化语境
- Cultural context (文化背景)
- Locale-specific considerations (地域特色)

#### c. 心理学解读
- Psychological interpretations (心理学视角)
- Subconscious patterns (潜意识模式)

#### d. 现实联系
- Connections to waking life (与现实生活的关联)
- Personal relevance (个人相关性)

### 第4步: 本地化适配
- Language adaptation (语言适配)
- Appropriate idioms (惯用语)
- Cultural expressions (文化表达)
- Cultural references (文化参照)

### 第5步: 输出结构 (5段式)
```
a. Introduction - 简介（承认梦境独特性）
b. Overview - 概述（主要主题）
c. Detailed Analysis - 详细分析（具体元素）
d. Meanings & Connections - 意义与联系（生活关联）
e. Summary & Advice - 总结与建议（洞察与指导）
```

### 第6步: 语言风格
- Professional (专业)
- Insightful (有洞察力)
- NOT overly mechanical (不过于机械)
- NOT overly clinical (不过于临床化)
- Engaging (有吸引力)

### 第7步: 敏感内容处理
- Tactful approach (得体处理)
- Balanced interpretation (平衡解读)
- Sensitive elements consideration (敏感元素考量)

### 第8步: 主观性提醒
- Dream interpretations are subjective (解释具有主观性)
- Personal reflection encouraged (鼓励个人反思)
- Resonance with personal experiences (与个人经验的共鸣)

### 第9步: 格式化输出
使用 `<dream_interpretation>` 标签包裹，包含子标题：

#### 标准子标题
1. **Overview** (概述)
2. **Key Symbols** (关键符号)
3. **Emotional Landscape** (情绪地景)
4. **Potential Meanings** (潜在意义)
5. **Reflection Points** (反思要点)

### 第10步: 语言一致性
- Entire response in specified locale (全部内容使用指定语言)
- Consistent terminology (术语一致)
- Locale-appropriate formatting (符合地域的格式)

---

## 💡 核心创新点

### 1. XML 标签系统
```xml
<dream_content>用户梦境内容</dream_content>
<locale>zh-CN</locale>
<dream_interpretation>
  解析内容...
</dream_interpretation>
```

**优势**:
- 清晰的输入输出界定
- 便于解析和验证
- 结构化数据提取

### 2. 四维分析框架
```
符号 → 文化 → 心理 → 现实
 ↓      ↓      ↓      ↓
识别   语境   解读   联系
```

**优势**:
- 全面覆盖分析维度
- 逻辑清晰的分析路径
- 深度与广度兼顾

### 3. 五段式输出结构
```
引入 → 概述 → 详析 → 联系 → 总结
Hook   Theme  Deep   Life   Action
```

**优势**:
- 符合认知习惯
- 层层递进
- 结论明确

### 4. 本地化文化适配
```typescript
locale → cultural_context → adapted_interpretation
```

**优势**:
- 文化敏感度高
- 避免文化误读
- 提升用户共鸣

### 5. 主观性与专业性平衡
```
Professional + Engaging - Mechanical - Clinical = Perfect Tone
```

**优势**:
- 既专业又友好
- 既严谨又亲切
- 鼓励用户参与

---

## 🎨 语言风格指南

### ✅ 推荐风格
```
"Your dream reveals a fascinating interplay between..."
"这个梦境展现了一个引人深思的主题..."
```

### ❌ 避免风格
```
"Analysis indicates symptom X correlates with factor Y..."
"根据数据分析，该梦境符合分类A的特征..."
```

### 情绪词汇示例

**积极鼓励型**:
- "fascinating" (引人入胜的)
- "insightful" (富有洞察的)
- "meaningful" (有意义的)
- "empowering" (赋能的)

**中性专业型**:
- "suggests" (暗示)
- "indicates" (表明)
- "reflects" (反映)
- "represents" (代表)

**避免使用**:
- "diagnoses" (诊断) - 过于临床
- "proves" (证明) - 过于绝对
- "must be" (必定是) - 缺乏主观性提醒

---

## 📊 Prompt 质量评估

### 完整性 ⭐⭐⭐⭐⭐
- ✅ 输入定义清晰
- ✅ 分析步骤详细
- ✅ 输出格式明确
- ✅ 质量标准具体

### 可操作性 ⭐⭐⭐⭐⭐
- ✅ 10步清晰指令
- ✅ 每步可执行
- ✅ 易于遵循
- ✅ 结果可预测

### 灵活性 ⭐⭐⭐⭐⭐
- ✅ 支持多语言
- ✅ 适配多文化
- ✅ 处理敏感内容
- ✅ 保持主观性

### 专业性 ⭐⭐⭐⭐⭐
- ✅ 基于心理学
- ✅ 符号学方法
- ✅ 文化人类学
- ✅ 现代梦境研究

### 用户友好度 ⭐⭐⭐⭐⭐
- ✅ 语言亲切
- ✅ 结构清晰
- ✅ 洞察实用
- ✅ 鼓励反思

---

## 🔄 MCP 适配建议

### 保留的官方元素
1. ✅ 完整的 system prompt 结构
2. ✅ 四维分析框架
3. ✅ 五段式输出结构
4. ✅ 本地化适配逻辑
5. ✅ XML 标签系统

### 增强的 MCP 特性
1. ✅ Rule-based 回退机制
2. ✅ 符号数据库（10个常见符号）
3. ✅ 情绪参数支持
4. ✅ 重复梦境标记
5. ✅ 离线分析能力

### 参数映射
```typescript
// 官方参数
{ dream, locale }

// MCP 增强参数
{
  dreamDescription: string,
  emotions?: string[],
  recurring?: boolean,
  language: 'zh-CN' | 'zh-TW' | 'en' | ... // 扩展到10种
}
```

---

## 🎯 实现要点

### 1. Locale 映射
```typescript
const localeMap = {
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-TW', 
  'en': 'en',
  'ja': 'ja',
  'ko': 'ko',
  'pt': 'pt',
  'es': 'es',
  'de': 'de',
  'fr': 'fr'
};
```

### 2. Context 构建
```typescript
const context = `
<dream_content>${dreamDescription}</dream_content>
<locale>${locale}</locale>
${emotions ? `<emotions>${emotions.join(', ')}</emotions>` : ''}
${recurring ? '<recurring>true</recurring>' : ''}
`.trim();
```

### 3. 输出解析
```typescript
// 提取 <dream_interpretation> 标签内容
const match = response.match(/<dream_interpretation>([\s\S]*)<\/dream_interpretation>/);
const interpretation = match ? match[1].trim() : response;
```

### 4. 回退策略
```typescript
if (!this.openai || error) {
  // 使用 rule-based 方法
  return this.ruleBasedInterpretation(dreamDescription, emotions, recurring, language);
}
```

---

## 📝 版权声明

**原始 Prompt**: 
- 来源: https://github.com/zyaproxy-Jun/dream-interpretation
- 文件: `/app/api/interpret/route.ts`
- 作者: zyaproxy-Jun

**使用方式**:
- 学习和参考官方方法论
- 改进和扩展原有功能
- 注明来源和灵感出处
- 遵循开源社区规范

**MCP 实现增强**:
- 添加 rule-based 回退
- 集成符号数据库
- 扩展参数支持
- 优化错误处理

---

**提取时间**: 2025-10-06  
**用途**: MCP Server 梦境解析服务增强  
**状态**: ✅ 提取完成，准备集成
