import { IntegrationContext } from '@botpress/sdk'
import { createProductMatcher } from '../services/product-matcher'
import { Product, DivinationResult } from '../types'
import productsData from '../../data/products.json'
import matchingRulesData from '../../data/matching-rules.json'

/**
 * 商品推荐动作处理器
 */

/**
 * 推荐商品
 */
export async function recommendProducts(
  ctx: IntegrationContext,
  input: {
    divinationResult: DivinationResult
    divinationType: string
    maxProducts?: number
  }
) {
  const { divinationResult, divinationType, maxProducts = 3 } = input

  try {
    // 创建商品匹配引擎
    const matcher = createProductMatcher(
      productsData as Product[],
      matchingRulesData
    )

    // 匹配商品
    const recommendedProducts = matcher.matchProducts(
      divinationType,
      divinationResult,
      maxProducts
    )

    // 如果没有匹配到商品，返回热门商品
    if (recommendedProducts.length === 0) {
      const popularProducts = matcher.getPopularProducts(maxProducts)
      return {
        success: true,
        products: popularProducts,
        fallbackToPopular: true
      }
    }

    return {
      success: true,
      products: recommendedProducts,
      fallbackToPopular: false
    }
  } catch (error: any) {
    console.error('Product recommendation error:', error)
    return {
      success: false,
      error: error.message || '商品推荐失败',
      products: []
    }
  }
}

/**
 * 格式化商品推荐为友好的展示文本
 */
export function formatProductRecommendations(
  products: Product[],
  language: string = 'zh-CN'
): string {
  if (products.length === 0) {
    return '暂无推荐商品'
  }

  let text = '🛍️ **为您推荐以下商品**\n\n'

  products.forEach((product, index) => {
    const emoji = getProductEmoji(product.category)
    text += `${emoji} **${index + 1}. ${product.name}**\n`
    text += `   ${product.description}\n`
    text += `   💰 价格: ¥${product.price}\n`
    
    if (product.matchScore) {
      text += `   🎯 匹配度: ${product.matchScore}%\n`
    }
    
    if (product.rating) {
      text += `   ⭐ 评分: ${product.rating}/5.0 (${product.reviews}条评价)\n`
    }
    
    text += `   [查看详情] | [立即购买]\n\n`
  })

  return text
}

/**
 * 创建商品卡片
 */
export function createProductCard(product: Product) {
  return {
    type: 'card',
    payload: {
      title: product.name,
      subtitle: `¥${product.price} | ${product.description}`,
      imageUrl: product.images[0] || '/assets/images/product-placeholder.jpg',
      actions: [
        {
          label: '📖 查看详情',
          action: 'postback',
          value: `view_product_${product.id}`
        },
        {
          label: '🛒 立即购买',
          action: 'postback',
          value: `buy_product_${product.id}`
        },
        {
          label: '💬 咨询客服',
          action: 'postback',
          value: `contact_about_${product.id}`
        }
      ]
    }
  }
}

/**
 * 创建商品轮播
 */
export function createProductCarousel(products: Product[]) {
  return {
    type: 'carousel',
    payload: {
      items: products.map(product => ({
        title: product.name,
        subtitle: `¥${product.price}`,
        imageUrl: product.images[0] || '/assets/images/product-placeholder.jpg',
        actions: [
          {
            label: '查看',
            action: 'postback',
            value: `view_product_${product.id}`
          },
          {
            label: '购买',
            action: 'postback',
            value: `buy_product_${product.id}`
          }
        ]
      }))
    }
  }
}

/**
 * 处理商品查看事件
 */
export async function handleProductView(
  ctx: IntegrationContext,
  productId: string
) {
  try {
    // 记录商品查看事件
    console.log('Product viewed:', {
      productId,
      timestamp: new Date().toISOString()
    })

    // 查找商品详情
    const product = (productsData as Product[]).find(p => p.id === productId)
    
    if (!product) {
      return {
        success: false,
        error: '商品不存在'
      }
    }

    return {
      success: true,
      product
    }
  } catch (error: any) {
    console.error('Product view error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * 处理商品购买事件
 */
export async function handleProductPurchase(
  ctx: IntegrationContext,
  productId: string
) {
  try {
    const product = (productsData as Product[]).find(p => p.id === productId)
    
    if (!product) {
      return {
        success: false,
        error: '商品不存在'
      }
    }

    // 这里应该集成实际的支付系统
    // 现在只是模拟购买流程
    
    // 记录商品购买事件
    console.log('Product purchased:', {
      productId,
      amount: product.price,
      timestamp: new Date().toISOString()
    })

    return {
      success: true,
      product,
      message: '购买成功！感谢您的支持 🎉'
    }
  } catch (error: any) {
    console.error('Product purchase error:', error)
    return {
      success: false,
      error: error.message || '购买失败，请稍后重试'
    }
  }
}

/**
 * 根据商品类别获取 emoji
 */
function getProductEmoji(category: string): string {
  const emojiMap: { [key: string]: string } = {
    crystal: '💎',
    tarot: '🃏',
    book: '📚',
    ebook: '📱',
    course: '🎓',
    report: '📊',
    service: '🔮'
  }
  return emojiMap[category] || '🎁'
}

/**
 * 搜索商品
 */
export async function searchProducts(
  ctx: IntegrationContext,
  query: string,
  limit: number = 5
) {
  try {
    const matcher = createProductMatcher(
      productsData as Product[],
      matchingRulesData
    )
    
    const products = matcher.searchProducts(query, limit)
    
    return {
      success: true,
      products,
      query
    }
  } catch (error: any) {
    console.error('Product search error:', error)
    return {
      success: false,
      error: error.message,
      products: []
    }
  }
}
