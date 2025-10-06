# 西洋占星官方源码集成方案

## 📋 任务目标

将官方 Astrologer-API 的专业占星计算能力集成到 MCP 服务器中。

**官方源码**: https://github.com/zyaproxy-Jun/Astrologer-API

## 🔍 源码分析

### 项目信息
- **项目类型**: FastAPI + Python 占星API服务
- **核心引擎**: Kerykeion Python库
- **功能**: 专业的出生星盘、合盘、流年、复合盘计算
- **特点**: 基于瑞士星历表(Swiss Ephemeris)的精确计算
- **许可证**: 待确认

### 核心库: Kerykeion

**Kerykeion** 是一个强大的Python占星计算库:
- GitHub: https://github.com/g-battaglia/kerykeion
- 文档: https://www.kerykeion.net/
- 特性:
  - ✅ 精确的行星位置计算（基于Swiss Ephemeris）
  - ✅ 多种宫位系统支持（Placidus, Koch, Equal, etc.）
  - ✅ 完整的相位计算
  - ✅ 多种黄道系统（热带、恒星）
  - ✅ SVG星盘图生成
  - ✅ 合盘、流年、复合盘

### API端点分析

| 端点 | 功能 | 需求 |
|------|------|------|
| `/api/v4/birth-data` | 出生数据 | ✅ 核心 |
| `/api/v4/natal-aspects-data` | 本命盘相位数据 | ✅ 重要 |
| `/api/v4/birth-chart` | 完整星盘+SVG | ⚠️ 可选 |
| `/api/v4/synastry-aspects-data` | 合盘数据 | ⚠️ 扩展 |
| `/api/v4/relationship-score` | 关系评分 | ⚠️ 扩展 |

### 请求数据结构

```python
class SubjectModel:
    name: str
    year: int
    month: int
    day: int
    hour: int
    minute: int
    city: str
    nation: str
    latitude: float
    longitude: float
    timezone: str
    zodiac_type: str = "Tropic"  # or "Sidereal"
    sidereal_mode: str = None
    houses_system_identifier: str = "P"  # Placidus
    geonames_username: str = None
```

### 响应数据结构

```python
{
    "name": "John Doe",
    "sun": {
        "name": "Sun",
        "quality": "Cardinal",
        "element": "Fire",
        "sign": "Aries",
        "sign_num": 1,
        "position": 15.234,
        "abs_pos": 15.234,
        "emoji": "♈",
        "house": "First_House",
        "retrograde": false
    },
    "moon": { ... },
    "mercury": { ... },
    # ... 其他行星
    "houses": [
        {
            "name": "First_House",
            "quality": "Cardinal",
            "element": "Fire",
            "sign": "Aries",
            "sign_num": 1,
            "position": 0.123,
            "abs_pos": 0.123,
            "emoji": "♈"
        },
        # ... 12宫
    ],
    "aspects": [
        {
            "p1_name": "Sun",
            "p2_name": "Moon",
            "aspect": "trine",
            "orbit": 2.5,
            "aspect_degrees": 120,
            "aid": 6,
            "diff": 117.5,
            "p1": 15.234,
            "p2": 132.734
        }
    ]
}
```

---

## 🎯 集成策略

### 方案对比

| 方案 | 优点 | 缺点 | 可行性 |
|------|------|------|--------|
| **A. API调用** | 精确专业，SVG图表 | 需要API key，网络依赖 | ⚠️ 付费 |
| **B. Python子进程** | 完整功能，本地计算 | 需要Python环境，复杂度高 | ⚠️ 复杂 |
| **C. TypeScript库** | 纯TS，易集成 | 库选择有限，精度可能较低 | ✅ **推荐** |
| **D. 混合方案** | 灵活，可降级 | 维护成本高 | ⚠️ 复杂 |

### 选择方案C: TypeScript占星库

**原因**:
1. ✅ 纯TypeScript实现，无外部依赖
2. ✅ 易于集成到MCP服务器
3. ✅ 本地计算，无需API费用
4. ✅ 可离线工作
5. ⚠️ 精度可能不如Swiss Ephemeris，但足够日常使用

**推荐库**: `@astrojs/astro` 或 `astrologyjs` 或 `ephemeris`

