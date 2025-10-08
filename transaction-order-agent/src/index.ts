import express from 'express'
import dotenv from 'dotenv'
import { MongoDBClient } from './database/mongodb-client.js'
import { OrderService } from './orders/order-service.js'

dotenv.config()

/**
 * Transaction & Order Agent
 * 交易与订单智能体主服务
 */

const app = express()
const PORT = process.env.PORT || 3002
const HOST = process.env.HOST || 'localhost'

app.use(express.json())

// Initialize services
const mongodb = MongoDBClient.getInstance()
const orderService = new OrderService()

/**
 * Health check endpoint
 */
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'transaction-order-agent',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    mongodb: mongodb ? 'connected' : 'disconnected'
  })
})

/**
 * Get service info
 */
app.get('/api/info', (_req, res) => {
  res.json({
    service: 'Transaction & Order Agent',
    version: '1.0.0',
    features: [
      'Order Management',
      'Multi-Gateway Payment',
      'Customization Forms',
      'Webhook System'
    ],
    paymentGateways: [
      'Stripe',
      'PayPal',
      'Alipay',
      'WeChat Pay',
      'USDC (Crypto)'
    ]
  })
})

/**
 * Create order endpoint
 */
app.post('/api/orders/create', async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body)
    res.json({
      success: true,
      order
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
})

/**
 * Get order by ID
 */
app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await orderService.getOrder(req.params.id)
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      })
    }
    res.json({
      success: true,
      order
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
})

/**
 * Payment webhook endpoint
 */
app.post('/api/webhooks/payment/:gateway', async (req, res) => {
  try {
    const { gateway } = req.params
    console.log(`Received ${gateway} webhook`)
    res.json({ received: true })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
})

// Connect to MongoDB and start server
async function startServer() {
  try {
    await mongodb.connect()
    console.log('✅ Connected to MongoDB')

    app.listen(PORT, () => {
      console.log(`✅ Transaction & Order Agent running on http://${HOST}:${PORT}`)
      console.log(`📊 Health check: http://${HOST}:${PORT}/health`)
      console.log(`💳 Payment gateways ready`)
    })
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
    console.log('⚠️  Starting server without MongoDB...')
    
    app.listen(PORT, () => {
      console.log(`⚠️  Transaction & Order Agent running on http://${HOST}:${PORT} (No MongoDB)`)
      console.log(`📊 Health check: http://${HOST}:${PORT}/health`)
    })
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...')
  await mongodb.disconnect()
  process.exit(0)
})

// Start the server
startServer()
