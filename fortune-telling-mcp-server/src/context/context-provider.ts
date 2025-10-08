import type { ProductMatcherContext } from '../types/divination.js'

/**
 * 上下文提供器 - 为商品匹配注入占卜结果上下文
 */
export class ContextProvider {
  /**
   * 生成商品匹配上下文
   */
  static generateContext(params: {
    keywords: string[]
    sentiment: 'positive' | 'negative' | 'neutral' | 'mixed'
    elements?: string[]
    symbols?: string[]
    colors?: string[]
    themes?: string[]
  }): ProductMatcherContext {
    const {
      keywords,
      sentiment,
      elements = [],
      symbols = [],
      colors = [],
      themes = []
    } = params

    // 基于关键词推荐材质
    const materials = this.inferMaterials(keywords, elements)

    // 基于情感推荐风格
    const styles = this.inferStyles(sentiment, keywords)

    return {
      keywords: Array.from(new Set(keywords)),
      sentiment,
      elements: Array.from(new Set(elements)),
      symbols: Array.from(new Set(symbols)),
      colors: Array.from(new Set([...colors, ...this.inferColors(elements, sentiment)])),
      themes: Array.from(new Set([...themes, ...this.inferThemes(keywords)])),
      recommendations: {
        colors: Array.from(new Set([...colors, ...this.inferColors(elements, sentiment)])),
        materials: Array.from(new Set(materials)),
        themes: Array.from(new Set([...themes, ...this.inferThemes(keywords)])),
        styles: Array.from(new Set(styles))
      }
    }
  }

  /**
   * 推断颜色
   */
  private static inferColors(elements: string[], sentiment: string): string[] {
    const colors: string[] = []

    // 基于元素
    const elementColorMap: Record<string, string[]> = {
      fire: ['红色', '橙色', '金色', '黄色'],
      water: ['蓝色', '青色', '银色', '白色'],
      air: ['黄色', '白色', '浅蓝', '灰色'],
      earth: ['绿色', '棕色', '黑色', '米色'],
      wood: ['绿色', '棕色', '青色'],
      metal: ['白色', '金色', '银色', '灰色']
    }

    elements.forEach(element => {
      if (elementColorMap[element]) {
        colors.push(...elementColorMap[element])
      }
    })

    // 基于情感
    const sentimentColorMap: Record<string, string[]> = {
      positive: ['金色', '黄色', '粉色', '白色'],
      negative: ['黑色', '灰色', '深蓝', '紫色'],
      neutral: ['米色', '灰色', '白色', '棕色'],
      mixed: ['紫色', '青色', '灰色']
    }

    if (sentimentColorMap[sentiment]) {
      colors.push(...sentimentColorMap[sentiment])
    }

    return colors
  }

  /**
   * 推断材质
   */
  private static inferMaterials(keywords: string[], elements: string[]): string[] {
    const materials: string[] = []

    // 基于关键词
    const keywordMaterialMap: Record<string, string[]> = {
      力量: ['金属', '钢铁', '黑曜石'],
      智慧: ['水晶', '紫水晶', '月光石'],
      爱情: ['玫瑰金', '粉晶', '珍珠'],
      财富: ['黄金', '黄水晶', '碧玉'],
      保护: ['黑曜石', '虎眼石', '玛瑙'],
      治愈: ['玉石', '绿松石', '月光石'],
      平衡: ['白水晶', '黑白玛瑙', '天然木']
    }

    keywords.forEach(keyword => {
      for (const [key, mats] of Object.entries(keywordMaterialMap)) {
        if (keyword.includes(key)) {
          materials.push(...mats)
        }
      }
    })

    // 基于元素
    const elementMaterialMap: Record<string, string[]> = {
      fire: ['金属', '水晶', '琥珀', '红宝石'],
      water: ['珍珠', '玉石', '月光石', '海蓝宝'],
      air: ['羽毛', '玻璃', '丝绸', '银'],
      earth: ['木材', '陶瓷', '石头', '翡翠'],
      wood: ['竹', '檀木', '紫檀', '沉香'],
      metal: ['金', '银', '铜', '不锈钢']
    }

    elements.forEach(element => {
      if (elementMaterialMap[element]) {
        materials.push(...elementMaterialMap[element])
      }
    })

    return materials.length > 0 ? materials : ['水晶', '金属', '天然石']
  }

  /**
   * 推断风格
   */
  private static inferStyles(sentiment: string, keywords: string[]): string[] {
    const styles: string[] = []

    // 基于情感
    const sentimentStyleMap: Record<string, string[]> = {
      positive: ['明亮', '活力', '现代', '简约', '清新'],
      negative: ['神秘', '深沉', '复古', '哥特', '暗黑'],
      neutral: ['中性', '平衡', '自然', '禅意', '简约'],
      mixed: ['折衷', '多元', '混搭', '实验']
    }

    if (sentimentStyleMap[sentiment]) {
      styles.push(...sentimentStyleMap[sentiment])
    }

    // 基于关键词
    const keywordStyleMap: Record<string, string[]> = {
      优雅: ['优雅', '精致', '奢华'],
      力量: ['强悍', '硬朗', '工业'],
      浪漫: ['浪漫', '梦幻', '柔美'],
      神秘: ['神秘', '魔幻', '奇幻'],
      自然: ['自然', '有机', '原生'],
      现代: ['现代', '前卫', '未来']
    }

    keywords.forEach(keyword => {
      for (const [key, stylesArr] of Object.entries(keywordStyleMap)) {
        if (keyword.includes(key)) {
          styles.push(...stylesArr)
        }
      }
    })

    return styles.length > 0 ? styles : ['通用', '多功能']
  }

