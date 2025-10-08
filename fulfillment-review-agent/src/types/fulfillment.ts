// 交付、评价、分享类型定义

export type DeliveryStatus = 'pending' | 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'failed'
export type LogisticsProvider = 'sf' | 'ems' | 'yto' | 'zto' | 'sto' | 'fedex' | 'ups' | 'dhl'
export type ReviewRating = 1 | 2 | 3 | 4 | 5
export type SocialPlatform = 'matrix' | 'telegram' | 'shorts-stack' | 'tiktok' | 'discord' | 'discourse' | 'reddit' | 'x' | 'facebook' | 'youtube' | 'pinterest' | 'instagram' | 'fiverr'

/**
 * 交付记录
 */
export interface DeliveryRecord {
  _id?: string
  orderId: string
  orderNumber: string
  deliveryType: 'digital' | 'physical'
  status: DeliveryStatus
  
  // 数字商品交付
  digitalDelivery?: DigitalDelivery
  
  // 实物商品交付
  physicalDelivery?: PhysicalDelivery
  
  timestamps: {
    created: Date
    processing?: Date
    shipped?: Date
    delivered?: Date
  }
  
  notes?: string
}

/**
 * 数字商品交付
 */
export interface DigitalDelivery {
  email: string
  downloadLink: string
  downloadCode?: string
  expiresAt: Date
  downloadCount: number
  maxDownloads: number
  fileFormat: string
  fileSize: number
  sentAt?: Date
  downloadedAt?: Date
}

/**
 * 实物商品交付
 */
export interface PhysicalDelivery {
  trackingNumber: string
  provider: LogisticsProvider
  recipientName: string
  recipientPhone: string
  deliveryAddress: string
  shippedAt?: Date
  estimatedDelivery?: Date
  actualDelivery?: Date
  trackingHistory: TrackingEvent[]
}

/**
 * 物流追踪事件
 */
export interface TrackingEvent {
  timestamp: Date
  status: string
  location: string
  description: string
  operator?: string
}

/**
 * 物流追踪信息
 */
export interface TrackingInfo {
  trackingNumber: string
  provider: LogisticsProvider
  status: 'pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'exception'
  currentLocation: string
  estimatedDelivery?: string
  actualDelivery?: string
  history: TrackingEvent[]
  lastUpdated: Date
}

/**
 * 评价
 */
export interface Review {
  _id?: string
  orderId: string
  orderNumber: string
  userId: string
  
  // 评分
  rating: ReviewRating
  categories: {
    productQuality: ReviewRating      // 商品质量
    divinationAccuracy: ReviewRating  // 占卜准确度
    serviceAttitude: ReviewRating     // 服务态度
    deliverySpeed: ReviewRating       // 配送速度
  }
  
  // 评论内容
  comment: string
  images?: string[]
  tags?: string[]  // ['准确', '专业', '快速']
  
  // 设置
  isAnonymous: boolean
  isPublic: boolean
  
  // 奖励
  rewardPoints?: number
  bonusPoints?: number
  
  timestamps: {
    created: Date
    published?: Date
  }
  
  // 状态
  status: 'pending' | 'published' | 'hidden'
  moderationNotes?: string
}

/**
 * 评价请求
 */
export interface SubmitReviewRequest {
  orderId: string
  userId: string
  rating: ReviewRating
  categories: {
    productQuality: ReviewRating
    divinationAccuracy: ReviewRating
    serviceAttitude: ReviewRating
    deliverySpeed: ReviewRating
  }
  comment: string
  images?: string[]
  tags?: string[]
  isAnonymous?: boolean
  isPublic?: boolean
}

/**
 * 社交平台配置
 */
export interface SocialPlatformConfig {
  id: SocialPlatform
  name: string
  displayName: string
  logo: string
  color: string
  shareUrlTemplate?: string
  enabled: boolean
}

/**
 * 分享内容
 */
export interface ShareContent {
  orderId: string
  orderNumber: string
  title: string
  description: string
  imageUrl?: string
  url: string
  hashtags?: string[]
}

/**
 * 分享响应
 */
export interface ShareResponse {
  platforms: Array<{
    platform: SocialPlatform
    name: string
    logo: string
    color: string
    shareUrl: string
  }>
}

/**
 * 交付触发请求
 */
export interface FulfillmentTriggerRequest {
  orderId: string
  orderType: 'digital' | 'physical'
  deliveryInfo: any
  products: Array<{
    productId: string
    productName: string
    productType: 'digital' | 'physical'
    quantity: number
  }>
  metadata?: Record<string, any>
}

/**
 * 交付触发响应
 */
export interface FulfillmentTriggerResponse {
  success: boolean
  deliveryId: string
  status: DeliveryStatus
  message: string
  digitalDelivery?: {
    downloadLink: string
    expiresAt: Date
  }
  physicalDelivery?: {
    trackingNumber: string
    provider: LogisticsProvider
    estimatedDelivery: Date
  }
}

/**
 * 奖励记录
 */
export interface RewardRecord {
  _id?: string
  userId: string
  type: 'review' | 'review_with_image' | 'sharing' | 'referral'
  points: number
  orderId?: string
  reviewId?: string
  description: string
  createdAt: Date
}
