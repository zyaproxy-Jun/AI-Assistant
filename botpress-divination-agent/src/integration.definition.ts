import { IntegrationDefinition } from '@botpress/sdk'
import { z } from 'zod'

export default new IntegrationDefinition({
  name: 'ether-divination-agent',
  version: '0.2.0',
  title: 'Ether AI Assistant - 占卜导购智能体',
  description: '集成 MCP Server 的多模态占卜与商品推荐智能体',
  icon: 'icon.svg',
  readme: 'README.md',
  
  configuration: {
    schema: z.object({
      mcpServerUrl: z.string().default('http://localhost:3000').describe('MCP Server API 地址'),
      mcpApiKey: z.string().optional().default('').describe('MCP Server API 密钥 (可选)'),
      productDbUrl: z.string().optional().default('').describe('商品数据库 API 地址'),
      productDbApiKey: z.string().optional().default('').describe('商品数据库 API 密钥'),
      enableImageGeneration: z.boolean().default(true).describe('是否启用占卜结果图像生成'),
      imageServiceUrl: z.string().optional().default('').describe('图像生成服务 URL (可选)'),
      defaultLanguage: z.enum(['zh-CN', 'en-US']).default('zh-CN').describe('默认语言')
    })
  },

  channels: {
    channel: {
      messages: {
        text: {
          schema: z.object({
            text: z.string()
          })
        },
        image: {
          schema: z.object({
            imageUrl: z.string(),
            title: z.string()
          })
        },
        card: {
          schema: z.object({
            title: z.string(),
            subtitle: z.string(),
            imageUrl: z.string(),
            actions: z.array(z.object({
              label: z.string(),
              action: z.string(),
              value: z.string()
            }))
          })
        },
        carousel: {
          schema: z.object({
            items: z.array(z.object({
              title: z.string(),
              subtitle: z.string(),
              imageUrl: z.string(),
              actions: z.array(z.any())
            }))
          })
        }
      }
    }
  },

  actions: {
    // 占卜动作
    performDivination: {
      title: 'Perform Divination',
      description: '执行占卜并返回结果',
      input: {
        schema: z.object({
          divinationType: z.enum(['dream', 'tarot', 'iching', 'ziwei', 'bazi', 'astrology']).describe('占卜类型'),
          parameters: z.record(z.any()).describe('占卜参数 (根据不同占卜类型而定)'),
          language: z.enum(['zh-CN', 'en-US']).default('zh-CN')
        })
      },
      output: {
        schema: z.object({
          success: z.boolean(),
          result: z.record(z.any()).optional(),
          error: z.string().optional()
        })
      }
    },

    // 商品推荐动作
    recommendProducts: {
      title: 'Recommend Products',
      description: '基于占卜结果推荐商品',
      input: {
        schema: z.object({
          divinationResult: z.record(z.any()).describe('占卜结果'),
          maxProducts: z.number().default(3).describe('最多推荐商品数量')
        })
      },
      output: {
        schema: z.object({
          products: z.array(z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
            price: z.number(),
            currency: z.string(),
            imageUrl: z.string(),
            matchScore: z.number()
          }))
        })
      }
    },

    // 生成占卜图像
    generateDivinationImage: {
      title: 'Generate Divination Image',
      description: '生成占卜结果的可视化图像',
      input: {
        schema: z.object({
          divinationType: z.string(),
          result: z.record(z.any())
        })
      },
      output: {
        schema: z.object({
          imageUrl: z.string(),
          thumbnailUrl: z.string()
        })
      }
    }
  },

  events: {
    divinationCompleted: {
      title: 'Divination Completed',
      description: '占卜完成事件',
      schema: z.object({
        userId: z.string(),
        divinationType: z.string(),
        timestamp: z.string(),
        result: z.record(z.any())
      })
    },
    productViewed: {
      title: 'Product Viewed',
      description: '用户查看商品事件',
      schema: z.object({
        userId: z.string(),
        productId: z.string(),
        timestamp: z.string()
      })
    },
    productPurchased: {
      title: 'Product Purchased',
      description: '用户购买商品事件',
      schema: z.object({
        userId: z.string(),
        productId: z.string(),
        amount: z.number(),
        timestamp: z.string()
      })
    }
  },

  states: {
    conversation: {
      type: 'conversation',
      schema: z.object({
        currentFlow: z.string().optional(),
        selectedDivinationType: z.string().optional(),
        collectedData: z.record(z.any()).optional(),
        lastDivinationResult: z.record(z.any()).optional(),
        recommendedProducts: z.array(z.any()).optional(),
        conversationHistory: z.array(z.any()).optional()
      })
    },
    user: {
      type: 'user',
      schema: z.object({
        preferredLanguage: z.string().optional(),
        divinationHistory: z.array(z.any()).optional(),
        purchaseHistory: z.array(z.any()).optional(),
        favoriteProducts: z.array(z.any()).optional(),
        userProfile: z.record(z.any()).optional()
      })
    }
  }
})
