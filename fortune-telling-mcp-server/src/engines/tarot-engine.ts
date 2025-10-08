import type { TarotCard, TarotSpread, TarotReading, ProductMatcherContext } from '../types/divination.js'

// 78 张塔罗牌数据（简化版，实际应该从 JSON 文件加载）
const MAJOR_ARCANA: Omit<TarotCard, 'position'>[] = [
  {
    id: '0',
    name: '愚者',
    nameEn: 'The Fool',
    arcana: 'major',
    number: 0,
    meanings: {
      upright: ['新开始', '冒险精神', '自由', '天真', '潜力'],
      reversed: ['鲁莽', '冒险', '愚蠢', '风险', '不成熟']
    },
    keywords: ['开始', '旅程', '冒险', '自由', '纯真'],
    elements: ['air'],
    symbols: ['白玫瑰', '小狗', '悬崖', '太阳']
  },
  {
    id: '1',
    name: '魔术师',
    nameEn: 'The Magician',
    arcana: 'major',
    number: 1,
    meanings: {
      upright: ['创造力', '力量', '技能', '行动', '显化'],
      reversed: ['操纵', '欺骗', '技能浪费', '缺乏计划']
    },
    keywords: ['创造', '力量', '技能', '显化', '行动'],
    elements: ['air', 'fire'],
    symbols: ['无限符号', '蛇', '四元素']
  }
  // ... 更多牌
]

export class TarotEngine {
  private cards: Omit<TarotCard, 'position'>[]

  constructor() {
    this.cards = MAJOR_ARCANA
  }

  /**
   * 抽取塔罗牌
   */
  drawCards(count: number): TarotCard[] {
    const shuffled = this.shuffleCards()
    return shuffled.slice(0, count).map(card => ({
      ...card,
      position: Math.random() > 0.5 ? 'upright' : 'reversed'
    }))
  }

