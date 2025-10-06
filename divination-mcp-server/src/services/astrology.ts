/**
 * Western Astrology Service
 * Birth chart calculation and interpretation
 */

import axios from 'axios';

export class AstrologyService {
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

      // Calculate planetary positions
      const chart = await this.calculateChart({
        year,
        month,
        day,
        hour,
        minute,
        latitude,
        longitude,
        timezone,
      });

      const interpretation = this.interpretChart(chart, language);

      return {
        birth_info: {
          date,
          time,
          location: { latitude, longitude },
          timezone,
        },
        sun_sign: chart.sun_sign,
        moon_sign: chart.moon_sign,
        ascendant: chart.ascendant,
        planets: chart.planets,
        houses: chart.houses,
        aspects: chart.aspects,
        interpretation,
      };
    } catch (error) {
      throw new Error(`星盘计算失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async calculateChart(params: any) {
    // Simplified chart calculation
    // In production, use a proper ephemeris library or API
    
    const sunSigns = [
      '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
      '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'
    ];

    const month = params.month;
    const day = params.day;
    
    let sunSignIndex = 0;
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) sunSignIndex = 0;
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) sunSignIndex = 1;
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) sunSignIndex = 2;
    else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) sunSignIndex = 3;
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) sunSignIndex = 4;
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) sunSignIndex = 5;
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) sunSignIndex = 6;
    else if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) sunSignIndex = 7;
    else if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) sunSignIndex = 8;
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) sunSignIndex = 9;
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) sunSignIndex = 10;
    else sunSignIndex = 11;

    const sun_sign = sunSigns[sunSignIndex];
    const moon_sign = sunSigns[(sunSignIndex + Math.floor(Math.random() * 12)) % 12];
    const ascendant = sunSigns[(sunSignIndex + Math.floor(Math.random() * 12)) % 12];

    return {
      sun_sign,
      moon_sign,
      ascendant,
      planets: {
        sun: { sign: sun_sign, house: 1, degree: 15 },
        moon: { sign: moon_sign, house: 4, degree: 20 },
        mercury: { sign: sun_sign, house: 1, degree: 10 },
        venus: { sign: sunSigns[(sunSignIndex + 1) % 12], house: 2, degree: 5 },
        mars: { sign: sunSigns[(sunSignIndex + 2) % 12], house: 3, degree: 25 },
        jupiter: { sign: sunSigns[(sunSignIndex + 4) % 12], house: 9, degree: 12 },
        saturn: { sign: sunSigns[(sunSignIndex + 8) % 12], house: 10, degree: 18 },
      },
      houses: Array.from({ length: 12 }, (_, i) => ({
        house: i + 1,
        sign: sunSigns[(sunSignIndex + i) % 12],
        cusp: i * 30,
      })),
      aspects: [
        { planet1: 'sun', planet2: 'moon', aspect: 'trine', angle: 120 },
        { planet1: 'venus', planet2: 'mars', aspect: 'square', angle: 90 },
      ],
    };
  }

  private interpretChart(chart: any, language: string): string {
    let interpretation = `# 西洋占星星盘解析\n\n`;
    
    interpretation += `## 核心特质\n`;
    interpretation += `**太阳星座**: ${chart.sun_sign} - 代表您的核心自我和生命目标\n`;
    interpretation += `**月亮星座**: ${chart.moon_sign} - 反映您的情感需求和内在世界\n`;
    interpretation += `**上升星座**: ${chart.ascendant} - 显示您给他人的第一印象\n\n`;

    interpretation += `## 行星配置\n`;
    interpretation += `- **水星** 在 ${chart.planets.mercury.sign}: 思维和沟通方式\n`;
    interpretation += `- **金星** 在 ${chart.planets.venus.sign}: 爱情观和价值观\n`;
    interpretation += `- **火星** 在 ${chart.planets.mars.sign}: 行动力和欲望表达\n`;
    interpretation += `- **木星** 在 ${chart.planets.jupiter.sign}: 幸运和扩展领域\n`;
    interpretation += `- **土星** 在 ${chart.planets.saturn.sign}: 课题和责任所在\n\n`;

    interpretation += `## 相位分析\n`;
    chart.aspects.forEach((aspect: any) => {
      interpretation += `- ${aspect.planet1} ${aspect.aspect} ${aspect.planet2}: `;
      interpretation += this.getAspectMeaning(aspect.aspect) + `\n`;
    });

    interpretation += `\n*注: 完整解读需要考虑更多细节因素。*`;

    return interpretation;
  }

  private getAspectMeaning(aspect: string): string {
    const meanings: { [key: string]: string } = {
      conjunction: '合相 - 能量融合，影响力强',
      trine: '三分相 - 和谐流动，天赋才能',
      square: '四分相 - 紧张冲突，需要调整',
      opposition: '对冲相 - 两极平衡，寻求整合',
      sextile: '六分相 - 机会契机，需主动把握',
    };
    return meanings[aspect] || '特殊相位';
  }
}
