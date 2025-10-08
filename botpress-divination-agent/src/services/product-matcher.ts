/**
 * 商品匹配引擎
 * 基于占卜结果智能推荐商品
 */

import { Product, DivinationResult, MatchingRule } from '../types'

export class ProductMatcher {
  private products: Product[]
  private matchingRules: MatchingRule[]

  constructor(products: Product[], matchingRules: MatchingRule[]) {
    this.products = products
    this.matchingRules = matchingRules
  }

  /**
   * 基于占卜结果匹配商品
   */
  matchProducts(
    divinationType: string,
    divinationResult: DivinationResult,
    maxProducts: number = 3
  ): Product[] {
    const scoredProducts = this.products
      .map(product => ({
        product,
        score: this.calculateMatchScore(product, divinationType, divinationResult)
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxProducts)
      .map(item => ({
        ...item.product,
        matchScore: item.score
      }))

    return scoredProducts
  }

  /**
   * 计算商品匹配分数
   */
  private calculateMatchScore(
    product: Product,
    divinationType: string,
    result: DivinationResult
  ): number {
    let score = 0

    // 1. 占卜类型匹配 (权重: 30%)
    if (product.matchingRules?.divinationTypes?.includes(divinationType)) {
      score += 30
    }

    // 2. 情感基调匹配 (权重: 25%)
    if (result.sentiment && product.matchingRules?.sentiment) {
      if (product.matchingRules.sentiment.includes(result.sentiment.tone)) {
        score += 25
      }
    }

    // 3. 关键词匹配 (权重: 25%)
    if (product.matchingRules?.keywords) {
      const keywords = this.extractKeywords(result)
      const matchedKeywords = product.matchingRules.keywords.filter(
        keyword => keywords.some(k => k.includes(keyword) || keyword.includes(k))
      )
      score += (matchedKeywords.length / product.matchingRules.keywords.length) * 25
    }

    // 4. 符号匹配 (权重: 20%)
    if (result.symbols && product.matchingRules?.symbols) {
      const symbolNames = result.symbols.map((s: any) => s.name || s.symbol)
      const matchedSymbols = product.matchingRules.symbols.filter(
        symbol => symbolNames.includes(symbol)
      )
      score += (matchedSymbols.length / product.matchingRules.symbols.length) * 20
    }

    return Math.round(score)
  }

  /**
   * 从占卜结果提取关键词
   */
  private extractKeywords(result: DivinationResult): string[] {
    const keywords: string[] = []

    // 从解释文本提取
    if (result.interpretation) {
      keywords.push(...this.extractFromText(result.interpretation))
    }

    // 从符号提取
    if (result.symbols) {
      result.symbols.forEach((symbol: any) => {
        if (symbol.name) keywords.push(symbol.name)
        if (symbol.symbol) keywords.push(symbol.symbol)
        if (symbol.meaning) keywords.push(...this.extractFromText(symbol.meaning))
      })
    }

    // 从建议提取
    if (result.advice) {
      keywords.push(...this.extractFromText(result.advice))
    }

    return [...new Set(keywords)] // 去重
  }

  /**
   * 从文本提取关键词
   */
  private extractFromText(text: string): string[] {
    // 简单的关键词提取 (实际项目中可使用 NLP 库)
    const stopWords = ['的', '了', '是', '在', '我', '你', '他', '她', '它', '们']
    return text
      .split(/[，。！？；：、\s]+/)
      .filter(word => word.length >= 2 && !stopWords.includes(word))
  }

  /**
   * 获取热门商品
   */
  getPopularProducts(limit: number = 5): Product[] {
    return this.products
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, limit)
  }

  /**
   * 按类别获取商品
   */
  getProductsByCategory(category: string, limit: number = 5): Product[] {
    return this.products
      .filter(p => p.category === category)
      .slice(0, limit)
  }

  /**
   * 搜索商品
   */
  searchProducts(query: string, limit: number = 10): Product[] {
    const lowerQuery = query.toLowerCase()
    return this.products
      .filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
      .slice(0, limit)
  }
}

/**
 * 商品推荐引擎工厂
 */
export function createProductMatcher(
  products: Product[],
  matchingRules: MatchingRule[]
): ProductMatcher {
  return new ProductMatcher(products, matchingRules)
}
