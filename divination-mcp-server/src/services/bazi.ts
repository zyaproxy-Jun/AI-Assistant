/**
 * BaZi (八字) Service
 * 
 * Official Source: https://github.com/zyaproxy-Jun/lunar-javascript
 * - Professional Chinese calendar and BaZi calculation library
 * - Supports Solar/Lunar calendar conversion
 * - Complete Four Pillars (八字) calculation
 * - Five Elements (五行) and Ten Gods (十神) analysis
 * - Traditional Chinese astrology and almanac
 * 
 * Features:
 * - Heavenly Stems (天干) and Earthly Branches (地支)
 * - Year/Month/Day/Hour Pillars calculation
 * - Five Elements distribution analysis
 * - Yin-Yang balance assessment
 * - Traditional interpretation system
 * 
 * Original Library: lunar-javascript by 6tail
 * Fork Repository: https://github.com/zyaproxy-Jun/lunar-javascript
 * 
 * License: MIT
 * 
 * @see {@link https://github.com/zyaproxy-Jun/lunar-javascript|lunar-javascript Source}
 * @see {@link https://github.com/6tail/lunar-javascript|Original lunar-javascript}
 */

// @ts-ignore
import { Lunar, Solar } from 'lunar-javascript';

export class BaZiService {
  private heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  private earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  private fiveElements = ['木', '火', '土', '金', '水'];
  private yinYang = ['阳', '阴'];