---

## 📦 TypeScript占星库调研

### 1. astrology (npm)
- **GitHub**: https://github.com/0xStarcat/astrology
- **特性**: 行星位置、星座、宫位
- **状态**: ✅ 活跃维护
- **安装**: `npm install astrology`

### 2. circular-natal-horoscope-js
- **GitHub**: https://github.com/AstroDev2023/circular-natal-horoscope-js
- **特性**: 完整的出生星盘计算，SVG图表
- **状态**: ✅ 现代化
- **安装**: `npm install circular-natal-horoscope-js`

### 3. ephemeris
- **GitHub**: https://github.com/mivion/ephemeris
- **特性**: 基于moshier算法，高精度
- **状态**: ✅ 可靠
- **安装**: `npm install ephemeris`

### 4. swisseph (Swiss Ephemeris的JS封装)
- **特性**: 最精确的行星位置计算
- **状态**: ⚠️ 需要WASM/Native模块
- **安装**: 复杂

---

## 🎯 实施方案（方案C详细步骤）

### Phase 1: 库选择与测试

**首选**: `circular-natal-horoscope-js`
**原因**: 
- ✅ 专注出生星盘
- ✅ 包含SVG绘图
- ✅ TypeScript支持
- ✅ 现代化API

**备选**: `astrology` + `ephemeris`
**原因**:
- ✅ 更精确的行星位置（ephemeris）
- ✅ 更灵活的组合方式

### Phase 2: 代码实现

#### 2.1 安装依赖

```bash
npm install circular-natal-horoscope-js
# 或
npm install astrology ephemeris
```

#### 2.2 增强 AstrologyService

