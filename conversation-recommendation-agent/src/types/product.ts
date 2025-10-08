/**
 * 商品类型定义
 */

export interface Product {
  id: string
  name: string
  type: 'physical' | 'digital'
  description: string
  price: number
  currency: 'USD' | 'CNY'
  images: string[]
  category: string
  tags: string[]
  stock: number
  status?: string
  customizable: boolean
  divinationAffinity: DivinationAffinity
  specifications?: ProductSpecifications
  features?: string[] // 商品特色
  salesCount?: number // 销量
}

export interface DivinationAffinity {
  themes: string[] // 匹配的占卜主题
  keywords: string[] // 匹配的关键词
  sentiments: Array<'positive' | 'negative' | 'neutral'>
  matchWeight: number // 匹配权重 (0-1)
}

export interface ProductSpecifications {
  material?: string
  size?: string
  color?: string[]
  format?: string // for digital products
  duration?: number // for courses/services
  [key: string]: any
}

export interface ProductRecommendation {
  product: Product
  matchScore: number
  matchReasons: string[] // 改为数组
  matchReason?: string // 保留单个原因字段用于兼容
  relatedDivination?: {
    type: string
    themes: string[]
  }
}

export interface ProductMatchCriteria {
  themes: string[]
  keywords: string[]
  sentiment: 'positive' | 'negative' | 'neutral'
  divinationType?: string
  divinationContext?: {
    themes: string[]
    keywords: string[]
    sentiment: string
  }
  userPreferences?: {
    priceRange?: {
      min: number
      max: number
    }
    preferredTypes?: Array<'physical' | 'digital'>
    excludeCategories?: string[]
  }
  limit?: number
}
