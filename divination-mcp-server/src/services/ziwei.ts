/**
 * Zi Wei Dou Shu (紫微斗数) Service
 * Chinese Purple Star Astrology
 * 
 * Official Source: https://github.com/zyaproxy-Jun/iztro
 * - Lightweight astrolabe kit for Zi Wei Dou Shu
 * - Multi-language support for Chinese Purple Star Astrology
 * 
 * Original Library: iztro by SylarLong
 * Fork Repository: https://github.com/zyaproxy-Jun/iztro
 * 
 * @see {@link https://github.com/zyaproxy-Jun/iztro|iztro Source}
 * @see {@link https://github.com/SylarLong/iztro|Original iztro}
 */

import { astro } from 'iztro';

export class ZiWeiService {
  async generateChart(params: any) {
    const {
      solar_date,
      lunar_date,
      birth_hour,
      gender,
      is_leap_month = false,
      language = 'zh-CN'
    } = params;

    try {
      let astrolabe;
      
      // Normalize gender
      const genderValue = (gender === 'male' || gender === '男') ? '男' : '女';
      
      // Convert 24-hour format to 12-hour format (iztro only supports 0-12)
      // Hours 13-23 need to be converted to 0-11
      let hourValue = birth_hour;
      if (hourValue >= 13 && hourValue <= 23) {
        hourValue = hourValue - 12;
      } else if (hourValue === 12) {
        hourValue = 0; // 12 noon = 0 in 12-hour format
      }

      if (lunar_date) {
        // Use lunar date
        astrolabe = astro.byLunar(
          lunar_date,
          hourValue,
          genderValue,
          is_leap_month,
          true,
          language
        );
      } else if (solar_date) {
        // Use solar date
        astrolabe = astro.bySolar(
          solar_date,
          hourValue,
          genderValue,
          true,
          language
        );
      } else {
        throw new Error('Either solar_date or lunar_date must be provided');
      }

      // Extract key information
      const analysis = {
        basic_info: {
          solar_date: astrolabe.solarDate,
          lunar_date: astrolabe.lunarDate,
          chinese_date: astrolabe.chineseDate,
          gender: genderValue,
          zodiac: astrolabe.zodiac,
          sign: astrolabe.sign,
        },
        soul_and_body: {
          soul: astrolabe.soul,
          body: astrolabe.body,
          earthly_branch_of_soul_palace: astrolabe.earthlyBranchOfSoulPalace,
          earthly_branch_of_body_palace: astrolabe.earthlyBranchOfBodyPalace,
        },
        five_elements: {
          class: astrolabe.fiveElementsClass,
        },
        palaces: astrolabe.palaces.map((palace: any) => ({
          name: palace.name,
          earthly_branch: palace.earthlyBranch,
          heavenly_stem: palace.heavenlyStem,
          major_stars: palace.majorStars.map((star: any) => ({
            name: star.name,
            type: star.type,
            scope: star.scope,
            brightness: star.brightness,
          })),
          minor_stars: palace.minorStars.map((star: any) => star.name),
          decadal: palace.decadal,
        })),
        interpretation: this.generateInterpretation(astrolabe, language),
      };

      return analysis;
    } catch (error) {
      throw new Error(`紫微斗数排盘失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private generateInterpretation(astrolabe: any, language: string): string {
    const soulPalace = astrolabe.palace('命宫');
    const careerPalace = astrolabe.palace('官禄宫');
    const wealthPalace = astrolabe.palace('财帛宫');
    const marriagePalace = astrolabe.palace('夫妻宫');

    let interpretation = `# 紫微斗数命盘解析\n\n`;
    interpretation += `## 基本信息\n`;
    interpretation += `- 阳历: ${astrolabe.solarDate}\n`;
    interpretation += `- 农历: ${astrolabe.lunarDate}\n`;
    interpretation += `- 生肖: ${astrolabe.zodiac}\n`;
    interpretation += `- 星座: ${astrolabe.sign}\n`;
    interpretation += `- 五行局: ${astrolabe.fiveElementsClass}\n\n`;

    interpretation += `## 命宫分析\n`;
    interpretation += `命宫位于${soulPalace?.earthlyBranch}，天干为${soulPalace?.heavenlyStem}。\n`;
    if (soulPalace?.majorStars.length > 0) {
      interpretation += `主星: ${soulPalace.majorStars.map((s: any) => s.name).join('、')}\n`;
      interpretation += `这些主星的组合显示出您的性格特质和人生方向。\n\n`;
    }

    interpretation += `## 事业宫\n`;
    if (careerPalace?.majorStars.length > 0) {
      interpretation += `事业宫主星: ${careerPalace.majorStars.map((s: any) => s.name).join('、')}\n`;
      interpretation += `这些星曜影响您的事业发展方向和成就。\n\n`;
    }

    interpretation += `## 财帛宫\n`;
    if (wealthPalace?.majorStars.length > 0) {
      interpretation += `财帛宫主星: ${wealthPalace.majorStars.map((s: any) => s.name).join('、')}\n`;
      interpretation += `这些星曜显示您的财运状况和理财能力。\n\n`;
    }

    interpretation += `## 夫妻宫\n`;
    if (marriagePalace?.majorStars.length > 0) {
      interpretation += `夫妻宫主星: ${marriagePalace.majorStars.map((s: any) => s.name).join('、')}\n`;
      interpretation += `这些星曜反映您的感情状况和婚姻运势。\n\n`;
    }

    interpretation += `\n*注: 以上为基础解读，详细分析需要结合全盘星曜配置。*`;

    return interpretation;
  }
}
