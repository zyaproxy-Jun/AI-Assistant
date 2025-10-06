/**
 * Western Astrology Service
 * 
 * Official Source: https://github.com/zyaproxy-Jun/Astrologer-API
 * - Professional astrology calculations using Kerykeion methodology
 * - Based on Swiss Ephemeris calculation principles
 * - Uses Astrologer-API for accurate astronomical calculations
 * 
 * Integration Approach:
 * - Calls Astrologer-API service for professional-grade calculations
 * - Implements Kerykeion-based planetary positions, houses, and aspects
 * - Supports tropical/sidereal zodiac systems and multiple house systems
 * 
 * License Compliance:
 * - Astrologer-API: AGPL-3.0 License (external service, no restrictions on API usage)
 * - Kerykeion library: AGPL-3.0 (used via API)
 * - Swiss Ephemeris: GPL-2.0/Professional License
 * 
 * @see {@link https://github.com/zyaproxy-Jun/Astrologer-API|Astrologer-API Source}
 * @see {@link https://github.com/g-battaglia/kerykeion|Kerykeion Library}
 */

import axios from 'axios';

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

interface AstrologerAPIResponse {
  status: string;
  data: {
    name: string;
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    city: string;
    nation: string;
    lng: number;
    lat: number;
    tz_str: string;
    zodiac_type: string;
    local_time: string;
    utc_time: string;
    julian_day: number;
    sun: PlanetData;
    moon: PlanetData;
    mercury: PlanetData;
    venus: PlanetData;
    mars: PlanetData;
    jupiter: PlanetData;
    saturn: PlanetData;
    uranus: PlanetData;
    neptune: PlanetData;
    pluto: PlanetData;
    asc: PlanetData;
    mc: PlanetData;
    first_house: PlanetData;
    second_house: PlanetData;
    third_house: PlanetData;
    fourth_house: PlanetData;
    fifth_house: PlanetData;
    sixth_house: PlanetData;
    seventh_house: PlanetData;
    eighth_house: PlanetData;
    ninth_house: PlanetData;
    tenth_house: PlanetData;
    eleventh_house: PlanetData;
    twelfth_house: PlanetData;
    mean_node: PlanetData;
    true_node: PlanetData;
    lunar_phase?: {
      moon_phase: number;
      moon_emoji: string;
      sun_phase: number;
      degrees_between_s_m: number;
    };
  };
}

interface PlanetData {
  name: string;
  quality: string;
  element: string;
  sign: string;
  sign_num: number;
  position: number;
  abs_pos: number;
  emoji: string;
  house: string;
  retrograde: boolean;
  point_type: string;
}

export class AstrologyService {
  // Use public demo API (replace with your own API instance if needed)
  private readonly apiBaseUrl = 'https://astrologer.p.rapidapi.com/api/v4';
  private readonly apiKey = process.env.RAPIDAPI_KEY || ''; // Optional: use RapidAPI key
  private readonly fallbackMode = true; // Use local calculation as fallback

  constructor() {}

