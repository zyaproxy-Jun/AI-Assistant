/**
 * Dream Interpretation Service
 * AI-powered dream analysis with psychological insights
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
        symbols: this.extractSymbols(dreamDescription),
        psychological_insights: this.getPsychologicalInsights(dreamDescription),
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error(`梦境解析失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async aiInterpretation(
    dream: string,
    emotions?: string[],
    recurring: boolean = false,
    language: string = 'zh-CN'
  ): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI API not configured');
    }

    const emotionContext = emotions && emotions.length > 0
      ? `梦中的情绪: ${emotions.join('、')}`
      : '';

    const recurringContext = recurring
      ? '这是一个重复出现的梦。'
      : '';

    const systemPrompt = language === 'zh-CN' || language === 'zh-TW'
      ? `你是一位专业的梦境分析师，精通心理学和象征主义。请分析以下梦境，提供：
1. 主要象征及其含义
2. 心理学解读
3. 潜意识信息
4. 建议和启示

用${language === 'zh-TW' ? '繁体中文' : '简体中文'}回答。`
      : `You are a professional dream analyst with expertise in psychology and symbolism. 
Analyze the following dream and provide:
1. Major symbols and their meanings
2. Psychological interpretation
3. Subconscious messages
4. Advice and insights`;

    const userPrompt = `
梦境描述: ${dream}
${emotionContext}
${recurringContext}

请提供详细的解析。
    `.trim();

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return completion.choices[0]?.message?.content || '无法生成解析';
  }

  private ruleBasedInterpretation(
    dream: string,
    emotions?: string[],
    recurring: boolean = false,
    language: string = 'zh-CN'
  ): string {
    const symbols = this.extractSymbols(dream);
    
    let interpretation = `# 梦境解析\n\n`;
    interpretation += `## 梦境内容\n${dream}\n\n`;

    if (emotions && emotions.length > 0) {
      interpretation += `## 情绪体验\n${emotions.join('、')}\n\n`;
    }

    if (recurring) {
      interpretation += `## 重复性梦境\n这个梦重复出现，可能表示潜意识中有未解决的议题需要关注。\n\n`;
    }

    interpretation += `## 象征解读\n`;
    symbols.forEach(symbol => {
      interpretation += `- **${symbol.symbol}**: ${symbol.meaning}\n`;
    });

    interpretation += `\n## 心理学视角\n`;
    interpretation += this.getPsychologicalInsights(dream);

    interpretation += `\n\n## 建议\n`;
    interpretation += `1. 记录梦境细节有助于理解潜意识信息\n`;
    interpretation += `2. 关注梦中的情绪反应\n`;
    interpretation += `3. 思考梦境与现实生活的联系\n`;

    return interpretation;
  }

  private extractSymbols(dream: string): Array<{ symbol: string; meaning: string }> {
    const commonSymbols: { [key: string]: string } = {
      '水': '情感、潜意识、生命能量',
      '火': '激情、转化、破坏或重生',
      '飞': '自由、超越、灵性追求',
      '掉落': '失控、不安全感、恐惧',
      '追赶': '逃避、压力、未解决的问题',
      '房子': '自我、身份、内在世界',
      '死亡': '转变、结束、新的开始',
      '动物': '本能、原始力量、自然属性',
      '婴儿': '新开始、脆弱、纯真',
      '道路': '人生方向、选择、旅程',
    };

    const symbols: Array<{ symbol: string; meaning: string }> = [];
    
    for (const [key, value] of Object.entries(commonSymbols)) {
      if (dream.includes(key)) {
        symbols.push({ symbol: key, meaning: value });
      }
    }

    return symbols;
  }

  private getPsychologicalInsights(dream: string): string {
    let insights = '';

    if (dream.includes('追') || dream.includes('逃')) {
      insights += '- 可能反映现实生活中的压力或焦虑\n';
    }

    if (dream.includes('飞') || dream.includes('高')) {
      insights += '- 显示对自由和超越的渴望\n';
    }

    if (dream.includes('水') || dream.includes('海')) {
      insights += '- 与情感状态和潜意识有关\n';
    }

    if (dream.includes('考试') || dream.includes('迟到')) {
      insights += '- 可能表示对表现的担忧或准备不足的焦虑\n';
    }

    if (insights === '') {
      insights = '- 梦境反映了您当前的心理状态和生活经验\n';
      insights += '- 注意梦中的情绪和感受，它们往往是重要的线索\n';
    }

    return insights;
  }
}
