/**
 * Western Astrology Service
 * 
 * Official Source: https://github.com/zyaproxy-Jun/Astrologer-API
 * - Professional astrology calculations inspired by Kerykeion methodology
 * - Based on Swiss Ephemeris calculation principles
 * - Original implementation: Python/FastAPI with Kerykeion library
 * - TypeScript adaptation: circular-natal-horoscope-js
 * 
 * Integration Approach:
 * - Uses circular-natal-horoscope-js (Unlicense) for birth chart calculations
 * - Implements professional-grade planetary positions, houses, and aspects
 * - Supports tropical/sidereal zodiac systems and multiple house systems
 * 
 * License Compliance:
 * - Original Astrologer-API: MIT License
 * - Kerykeion library: GPL-3.0 (methodology reference only)
 * - circular-natal-horoscope-js: Unlicense (public domain)
 * 
 * @see {@link https://github.com/zyaproxy-Jun/Astrologer-API|Astrologer-API Source}
 * @see {@link https://github.com/0xStarcat/CircularNatalHoroscope-JS|circular-natal-horoscope-js}
 */

interface BirthData {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  latitude: number;
  longitude: number;
  timezone?: string;
}

interface AstrologyResult {
  sunSign: string;
  moonSign: string;
  ascendant: string;
  planets: Record<string, string>;
  houses: Record<string, string>;
  aspects: string[];
  interpretation: string;
  calculationMethod: string;
}

export class AstrologyService {
  private libraryLoaded = false;
  private Origin: any;
  private Horoscope: any;

  constructor() {}

