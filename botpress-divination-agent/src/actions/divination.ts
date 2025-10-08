import { IntegrationContext } from '@botpress/sdk'
import { createMCPClient } from '../services/mcp-client'
import { DivinationType } from '../types'

/**
 * 占卜动作处理器
 */

/**
 * 执行占卜
 */
export async function performDivination(
  ctx: IntegrationContext,
  input: {
    divinationType: DivinationType
    parameters: any
    language?: string
  }
) {
  const { divinationType, parameters, language = 'zh-CN' } = input
  
  try {
    const mcpClient = createMCPClient(ctx)
    
    // 检查 MCP Server 健康状态
    const isHealthy = await mcpClient.healthCheck()
    if (!isHealthy) {
      return {
        success: false,
        error: 'MCP Server 不可用，请稍后重试',
        result: null
      }
    }

    // 根据占卜类型调用对应的方法
    let result
    switch (divinationType) {
      case 'dream':
        result = await mcpClient.interpretDream(
          parameters.dream_description,
          parameters.emotions || [],
          language
        )
        break
      
      case 'tarot':
        result = await mcpClient.readTarot(
          parameters.question,
          parameters.spread || 'three',
          language
        )
        break
      
      case 'iching':
        result = await mcpClient.consultIChing(
          parameters.question,
          parameters.method || 'coins',
          language
        )
        break
      
      case 'ziwei':
        result = await mcpClient.calculateZiwei(
          parameters.birth_date,
          parameters.birth_time,
          parameters.gender,
          parameters.birthplace,
          language
        )
        break
      
      case 'bazi':
        result = await mcpClient.calculateBazi(
          parameters.birth_date,
          parameters.birth_time,
          parameters.gender,
          language
        )
        break
      
      case 'astrology':
        result = await mcpClient.calculateAstrology(
          parameters.birth_date,
          parameters.birth_time,
          parameters.birthplace,
          language
        )
        break
      
      default:
        return {
          success: false,
          error: `不支持的占卜类型: ${divinationType}`,
          result: null
        }
    }

    // 占卜完成 - 记录到日志
    if (result.success) {
      console.log('Divination completed:', {
        divinationType,
        timestamp: new Date().toISOString(),
        success: true
      })
    }

    return result
  } catch (error: any) {
    console.error('Divination action error:', error)
    return {
      success: false,
      error: error.message || '占卜执行失败',
      result: null
    }
  }
}

/**
 * 格式化占卜结果为友好的展示文本
 */
export function formatDivinationResult(
  divinationType: DivinationType,
  result: any,
  language: string = 'zh-CN'
): string {
  if (!result) return '占卜结果为空'

  let formatted = ''

  switch (divinationType) {
    case 'dream':
      formatted = formatDreamResult(result, language)
      break
    case 'tarot':
      formatted = formatTarotResult(result, language)
      break
    case 'iching':
      formatted = formatIChingResult(result, language)
      break
    case 'ziwei':
      formatted = formatZiweiResult(result, language)
      break
    case 'bazi':
      formatted = formatBaziResult(result, language)
      break
    case 'astrology':
      formatted = formatAstrologyResult(result, language)
      break
  }

  return formatted
}

function formatDreamResult(result: any, language: string): string {
  let text = '🌙 **解梦结果**\n\n'
  
  if (result.sentiment) {
    const sentimentEmoji = result.sentiment.tone === 'POSITIVE' ? '😊' : 
                          result.sentiment.tone === 'NEGATIVE' ? '😔' : '😐'
    text += `${sentimentEmoji} **情感分析**\n`
    text += `基调: ${result.sentiment.tone}\n`
    text += `置信度: ${result.sentiment.confidence}%\n`
    text += `${result.sentiment.description}\n\n`
  }

  if (result.symbols && result.symbols.length > 0) {
    text += `🔮 **识别符号** (${result.symbols.length}个)\n`
    result.symbols.forEach((symbol: any) => {
      text += `• ${symbol.name || symbol.symbol}: ${symbol.meaning}\n`
    })
    text += '\n'
  }

  if (result.interpretation) {
    text += `📖 **解析内容**\n${result.interpretation}\n\n`
  }

  if (result.insights && result.insights.length > 0) {
    text += `💡 **深层洞察**\n`
    result.insights.forEach((insight: string) => {
      text += `• ${insight}\n`
    })
  }

  return text
}