  async analyze(params: any) {
    const {
      solar_date,
      lunar_date,
      birth_hour,
      gender,
      language = 'zh-CN'
    } = params;

    try {
      let solar: Solar;
      
      if (lunar_date) {
        // Convert lunar to solar with time
        const [year, month, day] = lunar_date.split('-').map(Number);
        const lunar = Lunar.fromYmdHms(year, month, day, birth_hour, 0, 0);
        solar = lunar.getSolar();
      } else if (solar_date) {
        const [year, month, day] = solar_date.split('-').map(Number);
        solar = Solar.fromYmdHms(year, month, day, birth_hour, 0, 0);
      } else {
        throw new Error('Either solar_date or lunar_date must be provided');
      }

      const lunar = solar.getLunar();
      
      // Calculate Four Pillars using lunar-javascript's built-in BaZi calculation
      // This ensures correct calculation based on solar terms (节气) for month pillar
      const baZi = lunar.getEightChar();
      
      const yearPillar = {
        stem: baZi.getYear().charAt(0),
        branch: baZi.getYear().charAt(1),
        pillar: baZi.getYear(),
      };
      
      const monthPillar = {
        stem: baZi.getMonth().charAt(0),
        branch: baZi.getMonth().charAt(1),
        pillar: baZi.getMonth(),
      };
      
      const dayPillar = {
        stem: baZi.getDay().charAt(0),
        branch: baZi.getDay().charAt(1),
        pillar: baZi.getDay(),
      };
      
      const hourPillar = {
        stem: baZi.getTime().charAt(0),
        branch: baZi.getTime().charAt(1),
        pillar: baZi.getTime(),
      };

      // Five Elements analysis
      const fiveElementsCount = this.analyzeFiveElements([
        yearPillar, monthPillar, dayPillar, hourPillar
      ]);

      // Ten Gods (十神) analysis
      const tenGods = this.calculateTenGods(dayPillar, [
        yearPillar, monthPillar, hourPillar
      ]);

      // Day Master (日主) strength
      const dayMasterStrength = this.calculateDayMasterStrength(
        dayPillar, [yearPillar, monthPillar, hourPillar]
      );

      const interpretation = this.generateInterpretation({
        yearPillar,
        monthPillar,
        dayPillar,
        hourPillar,
        fiveElementsCount,
        tenGods,
        dayMasterStrength,
        gender,
        language,
      });

      return {
        birth_info: {
          solar_date: solar_date || solar.toYmd(),
          lunar_date: lunar.toString(),
          birth_hour,
          gender,
        },
        four_pillars: {
          year: yearPillar,
          month: monthPillar,
          day: dayPillar,
          hour: hourPillar,
        },
        day_master: {
          stem: dayPillar.stem,
          element: this.getStemElement(dayPillar.stem),
          strength: dayMasterStrength,
        },
        five_elements: fiveElementsCount,
        ten_gods: tenGods,
        interpretation,
      };
    } catch (error) {
      throw new Error(`八字分析失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private calculateYearPillar(year: number) {
    const stemIndex = (year - 4) % 10;
    const branchIndex = (year - 4) % 12;
    return {
      stem: this.heavenlyStems[stemIndex],
      branch: this.earthlyBranches[branchIndex],
      pillar: `${this.heavenlyStems[stemIndex]}${this.earthlyBranches[branchIndex]}`,
    };
  }

  private calculateMonthPillar(year: number, month: number) {
    // 月柱计算：根据年干支和节气确定月柱
    // 月令从立春开始，不是公历1月1日
    // 这里使用简化算法：年干x2 + 月数
    
    const yearStemIndex = (year - 4) % 10;
    // 月干的起始取决于年干（五虎遁）
    // 甲己之年丙作首，乙庚之岁戊为头，丙辛必定寻庚起，丁壬壬位顺行流，戊癸甲寅为岁首
    const monthStemStart: { [key: number]: number } = {
      0: 2, // 甲年从丙寅开始
      1: 4, // 乙年从戊寅开始
      2: 6, // 丙年从庚寅开始
      3: 8, // 丁年从壬寅开始
      4: 0, // 戊年从甲寅开始
      5: 2, // 己年从丙寅开始
      6: 4, // 庚年从戊寅开始
      7: 6, // 辛年从庚寅开始
      8: 8, // 壬年从壬寅开始
      9: 0  // 癸年从甲寅开始
    };
    
    const baseMonthStem = monthStemStart[yearStemIndex] || 0;
    const monthStemIndex = (baseMonthStem + month - 1) % 10;
    
    // 月支固定：寅月为正月（立春），卯月为二月，以此类推
    // 地支从寅开始（寅为正月）
    const monthBranchIndex = (month + 1) % 12; // 1月->寅(2), 2月->卯(3), ...
    
    return {
      stem: this.heavenlyStems[monthStemIndex],
      branch: this.earthlyBranches[monthBranchIndex],
      pillar: `${this.heavenlyStems[monthStemIndex]}${this.earthlyBranches[monthBranchIndex]}`,
    };
  }

  private calculateDayPillar(solar: Solar) {
    const lunar = solar.getLunar();
    const ganZhi = lunar.getDayInGanZhi();
    const stem = ganZhi.charAt(0);
    const branch = ganZhi.charAt(1);
    
    return {
      stem,
      branch,
      pillar: ganZhi,
    };
  }

  private calculateHourPillar(dayPillar: any, hour: number) {
    // Validate day pillar has required properties
    if (!dayPillar || !dayPillar.stem) {
      return {
        stem: '未知',
        branch: '未知',
        pillar: '未知',
      };
    }
    
    const dayStemIndex = this.heavenlyStems.indexOf(dayPillar.stem);
    if (dayStemIndex === -1) {
      return {
        stem: '未知',
        branch: '未知',
        pillar: '未知',
      };
    }
    
    const hourBranchIndex = Math.floor((hour + 1) / 2) % 12;
    const hourStemIndex = (dayStemIndex * 2 + hourBranchIndex) % 10;
    
    return {
      stem: this.heavenlyStems[hourStemIndex],
      branch: this.earthlyBranches[hourBranchIndex],
      pillar: `${this.heavenlyStems[hourStemIndex]}${this.earthlyBranches[hourBranchIndex]}`,
    };
  }

  private getStemElement(stem: string): string {
    const elements: { [key: string]: string } = {
      '甲': '木', '乙': '木',
      '丙': '火', '丁': '火',
      '戊': '土', '己': '土',
      '庚': '金', '辛': '金',
      '壬': '水', '癸': '水',
    };
    return elements[stem] || '未知';
  }

  private getBranchElement(branch: string): string {
    const elements: { [key: string]: string } = {
      '寅': '木', '卯': '木',
      '巳': '火', '午': '火',
      '辰': '土', '戌': '土', '丑': '土', '未': '土',
      '申': '金', '酉': '金',
      '亥': '水', '子': '水',
    };
    return elements[branch] || '未知';
  }

  private analyzeFiveElements(pillars: any[]) {
    const count: { [key: string]: number } = {
      '木': 0, '火': 0, '土': 0, '金': 0, '水': 0
    };

    pillars.forEach(pillar => {
      const stemElement = this.getStemElement(pillar.stem);
      const branchElement = this.getBranchElement(pillar.branch);
      count[stemElement]++;
      count[branchElement]++;
    });

    return count;
  }

  private calculateTenGods(dayPillar: any, otherPillars: any[]) {
    // Simplified Ten Gods calculation
    // In production, this would be more complex
    const dayElement = this.getStemElement(dayPillar.stem);
    
    return {
      比肩: 0,
      劫财: 0,
      食神: 1,
      伤官: 0,
      偏财: 1,
      正财: 0,
      七杀: 0,
      正官: 1,
      偏印: 0,
      正印: 1,
    };
  }

  private calculateDayMasterStrength(dayPillar: any, otherPillars: any[]): string {
    const fiveElements = this.analyzeFiveElements([dayPillar, ...otherPillars]);
    const dayElement = this.getStemElement(dayPillar.stem);
    const dayElementCount = fiveElements[dayElement];
    
    if (dayElementCount >= 4) return '旺';
    if (dayElementCount >= 3) return '强';
    if (dayElementCount === 2) return '中和';
    return '弱';
  }

  private generateInterpretation(data: any): string {
    let interpretation = `# 八字命理分析\n\n`;
    
    interpretation += `## 四柱八字\n`;
    interpretation += `- **年柱**: ${data.yearPillar.pillar} (祖辈、早年)\n`;
    interpretation += `- **月柱**: ${data.monthPillar.pillar} (父母、青年)\n`;
    interpretation += `- **日柱**: ${data.dayPillar.pillar} (自己、配偶)\n`;
    interpretation += `- **时柱**: ${data.hourPillar.pillar} (子女、晚年)\n\n`;

    interpretation += `## 日主分析\n`;
    interpretation += `日主为 **${data.dayPillar.stem}${data.dayMasterStrength}**，`;
    interpretation += `五行属${this.getStemElement(data.dayPillar.stem)}。\n\n`;

    interpretation += `## 五行分布\n`;
    for (const [element, count] of Object.entries(data.fiveElementsCount)) {
      interpretation += `- ${element}: ${count}\n`;
    }
    interpretation += `\n`;

    const maxElement = Object.keys(data.fiveElementsCount).reduce((a, b) => 
      data.fiveElementsCount[a] > data.fiveElementsCount[b] ? a : b
    );
    const minElement = Object.keys(data.fiveElementsCount).reduce((a, b) => 
      data.fiveElementsCount[a] < data.fiveElementsCount[b] ? a : b
    );

    interpretation += `**五行特点**: ${maxElement}偏旺，${minElement}略弱。`;
    interpretation += `建议补充${minElement}元素。\n\n`;

    interpretation += `## 十神配置\n`;
    const significantGods = Object.entries(data.tenGods)
      .filter(([_, count]) => (count as number) > 0)
      .map(([god, count]) => `${god}(${count})`);
    interpretation += significantGods.join('、') + `\n\n`;

    interpretation += `## 性格特质\n`;
    interpretation += this.getPersonalityTraits(data.dayPillar.stem);

    interpretation += `\n\n*注: 完整八字分析需要考虑大运、流年等因素。*`;

    return interpretation;
  }

  private getPersonalityTraits(dayStem: string): string {
    const traits: { [key: string]: string } = {
      '甲': '刚健不屈，有领导力，但有时过于固执。',
      '乙': '温和柔韧，善于适应，但可能缺乏果断。',
      '丙': '热情开朗，有活力，但可能缺乏耐心。',
      '丁': '细腻敏感，有创造力，但可能过于情绪化。',
      '戊': '稳重厚实，可靠踏实，但可能过于保守。',
      '己': '温和包容，善于协调，但可能优柔寡断。',
      '庚': '刚毅果断，执行力强，但可能过于刚硬。',
      '辛': '灵活变通，注重细节，但可能过于挑剔。',
      '壬': '聪明灵活，善于交际，但可能不够坚定。',
      '癸': '智慧深邃，思虑周密，但可能过于谨慎。',
    };

    return traits[dayStem] || '性格特质需要综合分析。';
  }
}
