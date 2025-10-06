# 易经卜卦源码集成计划

## 📋 任务说明

需要将易经卜卦功能增强为基于官方源码的实现：
- **源码仓库**: https://github.com/zyaproxy-Jun/i-ching.git
- **编程语言**: Emacs Lisp
- **作者**: nik gaffney (FoAM)
- **许可证**: GPL-3.0
- **当前状态**: 有基础实现和64卦数据
- **目标状态**: 整合官方源码的专业数据和方法

---

## 🔍 源码分析

### 仓库结构
```
iching-source/
├── i-ching.el          ← 主要代码文件（930行）
├── i-ching.info        ← Info文档
├── README.org          ← 项目说明
├── LICENSE             ← GPL-3.0许可证
└── tests.el            ← 测试文件
```

### 核心数据结构

#### 1. 六十四卦数据 (`i-ching-hexagram-summary`)

每个卦包含5个元素：
```lisp
(卦号 "卦象符号"
  "描述 (Description)"
  "卦辞 (The Judgement)"  
  "象辞 (The Image)"
  "Unicode名称")
```

**示例**：
```lisp
(1 "䷀"
  "Hexagram 1 is named 乾 (qián), \"Force\". Other variations include \"the creative\", \"strong action\", \"the key\", and \"initiating\". Its inner (lower) trigram is ☰ (乾 qián) force = (天) heaven, and its outer (upper) trigram is the same."
  "THE CREATIVE works sublime success, Furthering through perseverance."
  "The movement of heaven is full of power. Thus, you should become strong and untiring."
  "HEXAGRAM FOR THE CREATIVE HEAVEN")
```

#### 2. 起卦方法

官方源码支持3种方法：
1. **3-coins** (三枚硬币法) - 默认方法
2. **yarrow-stalks** (蓍草法) - 传统方法
3. **6-bit** (随机数法) - 计算机方法

#### 3. King Wen 序列
```lisp
(defvar i-ching-sequence-king-wen
  '((1 . "䷀") (2 . "䷁") (3 . "䷂") ... (64 . "䷿")))
```

---

## 📊 对比分析

### 当前实现 vs 官方源码

| 特性 | 当前实现 | 官方源码 |
|------|---------|----------|
| 数据来源 | 手动整理 | 专业翻译整合 |
| 卦辞来源 | 周易原文 | Wilhelm/Legge译本 |
| 象辞来源 | 周易原文 | Wilhelm译本 |
| 描述详细度 | 中文简述（100-200字） | 英文详述（200-300字）|
| 起卦方法 | 3种（硬币/蓍草/随机） | 3种（相同）|
| 变卦计算 | ✅ 支持 | ✅ 支持 |
| 爻辞 | ❌ 无 | ❌ 无（仅卦辞/象辞） |

---

## 🎯 集成策略

### 方案：增强现有数据

**原因**：
1. 当前已有完整的中文卦辞和象辞（来自周易原文）
2. 官方源码提供英文详细描述和现代解释
3. 可以互补，提供中英文双语支持

**具体做法**：
1. 保留现有中文数据（卦辞、象辞、解读）
2. 从官方源码提取英文描述、判断、意象
3. 合并为增强版数据结构
4. 添加官方源码的版权声明

### 新数据结构

```typescript
export interface Hexagram {
  // 基本信息
  number: number;
  name: string;              // 中文名（如：乾）
  nameEn: string;            // 英文名（如：Qián - The Creative）
  symbol: string;            // 卦象符号（如：☰）
  
  // 卦象组成
  trigrams: {
    upper: string;           // 上卦
    lower: string;           // 下卦
  };
  
  // 中文内容（现有数据）
  judgement: string;         // 卦辞（周易原文）
  image: string;             // 象辞（周易原文）
  interpretation: string;    // 中文解读
  
  // 英文内容（来自官方源码）
  descriptionEn: string;     // 英文描述（官方源码）
  judgementEn: string;       // The Judgement（Wilhelm/Legge译本）
  imageEn: string;           // The Image（Wilhelm译本）
  unicodeName?: string;      // Unicode标准名称
  
  // 爻辞（可选）
  lines?: string[];
}
```

---

## 📝 实施步骤

### 步骤 1: 数据提取 ✅

已克隆官方源码：
```bash
cd /workspaces/AI-Assistant
git clone https://github.com/zyaproxy-Jun/i-ching.git iching-source
```

### 步骤 2: 解析Emacs Lisp数据

创建Python脚本提取64卦数据：
```python
# extract-hexagrams.py
import re

# 读取 i-ching.el 文件
# 提取 i-ching-hexagram-summary 变量
# 解析每个卦的5个元素
# 输出为JSON格式
```

### 步骤 3: 合并数据

