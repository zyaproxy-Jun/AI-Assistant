/**
 * Match Products Action - 商品匹配流程
 * 流程 2 实现: 占卜结果 → 智能匹配 → 商品推荐
 */

import { DivinationResult } from '../types/divination';
import { ProductRecommendation } from '../types/product';
import { createProductMatcher } from '../services/product-matcher';
import { createMultimodalRenderer } from '../services/multimodal-renderer';

export interface MatchProductsInput {
  divinationResult: DivinationResult;
  userId: string;
  limit?: number;
}

export interface MatchProductsOutput {
  success: boolean;
  messages: any[];
  recommendations?: ProductRecommendation[];
  error?: string;
}

/**
 * 主要 Action: 根据占卜结果匹配商品
 */
export async function matchProducts(
  input: MatchProductsInput
): Promise<MatchProductsOutput> {
  try {
    console.log(`[Action] 匹配商品: 用户 ${input.userId}, 占卜类型 ${input.divinationResult.type}`);

    // 1. 创建 Product Matcher
    const productMatcher = createProductMatcher({
      mongoUrl: process.env.MONGODB_URL || 'mongodb://admin:admin123@localhost:27017',
      databaseName: process.env.MONGODB_DATABASE || 'ether_db',
      collectionName: 'products'
    });

    // 2. 连接数据库
    await productMatcher.connect();

    try {
      // 3. 执行商品匹配
      const recommendations = await productMatcher.matchProducts(
        input.divinationResult,
        input.limit || 5
      );

      console.log(`[Action] 匹配到 ${recommendations.length} 个商品`);

      // 4. 如果没有匹配商品，获取热门商品
      if (recommendations.length === 0) {
        console.log('[Action] 无匹配商品，返回热门商品');
        const popularProducts = await productMatcher.getPopularProducts(5);
        
        const fallbackRecommendations: ProductRecommendation[] = popularProducts.map(product => ({
          product,
          matchScore: 0.5,
          matchReasons: ['热门推荐'],
          matchReason: '热门推荐'
        }));

        const renderer = createMultimodalRenderer();
        const messages = [
          ...renderer.renderNoProductsFound(),
          renderer.renderProductCarousel(fallbackRecommendations)
        ];

        return {
          success: true,
          messages,
          recommendations: fallbackRecommendations
        };
      }

      // 5. 使用多模态渲染器生成消息
      const renderer = createMultimodalRenderer();
      const messages = [
        renderer.renderRecommendationIntro(recommendations.length),
        renderer.renderProductCarousel(recommendations)
      ];

      // 6. 添加匹配说明
      const topMatch = recommendations[0];
      const explanationText = `✨ **最佳匹配**: ${topMatch.product.name}\n` +
        `匹配度: ${(topMatch.matchScore * 100).toFixed(0)}%\n\n` +
        `推荐理由:\n${topMatch.matchReasons.map(r => `• ${r}`).join('\n')}`;

      messages.push({
        type: 'text',
        payload: { text: explanationText }
      });

      return {
        success: true,
        messages,
        recommendations
      };
    } finally {
      // 7. 断开数据库连接
      await productMatcher.disconnect();
    }
  } catch (error: any) {
    console.error('[Action] 商品匹配失败:', error);
    return {
      success: false,
      messages: [
        {
          type: 'text',
          payload: {
            text: `😔 商品推荐服务暂时不可用，请稍后再试。\n错误: ${error.message}`
          }
        }
      ],
      error: error.message
    };
  }
}

/**
 * 获取商品详情
 */
export async function getProductDetail(productId: string): Promise<any> {
  try {
    const productMatcher = createProductMatcher({
      mongoUrl: process.env.MONGODB_URL || 'mongodb://admin:admin123@localhost:27017',
      databaseName: process.env.MONGODB_DATABASE || 'ether_db',
      collectionName: 'products'
    });

    await productMatcher.connect();

    try {
      const product = await productMatcher.getProductById(productId);
      
      if (!product) {
        return {
          success: false,
          messages: [
            {
              type: 'text',
              payload: { text: '😔 商品不存在或已下架' }
            }
          ]
        };
      }

      const renderer = createMultimodalRenderer();
      const messages = renderer.renderProductDetail(product);

      return {
        success: true,
        messages,
        product
      };
    } finally {
      await productMatcher.disconnect();
    }
  } catch (error: any) {
    console.error('[Action] 获取商品详情失败:', error);
    return {
      success: false,
      messages: [
        {
          type: 'text',
          payload: { text: `获取商品详情失败: ${error.message}` }
        }
      ],
      error: error.message
    };
  }
}

/**
 * 手动商品搜索 (用户直接搜索商品)
 */
export async function searchProducts(query: string, limit: number = 10): Promise<any> {
  try {
    const productMatcher = createProductMatcher({
      mongoUrl: process.env.MONGODB_URL || 'mongodb://admin:admin123@localhost:27017',
      databaseName: process.env.MONGODB_DATABASE || 'ether_db',
      collectionName: 'products'
    });

    await productMatcher.connect();

    try {
      // 这里可以实现全文搜索
      // 暂时返回热门商品
      const products = await productMatcher.getPopularProducts(limit);

      const recommendations: ProductRecommendation[] = products.map(product => ({
        product,
        matchScore: 0.7,
        matchReasons: ['搜索结果'],
        matchReason: '搜索结果'
      }));

      const renderer = createMultimodalRenderer();
      const messages = [
        {
          type: 'text',
          payload: { text: `🔍 搜索结果: 找到 ${products.length} 个商品` }
        },
        renderer.renderProductCarousel(recommendations)
      ];

      return {
        success: true,
        messages,
        recommendations
      };
    } finally {
      await productMatcher.disconnect();
    }
  } catch (error: any) {
    console.error('[Action] 商品搜索失败:', error);
    return {
      success: false,
      messages: [
        {
          type: 'text',
          payload: { text: `商品搜索失败: ${error.message}` }
        }
      ],
      error: error.message
    };
  }
}
