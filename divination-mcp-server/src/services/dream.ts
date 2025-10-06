/**
 * Dream Interpretation Service (Enhanced)
 * 
 * Inspired by: https://github.com/zyaproxy-Jun/dream-interpretation
 * - Professional prompt engineering for structured dream analysis
 * - Multi-dimensional interpretation framework (Symbols, Culture, Psychology, Reality)
 * - Locale-aware cultural adaptation for 10+ languages
 * - Five-part structured output (Overview, Symbols, Emotions, Meanings, Reflections)
 * 
 * MCP Enhancements:
 * - Rule-based fallback mechanism for offline operation
 * - Symbol database with 30+ common dream symbols
 * - Extended parameter support (emotions, recurring dreams)
 * - Bilingual support with cultural sensitivity
 * 
 * @see https://dream-interpretation.ai
 * @author Original prompt by zyaproxy-Jun, MCP adaptation
 */

import OpenAI from 'openai';

export class DreamService {
  private openai: OpenAI | null = null;

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
  }

  async interpret(
    dreamDescription: string,
    emotions?: string[],
    recurring: boolean = false,
    language: string = 'zh-CN'
  ) {
    try {
      let interpretation: string;

      if (this.openai) {
        // Use AI for interpretation
        interpretation = await this.aiInterpretation(
          dreamDescription,
          emotions,
          recurring,
          language
        );
      } else {
        // Fallback to rule-based interpretation
        interpretation = this.ruleBasedInterpretation(
          dreamDescription,
          emotions,
          recurring,
          language
        );
      }

      return {
        dream: dreamDescription,
        emotions: emotions || [],
        recurring,
        interpretation,
        symbols: this.extractSymbols(dreamDescription, language),
        psychological_insights: this.getPsychologicalInsights(dreamDescription, language),
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error(`梦境解析失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * AI-powered interpretation using official dream-interpretation prompt system
   * 
   * Based on: https://github.com/zyaproxy-Jun/dream-interpretation
   * Implements the 10-step professional dream analysis framework
   */
  private async aiInterpretation(
    dream: string,
    emotions?: string[],
    recurring: boolean = false,
    language: string = 'zh-CN'
  ): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI API not configured');
    }

    // Map language codes to locale identifiers
    const localeMap: { [key: string]: string } = {
      'zh-CN': 'zh-CN',
      'zh-TW': 'zh-TW',
      'zh': 'zh-CN',
      'tw': 'zh-TW',
      'en': 'en',
      'ja': 'ja',
      'ko': 'ko',
      'pt': 'pt',
      'es': 'es',
      'de': 'de',
      'fr': 'fr',
    };

    const locale = localeMap[language] || 'en';

    // Build context with XML tags (official format)
    let dreamContent = `<dream_content>\n${dream}\n</dream_content>`;
    
    if (emotions && emotions.length > 0) {
      dreamContent += `\n\n<emotions>${emotions.join(', ')}</emotions>`;
    }
    
    if (recurring) {
      dreamContent += `\n\n<recurring>This is a recurring dream that appears repeatedly.</recurring>`;
    }

    // Official system prompt from dream-interpretation project
    // Source: /app/api/interpret/route.ts
    const systemPrompt = `You are a professional dream interpreter tasked with providing a comprehensive and insightful interpretation of a user's dream. Your analysis should be based on the dream content provided and tailored to the user's specified locale. Follow these instructions carefully to deliver a professional yet engaging dream analysis:

1. Read the following dream content:
${dreamContent}

2. Note the user's locale:
<locale>${locale}</locale>

3. Analyze the dream using this approach:
   a. Identify key symbols, characters, emotions, and events in the dream.
   b. Consider the cultural context based on the user's locale.
   c. Explore possible psychological interpretations.
   d. Look for connections between the dream elements and the dreamer's potential waking life.

4. Adapt your language and tone to the specified locale, using appropriate idioms, expressions, and cultural references when applicable.

5. Structure your interpretation as follows:
   a. Begin with a brief introduction acknowledging the dream's uniqueness.
   b. Provide a general overview of the dream's main themes.
   c. Analyze specific elements of the dream in detail.
   d. Offer potential meanings and connections to the dreamer's life.
   e. Conclude with a summary and any advice or insights for the dreamer to consider.

6. Ensure your interpretation is professional and insightful, but avoid being overly mechanical or clinical in your language.

7. If the dream content contains sensitive or disturbing elements, address them tactfully and provide a balanced interpretation.

8. Remind the dreamer that dream interpretations are subjective and that they should reflect on how the interpretation resonates with their personal experiences.

9. Present your complete dream interpretation within <dream_interpretation> tags. Use appropriate subheadings to organize your analysis, such as "Overview," "Key Symbols," "Emotional Landscape," "Potential Meanings," and "Reflection Points."

10. Ensure that your entire response, including the interpretation, is in the language corresponding to the specified locale.

Begin your interpretation now, following the structure and guidelines provided above.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2500,
      });

      let response = completion.choices[0]?.message?.content || '无法生成解析';

      // Extract content from <dream_interpretation> tags if present
      const match = response.match(/<dream_interpretation>([\s\S]*)<\/dream_interpretation>/);
      if (match) {
        response = match[1].trim();
      }

      return response;
    } catch (error) {
      console.error('AI interpretation error:', error);
      // Fallback to rule-based
      return this.ruleBasedInterpretation(dream, emotions, recurring, language);
    }
  }

  /**
   * Rule-based interpretation (fallback mechanism)
   * Enhanced with official structure: Overview, Symbols, Emotions, Meanings, Reflections
   */
  private ruleBasedInterpretation(
    dream: string,
    emotions?: string[],
    recurring: boolean = false,
    language: string = 'zh-CN'
  ): string {
    const isChinese = language.startsWith('zh');
    const symbols = this.extractSymbols(dream, language);
    
    let interpretation = isChinese ? '# 梦境解析\n\n' : '# Dream Interpretation\n\n';

    // 1. Overview (概述)
    interpretation += isChinese ? '## 概述 Overview\n\n' : '## Overview\n\n';
    interpretation += isChinese 
      ? `您的梦境包含了丰富的象征意义。`
      : `Your dream contains rich symbolic meanings.`;
    
    if (recurring) {
      interpretation += isChinese
        ? '这是一个重复出现的梦境，可能表示潜意识中有未解决的议题需要关注。\n\n'
        : ' This is a recurring dream, which may indicate unresolved issues in your subconscious that need attention.\n\n';
    } else {
      interpretation += '\n\n';
    }

    // 2. Key Symbols (关键符号)
    interpretation += isChinese ? '## 关键符号 Key Symbols\n\n' : '## Key Symbols\n\n';
    if (symbols.length > 0) {
      symbols.forEach(symbol => {
        interpretation += `- **${symbol.symbol}**: ${symbol.meaning}\n`;
      });
    } else {
      interpretation += isChinese
        ? '梦境中的元素反映了您当前的生活状态和内心世界。\n'
        : 'The elements in your dream reflect your current life situation and inner world.\n';
    }
    interpretation += '\n';

    // 3. Emotional Landscape (情绪地景)
    interpretation += isChinese ? '## 情绪地景 Emotional Landscape\n\n' : '## Emotional Landscape\n\n';
    if (emotions && emotions.length > 0) {
      interpretation += isChinese
        ? `梦中体验到的情绪：${emotions.join('、')}\n\n`
        : `Emotions experienced in the dream: ${emotions.join(', ')}\n\n`;
      interpretation += isChinese
        ? '这些情绪可能反映了您在现实生活中的感受，或是潜意识中被压抑的情感。\n\n'
        : 'These emotions may reflect your feelings in waking life or suppressed emotions in your subconscious.\n\n';
    } else {
      interpretation += isChinese
        ? '注意梦中的情绪体验，它们往往是理解梦境的重要线索。\n\n'
        : 'Pay attention to the emotional experiences in your dream, as they are often important clues to understanding it.\n\n';
    }

    // 4. Potential Meanings (潜在意义)
    interpretation += isChinese ? '## 潜在意义 Potential Meanings\n\n' : '## Potential Meanings\n\n';
    interpretation += this.getPsychologicalInsights(dream, language);
    interpretation += '\n';

    // 5. Reflection Points (反思要点)
    interpretation += isChinese ? '## 反思要点 Reflection Points\n\n' : '## Reflection Points\n\n';
    interpretation += isChinese
      ? `1. 记录梦境细节有助于理解潜意识信息\n`
      : `1. Recording dream details helps understand subconscious messages\n`;
    interpretation += isChinese
      ? `2. 关注梦中的情绪反应和身体感受\n`
      : `2. Pay attention to emotional reactions and physical sensations in the dream\n`;
    interpretation += isChinese
      ? `3. 思考梦境与现实生活的联系\n`
      : `3. Reflect on connections between the dream and your waking life\n`;
    interpretation += isChinese
      ? `4. 梦境解释是主观的，应结合个人经验来理解\n`
      : `4. Dream interpretation is subjective and should be understood in the context of personal experiences\n`;

    return interpretation;
  }

  /**
   * Extract common dream symbols with cultural awareness
   * Enhanced database: 30+ symbols from various cultural traditions
   */
  private extractSymbols(dream: string, language: string = 'zh-CN'): Array<{ symbol: string; meaning: string }> {
    const isChinese = language.startsWith('zh');
    
    // Comprehensive symbol database (Chinese + English)
    const symbolDatabase: { [key: string]: { zh: string; en: string } } = {
      // Natural elements (自然元素)
      '水': { zh: '情感、潜意识、生命能量、流动性', en: 'Emotions, subconscious, life energy, fluidity' },
      'water': { zh: '情感、潜意识、生命能量', en: 'Emotions, subconscious, life energy' },
      '火': { zh: '激情、转化、破坏或重生、能量', en: 'Passion, transformation, destruction or rebirth, energy' },
      'fire': { zh: '激情、转化、破坏或重生', en: 'Passion, transformation, destruction or rebirth' },
      '风': { zh: '变化、思想、灵性、自由', en: 'Change, thoughts, spirituality, freedom' },
      'wind': { zh: '变化、思想、灵性', en: 'Change, thoughts, spirituality' },
      '海': { zh: '无意识的深处、情感的广阔、生命起源', en: 'Depths of unconscious, vastness of emotions, origin of life' },
      'sea|ocean': { zh: '无意识的深处、情感的广阔', en: 'Depths of unconscious, vastness of emotions' },
      '山': { zh: '挑战、目标、稳定、智慧', en: 'Challenges, goals, stability, wisdom' },
      'mountain': { zh: '挑战、目标、稳定', en: 'Challenges, goals, stability' },
      
      // Actions (行为动作)
      '飞': { zh: '自由、超越、灵性追求、摆脱束缚', en: 'Freedom, transcendence, spiritual pursuit, breaking free' },
      'fly|flying': { zh: '自由、超越、灵性追求', en: 'Freedom, transcendence, spiritual pursuit' },
      '掉落|坠落': { zh: '失控、不安全感、恐惧、地位下降', en: 'Loss of control, insecurity, fear, falling status' },
      'fall|falling': { zh: '失控、不安全感、恐惧', en: 'Loss of control, insecurity, fear' },
      '追赶|追': { zh: '逃避、压力、未解决的问题、焦虑', en: 'Avoidance, pressure, unresolved issues, anxiety' },
      'chase|chasing': { zh: '逃避、压力、未解决的问题', en: 'Avoidance, pressure, unresolved issues' },
      '跑|奔跑': { zh: '逃避或追求、紧迫感、生活节奏', en: 'Escape or pursuit, urgency, pace of life' },
      'run|running': { zh: '逃避或追求、紧迫感', en: 'Escape or pursuit, urgency' },
      '迷路': { zh: '困惑、缺乏方向、人生选择的迷茫', en: 'Confusion, lack of direction, uncertainty in life choices' },
      'lost|lose': { zh: '困惑、缺乏方向、迷茫', en: 'Confusion, lack of direction, bewilderment' },
      
      // Places (场所)
      '房子|房屋|家': { zh: '自我、身份、内在世界、安全感', en: 'Self, identity, inner world, sense of security' },
      'house|home': { zh: '自我、身份、内在世界', en: 'Self, identity, inner world' },
      '学校': { zh: '学习、成长、社交压力、过往经历', en: 'Learning, growth, social pressure, past experiences' },
      'school': { zh: '学习、成长、社交压力', en: 'Learning, growth, social pressure' },
      '医院': { zh: '疗愈、脆弱、健康关注、心理问题', en: 'Healing, vulnerability, health concerns, psychological issues' },
      'hospital': { zh: '疗愈、脆弱、健康关注', en: 'Healing, vulnerability, health concerns' },
      '道路|路': { zh: '人生方向、选择、旅程、未来', en: 'Life direction, choices, journey, future' },
      'road|path': { zh: '人生方向、选择、旅程', en: 'Life direction, choices, journey' },
      
      // Life events (生活事件)
      '死亡|死': { zh: '转变、结束、新的开始、恐惧', en: 'Transformation, ending, new beginning, fear' },
      'death|die|dead': { zh: '转变、结束、新的开始', en: 'Transformation, ending, new beginning' },
      '考试': { zh: '评估、压力、自我怀疑、表现焦虑', en: 'Evaluation, pressure, self-doubt, performance anxiety' },
      'exam|test': { zh: '评估、压力、自我怀疑', en: 'Evaluation, pressure, self-doubt' },
      '迟到': { zh: '焦虑、时间压力、错过机会的恐惧', en: 'Anxiety, time pressure, fear of missing opportunities' },
      'late': { zh: '焦虑、时间压力、错过机会', en: 'Anxiety, time pressure, missed opportunities' },
      '结婚|婚礼': { zh: '承诺、结合、人生新阶段、关系', en: 'Commitment, union, new life stage, relationships' },
      'wedding|marry|marriage': { zh: '承诺、结合、人生新阶段', en: 'Commitment, union, new life stage' },
      
      // Creatures (生物)
      '动物': { zh: '本能、原始力量、自然属性', en: 'Instinct, primal forces, natural attributes' },
      'animal': { zh: '本能、原始力量、自然属性', en: 'Instinct, primal forces, natural attributes' },
      '蛇': { zh: '转化、疗愈、智慧、恐惧或诱惑', en: 'Transformation, healing, wisdom, fear or temptation' },
      'snake': { zh: '转化、疗愈、智慧', en: 'Transformation, healing, wisdom' },
      '鸟': { zh: '自由、灵性、信息、超越', en: 'Freedom, spirituality, messages, transcendence' },
      'bird': { zh: '自由、灵性、信息', en: 'Freedom, spirituality, messages' },
      '婴儿|宝宝': { zh: '新开始、脆弱、纯真、创造力', en: 'New beginning, vulnerability, innocence, creativity' },
      'baby': { zh: '新开始、脆弱、纯真', en: 'New beginning, vulnerability, innocence' },
    };

    const symbols: Array<{ symbol: string; meaning: string }> = [];
    const dreamLower = dream.toLowerCase();
    
    for (const [pattern, meanings] of Object.entries(symbolDatabase)) {
      const patterns = pattern.split('|');
      const meaning = isChinese ? meanings.zh : meanings.en;
      
      for (const p of patterns) {
        if (dreamLower.includes(p.toLowerCase()) || dream.includes(p)) {
          // Avoid duplicates
          if (!symbols.find(s => s.meaning === meaning)) {
            const displaySymbol = isChinese 
              ? (patterns[0].match(/[\u4e00-\u9fa5]/) ? patterns[0] : pattern)
              : (patterns.find(pt => /^[a-zA-Z]/.test(pt)) || patterns[0]);
            symbols.push({ symbol: displaySymbol, meaning });
            break;
          }
        }
      }
    }

    return symbols;
  }

  /**
   * Generate psychological insights based on dream patterns
   * Enhanced with multi-language support and deeper analysis
   */
  private getPsychologicalInsights(dream: string, language: string = 'zh-CN'): string {
    const isChinese = language.startsWith('zh');
    let insights = '';
    const dreamLower = dream.toLowerCase();

    // Pattern analysis (模式分析)
    const patterns = [
      {
        keywords: ['追', '赶', '逃', 'chase', 'run', 'escape'],
        zh: '- 可能反映现实生活中的压力、焦虑或需要逃避的情境',
        en: '- May reflect stress, anxiety, or situations you need to escape in waking life'
      },
      {
        keywords: ['飞', '高', 'fly', 'soar', 'float'],
        zh: '- 显示对自由、超越的渴望，或是摆脱限制的愿望',
        en: '- Indicates desire for freedom, transcendence, or wish to break free from limitations'
      },
      {
        keywords: ['水', '海', '游泳', 'water', 'swim', 'ocean', 'sea'],
        zh: '- 与情感状态、潜意识深处的内容有关',
        en: '- Related to emotional state and deep subconscious content'
      },
      {
        keywords: ['考试', '迟到', '准备', 'exam', 'test', 'late', 'unprepared'],
        zh: '- 可能表示对表现的担忧、评估焦虑或准备不足的感觉',
        en: '- May indicate concerns about performance, evaluation anxiety, or feelings of being unprepared'
      },
      {
        keywords: ['掉', '落', '坠', 'fall', 'drop'],
        zh: '- 反映失控感、不安全感或对失败的恐惧',
        en: '- Reflects loss of control, insecurity, or fear of failure'
      },
      {
        keywords: ['死', '死亡', 'death', 'die', 'dead'],
        zh: '- 通常象征转变、结束和新的开始，而非字面意义的死亡',
        en: '- Usually symbolizes transformation, endings, and new beginnings, not literal death'
      },
      {
        keywords: ['迷路', '找不到', 'lost', 'cannot find'],
        zh: '- 表示人生方向的困惑、缺乏目标或重要选择的犹豫',
        en: '- Indicates confusion about life direction, lack of goals, or hesitation about important choices'
      },
      {
        keywords: ['房子', '家', 'house', 'home'],
        zh: '- 房子代表自我和内在世界，不同房间反映人格的不同面向',
        en: '- Houses represent self and inner world; different rooms reflect different aspects of personality'
      }
    ];

    let foundPatterns = false;
    for (const pattern of patterns) {
      const hasMatch = pattern.keywords.some(keyword => 
        dreamLower.includes(keyword.toLowerCase()) || dream.includes(keyword)
      );
      if (hasMatch) {
        insights += (isChinese ? pattern.zh : pattern.en) + '\n';
        foundPatterns = true;
      }
    }

    // Default insight if no patterns matched
    if (!foundPatterns) {
      insights = isChinese
        ? '- 梦境反映了您当前的心理状态和生活经验\n- 注意梦中的情绪和感受，它们往往是重要的线索\n- 梦境可能揭示您尚未意识到的需求或愿望\n'
        : '- Dreams reflect your current psychological state and life experiences\n- Pay attention to emotions and feelings in the dream, as they are often important clues\n- Dreams may reveal needs or desires you haven\'t yet consciously recognized\n';
    }

    return insights;
  }
}