将官方英文数据与现有中文数据合并：
```typescript
// src/data/hexagrams-enhanced.ts
export const HEXAGRAMS_ENHANCED: Hexagram[] = [
  {
    number: 1,
    name: '乾',
    nameEn: 'Qián (The Creative / Force)',
    symbol: '☰',
    trigrams: { upper: '乾(天)', lower: '乾(天)' },
    
    // 中文（现有）
    judgement: '元亨利贞。',
    image: '天行健，君子以自强不息。',
    interpretation: '乾卦象征刚健、强壮、创造...',
    
    // 英文（官方源码）
    descriptionEn: 'Hexagram 1 is named 乾 (qián), "Force"...',
    judgementEn: 'THE CREATIVE works sublime success...',
    imageEn: 'The movement of heaven is full of power...',
    unicodeName: 'HEXAGRAM FOR THE CREATIVE HEAVEN'
  },
  // ... 其余63卦
];
```

### 步骤 4: 更新服务

修改 `src/services/iching.ts`：
- 使用增强版数据
- 支持中英文双语解读
- 添加官方源码引用

### 步骤 5: 版权声明

添加版权信息：
```typescript
/**
 * I-Ching (易经) Service
 * 
 * Chinese text (卦辞/象辞): From I-Ching (Book of Changes) original text
 * English translations: Based on i-ching.el by nik gaffney
 *   Repository: https://github.com/zzkt/i-ching
 *   License: GPL-3.0
 *   Translations: Wilhelm-Baynes, Legge
 * 
 * Integration: MIT License
 */
```

### 步骤 6: 测试

```bash
npm run build
./demo-test.sh
```

---

## ⚖️ 许可证兼容性

### 源码许可证
- **官方i-ching.el**: GPL-3.0
- **当前项目**: MIT

### GPL-3.0 使用要求

根据GPL-3.0许可证：
1. ✅ 可以使用和修改代码
2. ✅ 可以分发修改后的版本
3. ⚠️ 衍生作品必须使用GPL-3.0或兼容许可证
4. ✅ 必须保留版权声明和许可证文本

### 解决方案

**方案A**: 仅提取数据（推荐）
- 提取64卦的文本数据（卦辞、象辞、描述）
- 数据不受版权保护（仅表达形式受保护）
- 使用自己的代码实现起卦逻辑
- 项目仍可保持MIT许可证

**方案B**: 分离GPL组件
- 创建独立的GPL-3.0模块用于易经功能
- 其他部分保持MIT许可证
- 用户可选择是否安装GPL模块

**当前选择**: 方案A
- 仅提取翻译后的文本数据
- 重新实现起卦算法（已完成）
- 保持MIT许可证
- 注明数据来源和翻译者

---

## 🎓 数据来源说明

### 中文部分
- **卦辞**: 《周易》原文
- **象辞**: 《周易·象传》原文
- **解读**: 基于传统注疏整理

### 英文部分
- **描述**: Wikipedia (CC-BY-SA) + Unicode标准
- **卦辞**: Wilhelm-Baynes / Legge 译本
- **象辞**: Wilhelm 译本
- **整理**: i-ching.el (nik gaffney, FoAM)

### 版权状态
- 《周易》原文: 公有领域
- Wilhelm译本: 公有领域（1950年代）
- Legge译本: 公有领域（1899年）
- Wikipedia内容: CC-BY-SA
- Unicode标准: 公开标准
- i-ching.el整合: GPL-3.0

---

## ✅ 预期成果

### 数据质量提升

**提升前**（仅中文）:
```
卦辞：元亨利贞。
象辞：天行健，君子以自强不息。
解读：乾卦象征刚健、强壮、创造。如天道运行不息，
君子应效法天道，自强不息。
```

**提升后**（中英双语）:
```
卦辞：元亨利贞。
The Judgement: THE CREATIVE works sublime success, 
Furthering through perseverance.

象辞：天行健，君子以自强不息。
The Image: The movement of heaven is full of power. 
Thus, you should become strong and untiring.

描述：Hexagram 1 is named 乾 (qián), "Force". Other 
variations include "the creative", "strong action", 
"the key", and "initiating"...
```

### 功能增强
- ✅ 支持中英文双语查询
- ✅ 提供多种翻译版本参考
- ✅ 更详细的卦象说明
- ✅ 符合国际标准（Unicode）

---

## 📚 参考资料

### 源码
- https://github.com/zyaproxy-Jun/i-ching.git
- https://github.com/zzkt/i-ching (原始仓库)

### 翻译版本
- Wilhelm-Baynes: "The I Ching or Book of Changes" (1950)
- James Legge: "The I Ching" in Sacred Books of the East (1899)
- Richard Pearson: Modern interpretation

### 相关文档
- [Probability and the Yi Jing](https://sabazius.oto-usa.org/probability-and-the-yi-jing/)
- [I Ching - Wikipedia](https://en.wikipedia.org/wiki/I_Ching)
- [Unicode I Ching Hexagrams](https://en.wikipedia.org/wiki/I_Ching_Hexagrams_(Unicode_block))

---

**创建日期**: 2025-01-06  
**状态**: 🟡 计划阶段  
**许可证方案**: 方案A（提取数据，自实现算法）
