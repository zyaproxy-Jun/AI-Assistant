/**
 * 商品相关类型定义
 */

export interface Product {
  id: string
  name: string
  type: 'physical' | 'digital'
  category: string
  price: number
  currency: string
  description: string
  detailedDescription?: string
  images: string[]
  tags?: string[]
  popularity?: number
  stock?: number
  rating?: number
  reviews?: number
  matchingRules?: ProductMatchingRules
  matchScore?: number
}

export interface ProductMatchingRules {
  divinationTypes?: string[]
  keywords?: string[]
  symbols?: string[]
  sentiment?: Array<'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'>
  minMatchScore?: number
}

export interface MatchingRule {
  id: string
  name: string
  description: string
  conditions: {
    divinationType?: string
    sentimentTone?: string[]
    keywords?: string[]
    symbols?: string[]
  }
  productIds: string[]
  weight: number
}

export interface ProductRecommendation {
  product: Product
  matchScore: number
  matchReason: string
}

export interface CartItem {
  productId: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  totalAmount: number
  currency: string
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}