```typescript
/**
 * Western Astrology Service (Enhanced)
 * 
 * Inspired by: https://github.com/zyaproxy-Jun/Astrologer-API
 * - Professional birth chart calculation using Kerykeion methodology
 * - Based on Swiss Ephemeris principles
 * - Accurate planetary positions and aspects
 * 
 * TypeScript Implementation:
 * - Using circular-natal-horoscope-js for calculations
 * - Maintains API compatibility with MCP protocol
 * - Offline-capable with no API dependencies
 * 
 * @see https://www.kerykeion.net/
 */

import { Origin, Horoscope } from 'circular-natal-horoscope-js';

export class AstrologyService {
  /**
   * Calculate birth chart with professional accuracy
   */
  async getBirthChart(params: any) {
    const {
      date,
      time,
      latitude,
      longitude,
      timezone,
      language = 'zh-CN'
    } = params;

    try {
      // Parse date and time
      const [year, month, day] = date.split('-').map(Number);
      const [hour, minute] = time.split(':').map(Number);

      // Create origin point (birth location and time)
      const origin = new Origin({
        year,
        month,
        date: day,
        hour,
        minute,
        latitude,
        longitude,
      });

      // Calculate horoscope
      const horoscope = new Horoscope({
        origin,
        houseSystem: 'placidus', // or 'whole-sign', 'equal', 'koch'
        zodiac: 'tropical', // or 'sidereal'
        aspectPoints: ['bodies', 'points'],
        aspectWithPoints: ['bodies', 'points'],
        aspectTypes: ['major', 'minor'],
        customOrbs: {},
        language: 'en',
      });

      // Extract data
      const celestialBodies = horoscope.CelestialBodies;
      const houses = horoscope.Houses;
      const aspects = horoscope.Aspects;

      // Format response
      return {
        birth_info: {
          date,
          time,
          location: { latitude, longitude },
          timezone,
        },
        sun_sign: this.getSignInfo(celestialBodies.sun),
        moon_sign: this.getSignInfo(celestialBodies.moon),
        ascendant: this.getSignInfo(celestialBodies.ascendant),
        planets: this.formatPlanets(celestialBodies),
        houses: this.formatHouses(houses),
        aspects: this.formatAspects(aspects),
        interpretation: this.interpretChart(celestialBodies, houses, aspects, language),
      };
    } catch (error) {
      throw new Error(`星盘计算失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private getSignInfo(body: any): string {
    const signNames: { [key: string]: string } = {
      'aries': '白羊座',
      'taurus': '金牛座',
      'gemini': '双子座',
      'cancer': '巨蟹座',
      'leo': '狮子座',
      'virgo': '处女座',
      'libra': '天秤座',
      'scorpio': '天蝎座',
      'sagittarius': '射手座',
      'capricorn': '摩羯座',
      'aquarius': '水瓶座',
      'pisces': '双鱼座',
    };
    return signNames[body.Sign.label.toLowerCase()] || body.Sign.label;
  }

  private formatPlanets(bodies: any): any {
    const planets: any = {};
    const planetList = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
    
    planetList.forEach(planet => {
      if (bodies[planet]) {
        planets[planet] = {
          sign: this.getSignInfo(bodies[planet]),
          degree: bodies[planet].ChartPosition.Ecliptic.DecimalDegrees,
          house: bodies[planet].House?.id || 0,
          retrograde: bodies[planet].isRetrograde || false,
        };
      }
    });

    return planets;
  }

  private formatHouses(houses: any): any[] {
    return houses.map((house: any, index: number) => ({
      house: index + 1,
      sign: this.getSignInfo({ Sign: house.Sign }),
      cusp: house.ChartPosition.StartPosition.Ecliptic.DecimalDegrees,
    }));
  }

  private formatAspects(aspects: any[]): any[] {
    return aspects.map((aspect: any) => ({
      planet1: aspect.point1.label,
      planet2: aspect.point2.label,
      aspect: aspect.aspectLevel,
      angle: aspect.aspectDegrees,
      orb: aspect.orb,
    }));
  }

  private interpretChart(bodies: any, houses: any, aspects: any[], language: string): string {
    const isChinese = language.startsWith('zh');
    
    let interpretation = isChinese ? '# 西洋占星星盘解析\n\n' : '# Birth Chart Interpretation\n\n';
    
    // 核心特质
    interpretation += isChinese ? '## 核心特质\n' : '## Core Traits\n';
    interpretation += isChinese
      ? `**太阳星座**: ${this.getSignInfo(bodies.sun)} ${bodies.sun.ChartPosition.Ecliptic.DecimalDegrees.toFixed(2)}° - 代表您的核心自我和生命目标\n`
      : `**Sun Sign**: ${this.getSignInfo(bodies.sun)} ${bodies.sun.ChartPosition.Ecliptic.DecimalDegrees.toFixed(2)}° - Your core self and life purpose\n`;
    
    interpretation += isChinese
      ? `**月亮星座**: ${this.getSignInfo(bodies.moon)} ${bodies.moon.ChartPosition.Ecliptic.DecimalDegrees.toFixed(2)}° - 反映您的情感需求和内在世界\n`
      : `**Moon Sign**: ${this.getSignInfo(bodies.moon)} ${bodies.moon.ChartPosition.Ecliptic.DecimalDegrees.toFixed(2)}° - Your emotional needs and inner world\n`;
    
    interpretation += isChinese
      ? `**上升星座**: ${this.getSignInfo(bodies.ascendant)} - 显示您给他人的第一印象\n\n`
      : `**Ascendant**: ${this.getSignInfo(bodies.ascendant)} - Your first impression to others\n\n`;

    // 行星配置
    interpretation += isChinese ? '## 行星配置\n' : '## Planetary Placements\n';
    const planets = ['mercury', 'venus', 'mars', 'jupiter', 'saturn'];
    planets.forEach(planet => {
      if (bodies[planet]) {
        interpretation += `- **${planet}** ${isChinese ? '在' : 'in'} ${this.getSignInfo(bodies[planet])}\n`;
      }
    });
    interpretation += '\n';

    // 主要相位
    interpretation += isChinese ? '## 主要相位\n' : '## Major Aspects\n';
    aspects.slice(0, 5).forEach((aspect: any) => {
      interpretation += `- ${aspect.planet1} ${aspect.aspect} ${aspect.planet2} (${aspect.orb.toFixed(2)}°)\n`;
    });

    interpretation += isChinese
      ? '\n*注: 完整解读需要考虑更多细节因素。*\n'
      : '\n*Note: Complete interpretation requires consideration of more factors.*\n';

    return interpretation;
  }
}
```

### Phase 3: 文档更新

#### README.md
```markdown
## Sources
- **Western Astrology**: Inspired by [Astrologer-API](https://github.com/zyaproxy-Jun/Astrologer-API) methodology
  - Based on Kerykeion/Swiss Ephemeris principles
  - Professional birth chart calculations
  - TypeScript implementation using circular-natal-horoscope-js
```

#### README.zh-CN.md
```markdown
| 🌌 **西洋占星** | 专业星盘计算 | ✅ 100% | [Astrologer-API](https://github.com/zyaproxy-Jun/Astrologer-API) 方法论 |
```

---

## ⚖️ 版权与许可

### 官方项目
- **仓库**: https://github.com/zyaproxy-Jun/Astrologer-API
- **核心库**: Kerykeion (GPL-3.0 or AGPL-3.0)
- **方法论**: 基于Swiss Ephemeris的占星计算原理

### 使用方式
1. ✅ **方法论参考** - 学习Kerykeion的占星计算方法
2. ✅ **独立实现** - 使用TypeScript占星库独立实现
3. ✅ **注明灵感来源** - 标注参考了Astrologer-API的方法论
4. ✅ **MIT许可证** - 项目继续使用MIT（不直接使用GPL代码）

### 代码注释示例
```typescript
/**
 * Inspired by: https://github.com/zyaproxy-Jun/Astrologer-API
 * - Professional astrology calculations using Kerykeion methodology
 * - Based on Swiss Ephemeris principles
 * - Accurate planetary positions and house systems
 * 
 * TypeScript Implementation:
 * - Using circular-natal-horoscope-js
 * - Independent implementation following similar principles
 * - MIT License compatible
 */
```

---

## 🎯 预期成果

### 功能提升
- **精确度**: 简单算法 → 专业星历计算 ⭐⭐⭐⭐⭐
- **数据完整性**: 基础数据 → 完整行星+宫位+相位 ⭐⭐⭐⭐⭐
- **宫位系统**: 无 → 支持多种宫位系统 ⭐⭐⭐⭐⭐
- **相位计算**: 无 → 完整的主要/次要相位 ⭐⭐⭐⭐⭐
- **解读质量**: 基础 → 基于精确数据的专业解读 ⭐⭐⭐⭐

### 数据对比

| 数据项 | 当前实现 | 集成后 |
|--------|---------|--------|
| 太阳位置 | 仅星座 | 精确度数+星座 |
| 月亮位置 | 随机星座 | 精确度数+星座 |
| 上升星座 | 随机 | 精确计算 |
| 行星位置 | 随机 | 精确星历计算 |
| 宫位系统 | 简单等分 | Placidus/Koch/等多种 |
| 相位 | 2个示例 | 完整相位网络 |
| 逆行 | 无 | ✅ 支持 |

---

## 📝 实施步骤

1. **Phase 1**: 库调研与测试 (30分钟)
   - [x] 分析官方API
   - [ ] 测试circular-natal-horoscope-js
   - [ ] 验证计算精度

2. **Phase 2**: 代码实现 (60分钟)
   - [ ] 安装npm包
   - [ ] 备份当前实现
   - [ ] 实现新的AstrologyService
   - [ ] 测试所有功能

3. **Phase 3**: 文档与提交 (30分钟)
   - [ ] 更新README
   - [ ] 创建集成文档
   - [ ] Git提交和推送

**预计总时间**: 2小时

---

## 🚨 注意事项

### 技术限制
- ⚠️ TypeScript库精度可能略低于Swiss Ephemeris
- ⚠️ SVG图表生成可选
- ⚠️ 某些高级功能（如岁差修正）可能有限

### 替代方案
如果TypeScript库不满足需求，可考虑:
1. 使用Python子进程调用Kerykeion
2. 集成Astrologer-API（需要API key）
3. 使用WASM编译的Swiss Ephemeris

### 测试要点
- ✅ 太阳星座计算准确性
- ✅ 上升星座计算（需要准确经纬度和时间）
- ✅ 行星位置合理性
- ✅ 相位角度计算
- ✅ 多语言支持

---

**创建时间**: 2025-10-06  
**状态**: 📋 规划完成，等待实施  
**方案选择**: C - TypeScript占星库集成
