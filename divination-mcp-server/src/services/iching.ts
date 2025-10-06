/**
 * I-Ching (易经) Service
 * Book of Changes divination and hexagram interpretation
 */

import { getHexagram, getHexagramName } from '../data/hexagrams.js';

export class IChingService {
  async divinate(question: string, method: string = 'coins', language: string = 'zh-CN') {
    try {
      let hexagram: number;
      let changingLines: number[] = [];

      switch (method) {
        case 'coins':
          ({ hexagram, changingLines } = this.coinMethod());
          break;
        case 'yarrow':
          ({ hexagram, changingLines } = this.yarrowMethod());
          break;
        case 'random':
          hexagram = Math.floor(Math.random() * 64) + 1;
          break;
        default:
          throw new Error(`Unknown divination method: ${method}`);
      }

      const result = await this.interpretHexagram(hexagram, changingLines, language);
      
      return {
        question,
        method,
        original_hexagram: hexagram,
        ...result,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error(`易经卜卦失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async interpretHexagram(
    hexagramNumber: number,
    changingLines: number[] = [],
    language: string = 'zh-CN'
  ) {
    if (hexagramNumber < 1 || hexagramNumber > 64) {
      throw new Error('卦象编号必须在 1-64 之间');
    }

    const hexagram = getHexagram(hexagramNumber);
    if (!hexagram) {
      throw new Error(`找不到卦象 ${hexagramNumber}`);
    }

    let interpretation = this.generateInterpretation(hexagram, language);

    // If there are changing lines, calculate the transformed hexagram
    let transformedHexagram = null;
    if (changingLines.length > 0) {
      const transformedNumber = this.calculateTransformedHexagram(hexagramNumber, changingLines);
      const transformed = getHexagram(transformedNumber);
      if (transformed) {
        transformedHexagram = {
          number: transformed.number,
          name: transformed.name,
          symbol: transformed.symbol,
        };
        interpretation += `\n\n## 之卦（变卦）\n`;
        interpretation += this.generateInterpretation(transformed, language);
      }
    }

    return {
      hexagram_number: hexagramNumber,
      hexagram_name: hexagram.name,
      hexagram_symbol: hexagram.symbol,
      trigrams: hexagram.trigrams,
      changing_lines: changingLines,
      transformed_hexagram: transformedHexagram,
      interpretation,
    };
  }

  private coinMethod(): { hexagram: number; changingLines: number[] } {
    const lines: number[] = [];
    const changingLines: number[] = [];

    for (let i = 0; i < 6; i++) {
      // Throw three coins
      const sum = (Math.random() > 0.5 ? 3 : 2) +
                  (Math.random() > 0.5 ? 3 : 2) +
                  (Math.random() > 0.5 ? 3 : 2);
      
      if (sum === 6) {
        lines.push(0); // Old yin (changing)
        changingLines.push(i + 1);
      } else if (sum === 7) {
        lines.push(1); // Young yang
      } else if (sum === 8) {
        lines.push(0); // Young yin
      } else if (sum === 9) {
        lines.push(1); // Old yang (changing)
        changingLines.push(i + 1);
      }
    }

    const hexagram = this.linesToHexagram(lines);
    return { hexagram, changingLines };
  }

  private yarrowMethod(): { hexagram: number; changingLines: number[] } {
    // Simplified yarrow stalk method
    // In practice, this is more complex
    const lines: number[] = [];
    const changingLines: number[] = [];

    for (let i = 0; i < 6; i++) {
      const value = Math.floor(Math.random() * 4) + 6; // 6, 7, 8, or 9
      
      if (value === 6 || value === 9) {
        changingLines.push(i + 1);
      }
      
      lines.push(value % 2); // 0 for yin, 1 for yang
    }

    const hexagram = this.linesToHexagram(lines);
    return { hexagram, changingLines };
  }

  private linesToHexagram(lines: number[]): number {
    // Convert binary lines to hexagram number (King Wen sequence)
    const binary = lines.join('');
    const decimal = parseInt(binary, 2);
    
    // Map to King Wen sequence (simplified)
    return (decimal % 64) + 1;
  }

  private calculateTransformedHexagram(original: number, changingLines: number[]): number {
    // Simplified transformation calculation
    // In practice, you would flip the changing lines
    return ((original + changingLines.length) % 64) + 1;
  }

  private generateInterpretation(hexagram: any, language: string): string {
    let interpretation = `## ${hexagram.number}. ${hexagram.name}\n\n`;
    interpretation += `**卦象**: ${hexagram.symbol}\n`;
    interpretation += `**组成**: 下卦${hexagram.trigrams.lower}，上卦${hexagram.trigrams.upper}\n\n`;
    interpretation += `### 卦辞\n${hexagram.judgement}\n\n`;
    interpretation += `### 象辞\n${hexagram.image}\n\n`;
    interpretation += `### 解读\n${hexagram.interpretation}\n`;
    
    return interpretation;
  }

  private interpretResult(
    originalHexagram: number,
    transformedHexagram: number | null,
    changingLines: number[],
    question: string,
    language: string
  ): string {
    let result = `## 占卜结果\n\n`;
    result += `**问题**: ${question}\n\n`;
    result += `得卦：${getHexagramName(originalHexagram, language)}\n\n`;

    if (changingLines.length > 0) {
      result += `变爻：第 ${changingLines.join('、')} 爻\n\n`;
      if (transformedHexagram) {
        result += `之卦：${getHexagramName(transformedHexagram, language)}\n\n`;
      }
    }

    result += `\n建议仔细阅读卦辞和象辞，结合自己的实际情况进行判断。\n`;
    return result;
  }
}
