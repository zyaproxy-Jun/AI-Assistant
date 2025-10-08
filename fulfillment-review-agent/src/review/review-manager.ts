import type {
  Review,
  SubmitReviewRequest,
  ReviewRating,
  RewardRecord
} from '../types/fulfillment.js'
import { v4 as uuidv4 } from 'uuid'

/**
 * 评价管理器
 */
export class ReviewManager {
  /**
   * 提交评价
   */
  async submitReview(request: SubmitReviewRequest): Promise<Review> {
    // 验证评价
    this.validateReview(request)

    // 创建评价对象
    const review: Review = {
      _id: uuidv4(),
      orderId: request.orderId,
      orderNumber: '', // 需要从订单服务获取
      userId: request.userId,
      rating: request.rating,
      categories: request.categories,
      comment: request.comment,
      images: request.images || [],
      tags: request.tags || [],
      isAnonymous: request.isAnonymous || false,
      isPublic: request.isPublic !== false,
      rewardPoints: 0,
      bonusPoints: 0,
      timestamps: {
        created: new Date()
      },
      status: 'pending'
    }

    // 计算奖励积分
    const rewards = this.calculateRewards(review)
    review.rewardPoints = rewards.basePoints
    review.bonusPoints = rewards.bonusPoints

    // 保存评价到数据库
    // TODO: await this.saveReview(review)

    // 自动审核通过
    review.status = 'published'
    review.timestamps.published = new Date()

    // 发放奖励
    await this.grantRewards(request.userId, review)

    // 更新商品评分
    // TODO: await this.updateProductRating(request.orderId)

    return review
  }

  /**
   * 验证评价
   */
  private validateReview(request: SubmitReviewRequest): void {
    const errors: string[] = []

    // 验证评分
    if (!this.isValidRating(request.rating)) {
      errors.push('总体评分必须在1-5之间')
    }

    // 验证分类评分
    const categories = request.categories
    if (!this.isValidRating(categories.productQuality)) {
      errors.push('商品质量评分必须在1-5之间')
    }
    if (!this.isValidRating(categories.divinationAccuracy)) {
      errors.push('占卜准确度评分必须在1-5之间')
    }
    if (!this.isValidRating(categories.serviceAttitude)) {
      errors.push('服务态度评分必须在1-5之间')
    }
    if (!this.isValidRating(categories.deliverySpeed)) {
      errors.push('配送速度评分必须在1-5之间')
    }

    // 验证评论内容
    if (!request.comment || request.comment.trim().length === 0) {
      errors.push('评论内容不能为空')
    } else if (request.comment.length < 10) {
      errors.push('评论内容至少10个字符')
    } else if (request.comment.length > 1000) {
      errors.push('评论内容不能超过1000个字符')
    }

    // 验证图片数量
    if (request.images && request.images.length > 9) {
      errors.push('最多只能上传9张图片')
    }

    if (errors.length > 0) {
      throw new Error(errors.join('; '))
    }
  }

  /**
   * 验证评分有效性
   */
  private isValidRating(rating: number): boolean {
    return Number.isInteger(rating) && rating >= 1 && rating <= 5
  }

  /**
   * 计算奖励积分
   */
  private calculateRewards(review: Review): { basePoints: number; bonusPoints: number } {
    const enableRewards = process.env.ENABLE_REVIEW_REWARDS === 'true'
    
    if (!enableRewards) {
      return { basePoints: 0, bonusPoints: 0 }
    }

    const basePoints = parseInt(process.env.REVIEW_REWARD_POINTS || '10')
    let bonusPoints = 0

    // 带图片评价额外奖励
    if (review.images && review.images.length > 0) {
      const imageBonus = parseInt(process.env.REVIEW_WITH_IMAGE_BONUS || '5')
      bonusPoints += imageBonus
    }

    // 详细评论额外奖励
    if (review.comment.length > 100) {
      bonusPoints += 3
    }

    // 高评分额外奖励
    if (review.rating === 5) {
      bonusPoints += 2
    }

    return { basePoints, bonusPoints }
  }

