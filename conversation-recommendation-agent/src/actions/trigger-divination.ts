/**
 * Trigger Divination Action - 触发占卜流程
 * 流程 1 实现: 用户点击 → 收集参数 → 调用 MCP Server → 多模态展示
 */

import { DivinationType, DivinationRequest } from '../types/divination';
import { createMCPClient } from '../services/mcp-client';
import { createMultimodalRenderer } from '../services/multimodal-renderer';

export interface TriggerDivinationInput {
  type: DivinationType;
  parameters: any;
  userId: string;
  language?: 'zh-CN' | 'en-US';
}

export interface TriggerDivinationOutput {
  success: boolean;
  messages: any[];
  divinationResult?: any;
  error?: string;
}

/**
 * 主要 Action: 执行占卜并返回多模态结果
 */
export async function triggerDivination(
  input: TriggerDivinationInput
): Promise<TriggerDivinationOutput> {
  try {
    console.log(`[Action] 触发占卜: ${input.type}, 用户: ${input.userId}`);

    // 1. 创建 MCP Client
    const mcpClient = createMCPClient({
      baseUrl: process.env.MCP_SERVER_URL || 'http://localhost:3000',
      apiKey: process.env.MCP_API_KEY,
      timeout: 30000
    });

    // 2. 构建占卜请求
    const request: DivinationRequest = {
      type: input.type,
      userId: input.userId,
      parameters: input.parameters,
      language: input.language || 'zh-CN'
    };

    // 3. 调用 MCP Server 执行占卜
    const result = await mcpClient.performDivination(input.type, request);

    // 4. 使用多模态渲染器转换结果
    const renderer = createMultimodalRenderer();
    const messages = renderer.renderDivinationResult(result);

    console.log(`[Action] 占卜完成，生成 ${messages.length} 条消息`);

    return {
      success: true,
      messages,
      divinationResult: result
    };
  } catch (error: any) {
    console.error('[Action] 占卜失败:', error);
    return {
      success: false,
      messages: [
        {
          type: 'text',
          payload: {
            text: `😔 占卜服务暂时不可用，请稍后再试。\n错误: ${error.message}`
          }
        }
      ],
      error: error.message
    };
  }
}

/**
 * 参数收集: 根据占卜类型生成参数收集表单
 */
export function getParameterCollectionForm(type: DivinationType): any {
  const forms: Record<DivinationType, any> = {
    dream: {
      title: '🌙 解梦',
      fields: [
        {
          name: 'dream_description',
          label: '请描述您的梦境',
          type: 'textarea',
          required: true,
          placeholder: '例如: 我梦见自己在飞翔...'
        },
        {
          name: 'emotions',
          label: '梦中的情绪',
          type: 'multiselect',
          options: ['快乐', '恐惧', '焦虑', '平静', '兴奋', '悲伤'],
          required: false
        }
      ]
    },
    tarot: {
      title: '🃏 塔罗牌占卜',
      fields: [
        {
          name: 'question',
          label: '您想问什么问题？',
          type: 'text',
          required: true,
          placeholder: '例如: 我的事业发展如何？'
        },
        {
          name: 'spread',
          label: '牌阵选择',
          type: 'select',
          options: [
            { value: 'single', label: '单张牌 (快速占卜)' },
            { value: 'three', label: '三张牌 (过去-现在-未来)' },
            { value: 'celtic', label: '凯尔特十字 (深度分析)' }
          ],
          required: false,
          default: 'three'
        }
      ]
    },
    iching: {
      title: '📿 易经占卜',
      fields: [
        {
          name: 'question',
          label: '您想问什么问题？',
          type: 'text',
          required: true,
          placeholder: '例如: 这个决定是否正确？'
        },
        {
          name: 'method',
          label: '起卦方式',
          type: 'select',
          options: [
            { value: 'coins', label: '铜钱起卦 (简单快速)' },
            { value: 'yarrow', label: '蓍草起卦 (传统方式)' }
          ],
          required: false,
          default: 'coins'
        }
      ]
    },
    ziwei: {
      title: '⭐ 紫微斗数',
      fields: [
        {
          name: 'birth_date',
          label: '出生日期',
          type: 'date',
          required: true
        },
        {
          name: 'birth_time',
          label: '出生时辰',
          type: 'time',
          required: true,
          help: '请尽量提供准确的出生时间'
        },
        {
          name: 'gender',
          label: '性别',
          type: 'select',
          options: [
            { value: 'male', label: '男' },
            { value: 'female', label: '女' }
          ],
          required: true
        },
        {
          name: 'birthplace',
          label: '出生地',
          type: 'location',
          required: false,
          help: '用于时区校正，可提高准确度'
        }
      ]
    },
    bazi: {
      title: '🎋 八字算命',
      fields: [
        {
          name: 'birth_date',
          label: '出生日期',
          type: 'date',
          required: true
        },
        {
          name: 'birth_time',
          label: '出生时辰',
          type: 'time',
          required: true
        },
        {
          name: 'gender',
          label: '性别',
          type: 'select',
          options: [
            { value: 'male', label: '男' },
            { value: 'female', label: '女' }
          ],
          required: true
        }
      ]
    },
    astrology: {
      title: '🌌 星座运势',
      fields: [
        {
          name: 'birth_date',
          label: '出生日期',
          type: 'date',
          required: true
        },
        {
          name: 'birth_time',
          label: '出生时间 (可选)',
          type: 'time',
          required: false,
          help: '提供出生时间可生成完整星盘'
        },
        {
          name: 'birthplace',
          label: '出生地 (可选)',
          type: 'location',
          required: false
        }
      ]
    }
  };

  return forms[type] || forms.dream;
}

/**
 * 验证参数是否完整
 */
export function validateParameters(type: DivinationType, parameters: any): {
  valid: boolean;
  missingFields?: string[];
  errors?: string[];
} {
  const form = getParameterCollectionForm(type);
  const missingFields: string[] = [];
  const errors: string[] = [];

  // 检查必填字段
  for (const field of form.fields) {
    if (field.required && !parameters[field.name]) {
      missingFields.push(field.label);
    }
  }

  // 特定验证
  if (type === 'ziwei' || type === 'bazi') {
    if (parameters.birth_date && !isValidDate(parameters.birth_date)) {
      errors.push('出生日期格式不正确');
    }
    if (parameters.birth_time && !isValidTime(parameters.birth_time)) {
      errors.push('出生时间格式不正确');
    }
  }

  return {
    valid: missingFields.length === 0 && errors.length === 0,
    missingFields: missingFields.length > 0 ? missingFields : undefined,
    errors: errors.length > 0 ? errors : undefined
  };
}

/**
 * 辅助函数: 验证日期格式
 */
function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

/**
 * 辅助函数: 验证时间格式
 */
function isValidTime(timeString: string): boolean {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(timeString);
}
