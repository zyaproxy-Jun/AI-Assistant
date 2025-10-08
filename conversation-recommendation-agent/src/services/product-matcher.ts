/**
 * Product Matcher - 智能商品匹配服务
 * 根据占卜结果匹配最相关的实物和数字商品
 */

import { MongoClient, Db, Collection } from 'mongodb';
import { Product, ProductRecommendation, ProductMatchCriteria, DivinationAffinity } from '../types/product';
import { DivinationResult } from '../types/divination';

export interface ProductMatcherConfig {
  mongoUrl: string;
  databaseName: string;
  collectionName: string;
}

export class ProductMatcher {
  private client: MongoClient;
  private db: Db | null = null;
  private productsCollection: Collection<Product> | null = null;

  constructor(private config: ProductMatcherConfig) {
    this.client = new MongoClient(config.mongoUrl);
  }

  /**
   * 连接到 MongoDB
   */
  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db(this.config.databaseName);
      this.productsCollection = this.db.collection<Product>(this.config.collectionName);
      console.log('[Product Matcher] 已连接到 MongoDB');
    } catch (error) {
      console.error('[Product Matcher] MongoDB 连接失败:', error);
      throw error;
    }
  }

  /**
   * 断开 MongoDB 连接
   */
  async disconnect(): Promise<void> {
    await this.client.close();
    console.log('[Product Matcher] 已断开 MongoDB 连接');
  }

  /**
   * 核心方法: 根据占卜结果匹配商品
   * @param divinationResult 占卜结果
   * @param limit 返回商品数量
   * @returns 按匹配度排序的推荐商品列表
   */
  async matchProducts(
    divinationResult: DivinationResult,
    limit: number = 5
  ): Promise<ProductRecommendation[]> {
    if (!this.productsCollection) {
      throw new Error('Product Matcher 未初始化，请先调用 connect()');
    }

    // 构建匹配条件
    const criteria = this.buildMatchCriteria(divinationResult);
    
    // 查询商品
    const products = await this.queryProducts(criteria);
    
    // 计算匹配分数
    const recommendations = products.map(product => ({
      product,
      matchScore: this.calculateMatchScore(product, divinationResult),
      matchReasons: this.generateMatchReasons(product, divinationResult)
    }));

    // 按匹配分数排序
    recommendations.sort((a, b) => b.matchScore - a.matchScore);

    // 返回前 N 个
    return recommendations.slice(0, limit);
  }

  /**
   * 构建商品查询条件
   */
  private buildMatchCriteria(result: DivinationResult): ProductMatchCriteria {
    return {
      themes: result.themes || [],
      keywords: result.keywords || [],
      sentiment: result.sentiment,
      divinationType: result.type
    };
  }

  /**
   * 从数据库查询相关商品
   */
  private async queryProducts(criteria: ProductMatchCriteria): Promise<Product[]> {
    if (!this.productsCollection) return [];

    const query: any = {
      stock: { $gt: 0 }, // 只查询有库存的商品
      status: 'active'
    };

    // 根据主题筛选
    if (criteria.themes.length > 0) {
      query['divinationAffinity.themes'] = { $in: criteria.themes };
    }

    // 根据关键词筛选
    if (criteria.keywords.length > 0) {
      query['divinationAffinity.keywords'] = { $in: criteria.keywords };
    }

    // 根据情感筛选
    if (criteria.sentiment) {
      query['divinationAffinity.sentiments'] = criteria.sentiment;
    }

    try {
      const products = await this.productsCollection
        .find(query)
        .limit(50) // 先取 50 个候选
        .toArray();
      
      console.log(`[Product Matcher] 查询到 ${products.length} 个候选商品`);
      return products;
    } catch (error) {
      console.error('[Product Matcher] 商品查询失败:', error);
      return [];
    }
  }

  /**
   * 计算商品与占卜结果的匹配分数 (0-1)
   * 使用加权算法考虑多个维度
   */
  calculateMatchScore(product: Product, result: DivinationResult): number {
    const affinity = product.divinationAffinity;
    if (!affinity) return 0;

    let score = 0;
    let totalWeight = 0;

    // 权重配置
    const weights = {
      themes: 0.4,      // 主题匹配最重要
      keywords: 0.3,    // 关键词次之
      sentiment: 0.2,   // 情感匹配
      baseWeight: 0.1   // 商品基础权重
    };

    // 1. 主题匹配度
    if (result.themes && result.themes.length > 0 && affinity.themes) {
      const themeMatches = result.themes.filter(t => affinity.themes.includes(t)).length;
      const themeScore = themeMatches / Math.max(result.themes.length, affinity.themes.length);
      score += themeScore * weights.themes;
      totalWeight += weights.themes;
    }

    // 2. 关键词匹配度
    if (result.keywords && result.keywords.length > 0 && affinity.keywords) {
      const keywordMatches = result.keywords.filter(k => affinity.keywords.includes(k)).length;
      const keywordScore = keywordMatches / Math.max(result.keywords.length, affinity.keywords.length);
      score += keywordScore * weights.keywords;
      totalWeight += weights.keywords;
    }

    // 3. 情感匹配度
    if (result.sentiment && affinity.sentiments) {
      const sentimentMatch = affinity.sentiments.includes(result.sentiment) ? 1 : 0;
      score += sentimentMatch * weights.sentiment;
      totalWeight += weights.sentiment;
    }

    // 4. 商品基础权重
    if (affinity.matchWeight) {
      score += affinity.matchWeight * weights.baseWeight;
      totalWeight += weights.baseWeight;
    }

    // 归一化分数
    return totalWeight > 0 ? score / totalWeight : 0;
  }

  /**
   * 生成匹配原因说明
   */
  private generateMatchReasons(product: Product, result: DivinationResult): string[] {
    const reasons: string[] = [];
    const affinity = product.divinationAffinity;

    if (!affinity) return ['基于您的占卜结果推荐'];

    // 主题匹配
    if (result.themes && affinity.themes) {
      const matchedThemes = result.themes.filter(t => affinity.themes.includes(t));
      if (matchedThemes.length > 0) {
        reasons.push(`适合您关注的 ${matchedThemes.join('、')} 方面`);
      }
    }

    // 关键词匹配
    if (result.keywords && affinity.keywords) {
      const matchedKeywords = result.keywords.filter(k => affinity.keywords.includes(k));
      if (matchedKeywords.length > 0) {
        reasons.push(`与您的 ${matchedKeywords.slice(0, 3).join('、')} 相关`);
      }
    }

    // 情感匹配
    if (result.sentiment && affinity.sentiments?.includes(result.sentiment)) {
      const sentimentText = {
        positive: '积极向上',
        negative: '化解负面',
        neutral: '平衡调和'
      }[result.sentiment];
      reasons.push(`能量${sentimentText}，符合您当前状态`);
    }

    // 商品特色
    if (product.features && product.features.length > 0) {
      reasons.push(product.features[0]);
    }

    return reasons.length > 0 ? reasons : ['专业占卜师推荐'];
  }

  /**
   * 获取热门商品 (作为备选)
   */
  async getPopularProducts(limit: number = 5): Promise<Product[]> {
    if (!this.productsCollection) return [];

    try {
      return await this.productsCollection
        .find({ stock: { $gt: 0 }, status: 'active' })
        .sort({ salesCount: -1 }) // 按销量排序
        .limit(limit)
        .toArray();
    } catch (error) {
      console.error('[Product Matcher] 获取热门商品失败:', error);
      return [];
    }
  }

  /**
   * 获取商品详情
   */
  async getProductById(productId: string): Promise<Product | null> {
    if (!this.productsCollection) return null;

    try {
      return await this.productsCollection.findOne({ id: productId });
    } catch (error) {
      console.error('[Product Matcher] 获取商品详情失败:', error);
      return null;
    }
  }
}

/**
 * 创建 Product Matcher 实例 (工厂函数)
 */
export function createProductMatcher(config: ProductMatcherConfig): ProductMatcher {
  return new ProductMatcher(config);
}