  /**
   * 发放奖励
   */
  private async grantRewards(userId: string, review: Review): Promise<void> {
    const totalPoints = (review.rewardPoints || 0) + (review.bonusPoints || 0)
    
    if (totalPoints === 0) {
      return
    }

    const reward: RewardRecord = {
      _id: uuidv4(),
      userId,
      type: review.images && review.images.length > 0 ? 'review_with_image' : 'review',
      points: totalPoints,
      orderId: review.orderId,
      reviewId: review._id,
      description: `评价奖励：${review.rewardPoints}积分${review.bonusPoints ? ` + 奖励${review.bonusPoints}积分` : ''}`,
      createdAt: new Date()
    }

    // TODO: 保存奖励记录到数据库
    // TODO: 更新用户积分余额
    
    console.log(`✅ Granted ${totalPoints} points to user ${userId}`)
  }

  /**
   * 获取订单评价
   */
  async getOrderReview(orderId: string): Promise<Review | null> {
    // TODO: 从数据库查询
    return null
  }

  /**
   * 获取用户评价列表
   */
  async getUserReviews(userId: string, limit: number = 20): Promise<Review[]> {
    // TODO: 从数据库查询
    return []
  }

  /**
   * 获取商品评价列表
   */
  async getProductReviews(productId: string, limit: number = 20): Promise<Review[]> {
    // TODO: 从数据库查询
    return []
  }

  /**
   * 计算平均评分
   */
  calculateAverageRating(reviews: Review[]): {
    overall: number
    productQuality: number
    divinationAccuracy: number
    serviceAttitude: number
    deliverySpeed: number
  } {
    if (reviews.length === 0) {
      return {
        overall: 0,
        productQuality: 0,
        divinationAccuracy: 0,
        serviceAttitude: 0,
        deliverySpeed: 0
      }
    }

    const sum = reviews.reduce((acc, review) => ({
      overall: acc.overall + review.rating,
      productQuality: acc.productQuality + review.categories.productQuality,
      divinationAccuracy: acc.divinationAccuracy + review.categories.divinationAccuracy,
      serviceAttitude: acc.serviceAttitude + review.categories.serviceAttitude,
      deliverySpeed: acc.deliverySpeed + review.categories.deliverySpeed
    }), {
      overall: 0,
      productQuality: 0,
      divinationAccuracy: 0,
      serviceAttitude: 0,
      deliverySpeed: 0
    })

    const count = reviews.length

    return {
      overall: Math.round((sum.overall / count) * 10) / 10,
      productQuality: Math.round((sum.productQuality / count) * 10) / 10,
      divinationAccuracy: Math.round((sum.divinationAccuracy / count) * 10) / 10,
      serviceAttitude: Math.round((sum.serviceAttitude / count) * 10) / 10,
      deliverySpeed: Math.round((sum.deliverySpeed / count) * 10) / 10
    }
  }

  /**
   * 生成评价统计
   */
  generateReviewStats(reviews: Review[]): {
    total: number
    averageRating: number
    ratingDistribution: Record<ReviewRating, number>
    withImages: number
    anonymous: number
  } {
    const stats = {
      total: reviews.length,
      averageRating: 0,
      ratingDistribution: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      } as Record<ReviewRating, number>,
      withImages: 0,
      anonymous: 0
    }

    if (reviews.length === 0) {
      return stats
    }

    let totalRating = 0

    reviews.forEach(review => {
      totalRating += review.rating
      stats.ratingDistribution[review.rating]++
      
      if (review.images && review.images.length > 0) {
        stats.withImages++
      }
      
      if (review.isAnonymous) {
        stats.anonymous++
      }
    })

    stats.averageRating = Math.round((totalRating / reviews.length) * 10) / 10

    return stats
  }
}

// 导出单例
export const reviewManager = new ReviewManager()
