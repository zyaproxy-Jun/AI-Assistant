import express from 'express'
import cors from 'cors'
import { TarotEngine } from './engines/tarot-engine.js'
import { ContextProvider } from './context/context-provider.js'

/**
 * HTTP API Server (用于测试 MCP Server 功能)
 */
const app = express()
const PORT = process.env.API_PORT || 3000

app.use(cors())
app.use(express.json())

const tarotEngine = new TarotEngine()

/**
 * 健康检查
 */
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'fortune-telling-mcp-server',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  })
})

/**
 * 列出所有工具
 */
app.get('/api/tools', (_req, res) => {
  res.json({
    tools: [
      'calculate_tarot',
      'calculate_astrology',
      'calculate_iching',
      'interpret_dream',
      'calculate_ziwei',
      'calculate_bazi'
    ]
  })
})

/**
 * 塔罗牌占卜
 */
app.post('/api/divination/tarot', async (req, res) => {
  try {
    const { question, spread = 'three_card', user_id } = req.body

    if (!question) {
      return res.status(400).json({ error: 'Question is required' })
    }

    // 创建牌阵
    const tarotSpread = tarotEngine.createSpread(spread)
    
    // 解读
    const reading = tarotEngine.interpretReading(question, tarotSpread)
    
    // 生成商品匹配上下文
    const productContext = tarotEngine.generateProductContext(reading)

    res.json({
      success: true,
      type: 'tarot',
      timestamp: new Date().toISOString(),
      userId: user_id,
      question,
      spread: {
        type: reading.spread.type,
        cards: reading.spread.cards.map(c => ({
          name: c.name,
          nameEn: c.nameEn,
          position: c.position,
          keywords: c.keywords,
          meanings: c.meanings
        }))
      },
      interpretation: reading.interpretation,
      summary: reading.summary,
      advice: reading.advice,
      context_for_products: productContext
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
})

/**
 * 占星计算
 */
app.post('/api/divination/astrology', async (req, res) => {
  try {
    const { birth_date, birth_time, location } = req.body

    if (!birth_date || !birth_time || !location) {
      return res.status(400).json({ error: 'Birth date, time, and location are required' })
    }

    // TODO: 实现占星引擎
    const mockReading = {
      birthChart: {
        date: birth_date,
        time: birth_time,
        location,
        sunSign: '白羊座',
        moonSign: '巨蟹座',
        ascendant: '天秤座'
      },
      interpretation: '您的太阳位于白羊座，展现出积极主动的性格...'
    }

    const productContext = ContextProvider.generateContext({
      keywords: ['积极', '主动', '热情', '冒险'],
      sentiment: 'positive',
      elements: ['fire'],
      colors: ['红色', '橙色'],
      themes: ['事业', '行动']
    })

    res.json({
      success: true,
      type: 'astrology',
      timestamp: new Date().toISOString(),
      ...mockReading,
      context_for_products: productContext
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
})

/**
 * 易经占卜
 */
app.post('/api/divination/iching', async (req, res) => {
  try {
    const { question, method = 'coin' } = req.body

    if (!question) {
      return res.status(400).json({ error: 'Question is required' })
    }

    // TODO: 实现易经引擎
    const mockReading = {
      question,
      hexagram: {
        number: 1,
        name: '乾',
        interpretation: '元亨利贞...'
      }
    }

    const productContext = ContextProvider.generateContext({
      keywords: ['坚强', '创造', '领导'],
      sentiment: 'positive',
      elements: ['metal'],
      themes: ['事业', '领导力']
    })

    res.json({
      success: true,
      type: 'iching',
      timestamp: new Date().toISOString(),
      ...mockReading,
      context_for_products: productContext
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
})

/**
 * 解梦
 */
app.post('/api/divination/dream', async (req, res) => {
  try {
    const { dream_text, emotions = [] } = req.body

    if (!dream_text) {
      return res.status(400).json({ error: 'Dream text is required' })
    }

    // TODO: 集成 SomniumSage
    const mockReading = {
      dreamText: dream_text,
      interpretation: '您的梦境显示...',
      symbols: ['水', '飞翔', '朋友']
    }

    const productContext = ContextProvider.generateContext({
      keywords: ['自由', '情感', '连接'],
      sentiment: 'positive',
      elements: ['water', 'air'],
      themes: ['情感', '关系']
    })

    res.json({
      success: true,
      type: 'dream',
      timestamp: new Date().toISOString(),
      ...mockReading,
      context_for_products: productContext
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
})

/**
 * 紫微斗数
 */
app.post('/api/divination/ziwei', async (req, res) => {
  try {
    const { birth_date, birth_time, gender } = req.body

    if (!birth_date || !birth_time || !gender) {
      return res.status(400).json({ error: 'Birth date, time, and gender are required' })
    }

    // TODO: 实现紫微斗数引擎
    const mockReading = {
      birthDate: birth_date,
      birthTime: birth_time,
      gender,
      chart: {
        palaces: [
          { name: '命宫', mainStars: ['紫微', '天府'] }
        ]
      }
    }

    const productContext = ContextProvider.generateContext({
      keywords: ['尊贵', '权威', '财富'],
      sentiment: 'positive',
      elements: ['earth'],
      themes: ['事业', '财富']
    })

    res.json({
      success: true,
      type: 'ziwei',
      timestamp: new Date().toISOString(),
      ...mockReading,
      context_for_products: productContext
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
})

/**
 * 八字算命
 */
app.post('/api/divination/bazi', async (req, res) => {
  try {
    const { birth_datetime, gender } = req.body

    if (!birth_datetime) {
      return res.status(400).json({ error: 'Birth datetime is required' })
    }

    // TODO: 实现八字引擎
    const mockReading = {
      birthDateTime: birth_datetime,
      gender,
      chart: {
        year: { heavenlyStem: '甲', earthlyBranch: '子' },
        month: { heavenlyStem: '丙', earthlyBranch: '寅' },
        day: { heavenlyStem: '戊', earthlyBranch: '辰' },
        hour: { heavenlyStem: '壬', earthlyBranch: '午' }
      }
    }

    const productContext = ContextProvider.generateContext({
      keywords: ['平衡', '和谐', '五行'],
      sentiment: 'neutral',
      elements: ['wood', 'fire', 'earth', 'metal', 'water'],
      themes: ['生活', '平衡']
    })

    res.json({
      success: true,
      type: 'bazi',
      timestamp: new Date().toISOString(),
      ...mockReading,
      context_for_products: productContext
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    })
  }
})

/**
 * 启动服务器
 */
app.listen(PORT, () => {
  console.log(`Fortune-Telling API Server running on http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
  console.log(`API docs: http://localhost:${PORT}/api/tools`)
})
