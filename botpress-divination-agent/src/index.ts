import { IntegrationContext } from '@botpress/sdk'
import { performDivination, formatDivinationResult } from './actions/divination'
import {
  recommendProducts,
  formatProductRecommendations,
  createProductCard,
  createProductCarousel,
  handleProductView,
  handleProductPurchase,
  searchProducts
} from './actions/product'
import * as dotenv from 'dotenv'
import integrationDefinition from './integration.definition'

// 加载环境变量
dotenv.config()

/**
 * Ether AI Assistant - 对话与导购智能体
 * 主入口文件
 * 
 * Botpress SDK 0.3.0+ 使用 IntegrationDefinition 而不是 Integration 类
 * Actions 通过 integration.definition.ts 定义，在这里实现
 */

// 导出 integration definition
export default integrationDefinition

/**
 * 导出 Action 实现
 * 这些函数会被 Botpress 运行时自动调用
 */

// 占卜动作
export { performDivination }

// 商品推荐动作
export { recommendProducts }

// 商品搜索动作
export async function searchProducts_action(ctx: IntegrationContext, input: { query: string; limit?: number }) {
  return await searchProducts(ctx, input.query, input.limit)
}

// 商品查看处理
export async function handleProductView_action(ctx: IntegrationContext, input: { productId: string }) {
  return await handleProductView(ctx, input.productId)
}

// 商品购买处理
export async function handleProductPurchase_action(ctx: IntegrationContext, input: { productId: string }) {
  return await handleProductPurchase(ctx, input.productId)
}

// 导出格式化函数供其他模块使用
export {
  formatDivinationResult,
  formatProductRecommendations,
  createProductCard,
  createProductCarousel
}