function formatTarotResult(result: any, language: string): string {
  let text = '🃏 **塔罗占卜结果**\n\n'
  
  if (result.question) {
    text += `❓ **您的问题**: ${result.question}\n\n`
  }

  if (result.cards && result.cards.length > 0) {
    text += `**抽取的牌**:\n`
    result.cards.forEach((card: any, index: number) => {
      text += `\n${index + 1}. ${card.name}\n`
      text += `   位置: ${card.position || '正位'}\n`
      text += `   含义: ${card.meaning}\n`
    })
    text += '\n'
  }

  if (result.interpretation) {
    text += `📖 **综合解读**\n${result.interpretation}\n\n`
  }

  if (result.advice) {
    text += `💭 **建议**\n${result.advice}`
  }

  return text
}

function formatIChingResult(result: any, language: string): string {
  let text = '📿 **易经占卜结果**\n\n'
  
  if (result.hexagram) {
    text += `**本卦**: ${result.hexagram.name} (${result.hexagram.number})\n`
    text += `卦象: ${result.hexagram.symbol}\n\n`
  }

  if (result.interpretation) {
    text += `📖 **卦辞解读**\n${result.interpretation}\n\n`
  }

  if (result.changing_lines && result.changing_lines.length > 0) {
    text += `**变爻**: ${result.changing_lines.join(', ')}\n\n`
  }

  if (result.advice) {
    text += `💭 **指引**\n${result.advice}`
  }

  return text
}

function formatZiweiResult(result: any, language: string): string {
  let text = '⭐ **紫微斗数结果**\n\n'
  
  if (result.life_palace) {
    text += `**命宫**: ${result.life_palace.palace}\n`
    text += `主星: ${result.life_palace.stars.join(', ')}\n\n`
  }

  if (result.interpretation) {
    text += `📖 **命盘解读**\n${result.interpretation}\n\n`
  }

  if (result.fortune_analysis) {
    text += `🔮 **运势分析**\n${result.fortune_analysis}\n\n`
  }

  if (result.advice) {
    text += `💭 **建议**\n${result.advice}`
  }

  return text
}

function formatBaziResult(result: any, language: string): string {
  let text = '🎋 **八字命理结果**\n\n'
  
  if (result.four_pillars) {
    text += `**四柱**:\n`
    text += `年柱: ${result.four_pillars.year}\n`
    text += `月柱: ${result.four_pillars.month}\n`
    text += `日柱: ${result.four_pillars.day}\n`
    text += `时柱: ${result.four_pillars.hour}\n\n`
  }

  if (result.five_elements) {
    text += `**五行**: ${JSON.stringify(result.five_elements)}\n\n`
  }

  if (result.interpretation) {
    text += `📖 **命理解读**\n${result.interpretation}\n\n`
  }

  if (result.advice) {
    text += `💭 **建议**\n${result.advice}`
  }

  return text
}

function formatAstrologyResult(result: any, language: string): string {
  let text = '🌌 **西方占星结果**\n\n'
  
  if (result.sun_sign) {
    text += `☀️ **太阳星座**: ${result.sun_sign}\n`
  }
  
  if (result.moon_sign) {
    text += `🌙 **月亮星座**: ${result.moon_sign}\n`
  }
  
  if (result.rising_sign) {
    text += `⬆️ **上升星座**: ${result.rising_sign}\n\n`
  }

  if (result.planets && result.planets.length > 0) {
    text += `**行星位置**:\n`
    result.planets.forEach((planet: any) => {
      text += `${planet.name}: ${planet.sign} ${planet.house}宫\n`
    })
    text += '\n'
  }

  if (result.interpretation) {
    text += `📖 **星盘解读**\n${result.interpretation}\n\n`
  }

  if (result.advice) {
    text += `💭 **建议**\n${result.advice}`
  }

  return text
}
