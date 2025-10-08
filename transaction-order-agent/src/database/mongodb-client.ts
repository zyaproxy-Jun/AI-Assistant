import { MongoClient, Db, Collection } from 'mongodb'
import type { Order } from '../types/order.js'

/**
 * MongoDB 客户端管理器
 */
export class MongoDBClient {
  private static instance: MongoDBClient
  private client: MongoClient | null = null
  private db: Db | null = null

  private constructor() {}

  /**
   * 获取单例实例
   */
  static getInstance(): MongoDBClient {
    if (!MongoDBClient.instance) {
      MongoDBClient.instance = new MongoDBClient()
    }
    return MongoDBClient.instance
  }

  /**
   * 连接数据库
   */
  async connect(): Promise<void> {
    try {
      const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
      const dbName = process.env.MONGODB_DB_NAME || 'divination-orders'

      this.client = new MongoClient(uri)
      await this.client.connect()
      this.db = this.client.db(dbName)

      console.log('✅ Connected to MongoDB')

      // 创建索引
      await this.createIndexes()
    } catch (error) {
      console.error('❌ MongoDB connection error:', error)
      throw error
    }
  }

  /**
   * 创建索引
   */
  private async createIndexes(): Promise<void> {
    if (!this.db) return

    const ordersCollection = this.db.collection('orders')

    await ordersCollection.createIndexes([
      { key: { orderNumber: 1 }, unique: true },
      { key: { userId: 1 } },
      { key: { status: 1 } },
      { key: { 'payment.status': 1 } },
      { key: { 'timestamps.created': -1 } },
      { key: { 'payment.transactionId': 1 } }
    ])

    console.log('✅ MongoDB indexes created')
  }

  /**
   * 获取数据库实例
   */
  getDb(): Db {
    if (!this.db) {
      throw new Error('Database not connected')
    }
    return this.db
  }

  /**
   * 获取订单集合
   */
  getOrdersCollection(): Collection<Order> {
    return this.getDb().collection<Order>('orders')
  }

  /**
   * 断开连接
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null
      this.db = null
      console.log('✅ Disconnected from MongoDB')
    }
  }

  /**
   * 健康检查
   */
  async healthCheck(): Promise<boolean> {
    try {
      if (!this.db) return false
      await this.db.admin().ping()
      return true
    } catch {
      return false
    }
  }
}

// 导出单例实例
export const mongoClient = MongoDBClient.getInstance()
