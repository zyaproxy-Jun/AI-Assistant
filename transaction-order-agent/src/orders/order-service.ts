import { v4 as uuidv4 } from 'uuid'
import { mongoClient } from '../database/mongodb-client.js'
import { ObjectId } from 'mongodb'
import type {
  Order,
  CreateOrderRequest,
  CreateOrderResponse,
  OrderItem,
  CustomizationForm
} from '../types/order.js'

/**
 * 订单服务
 */
export class OrderService {
  /**
   * 创建订单
   */
  async createOrder(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    try {
      // 生成订单号
      const orderNumber = this.generateOrderNumber()

      // 获取商品信息（实际应该从商品服务获取）
      const products = await this.getProductsByIds(request.selectedProducts)

      // 计算总价
      const totalAmount = products.reduce((sum, item) => sum + item.price * item.quantity, 0)

      // 创建订单对象
      const order: Order = {
        orderNumber,
        userId: request.userId,
        userInfo: request.userInfo,
        divinationResult: request.divinationResult,
        products,
        customization: request.customization,
        payment: {
          gateway: 'stripe', // 默认值，实际支付时会更新
          amount: totalAmount,
          currency: 'CNY',
          status: 'pending'
        },
        status: 'created',
        timestamps: {
          created: new Date()
        },
        metadata: {
          divinationType: request.divinationResult.type,
          source: 'botpress',
          ...request.metadata
        }
      }

      // 保存到数据库
      const collection = mongoClient.getOrdersCollection()
      const result = await collection.insertOne(order as any)

      return {
        success: true,
        orderId: result.insertedId.toString(),
        orderNumber: order.orderNumber,
        order,
        nextStep: 'payment'
      }
    } catch (error) {
      console.error('Error creating order:', error)
      throw new Error(`Failed to create order: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * 获取订单
   */
  async getOrder(orderId: string): Promise<Order | null> {
    try {
      const collection = mongoClient.getOrdersCollection()
      
      // 尝试使用 ObjectId 查询
      let order = null
      try {
        order = await collection.findOne({ _id: new ObjectId(orderId) } as any)
      } catch (e) {
        // 如果不是有效的 ObjectId，尝试用订单号查询
        console.log('Invalid ObjectId, trying orderNumber:', orderId)
        order = await collection.findOne({ orderNumber: orderId })
      }
      
      return order
    } catch (error) {
      console.error('Error getting order:', error)
      return null
    }
  }

  /**
   * 通过订单号获取订单
   */
  async getOrderByNumber(orderNumber: string): Promise<Order | null> {
    try {
      const collection = mongoClient.getOrdersCollection()
      const order = await collection.findOne({ orderNumber })
      return order
    } catch (error) {
      console.error('Error getting order by number:', error)
      return null
    }
  }

  /**
   * 更新订单状态
   */
  async updateOrderStatus(
    orderId: string,
    status: Order['status'],
    additionalData?: Partial<Order>
  ): Promise<boolean> {
    try {
      const collection = mongoClient.getOrdersCollection()
      
      const updateData: any = {
        status,
        [`timestamps.${status}`]: new Date()
      }

      if (additionalData) {
        Object.assign(updateData, additionalData)
      }

      // 尝试使用 ObjectId 更新
      let result
      try {
        result = await collection.updateOne(
          { _id: new ObjectId(orderId) } as any,
          { $set: updateData }
        )
      } catch (e) {
        // 如果不是有效的 ObjectId，尝试用订单号更新
        result = await collection.updateOne(
          { orderNumber: orderId },
          { $set: updateData }
        )
      }

      return result.modifiedCount > 0
    } catch (error) {
      console.error('Error updating order status:', error)
      return false
    }
  }

  /**
   * 更新支付信息
   */
  async updatePaymentInfo(
    orderId: string,
    paymentInfo: Partial<Order['payment']>
  ): Promise<boolean> {
    try {
      const collection = mongoClient.getOrdersCollection()
      
      const updateData: any = {}
      Object.keys(paymentInfo).forEach(key => {
        updateData[`payment.${key}`] = (paymentInfo as any)[key]
      })

      if (paymentInfo.status === 'paid') {
        updateData['timestamps.paid'] = new Date()
        updateData['status'] = 'paid'
      }

      // 尝试使用 ObjectId 更新
      let result
      try {
        result = await collection.updateOne(
          { _id: new ObjectId(orderId) } as any,
          { $set: updateData }
        )
      } catch (e) {
        // 如果不是有效的 ObjectId，尝试用订单号更新
        result = await collection.updateOne(
          { orderNumber: orderId },
          { $set: updateData }
        )
      }

      return result.modifiedCount > 0
    } catch (error) {
      console.error('Error updating payment info:', error)
      return false
    }
  }

  /**
   * 获取用户订单列表
   */
  async getUserOrders(userId: string, limit: number = 20): Promise<Order[]> {
    try {
      const collection = mongoClient.getOrdersCollection()
      const orders = await collection
        .find({ userId })
        .sort({ 'timestamps.created': -1 })
        .limit(limit)
        .toArray()
      
      return orders
    } catch (error) {
      console.error('Error getting user orders:', error)
      return []
    }
  }

  /**
   * 取消订单
   */
  async cancelOrder(orderId: string, reason?: string): Promise<boolean> {
    try {
      const collection = mongoClient.getOrdersCollection()
      
      const result = await collection.updateOne(
        { _id: orderId as any },
        {
          $set: {
            status: 'cancelled',
            'timestamps.cancelled': new Date(),
            adminNotes: reason || 'Order cancelled by user'
          }
        }
      )

      return result.modifiedCount > 0
    } catch (error) {
      console.error('Error cancelling order:', error)
      return false
    }
  }

  /**
   * 生成订单号
   */
  private generateOrderNumber(): string {
    const timestamp = Date.now().toString()
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    return `ORD${timestamp}${random}`
  }

  /**
   * 根据 ID 获取商品信息（模拟）
   */
  private async getProductsByIds(productIds: string[]): Promise<OrderItem[]> {
    // 实际应该从商品服务或数据库获取
    // 这里使用模拟数据
    const mockProducts: Record<string, OrderItem> = {
      'product_001': {
        productId: 'product_001',
        productName: '塔罗牌水晶吊坠',
        productType: 'physical',
        quantity: 1,
        price: 199,
        currency: 'CNY',
        imageUrl: 'https://example.com/product_001.jpg',
        description: '天然水晶制作的塔罗牌主题吊坠'
      },
      'product_002': {
        productId: 'product_002',
        productName: '星座能量手链',
        productType: 'physical',
        quantity: 1,
        price: 299,
        currency: 'CNY',
        imageUrl: 'https://example.com/product_002.jpg',
        description: '根据星座定制的能量石手链'
      },
      'product_003': {
        productId: 'product_003',
        productName: '数字占卜报告',
        productType: 'digital',
        quantity: 1,
        price: 99,
        currency: 'CNY',
        description: '详细的数字化占卜分析报告（PDF）'
      }
    }

    return productIds.map(id => mockProducts[id] || {
      productId: id,
      productName: 'Unknown Product',
      productType: 'digital',
      quantity: 1,
      price: 0,
      currency: 'CNY'
    })
  }

  /**
   * 验证定制表单
   */
  validateCustomization(customization: CustomizationForm): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (customization.productType === 'physical' && customization.physicalProduct) {
      const physical = customization.physicalProduct

      if (!physical.deliveryAddress) {
        errors.push('配送地址不能为空')
      } else {
        const addr = physical.deliveryAddress
        if (!addr.recipientName) errors.push('收件人姓名不能为空')
        if (!addr.phone) errors.push('联系电话不能为空')
        if (!addr.province) errors.push('省份不能为空')
        if (!addr.city) errors.push('城市不能为空')
        if (!addr.street) errors.push('详细地址不能为空')
        if (!addr.postalCode) errors.push('邮政编码不能为空')
      }
    } else if (customization.productType === 'digital' && customization.digitalProduct) {
      const digital = customization.digitalProduct

      if (!digital.email) {
        errors.push('邮箱地址不能为空')
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(digital.email)) {
        errors.push('邮箱地址格式不正确')
      }
    } else {
      errors.push('定制信息不完整')
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }
}

// 导出单例
export const orderService = new OrderService()
