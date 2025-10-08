// 占卜类型定义

export type DivinationType = 'tarot' | 'astrology' | 'iching' | 'dream' | 'ziwei' | 'bazi'

export type OutputFormat = 'text' | 'image' | 'animation'

// 塔罗牌类型
export interface TarotCard {
  id: string
  name: string
  nameEn: string
  arcana: 'major' | 'minor'
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles'
  number?: number
  position: 'upright' | 'reversed'
  meanings: {
    upright: string[]
    reversed: string[]
  }
  keywords: string[]
  elements: string[]
  symbols: string[]
  imageUrl?: string
}

export interface TarotSpread {
  type: 'single' | 'three_card' | 'celtic_cross'
  cards: TarotCard[]
  positions: string[]
}

export interface TarotReading {
  question: string
  spread: TarotSpread
  interpretation: string
  summary: string
  advice: string
}

// 星座占星类型
export interface BirthChart {
  date: string
  time: string
  location: {
    latitude: number
    longitude: number
    timezone: string
  }
  sunSign: string
  moonSign: string
  ascendant: string
  planets: {
    name: string
    sign: string
    house: number
    degree: number
  }[]
  houses: {
    number: number
    sign: string
    degree: number
  }[]
  aspects: {
    planet1: string
    planet2: string
    aspect: string
    degree: number
  }[]
}

export interface AstrologyReading {
  birthChart: BirthChart
  interpretation: string
  personality: string[]
  strengths: string[]
  challenges: string[]
  lifeAreas: {
    career: string
    love: string
    health: string
    finance: string
  }
}

// 易经类型
export interface IChingHexagram {
  number: number
  name: string
  nameEn: string
  lines: ('yang' | 'yin')[]
  changing?: number[]
  resultingHexagram?: IChingHexagram
  judgment: string
  image: string
  interpretation: string
  advice: string
}

export interface IChingReading {
  question: string
  primaryHexagram: IChingHexagram
  resultingHexagram?: IChingHexagram
  interpretation: string
  guidance: string
}

// 解梦类型
export interface DreamElement {
  symbol: string
  category: string
  meanings: string[]
  emotions: string[]
  contexts: string[]
}

export interface DreamReading {
  dreamText: string
  elements: DreamElement[]
  overallInterpretation: string
  emotionalTone: string
  possibleMeanings: string[]
  advice: string
}

// 紫微斗数类型
export interface ZiweiPalace {
  name: string
  mainStars: string[]
  minorStars: string[]
  interpretation: string
}

export interface ZiweiChart {
  birthDate: string
  birthTime: string
  gender: 'male' | 'female'
  palaces: ZiweiPalace[]
  lifePhases: {
    age: number
    palace: string
    fortune: string
  }[]
}

export interface ZiweiReading {
  chart: ZiweiChart
  personality: string
  destiny: string
  career: string
  wealth: string
  relationships: string
  health: string
}

// 八字类型
export interface BaziPillar {
  heavenlyStem: string
  earthlyBranch: string
  element: string
  yinYang: 'yin' | 'yang'
}

export interface BaziChart {
  year: BaziPillar
  month: BaziPillar
  day: BaziPillar
  hour: BaziPillar
  elements: {
    wood: number
    fire: number
    earth: number
    metal: number
    water: number
  }
  dayMaster: string
  usefulGod: string
}

export interface BaziReading {
  birthDateTime: string
  chart: BaziChart
  personality: string
  strengths: string[]
  weaknesses: string[]
  luckyElements: string[]
  unluckyElements: string[]
  lifeAdvice: string
}

// 通用占卜结果
export interface DivinationResult<T = any> {
  type: DivinationType
  timestamp: string
  userId?: string
  data: T
  interpretation: string
  context: ProductMatcherContext
}

// 商品匹配上下文
export interface ProductMatcherContext {
  keywords: string[]
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed'
  elements: string[]
  symbols: string[]
  colors: string[]
  themes: string[]
  recommendations: {
    colors: string[]
    materials: string[]
    themes: string[]
    styles: string[]
  }
}

// 多模态输出
export interface MultimodalOutput {
  text: {
    markdown: string
    json: string
    plain: string
  }
  image?: {
    url: string
    svg?: string
    base64?: string
    prompt?: string
  }
  animation?: {
    lottieJson: object
    gifUrl?: string
    duration: number
  }
}

// 完整的占卜响应
export interface DivinationResponse<T = any> {
  success: boolean
  result: DivinationResult<T>
  output: MultimodalOutput
  metadata: {
    processingTime: number
    version: string
    toolName: string
  }
}
