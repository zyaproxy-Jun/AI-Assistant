#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema
} from '@modelcontextprotocol/sdk/types.js'
import { TarotEngine } from './engines/tarot-engine.js'
import { ContextProvider } from './context/context-provider.js'
import type { MCPToolCallRequest } from './types/mcp.js'

/**
 * Fortune-Telling MCP Server
 * 提供占卜计算服务的 MCP Server
 */
class FortuneTellingMCPServer {
  private server: Server
  private tarotEngine: TarotEngine

  constructor() {
    this.server = new Server(
      {
        name: 'fortune-telling-server',
        version: '1.0.0'
      },
      {
        capabilities: {
          tools: {},
          resources: {}
        }
      }
    )

    this.tarotEngine = new TarotEngine()
    this.setupHandlers()
  }

  /**
   * 设置处理器
   */
  private setupHandlers() {
    // 列出所有工具
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'calculate_tarot',
          description: '塔罗牌占卜 - 抽取塔罗牌并解读',
          inputSchema: {
            type: 'object',
            properties: {
              question: {
                type: 'string',
                description: '占卜问题'
              },
              spread: {
                type: 'string',
                enum: ['single', 'three_card', 'celtic_cross'],
                description: '牌阵类型：single(单张), three_card(三张), celtic_cross(凯尔特十字)'
              },
              output_format: {
                type: 'array',
                items: {
                  type: 'string',
                  enum: ['text', 'image', 'animation']
                },
                description: '输出格式'
              },
              user_id: {
                type: 'string',
                description: '用户ID（可选）'
              }
            },
            required: ['question', 'spread']
          }
        },
        {
          name: 'calculate_astrology',
          description: '星座占星 - 计算出生星盘',
          inputSchema: {
            type: 'object',
            properties: {
              birth_date: {
                type: 'string',
                description: '出生日期 (YYYY-MM-DD)'
              },
              birth_time: {
                type: 'string',
                description: '出生时间 (HH:MM)'
              },
              location: {
                type: 'object',
                properties: {
                  latitude: { type: 'number' },
                  longitude: { type: 'number' },
                  timezone: { type: 'string' }
                },
                description: '出生地点'
              },
              output_format: {
                type: 'array',
                items: {
                  type: 'string',
                  enum: ['text', 'image']
                },
                description: '输出格式'
              }
            },
            required: ['birth_date', 'birth_time', 'location']
          }
        },
        {
          name: 'calculate_iching',
          description: '易经占卜 - 起卦并解读',
          inputSchema: {
            type: 'object',
            properties: {
              question: {
                type: 'string',
                description: '占卜问题'
              },
              method: {
                type: 'string',
                enum: ['yarrow', 'coin', 'number'],
                description: '起卦方法'
              },
              output_format: {
                type: 'array',
                items: {
                  type: 'string',
                  enum: ['text', 'image']
                },
                description: '输出格式'
              }
            },
            required: ['question']
          }
        },
        {
          name: 'interpret_dream',
          description: '解梦分析 - 解读梦境含义',
          inputSchema: {
            type: 'object',
            properties: {
              dream_text: {
                type: 'string',
                description: '梦境描述'
              },
              emotions: {
                type: 'array',
                items: { type: 'string' },
                description: '梦中情绪'
              },
              output_format: {
                type: 'array',
                items: {
                  type: 'string',
                  enum: ['text', 'image']
                },
                description: '输出格式'
              }
            },
            required: ['dream_text']
          }
        },
        {
          name: 'calculate_ziwei',
          description: '紫微斗数 - 排盘并解读',
          inputSchema: {
            type: 'object',
            properties: {
              birth_date: {
                type: 'string',
                description: '出生日期 (YYYY-MM-DD)'
              },
              birth_time: {
                type: 'string',
                description: '出生时间 (HH:MM)'
              },
              gender: {
                type: 'string',
                enum: ['male', 'female'],
                description: '性别'
              },
              output_format: {
                type: 'array',
                items: {
                  type: 'string',
                  enum: ['text', 'image']
                },
                description: '输出格式'
              }
            },
            required: ['birth_date', 'birth_time', 'gender']
          }
        },
        {
          name: 'calculate_bazi',
          description: '八字算命 - 排盘并解读',
          inputSchema: {
            type: 'object',
            properties: {
              birth_datetime: {
                type: 'string',
                description: '出生日期时间 (YYYY-MM-DD HH:MM)'
              },
              gender: {
                type: 'string',
                enum: ['male', 'female'],
                description: '性别'
              },
              output_format: {
                type: 'array',
                items: {
                  type: 'string',
                  enum: ['text', 'image']
                },
                description: '输出格式'
              }
            },
            required: ['birth_datetime']
          }
        }
      ]
    }))

    // 调用工具
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params as MCPToolCallRequest

      try {
        switch (name) {
          case 'calculate_tarot':
            return await this.handleTarotCalculation(args)
          
          case 'calculate_astrology':
            return await this.handleAstrologyCalculation(args)
          
          case 'calculate_iching':
            return await this.handleIChingCalculation(args)
          
          case 'interpret_dream':
            return await this.handleDreamInterpretation(args)
          
          case 'calculate_ziwei':
            return await this.handleZiweiCalculation(args)
          
          case 'calculate_bazi':
            return await this.handleBaziCalculation(args)
          
          default:
            throw new Error(`Unknown tool: ${name}`)
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `Error: ${error instanceof Error ? error.message : String(error)}`
            }
          ],
          isError: true
        }
      }
    })

    // 列出资源
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: 'fortune://tarot/cards',
          name: 'Tarot Cards Database',
          description: '塔罗牌数据库',
          mimeType: 'application/json'
        },
        {
          uri: 'fortune://astrology/data',
          name: 'Astrology Data',
          description: '占星数据',
          mimeType: 'application/json'
        }
      ]
    }))

    // 读取资源
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params

      if (uri === 'fortune://tarot/cards') {
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify({ cards: [] }) // 实际应该返回完整数据
            }
          ]
        }
      }

      throw new Error(`Resource not found: ${uri}`)
    })
  }

  /**
   * 处理塔罗牌占卜
   */
  private async handleTarotCalculation(args: any) {
    const { question, spread, output_format = ['text'], user_id } = args

    // 创建牌阵
    const tarotSpread = this.tarotEngine.createSpread(spread)
    
    // 解读
    const reading = this.tarotEngine.interpretReading(question, tarotSpread)
    
    // 生成商品匹配上下文
    const productContext = this.tarotEngine.generateProductContext(reading)

    // 格式化输出
    const output = this.formatOutput(reading, output_format, 'tarot')

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
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
                keywords: c.keywords
              }))
            },
            interpretation: reading.interpretation,
            summary: reading.summary,
            advice: reading.advice,
            output
          }, null, 2),
          context_for_products: productContext
        }
      ]
    }
  }

  /**
   * 处理占星计算
   */
  private async handleAstrologyCalculation(args: any) {
    const { birth_date, birth_time, location, output_format = ['text'] } = args

    // TODO: 实现占星计算引擎
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

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            type: 'astrology',
            timestamp: new Date().toISOString(),
            ...mockReading
          }, null, 2),
          context_for_products: productContext
        }
      ]
    }
  }

  /**
   * 处理易经占卜
   */
  private async handleIChingCalculation(args: any) {
    const { question, method = 'coin', output_format = ['text'] } = args

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

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            type: 'iching',
            timestamp: new Date().toISOString(),
            ...mockReading
          }, null, 2),
          context_for_products: productContext
        }
      ]
    }
  }

  /**
   * 处理解梦
   */
  private async handleDreamInterpretation(args: any) {
    const { dream_text, emotions = [], output_format = ['text'] } = args

    // TODO: 集成 SomniumSage 解梦引擎
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

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            type: 'dream',
            timestamp: new Date().toISOString(),
            ...mockReading
          }, null, 2),
          context_for_products: productContext
        }
      ]
    }
  }

  /**
   * 处理紫微斗数
   */
  private async handleZiweiCalculation(args: any) {
    const { birth_date, birth_time, gender, output_format = ['text'] } = args

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

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            type: 'ziwei',
            timestamp: new Date().toISOString(),
            ...mockReading
          }, null, 2),
          context_for_products: productContext
        }
      ]
    }
  }

  /**
   * 处理八字算命
   */
  private async handleBaziCalculation(args: any) {
    const { birth_datetime, gender, output_format = ['text'] } = args

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

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            type: 'bazi',
            timestamp: new Date().toISOString(),
            ...mockReading
          }, null, 2),
          context_for_products: productContext
        }
      ]
    }
  }

  /**
   * 格式化输出
   */
  private formatOutput(data: any, formats: string[], type: string) {
    const output: any = {}

    if (formats.includes('text')) {
      output.text = {
        markdown: this.formatAsMarkdown(data, type),
        json: JSON.stringify(data, null, 2),
        plain: this.formatAsPlainText(data, type)
      }
    }

    if (formats.includes('image')) {
      output.image = {
        url: 'https://placeholder.com/tarot-image.png',
        prompt: `Generate a tarot card visualization for ${type}`
      }
    }

    if (formats.includes('animation')) {
      output.animation = {
        duration: 3000,
        lottieJson: {}
      }
    }

    return output
  }

  /**
   * 格式化为 Markdown
   */
  private formatAsMarkdown(data: any, type: string): string {
    if (type === 'tarot') {
      return `# 塔罗占卜结果\n\n${data.interpretation}\n\n## 总结\n${data.summary}\n\n## 建议\n${data.advice}`
    }
    return JSON.stringify(data, null, 2)
  }

  /**
   * 格式化为纯文本
   */
  private formatAsPlainText(data: any, type: string): string {
    if (type === 'tarot') {
      return `塔罗占卜结果\n\n${data.interpretation}\n\n总结：${data.summary}\n\n建议：${data.advice}`
    }
    return JSON.stringify(data)
  }

  /**
   * 启动服务器
   */
  async start() {
    const transport = new StdioServerTransport()
    await this.server.connect(transport)
    console.error('Fortune-Telling MCP Server started')
  }
}

// 启动服务器
const server = new FortuneTellingMCPServer()
server.start().catch(console.error)