  /**
   * Calculate birth chart using Astrologer-API
   * Based on Kerykeion library and Swiss Ephemeris
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
    try {
      // Infer timezone from coordinates
      const timezone = this.inferTimezone(latitude, longitude);
      
      // Prepare request payload (following Astrologer-API format)
      const requestBody = {
        subject: {
          name: 'User',
          year,
          month,
          day,
          hour,
          minute,
          latitude,
          longitude,
          city: 'Unknown',
          nation: 'XX',
          timezone,
          zodiac_type: 'Tropic', // Western astrology uses tropical zodiac
          houses_system_identifier: 'P', // Placidus house system (most common)
          perspective_type: 'Apparent Geocentric', // Standard perspective
          language: language.toUpperCase()
        }
      };

      // Call Astrologer-API
      const response = await this.callAstrologerAPI(requestBody);
      
      if (response.status !== 'OK') {
        throw new Error('API returned error status');
      }

      // Format and return results
      return this.formatAPIResponse(response.data, language);
      
    } catch (error) {
      // Fallback to mock data if API fails
      if (this.fallbackMode) {
        console.warn('Astrologer-API call failed, using fallback calculation:', error);
        return this.generateFallbackChart(year, month, day, hour, minute, latitude, longitude, language);
      }
      throw new Error(`Birth chart calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Call Astrologer-API service
   */
  private async callAstrologerAPI(requestBody: any): Promise<AstrologerAPIResponse> {
    try {
      // Try RapidAPI first if key is available
      if (this.apiKey) {
        const response = await axios.post(
          `${this.apiBaseUrl}/birth-data`,
          requestBody,
          {
            headers: {
              'X-RapidAPI-Key': this.apiKey,
              'X-RapidAPI-Host': 'astrologer.p.rapidapi.com',
              'Content-Type': 'application/json'
            },
            timeout: 10000
          }
        );
        return response.data;
      }
      
      // Fallback: try direct API call (if self-hosted)
      const response = await axios.post(
        'https://astrologer-api.example.com/api/v4/birth-data',
        requestBody,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000
        }
      );
      return response.data;
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`API request failed: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Infer timezone from coordinates
   * Simple timezone inference based on longitude
   * For production, consider using a timezone lookup library
   */
  private inferTimezone(latitude: number, longitude: number): string {
    // Common timezone mappings based on longitude
    // This is a simplified approach - for production use a proper timezone library
    const timezoneMap: Record<string, string> = {
      'Asia': 'Asia/Shanghai',      // China, East Asia
      'Europe': 'Europe/London',    // Western Europe
      'America_East': 'America/New_York',
      'America_West': 'America/Los_Angeles',
      'Pacific': 'Pacific/Auckland'
    };

    // Rough estimation based on longitude
    if (longitude >= 100 && longitude <= 140 && latitude >= 15 && latitude <= 55) {
      return 'Asia/Shanghai';
    } else if (longitude >= 70 && longitude <= 100) {
      return 'Asia/Kolkata';
    } else if (longitude >= -10 && longitude <= 40) {
      return 'Europe/London';
    } else if (longitude >= -100 && longitude <= -70) {
      return 'America/New_York';
    } else if (longitude >= -130 && longitude <= -100) {
      return 'America/Los_Angeles';
    } else if (longitude >= 165 && longitude <= 180) {
      return 'Pacific/Auckland';
    }

    // Default to UTC
    return 'UTC';
  }

  /**
   * Format API response to our standard format
   */
  private formatAPIResponse(data: AstrologerAPIResponse['data'], language: string): AstrologyResult {
    // Sign abbreviation mapping
    const signAbbrevMap: Record<string, string> = {
      'Ari': 'Aries', 'Tau': 'Taurus', 'Gem': 'Gemini', 'Can': 'Cancer',
      'Leo': 'Leo', 'Vir': 'Virgo', 'Lib': 'Libra', 'Sco': 'Scorpio',
      'Sag': 'Sagittarius', 'Cap': 'Capricorn', 'Aqu': 'Aquarius', 'Pis': 'Pisces'
    };

    const signTranslations: Record<string, Record<string, string>> = {
      'Aries': { en: 'Aries', zh: '白羊座' },
      'Taurus': { en: 'Taurus', zh: '金牛座' },
      'Gemini': { en: 'Gemini', zh: '双子座' },
      'Cancer': { en: 'Cancer', zh: '巨蟹座' },
      'Leo': { en: 'Leo', zh: '狮子座' },
      'Virgo': { en: 'Virgo', zh: '处女座' },
      'Libra': { en: 'Libra', zh: '天秤座' },
      'Scorpio': { en: 'Scorpio', zh: '天蝎座' },
      'Sagittarius': { en: 'Sagittarius', zh: '射手座' },
      'Capricorn': { en: 'Capricorn', zh: '摩羯座' },
      'Aquarius': { en: 'Aquarius', zh: '水瓶座' },
      'Pisces': { en: 'Pisces', zh: '双鱼座' }
    };

    const planetTranslations: Record<string, Record<string, string>> = {
      'Sun': { en: 'Sun', zh: '太阳' },
      'Moon': { en: 'Moon', zh: '月亮' },
      'Mercury': { en: 'Mercury', zh: '水星' },
      'Venus': { en: 'Venus', zh: '金星' },
      'Mars': { en: 'Mars', zh: '火星' },
      'Jupiter': { en: 'Jupiter', zh: '木星' },
      'Saturn': { en: 'Saturn', zh: '土星' },
      'Uranus': { en: 'Uranus', zh: '天王星' },
      'Neptune': { en: 'Neptune', zh: '海王星' },
      'Pluto': { en: 'Pluto', zh: '冥王星' }
    };

    // Helper function to format planet data
    const formatPlanetInfo = (planet: PlanetData): string => {
      const fullSign = signAbbrevMap[planet.sign] || planet.sign;
      const localizedSign = signTranslations[fullSign]?.[language] || fullSign;
      const retrograde = planet.retrograde ? ' ℞' : '';
      return `${localizedSign} ${planet.position.toFixed(1)}°${retrograde}`;
    };

    // Format planets
    const planets: Record<string, string> = {};
    const planetList = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
    
    for (const planetKey of planetList) {
      const planetData = (data as any)[planetKey] as PlanetData;
      if (planetData) {
        const planetName = planetData.name;
        const localizedName = planetTranslations[planetName]?.[language] || planetName;
        planets[localizedName] = formatPlanetInfo(planetData);
      }
    }

    // Format houses
    const houses: Record<string, string> = {};
    const houseLabel = language === 'zh' ? '第' : 'House ';
    const houseSuffix = language === 'zh' ? '宫' : '';
    
    for (let i = 1; i <= 12; i++) {
      const houseKey = this.getHouseKey(i);
      const houseData = (data as any)[houseKey] as PlanetData;
      if (houseData) {
        const fullSign = signAbbrevMap[houseData.sign] || houseData.sign;
        const localizedSign = signTranslations[fullSign]?.[language] || fullSign;
        houses[`${houseLabel}${i}${houseSuffix}`] = `${localizedSign} ${houseData.position.toFixed(1)}°`;
      }
    }

    // Generate aspects description
    const aspects: string[] = [];
    if (data.lunar_phase) {
      const phaseDesc = language === 'zh' 
        ? `月相: ${data.lunar_phase.moon_emoji} (${data.lunar_phase.moon_phase}/8)`
        : `Lunar Phase: ${data.lunar_phase.moon_emoji} (${data.lunar_phase.moon_phase}/8)`;
      aspects.push(phaseDesc);
    }

    // Sun-Moon aspect
    const sunMoonDiff = Math.abs(data.sun.abs_pos - data.moon.abs_pos);
    if (sunMoonDiff < 10) {
      aspects.push(language === 'zh' ? '日月合相' : 'Sun-Moon conjunction');
    } else if (Math.abs(sunMoonDiff - 180) < 10) {
      aspects.push(language === 'zh' ? '日月对冲' : 'Sun-Moon opposition');
    } else if (Math.abs(sunMoonDiff - 120) < 10) {
      aspects.push(language === 'zh' ? '日月三分相' : 'Sun-Moon trine');
    } else if (Math.abs(sunMoonDiff - 90) < 10) {
      aspects.push(language === 'zh' ? '日月四分相' : 'Sun-Moon square');
    }

    return {
      sunSign: formatPlanetInfo(data.sun),
      moonSign: formatPlanetInfo(data.moon),
      ascendant: formatPlanetInfo(data.asc),
      planets,
      houses,
      aspects,
      interpretation: this.generateInterpretation(data, language),
      calculationMethod: 'Professional calculation via Astrologer-API (Kerykeion/Swiss Ephemeris)'
    };
  }

  /**
   * Get house key name
   */
  private getHouseKey(houseNumber: number): string {
    const houseNames = [
      'first_house', 'second_house', 'third_house', 'fourth_house',
      'fifth_house', 'sixth_house', 'seventh_house', 'eighth_house',
      'ninth_house', 'tenth_house', 'eleventh_house', 'twelfth_house'
    ];
    return houseNames[houseNumber - 1] || 'first_house';
  }

  /**
   * Generate interpretation based on API data
   */
  private generateInterpretation(data: AstrologerAPIResponse['data'], language: string): string {
    const sunSign = data.sun.sign;
    const moonSign = data.moon.sign;
    const ascSign = data.asc.sign;

    if (language === 'zh') {
      return `太阳位于${sunSign}，代表您的核心自我和生命力。` +
        `月亮位于${moonSign}，反映您的情感需求和内心世界。` +
        `上升星座${ascSign}，展现您的外在形象和第一印象。` +
        `这个星盘由专业的Swiss Ephemeris系统计算得出，精确度极高。`;
    } else {
      return `Sun in ${sunSign} represents your core self and vitality. ` +
        `Moon in ${moonSign} reflects your emotional needs and inner world. ` +
        `Ascendant in ${ascSign} shows your outer persona and first impression. ` +
        `This chart is professionally calculated using the Swiss Ephemeris system.`;
    }
  }

  /**
   * Generate fallback chart when API is unavailable
   */
  private generateFallbackChart(
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    latitude: number,
    longitude: number,
    language: string
  ): AstrologyResult {
    // Simple fallback based on date (simplified zodiac calculation)
    const dayOfYear = this.getDayOfYear(year, month, day);
    const sunSignIndex = Math.floor((dayOfYear / 365) * 12);
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                   'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    
    const signTranslations: Record<string, Record<string, string>> = {
      'Aries': { en: 'Aries', zh: '白羊座' },
      'Taurus': { en: 'Taurus', zh: '金牛座' },
      'Gemini': { en: 'Gemini', zh: '双子座' },
      'Cancer': { en: 'Cancer', zh: '巨蟹座' },
      'Leo': { en: 'Leo', zh: '狮子座' },
      'Virgo': { en: 'Virgo', zh: '处女座' },
      'Libra': { en: 'Libra', zh: '天秤座' },
      'Scorpio': { en: 'Scorpio', zh: '天蝎座' },
      'Sagittarius': { en: 'Sagittarius', zh: '射手座' },
      'Capricorn': { en: 'Capricorn', zh: '摩羯座' },
      'Aquarius': { en: 'Aquarius', zh: '水瓶座' },
      'Pisces': { en: 'Pisces', zh: '双鱼座' }
    };

    const sunSign = signs[sunSignIndex];
    const moonSign = signs[(sunSignIndex + 4) % 12]; // Simple offset
    const ascendantSign = signs[(Math.floor(hour / 2)) % 12]; // Based on hour

    const localizedSunSign = signTranslations[sunSign]?.[language] || sunSign;
    const localizedMoonSign = signTranslations[moonSign]?.[language] || moonSign;
    const localizedAscSign = signTranslations[ascendantSign]?.[language] || ascendantSign;

    const warningMsg = language === 'zh' 
      ? '⚠️ 注意：由于API服务不可用，这是简化计算结果，不具有专业精度。'
      : '⚠️ Warning: API service unavailable, this is a simplified calculation without professional accuracy.';

    return {
      sunSign: `${localizedSunSign} ~15°`,
      moonSign: `${localizedMoonSign} ~20°`,
      ascendant: `${localizedAscSign} ~10°`,
      planets: {
        [language === 'zh' ? '太阳' : 'Sun']: `${localizedSunSign} ~15°`,
        [language === 'zh' ? '月亮' : 'Moon']: `${localizedMoonSign} ~20°`
      },
      houses: {
        [language === 'zh' ? '第1宫' : 'House 1']: `${localizedAscSign} ~10°`
      },
      aspects: [warningMsg],
      interpretation: warningMsg + (language === 'zh' 
        ? ' 请稍后重试以获取精确的星盘计算结果。'
        : ' Please try again later for accurate chart calculation.'),
      calculationMethod: 'Fallback: Simplified calculation (not accurate)'
    };
  }

  /**
   * Get day of year (1-365/366)
   */
  private getDayOfYear(year: number, month: number, day: number): number {
    const date = new Date(year, month - 1, day);
    const start = new Date(year, 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

}
