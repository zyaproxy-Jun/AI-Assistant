import { IntegrationContext } from '@botpress/sdk'
import axios from 'axios'

/**
 * MCP Server 客户端
 * 负责与 Divination MCP Server 通信
 */
export class MCPClient {
  private baseUrl: string
  private apiKey?: string

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl
    this.apiKey = apiKey
  }

  /**
   * 执行占卜
   */
  async performDivination(
    type: 'dream' | 'tarot' | 'iching' | 'ziwei' | 'bazi' | 'astrology',
    parameters: any,
    language: string = 'zh-CN'
  ): Promise<any> {
    try {
      const endpoint = `${this.baseUrl}/divination/${type}`
      
      const headers: any = {
        'Content-Type': 'application/json'
      }
      
      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`
      }

      const response = await axios.post(endpoint, {
        ...parameters,
        language
      }, { headers })

      return {
        success: true,
        result: response.data,
        responseTime: response.data._meta?.responseTime || 0
      }
    } catch (error: any) {
      console.error(`MCP Client Error [${type}]:`, error.message)
      return {
        success: false,
        error: error.response?.data?.error || error.message,
        result: null
      }
    }
  }

  /**
   * 解梦
   */
  async interpretDream(
    dreamDescription: string,
    emotions: string[] = [],
    language: string = 'zh-CN'
  ) {
    return this.performDivination('dream', {
      dream_description: dreamDescription,
      emotions,
      language
    }, language)
  }

  /**
   * 塔罗牌占卜
   */
  async readTarot(
    question: string,
    spread: 'single' | 'three' | 'celtic' = 'three',
    language: string = 'zh-CN'
  ) {
    return this.performDivination('tarot', {
      question,
      spread,
      language
    }, language)
  }

  /**
   * 易经占卜
   */
  async consultIChing(
    question: string,
    method: 'coins' | 'yarrow' = 'coins',
    language: string = 'zh-CN'
  ) {
    return this.performDivination('iching', {
      question,
      method,
      language
    }, language)
  }

  /**
   * 紫微斗数
   */
  async calculateZiwei(
    birthDate: string,
    birthTime: string,
    gender: 'male' | 'female',
    birthplace: string,
    language: string = 'zh-CN'
  ) {
    return this.performDivination('ziwei', {
      birth_date: birthDate,
      birth_time: birthTime,
      gender,
      birthplace,
      language
    }, language)
  }

  /**
   * 八字
   */
  async calculateBazi(
    birthDate: string,
    birthTime: string,
    gender: 'male' | 'female',
    language: string = 'zh-CN'
  ) {
    return this.performDivination('bazi', {
      birth_date: birthDate,
      birth_time: birthTime,
      gender,
      language
    }, language)
  }

  /**
   * 西方占星
   */
  async calculateAstrology(
    birthDate: string,
    birthTime: string,
    birthplace: string,
    language: string = 'zh-CN'
  ) {
    return this.performDivination('astrology', {
      birth_date: birthDate,
      birth_time: birthTime,
      birthplace,
      language
    }, language)
  }

  /**
   * 健康检查
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/health`, {
        timeout: 5000
      })
      return response.status === 200
    } catch (error) {
      console.error('MCP Server health check failed:', error)
      return false
    }
  }
}

/**
 * 创建 MCP Client 实例
 */
export function createMCPClient(ctx: IntegrationContext): MCPClient {
  const config = ctx.configuration
  return new MCPClient(
    config.mcpServerUrl || 'http://localhost:3000',
    config.mcpApiKey
  )
}