  /**
   * 推断主题
   */
  private static inferThemes(keywords: string[]): string[] {
    const themes: string[] = []

    const themeKeywordMap: Record<string, string[]> = {
      事业: ['事业', '工作', '职业', '成功', '成就', '目标', '晋升'],
      爱情: ['爱情', '感情', '关系', '伴侣', '恋爱', '婚姻', '缘分'],
      财富: ['财富', '金钱', '财运', '投资', '收入', '物质', '丰盛'],
      健康: ['健康', '身体', '养生', '治愈', '平衡', '能量', '活力'],
      精神: ['精神', '灵性', '觉醒', '智慧', '内在', '修行', '禅'],
      人际: ['人际', '社交', '朋友', '团队', '合作', '沟通'],
      学业: ['学业', '学习', '考试', '知识', '技能', '成长'],
      家庭: ['家庭', '家人', '亲情', '归属', '根基', '传承']
    }

    for (const [theme, themeKeywords] of Object.entries(themeKeywordMap)) {
      if (keywords.some(k => themeKeywords.some(tk => k.includes(tk)))) {
        themes.push(theme)
      }
    }

    return themes.length > 0 ? themes : ['通用', '生活']
  }

  /**
   * 合并多个上下文
   */
  static mergeContexts(contexts: ProductMatcherContext[]): ProductMatcherContext {
    if (contexts.length === 0) {
      return this.generateContext({ keywords: [], sentiment: 'neutral' })
    }

    if (contexts.length === 1) {
      return contexts[0]
    }

    const merged: ProductMatcherContext = {
      keywords: [],
      sentiment: 'neutral',
      elements: [],
      symbols: [],
      colors: [],
      themes: [],
      recommendations: {
        colors: [],
        materials: [],
        themes: [],
        styles: []
      }
    }

    // 合并所有数组字段
    contexts.forEach(ctx => {
      merged.keywords.push(...ctx.keywords)
      merged.elements.push(...ctx.elements)
      merged.symbols.push(...ctx.symbols)
      merged.colors.push(...ctx.colors)
      merged.themes.push(...ctx.themes)
      merged.recommendations.colors.push(...ctx.recommendations.colors)
      merged.recommendations.materials.push(...ctx.recommendations.materials)
      merged.recommendations.themes.push(...ctx.recommendations.themes)
      merged.recommendations.styles.push(...ctx.recommendations.styles)
    })

    // 去重
    merged.keywords = Array.from(new Set(merged.keywords))
    merged.elements = Array.from(new Set(merged.elements))
    merged.symbols = Array.from(new Set(merged.symbols))
    merged.colors = Array.from(new Set(merged.colors))
    merged.themes = Array.from(new Set(merged.themes))
    merged.recommendations.colors = Array.from(new Set(merged.recommendations.colors))
    merged.recommendations.materials = Array.from(new Set(merged.recommendations.materials))
    merged.recommendations.themes = Array.from(new Set(merged.recommendations.themes))
    merged.recommendations.styles = Array.from(new Set(merged.recommendations.styles))

    // 合并情感（简单取最常见的）
    const sentiments = contexts.map(c => c.sentiment)
    const sentimentCounts = sentiments.reduce((acc, s) => {
      acc[s] = (acc[s] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    merged.sentiment = Object.entries(sentimentCounts)
      .sort((a, b) => b[1] - a[1])[0][0] as any

    return merged
  }

  /**
   * 评估上下文相似度（用于商品匹配评分）
   */
  static calculateSimilarity(
    context1: ProductMatcherContext,
    context2: ProductMatcherContext
  ): number {
    let score = 0
    let maxScore = 0

    // 关键词相似度 (40%)
    const keywordOverlap = context1.keywords.filter(k =>
      context2.keywords.includes(k)
    ).length
    score += (keywordOverlap / Math.max(context1.keywords.length, 1)) * 40
    maxScore += 40

    // 主题相似度 (30%)
    const themeOverlap = context1.themes.filter(t =>
      context2.themes.includes(t)
    ).length
    score += (themeOverlap / Math.max(context1.themes.length, 1)) * 30
    maxScore += 30

    // 颜色相似度 (15%)
    const colorOverlap = context1.colors.filter(c =>
      context2.colors.includes(c)
    ).length
    score += (colorOverlap / Math.max(context1.colors.length, 1)) * 15
    maxScore += 15

    // 元素相似度 (15%)
    const elementOverlap = context1.elements.filter(e =>
      context2.elements.includes(e)
    ).length
    score += (elementOverlap / Math.max(context1.elements.length, 1)) * 15
    maxScore += 15

    return score / maxScore
  }
}