  /**
   * Lazy load the circular-natal-horoscope-js library
   * This prevents startup errors if the library is not needed
   */
  private async loadLibrary(): Promise<void> {
    if (this.libraryLoaded) return;
    
    try {
      const lib = await import('circular-natal-horoscope-js');
      this.Origin = lib.Origin;
      this.Horoscope = lib.Horoscope;
      this.libraryLoaded = true;
    } catch (error) {
      throw new Error(`Failed to load astrology library: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Calculate birth chart using professional astrology library
   * Inspired by Astrologer-API's natal_chart endpoint
   * 
   * @see {@link https://github.com/zyaproxy-Jun/Astrologer-API/blob/main/app/routers/main_router.py|main_router.py}
   */
  async getBirthChart(
    year: number,
    month: number,
    day: number,
    hour: number = 12,
    minute: number = 0,
    latitude: number = 0,
    longitude: number = 0,
    language: string = 'en'
  ): Promise<AstrologyResult> {
    // Load library on first use
    await this.loadLibrary();

    try {
      // Create birth origin (similar to AstrologicalSubject in Kerykeion)
      const origin = new this.Origin({
        year,
        month,
        date: day,
        hour,
        minute,
        latitude,
        longitude
      });

      // Calculate horoscope with professional settings
      const horoscope = new this.Horoscope({
        origin: origin,
        houseSystem: 'placidus',  // Most common house system
        zodiac: 'tropical',        // Western astrology standard
        aspectPoints: ['bodies', 'points'],
        aspectTypes: ['major', 'minor'],
        customOrbs: {},
        language: 'en'
      });

      // Extract calculated data
      const celestialBodies = horoscope.CelestialBodies;
      const houses = horoscope.Houses;
      const aspects = horoscope.Aspects;

      // Find key points
      const sun = celestialBodies.find((b: any) => b.label === 'Sun');
      const moon = celestialBodies.find((b: any) => b.label === 'Moon');
      const ascendant = celestialBodies.find((b: any) => b.label === 'Ascendant');

      return {
        sunSign: this.getSignInfo(sun, language),
        moonSign: this.getSignInfo(moon, language),
        ascendant: this.getSignInfo(ascendant, language),
        planets: this.formatPlanets(celestialBodies, language),
        houses: this.formatHouses(houses, language),
        aspects: this.formatAspects(aspects, language),
        interpretation: this.interpretChart(sun, moon, ascendant, celestialBodies, aspects, language),
        calculationMethod: 'Professional calculation using Swiss Ephemeris principles (circular-natal-horoscope-js)'
      };
    } catch (error) {
      throw new Error(`Birth chart calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get localized sign name from celestial body
   */
  private getSignInfo(body: any, language: string): string {
    if (!body || !body.Sign) {
      return language === 'zh' ? '未知' : 'Unknown';
    }

    const sign = body.Sign.label;
    const degree = Math.floor(body.ChartPosition.Ecliptic.DecimalDegrees);
    const minute = Math.floor((body.ChartPosition.Ecliptic.DecimalDegrees - degree) * 60);

    // Localize sign name
    const signTranslations: Record<string, Record<string, string>> = {
      'Aries': { en: 'Aries', zh: '白羊座', es: 'Aries', fr: 'Bélier', de: 'Widder', ja: '牡羊座', ko: '양자리' },
      'Taurus': { en: 'Taurus', zh: '金牛座', es: 'Tauro', fr: 'Taureau', de: 'Stier', ja: '牡牛座', ko: '황소자리' },
      'Gemini': { en: 'Gemini', zh: '双子座', es: 'Géminis', fr: 'Gémeaux', de: 'Zwillinge', ja: '双子座', ko: '쌍둥이자리' },
      'Cancer': { en: 'Cancer', zh: '巨蟹座', es: 'Cáncer', fr: 'Cancer', de: 'Krebs', ja: '蟹座', ko: '게자리' },
      'Leo': { en: 'Leo', zh: '狮子座', es: 'Leo', fr: 'Lion', de: 'Löwe', ja: '獅子座', ko: '사자자리' },
      'Virgo': { en: 'Virgo', zh: '处女座', es: 'Virgo', fr: 'Vierge', de: 'Jungfrau', ja: '乙女座', ko: '처녀자리' },
      'Libra': { en: 'Libra', zh: '天秤座', es: 'Libra', fr: 'Balance', de: 'Waage', ja: '天秤座', ko: '천칭자리' },
      'Scorpio': { en: 'Scorpio', zh: '天蝎座', es: 'Escorpio', fr: 'Scorpion', de: 'Skorpion', ja: '蠍座', ko: '전갈자리' },
      'Sagittarius': { en: 'Sagittarius', zh: '射手座', es: 'Sagitario', fr: 'Sagittaire', de: 'Schütze', ja: '射手座', ko: '사수자리' },
      'Capricorn': { en: 'Capricorn', zh: '摩羯座', es: 'Capricornio', fr: 'Capricorne', de: 'Steinbock', ja: '山羊座', ko: '염소자리' },
      'Aquarius': { en: 'Aquarius', zh: '水瓶座', es: 'Acuario', fr: 'Verseau', de: 'Wassermann', ja: '水瓶座', ko: '물병자리' },
      'Pisces': { en: 'Pisces', zh: '双鱼座', es: 'Piscis', fr: 'Poissons', de: 'Fische', ja: '魚座', ko: '물고기자리' }
    };

    const localizedSign = signTranslations[sign]?.[language] || sign;
    return `${localizedSign} ${degree}°${minute}'`;
  }

  /**
   * Format all planetary positions
   */
  private formatPlanets(bodies: any[], language: string): Record<string, string> {
    const planets: Record<string, string> = {};
    const planetNames = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];

    const planetTranslations: Record<string, Record<string, string>> = {
      'Sun': { en: 'Sun', zh: '太阳', es: 'Sol', fr: 'Soleil', de: 'Sonne', ja: '太陽', ko: '태양' },
      'Moon': { en: 'Moon', zh: '月亮', es: 'Luna', fr: 'Lune', de: 'Mond', ja: '月', ko: '달' },
      'Mercury': { en: 'Mercury', zh: '水星', es: 'Mercurio', fr: 'Mercure', de: 'Merkur', ja: '水星', ko: '수성' },
      'Venus': { en: 'Venus', zh: '金星', es: 'Venus', fr: 'Vénus', de: 'Venus', ja: '金星', ko: '금성' },
      'Mars': { en: 'Mars', zh: '火星', es: 'Marte', fr: 'Mars', de: 'Mars', ja: '火星', ko: '화성' },
      'Jupiter': { en: 'Jupiter', zh: '木星', es: 'Júpiter', fr: 'Jupiter', de: 'Jupiter', ja: '木星', ko: '목성' },
      'Saturn': { en: 'Saturn', zh: '土星', es: 'Saturno', fr: 'Saturne', de: 'Saturn', ja: '土星', ko: '토성' },
      'Uranus': { en: 'Uranus', zh: '天王星', es: 'Urano', fr: 'Uranus', de: 'Uranus', ja: '天王星', ko: '천왕성' },
      'Neptune': { en: 'Neptune', zh: '海王星', es: 'Neptuno', fr: 'Neptune', de: 'Neptun', ja: '海王星', ko: '해왕성' },
      'Pluto': { en: 'Pluto', zh: '冥王星', es: 'Plutón', fr: 'Pluton', de: 'Pluto', ja: '冥王星', ko: '명왕성' }
    };

    for (const name of planetNames) {
      const body = bodies.find((b: any) => b.label === name);
      if (body) {
        const localizedName = planetTranslations[name]?.[language] || name;
        planets[localizedName] = this.getSignInfo(body, language);
      }
    }

    return planets;
  }

  /**
   * Format house cusps
   */
  private formatHouses(houses: any[], language: string): Record<string, string> {
    const houseData: Record<string, string> = {};
    const houseLabel = language === 'zh' ? '宫' : (language === 'es' ? 'Casa' : (language === 'fr' ? 'Maison' : 'House'));

    for (let i = 0; i < houses.length && i < 12; i++) {
      const house = houses[i];
      if (house && house.Sign) {
        const sign = house.Sign.label;
        const degree = Math.floor(house.ChartPosition.StartPosition.Ecliptic.DecimalDegrees);
        houseData[`${houseLabel} ${i + 1}`] = `${sign} ${degree}°`;
      }
    }

    return houseData;
  }

  /**
   * Format planetary aspects
   */
  private formatAspects(aspects: any[], language: string): string[] {
    if (!aspects || aspects.length === 0) {
      return [];
    }

    const aspectTranslations: Record<string, Record<string, string>> = {
      'conjunction': { en: 'conjunction', zh: '合相', es: 'conjunción', fr: 'conjonction', de: 'Konjunktion', ja: '合', ko: '합' },
      'opposition': { en: 'opposition', zh: '对分相', es: 'oposición', fr: 'opposition', de: 'Opposition', ja: '衝', ko: '충' },
      'trine': { en: 'trine', zh: '三分相', es: 'trígono', fr: 'trigone', de: 'Trigon', ja: '三合', ko: '삼합' },
      'square': { en: 'square', zh: '四分相', es: 'cuadratura', fr: 'carré', de: 'Quadrat', ja: '刑', ko: '형' },
      'sextile': { en: 'sextile', zh: '六分相', es: 'sextil', fr: 'sextile', de: 'Sextil', ja: '六合', ko: '육합' }
    };

    return aspects.slice(0, 15).map((aspect: any) => {
      const point1 = aspect.point1.label;
      const point2 = aspect.point2.label;
      const aspectType = aspect.aspectLevel === 'major' ? aspect.aspect.label.toLowerCase() : aspect.aspect.label.toLowerCase();
      const localizedAspect = aspectTranslations[aspectType]?.[language] || aspectType;
      const orb = aspect.orb.toFixed(2);
      
      return `${point1} ${localizedAspect} ${point2} (${orb}°)`;
    });
  }

  /**
   * Generate professional interpretation
   * Inspired by Astrologer-API's interpretation logic
   */
  private interpretChart(
    sun: any,
    moon: any,
    ascendant: any,
    celestialBodies: any[],
    aspects: any[],
    language: string
  ): string {
    const interpretations: Record<string, Record<string, string>> = {
      en: {
        header: 'Professional Birth Chart Analysis',
        sunDesc: 'Your Sun sign represents your core identity, ego, and life purpose.',
        moonDesc: 'Your Moon sign reflects your emotional nature and inner self.',
        ascDesc: 'Your Ascendant (Rising sign) shows how others perceive you.',
        planetDesc: 'Planetary positions indicate various life areas and energies.',
        aspectDesc: 'Aspects between planets reveal dynamic interactions.',
        footer: 'This analysis uses professional Swiss Ephemeris calculations.'
      },
      zh: {
        header: '专业出生星盘分析',
        sunDesc: '太阳星座代表你的核心身份、自我和人生目标。',
        moonDesc: '月亮星座反映你的情感本质和内在自我。',
        ascDesc: '上升星座展示他人如何看待你。',
        planetDesc: '行星位置指示不同的生活领域和能量。',
        aspectDesc: '行星之间的相位揭示动态互动关系。',
        footer: '本分析使用专业的瑞士星历表计算。'
      }
    };

    const lang = language in interpretations ? language : 'en';
    const text = interpretations[lang];

    let interpretation = `${text.header}\n\n`;
    
    if (sun) {
      interpretation += `☉ ${text.sunDesc} ${this.getSignInfo(sun, language)}\n\n`;
    }
    
    if (moon) {
      interpretation += `☽ ${text.moonDesc} ${this.getSignInfo(moon, language)}\n\n`;
    }
    
    if (ascendant) {
      interpretation += `ASC ${text.ascDesc} ${this.getSignInfo(ascendant, language)}\n\n`;
    }
    
    interpretation += `${text.planetDesc}\n`;
    interpretation += `${text.aspectDesc}\n\n`;
    interpretation += `${text.footer}`;

    return interpretation;
  }
}
