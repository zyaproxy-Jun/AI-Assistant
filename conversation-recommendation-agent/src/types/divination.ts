/**
 * 占卜类型定义
 */

export type DivinationType = 'dream' | 'tarot' | 'iching' | 'ziwei' | 'bazi' | 'astrology'

export interface DivinationRequest {
  type: DivinationType
  userId: string
  parameters: DivinationParameters
  language?: 'zh-CN' | 'en-US'
}

export interface DivinationParameters {
  // Dream interpretation
  dream_description?: string
  emotions?: string[]
  
  // Tarot
  question?: string
  spread?: 'three' | 'celtic' | 'single'
  
  // I-Ching
  method?: 'coins' | 'yarrow'
  
  // Ziwei & BaZi
  birth_date?: string // YYYY-MM-DD
  birth_time?: string // HH:mm
  gender?: 'male' | 'female'
  birthplace?: {
    city: string
    country: string
    timezone: string
  }
}

export interface DivinationResult {
  type: DivinationType
  timestamp: string
  interpretation: string
  themes: string[] // e.g., ['career', 'love', 'wealth']
  keywords: string[]
  sentiment: 'positive' | 'negative' | 'neutral'
  confidence: number // 0-1
  multimodal: {
    text: string
    image: string | null
    animation: string | null
    visualization: any | null
  }
  metadata: {
    requestParams?: any
    timestamp?: string
    processingTime: number
    model?: string
  }
}

export interface DivinationContext {
  themes: string[] // e.g., ['career', 'love', 'wealth']
  sentiment: 'positive' | 'negative' | 'neutral'
  keywords: string[]
  recommendations?: string[]
}
