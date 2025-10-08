// 订单类型定义

export type OrderStatus = 'created' | 'paid' | 'processing' | 'fulfilled' | 'completed' | 'cancelled' | 'refunded'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'
export type PaymentGateway = 'stripe' | 'paypal' | 'alipay' | 'wechat' | 'usdc'
export type ProductType = 'physical' | 'digital'

/**
 * 订单接口
 */
export interface Order {
  _id?: string
  orderNumber: string
  userId: string
  userInfo: {
    name?: string
    email?: string
    phone?: string
  }
  
  // 占卜结果（来自占卜智能体）
  divinationResult: {
    type: string
    timestamp: string
    data: any
    interpretation: string
  }
  
  // 商品信息
  products: OrderItem[]
  
  // 定制信息
  customization: CustomizationForm
  
  // 支付信息
  payment: PaymentInfo
  
  // 订单状态
  status: OrderStatus
  
  // 时间戳
  timestamps: {
    created: Date
    paid?: Date
    processing?: Date
    fulfilled?: Date
    completed?: Date
    cancelled?: Date
  }
  
  // 元数据
  metadata: {
    divinationType: string
    productMatchScore?: number
    source: string
    ipAddress?: string
    userAgent?: string
  }
  
  // 备注
  notes?: string
  adminNotes?: string
}

/**
 * 订单项
 */
export interface OrderItem {
  productId: string
  productName: string
  productType: ProductType
  quantity: number
  price: number
  currency: string
  imageUrl?: string
  description?: string
  customization?: Record<string, any>
}

/**
 * 支付信息
 */
export interface PaymentInfo {
  gateway: PaymentGateway
  amount: number
  currency: string
  status: PaymentStatus
  transactionId?: string
  paymentUrl?: string
  qrCode?: string
  paidAt?: Date
  refundedAt?: Date
  refundAmount?: number
  metadata?: Record<string, any>
}

/**
 * 定制表单
 */
export interface CustomizationForm {
  productType: ProductType
  
  // 实物商品定制
  physicalProduct?: PhysicalProductCustomization
  
  // 数字商品定制
  digitalProduct?: DigitalProductCustomization
}

/**
 * 实物商品定制
 */
export interface PhysicalProductCustomization {
  deliveryAddress: DeliveryAddress
  deliveryMethod: 'standard' | 'express' | 'priority'
  giftMessage?: string
  giftWrapping?: boolean
  customization?: {
    engraving?: string
    color?: string
    size?: string
    material?: string
    [key: string]: any
  }
}

/**
 * 数字商品定制
 */
export interface DigitalProductCustomization {
  email: string
  deliveryFormat: 'pdf' | 'video' | 'audio' | 'epub' | 'zip'
  customization?: {
    nameOnCertificate?: string
    birthData?: {
      date: string
      time: string
      location: string
    }
    personalMessage?: string
    [key: string]: any
  }
}

/**
 * 配送地址
 */
export interface DeliveryAddress {
  recipientName: string
  phone: string
  country: string
  province: string
  city: string
  district?: string
  street: string
  postalCode: string
  addressLine2?: string
  isDefault?: boolean
}

/**
 * 创建订单请求
 */
export interface CreateOrderRequest {
  userId: string
  userInfo: {
    name?: string
    email?: string
    phone?: string
  }
  divinationResult: any
  selectedProducts: string[] // Product IDs
  customization: CustomizationForm
  metadata?: Record<string, any>
}

/**
 * 创建订单响应
 */
export interface CreateOrderResponse {
  success: boolean
  orderId: string
  orderNumber: string
  order: Order
  nextStep: 'payment' | 'review'
}

/**
 * 支付请求
 */
export interface PaymentRequest {
  orderId: string
  gateway: PaymentGateway
  returnUrl?: string
  cancelUrl?: string
  metadata?: Record<string, any>
}

/**
 * 支付响应
 */
export interface PaymentResponse {
  success: boolean
  paymentUrl?: string
  qrCode?: string
  transactionId?: string
  status: PaymentStatus
  message?: string
}

/**
 * Webhook 事件
 */
export interface WebhookEvent {
  type: 'payment.success' | 'payment.failed' | 'order.cancelled' | 'order.refunded'
  timestamp: string
  orderId: string
  data: any
}

/**
 * 商家通知
 */
export interface MerchantNotification {
  orderNumber: string
  orderType: ProductType
  productName: string
  quantity: number
  customization: any
  customerInfo: {
    name: string
    email?: string
    phone?: string
  }
  deliveryInfo: DeliveryAddress | { email: string }
  paidAmount: number
  currency: string
  paidAt: Date
}

/**
 * 交付触发请求
 */
export interface FulfillmentTriggerRequest {
  orderId: string
  orderType: ProductType
  deliveryInfo: DeliveryAddress | DigitalProductCustomization
  products: OrderItem[]
  metadata?: Record<string, any>
}
