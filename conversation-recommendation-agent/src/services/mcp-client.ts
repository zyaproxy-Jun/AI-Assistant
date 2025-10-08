/**
 * MCP Client - 与占卜计算智能体 (Fortune-Telling MCP Server) 通信
 * 负责发起 6 种占卜请求并接收多模态结果
 */

import axios, { AxiosInstance } from 'axios';
import { DivinationType, DivinationRequest, DivinationResult } from '../types/divination';

export interface MCPClientConfig {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
}

export class MCPClient {
  private client: AxiosInstance;
  private baseUrl: string;

  constructor(config: MCPClientConfig) {
    this.baseUrl = config.baseUrl;
    
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey && { 'X-API-Key': config.apiKey })
      }
    });
  }

  /**
   * 执行占卜 - 核心方法
   * @param type 占卜类型 (6种之一)
   * @param request 占卜请求参数
   * @returns 占卜结果 (包含多模态内容)
   */
  async performDivination(
    type: DivinationType,
    request: DivinationRequest
  ): Promise<DivinationResult> {
    try {
      const endpoint = this.getEndpointForType(type);
      console.log(`[MCP Client] 发起占卜请求: ${type} -> ${endpoint}`);
      
      const response = await this.client.post(endpoint, request);
      
      // 规范化响应数据
      const result: DivinationResult = {
        type,
        timestamp: new Date().toISOString(),
        interpretation: response.data.interpretation || response.data.result || '',
        themes: response.data.themes || [],
        keywords: response.data.keywords || [],
        sentiment: response.data.sentiment || 'neutral',
        confidence: response.data.confidence || 0.85,
        multimodal: {
          text: response.data.interpretation || response.data.result || '',
          image: response.data.image || null,
          animation: response.data.animation || null,
          visualization: response.data.visualization || null
        },
        metadata: {
          requestParams: request,
          processingTime: response.data.processingTime || 0,
          model: response.data.model || 'default'
        }
      };

      console.log(`[MCP Client] 占卜成功: ${type}, 主题: ${result.themes.join(', ')}`);
      return result;
    } catch (error: any) {
      console.error(`[MCP Client] 占卜失败: ${type}`, error.message);
      throw new Error(`占卜服务错误: ${error.message}`);
    }
  }

  /**
   * 根据占卜类型获取对应的 API 端点
   */
  private getEndpointForType(type: DivinationType): string {
    const endpoints: Record<DivinationType, string> = {
      dream: '/api/v1/divination/dream',
      tarot: '/api/v1/divination/tarot',
      iching: '/api/v1/divination/iching',
      ziwei: '/api/v1/divination/ziwei',
      bazi: '/api/v1/divination/bazi',
      astrology: '/api/v1/divination/astrology'
    };
    
    return endpoints[type] || '/api/v1/divination/dream';
  }

  /**
   * 健康检查 - 验证 MCP Server 是否正常运行
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.client.get('/api/v1/health');
      return response.status === 200 && response.data.status === 'ok';
    } catch (error) {
      console.error('[MCP Client] 健康检查失败:', error);
      return false;
    }
  }

  /**
   * 批量执行占卜 (用于测试或比较)
   */
  async performBatchDivination(
    requests: Array<{ type: DivinationType; request: DivinationRequest }>
  ): Promise<DivinationResult[]> {
    const results = await Promise.all(
      requests.map(({ type, request }) => this.performDivination(type, request))
    );
    return results;
  }

  /**
   * 获取占卜历史 (如果 MCP Server 支持)
   */
  async getDivinationHistory(userId: string, limit: number = 10): Promise<DivinationResult[]> {
    try {
      const response = await this.client.get(`/api/v1/history/${userId}`, {
        params: { limit }
      });
      return response.data.history || [];
    } catch (error) {
      console.warn('[MCP Client] 获取历史失败, 返回空数组');
      return [];
    }
  }
}

/**
 * 创建 MCP 客户端实例 (工厂函数)
 */
export function createMCPClient(config: MCPClientConfig): MCPClient {
  return new MCPClient(config);
}
