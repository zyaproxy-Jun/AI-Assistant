import express from 'express'
import dotenv from 'dotenv'
import { SharingManager } from './sharing/sharing-manager.js'
import { ReviewManager } from './review/review-manager.js'

dotenv.config()

/**
 * Fulfillment, Review & Sharing Agent
 * 交付、评价与分享智能体主服务
 */

const app = express()
const PORT = process.env.PORT || 3003
const HOST = process.env.HOST || 'localhost'

app.use(express.json())

// Initialize services
const sharingManager = new SharingManager()
const reviewManager = new ReviewManager()

/**
 * Health check endpoint
 */
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'fulfillment-review-agent',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  })
})

/**
 * Get service info
 */
app.get('/api/info', (_req, res) => {
  res.json({
    service: 'Fulfillment, Review & Sharing Agent',
    version: '1.0.0',
    features: [
      'Digital Product Delivery',
      'Physical Product Shipping',
      'Logistics Tracking',
      'Review System',
      'Social Sharing'
    ],
    logistics: [
      'SF Express',
      'EMS',
      'YTO',
      'ZTO',
      'STO',
      'FedEx',
      'UPS',
      'DHL'
    ],
    socialPlatforms: 13
  })
})

/**
 * Get enabled sharing platforms
 */
app.get('/api/sharing/platforms', (_req, res) => {
  try {
    const platforms = sharingManager.getEnabledPlatforms()
    res.json({
      success: true,
      platforms: platforms.map(p => ({
        id: p.id,
        name: p.name,
        displayName: p.displayName
      })),
      total: platforms.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
})

/**
 * Generate share links for an order
 */
app.post('/api/sharing/generate', async (req, res) => {
  try {
    const { orderId, orderNumber, content } = req.body
    
    if (!orderId || !orderNumber) {
      return res.status(400).json({
        success: false,
        error: 'orderId and orderNumber are required'
      })
    }

    const shareContent: any = {
      orderId,
      orderNumber,
      title: content?.title || 'Check out my divination result!',
      description: content?.description || 'Discover your future with AI divination',
      imageUrl: content?.imageUrl,
      url: `${process.env.SHARING_BASE_URL || 'https://ether-ai.com'}/share/${orderId}`,
      hashtags: content?.hashtags || ['divination', 'tarot', 'astrology']
    }

    const shareLinks = sharingManager.generateShareLinks(shareContent)

    res.json({
      success: true,
      shareLinks
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
})

/**
 * Submit a review
 */
app.post('/api/reviews/submit', async (req, res) => {
  try {
    const review = await reviewManager.submitReview(req.body)
    res.json({
      success: true,
      review
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
})

/**
 * Get order reviews
 */
app.get('/api/reviews/order/:orderId', async (req, res) => {
  try {
    const review = await reviewManager.getOrderReview(req.params.orderId)
    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      })
    }
    res.json({
      success: true,
      review
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
})

/**
 * Track logistics
 */
app.get('/api/logistics/track/:trackingNumber', async (req, res) => {
  try {
    // Mock logistics tracking response
    res.json({
      success: true,
      trackingNumber: req.params.trackingNumber,
      status: 'in_transit',
      carrier: 'SF Express',
      events: [
        {
          timestamp: new Date().toISOString(),
          location: 'Beijing Distribution Center',
          status: 'in_transit',
          description: 'Package is in transit'
        }
      ]
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
})

// Connect to MongoDB and start server
async function startServer() {
  try {
    console.log('✅ Starting Fulfillment, Review & Sharing Agent...')

    app.listen(PORT, () => {
      console.log(`✅ Fulfillment, Review & Sharing Agent running on http://${HOST}:${PORT}`)
      console.log(`📊 Health check: http://${HOST}:${PORT}/health`)
      console.log(`📦 Delivery, 📝 Reviews, 📱 Social Sharing ready`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...')
  process.exit(0)
})

// Start the server
startServer()
