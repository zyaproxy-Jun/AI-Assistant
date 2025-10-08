/**
 * 占卜相关类型定义
 */

export interface DivinationResult {
  method: string
  sentiment?: {
    tone: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'
    confidence: number
    description: string
  }
  symbols?: Array<{
    name: string
    symbol?: string
    meaning: string
  }>
  interpretation?: string
  advice?: string
  insights?: string[]
  timestamp?: string
  [key: string]: any
}

export interface DreamDivinationParams {
  dream_description: string
  emotions?: string[]
  language: string
}

export interface TarotDivinationParams {
  question: string
  spread: 'single' | 'three' | 'celtic'
  language: string
}

export interface IChingDivinationParams {
  question: string
  method: 'coins' | 'yarrow'
  language: string
}

export interface ZiweiDivinationParams {
  birth_date: string
  birth_time: string
  gender: 'male' | 'female'
  birthplace: string
  language: string
}

export interface BaziDivinationParams {
  birth_date: string
  birth_time: string
  gender: 'male' | 'female'
  language: string
}

export interface AstrologyDivinationParams {
  birth_date: string
  birth_time: string
  birthplace: string
  language: string
}

export type DivinationType = 
  | 'dream'
  | 'tarot'
  | 'iching'
  | 'ziwei'
  | 'bazi'
  | 'astrology'