  /**
   * 洗牌
   */
  private shuffleCards(): Omit<TarotCard, 'position'>[] {
    const cards = [...this.cards]
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[cards[i], cards[j]] = [cards[j], cards[i]]
    }
    return cards
  }

  /**
   * 创建牌阵
   */
  createSpread(type: 'single' | 'three_card' | 'celtic_cross'): TarotSpread {
    const spreadConfigs = {
      single: {
        count: 1,
        positions: ['当前情况']
      },
      three_card: {
        count: 3,
        positions: ['过去', '现在', '未来']
      },
      celtic_cross: {
        count: 10,
        positions: [
          '当前状况',
          '挑战/障碍',
          '根源',
          '过去',
          '可能性',
          '近期未来',
          '自我认知',
          '环境影响',
          '希望/恐惧',
          '最终结果'
        ]
      }
    }

    const config = spreadConfigs[type]
    const cards = this.drawCards(config.count)

    return {
      type,
      cards,
      positions: config.positions
    }
  }

  /**
   * 解读塔罗牌
   */
  interpretReading(question: string, spread: TarotSpread): TarotReading {
    const cards = spread.cards
    const interpretations: string[] = []

    // 解读每张牌
    cards.forEach((card, index) => {
      const position = spread.positions[index]
      const meaning = card.position === 'upright' 
        ? card.meanings.upright[0] 
        : card.meanings.reversed[0]
      
      interpretations.push(
        `**${position}**: ${card.name} (${card.position === 'upright' ? '正位' : '逆位'})\n` +
        `含义: ${meaning}\n` +
        `关键词: ${card.keywords.join(', ')}`
      )
    })

    // 综合解读
    const interpretation = interpretations.join('\n\n')
    
    // 生成总结
    const summary = this.generateSummary(cards)
    
    // 生成建议
    const advice = this.generateAdvice(cards, question)

    return {
      question,
      spread,
      interpretation,
      summary,
      advice
    }
  }

  /**
   * 生成总结
   */
  private generateSummary(cards: TarotCard[]): string {
    const uprightCount = cards.filter(c => c.position === 'upright').length
    const reversedCount = cards.length - uprightCount

    let summary = `本次塔罗占卜共抽取 ${cards.length} 张牌，`
    summary += `其中正位 ${uprightCount} 张，逆位 ${reversedCount} 张。`

    if (uprightCount > reversedCount) {
      summary += '整体能量偏向积极正面，显示情况朝着有利的方向发展。'
    } else if (reversedCount > uprightCount) {
      summary += '逆位牌较多，提醒您需要注意潜在的挑战和障碍。'
    } else {
      summary += '正逆位平衡，显示局面处于转折点。'
    }

    return summary
  }

  /**
   * 生成建议
   */
  private generateAdvice(cards: TarotCard[], question: string): string {
    const elements = new Set(cards.flatMap(c => c.elements))
    const keywords = cards.flatMap(c => c.keywords)

    let advice = '根据塔罗牌的指引：\n\n'

    if (elements.has('fire')) {
      advice += '- 保持热情和行动力，积极主动地追求目标\n'
    }
    if (elements.has('water')) {
      advice += '- 关注内心情感，倾听直觉的声音\n'
    }
    if (elements.has('air')) {
      advice += '- 运用智慧和理性思考，做出明智决策\n'
    }
    if (elements.has('earth')) {
      advice += '- 脚踏实地，注重实际和物质基础\n'
    }

    advice += '\n记住：塔罗牌是一面镜子，反映的是能量趋势。最终的选择权在你手中。'

    return advice
  }

  /**
   * 生成商品匹配上下文
   */
  generateProductContext(reading: TarotReading): ProductMatcherContext {
    const cards = reading.spread.cards
    const allKeywords = cards.flatMap(c => c.keywords)
    const allElements = cards.flatMap(c => c.elements)
    const allSymbols = cards.flatMap(c => c.symbols)

    // 情感基调
    const uprightCount = cards.filter(c => c.position === 'upright').length
    const sentiment = uprightCount > cards.length / 2 ? 'positive' : 
                     uprightCount < cards.length / 2 ? 'negative' : 'neutral'

    // 颜色推荐
    const colors = this.mapElementsToColors(allElements)

    // 主题推荐
    const themes = this.extractThemes(allKeywords)

    // 材质推荐
    const materials = this.mapElementsToMaterials(allElements)

    // 风格推荐
    const styles = this.mapSentimentToStyles(sentiment)

    return {
      keywords: Array.from(new Set(allKeywords)),
      sentiment,
      elements: Array.from(new Set(allElements)),
      symbols: Array.from(new Set(allSymbols)),
      colors: Array.from(new Set(colors)),
      themes: Array.from(new Set(themes)),
      recommendations: {
        colors: Array.from(new Set(colors)),
        materials: Array.from(new Set(materials)),
        themes: Array.from(new Set(themes)),
        styles: Array.from(new Set(styles))
      }
    }
  }

  /**
   * 元素到颜色的映射
   */
  private mapElementsToColors(elements: string[]): string[] {
    const colorMap: Record<string, string[]> = {
      fire: ['红色', '橙色', '金色'],
      water: ['蓝色', '青色', '银色'],
      air: ['黄色', '白色', '浅蓝'],
      earth: ['绿色', '棕色', '黑色']
    }

    return elements.flatMap(e => colorMap[e] || [])
  }

  /**
   * 元素到材质的映射
   */
  private mapElementsToMaterials(elements: string[]): string[] {
    const materialMap: Record<string, string[]> = {
      fire: ['金属', '水晶', '琥珀'],
      water: ['珍珠', '玉石', '月光石'],
      air: ['羽毛', '玻璃', '丝绸'],
      earth: ['木材', '陶瓷', '石头']
    }

    return elements.flatMap(e => materialMap[e] || [])
  }

  /**
   * 提取主题
   */
  private extractThemes(keywords: string[]): string[] {
    const themeKeywords: Record<string, string[]> = {
      '事业': ['力量', '成功', '创造', '行动', '目标'],
      '爱情': ['感情', '关系', '爱', '伴侣', '连接'],
      '财富': ['金钱', '物质', '丰盛', '收获', '稳定'],
      '健康': ['平衡', '治愈', '能量', '休息', '活力'],
      '精神': ['智慧', '直觉', '觉醒', '内在', '真理']
    }

    const themes: string[] = []
    for (const [theme, words] of Object.entries(themeKeywords)) {
      if (keywords.some(k => words.includes(k))) {
        themes.push(theme)
      }
    }

    return themes.length > 0 ? themes : ['通用']
  }

  /**
   * 情感到风格的映射
   */
  private mapSentimentToStyles(sentiment: string): string[] {
    const styleMap: Record<string, string[]> = {
      positive: ['明亮', '活力', '现代', '简约'],
      negative: ['神秘', '深沉', '复古', '哥特'],
      neutral: ['中性', '平衡', '自然', '禅意']
    }

    return styleMap[sentiment] || ['通用']
  }
}
