/**
 * Tarot Reading Service
 * Provides tarot card reading functionality with multiple spreads
 */

export interface TarotCard {
  name: string;
  number: number;
  suit?: string;
  reversed: boolean;
  meaning: {
    upright: string;
    reversed: string;
  };
  keywords: string[];
}

export class TarotService {
  private majorArcana: TarotCard[] = [];
  private minorArcana: TarotCard[] = [];

  constructor() {
    this.initializeDeck();
  }

  private initializeDeck() {
    // Major Arcana (22 cards)
    const majorCards = [
      { name: '愚者 The Fool', number: 0, keywords: ['开始', '冒险', '纯真'] },
      { name: '魔术师 The Magician', number: 1, keywords: ['创造', '意志', '行动'] },
      { name: '女祭司 The High Priestess', number: 2, keywords: ['直觉', '神秘', '潜意识'] },
      { name: '皇后 The Empress', number: 3, keywords: ['丰饶', '母性', '创造力'] },
      { name: '皇帝 The Emperor', number: 4, keywords: ['权威', '结构', '控制'] },
      { name: '教皇 The Hierophant', number: 5, keywords: ['传统', '教育', '信仰'] },
      { name: '恋人 The Lovers', number: 6, keywords: ['爱情', '选择', '和谐'] },
      { name: '战车 The Chariot', number: 7, keywords: ['意志', '控制', '胜利'] },
      { name: '力量 Strength', number: 8, keywords: ['勇气', '耐心', '同情'] },
      { name: '隐者 The Hermit', number: 9, keywords: ['内省', '智慧', '独处'] },
      { name: '命运之轮 Wheel of Fortune', number: 10, keywords: ['命运', '循环', '转折'] },
      { name: '正义 Justice', number: 11, keywords: ['公正', '真相', '因果'] },
      { name: '倒吊人 The Hanged Man', number: 12, keywords: ['放手', '新视角', '牺牲'] },
      { name: '死神 Death', number: 13, keywords: ['转变', '结束', '重生'] },
      { name: '节制 Temperance', number: 14, keywords: ['平衡', '耐心', '和谐'] },
      { name: '恶魔 The Devil', number: 15, keywords: ['束缚', '欲望', '执着'] },
      { name: '塔 The Tower', number: 16, keywords: ['突变', '混乱', '启示'] },
      { name: '星星 The Star', number: 17, keywords: ['希望', '灵感', '平静'] },
      { name: '月亮 The Moon', number: 18, keywords: ['幻觉', '潜意识', '不确定'] },
      { name: '太阳 The Sun', number: 19, keywords: ['成功', '活力', '喜悦'] },
      { name: '审判 Judgement', number: 20, keywords: ['觉醒', '更新', '宽恕'] },
      { name: '世界 The World', number: 21, keywords: ['完成', '成就', '整合'] },
    ];

    this.majorArcana = majorCards.map(card => ({
      ...card,
      reversed: false,
      meaning: {
        upright: `${card.name}正位代表${card.keywords.join('、')}`,
        reversed: `${card.name}逆位表示相反或阻碍的能量`,
      },
    }));

    // Minor Arcana suits
    const suits = ['权杖 Wands', '圣杯 Cups', '宝剑 Swords', '星币 Pentacles'];
    const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Page', 'Knight', 'Queen', 'King'];

    suits.forEach(suit => {
      ranks.forEach((rank, index) => {
        this.minorArcana.push({
          name: `${suit} ${rank}`,
          number: index + 1,
          suit,
          reversed: false,
          keywords: ['行动', '情感', '思考', '物质'],
          meaning: {
            upright: `${suit} ${rank}正位含义`,
            reversed: `${suit} ${rank}逆位含义`,
          },
        });
      });
    });
  }

  private shuffleAndDraw(count: number): TarotCard[] {
    const fullDeck = [...this.majorArcana, ...this.minorArcana];
    const shuffled = fullDeck.sort(() => Math.random() - 0.5);
    
    return shuffled.slice(0, count).map(card => ({
      ...card,
      reversed: Math.random() > 0.5,
    }));
  }

  async reading(spreadType: string, question?: string, language: string = 'zh-CN') {
    let cards: TarotCard[];
    let positions: string[];
    let interpretation: string;

    switch (spreadType) {
      case 'single':
        cards = this.shuffleAndDraw(1);
        positions = ['当前状态'];
        interpretation = this.interpretSingleCard(cards[0], question);
        break;

      case 'three_card':
        cards = this.shuffleAndDraw(3);
        positions = ['过去', '现在', '未来'];
        interpretation = this.interpretThreeCard(cards, question);
        break;

      case 'celtic_cross':
        cards = this.shuffleAndDraw(10);
        positions = [
          '1. 当前状况',
          '2. 挑战',
          '3. 根源',
          '4. 近期过去',
          '5. 可能的未来',
          '6. 近期未来',
          '7. 你自己',
          '8. 环境影响',
          '9. 希望与恐惧',
          '10. 最终结果',
        ];
        interpretation = this.interpretCelticCross(cards, question);
        break;

      default:
        throw new Error(`Unknown spread type: ${spreadType}`);
    }

    return {
      question,
      spread_type: spreadType,
      cards: cards.map((card, index) => ({
        position: positions[index],
        card: {
          name: card.name,
          reversed: card.reversed,
          keywords: card.keywords,
          meaning: card.reversed ? card.meaning.reversed : card.meaning.upright,
        },
      })),
      interpretation,
      timestamp: new Date().toISOString(),
    };
  }

  private interpretSingleCard(card: TarotCard, question?: string): string {
    const orientation = card.reversed ? '逆位' : '正位';
    return `
## 单张塔罗牌解读

**问题**: ${question || '未指定'}

**抽到的牌**: ${card.name} (${orientation})

**关键词**: ${card.keywords.join('、')}

**含义**: ${card.reversed ? card.meaning.reversed : card.meaning.upright}

这张牌${orientation}出现，建议您关注${card.keywords[0]}相关的议题。
${card.reversed ? '由于是逆位，可能表示能量受阻或需要以不同角度看待问题。' : ''}
    `.trim();
  }

  private interpretThreeCard(cards: TarotCard[], question?: string): string {
    return `
## 三张牌解读

**问题**: ${question || '未指定'}

### 过去
**牌**: ${cards[0].name} (${cards[0].reversed ? '逆位' : '正位'})
${cards[0].reversed ? cards[0].meaning.reversed : cards[0].meaning.upright}

### 现在
**牌**: ${cards[1].name} (${cards[1].reversed ? '逆位' : '正位'})
${cards[1].reversed ? cards[1].meaning.reversed : cards[1].meaning.upright}

### 未来
**牌**: ${cards[2].name} (${cards[2].reversed ? '逆位' : '正位'})
${cards[2].reversed ? cards[2].meaning.reversed : cards[2].meaning.upright}

### 整体解读
从过去到未来的发展轨迹显示出一个连续的故事。关注这三张牌之间的联系与转变。
    `.trim();
  }

  private interpretCelticCross(cards: TarotCard[], question?: string): string {
    const positions = [
      '当前状况', '挑战', '根源', '近期过去', '可能的未来',
      '近期未来', '你自己', '环境影响', '希望与恐惧', '最终结果'
    ];

    let result = `## 凯尔特十字牌阵解读\n\n**问题**: ${question || '未指定'}\n\n`;

    cards.forEach((card, index) => {
      result += `### ${index + 1}. ${positions[index]}\n`;
      result += `**牌**: ${card.name} (${card.reversed ? '逆位' : '正位'})\n`;
      result += `${card.reversed ? card.meaning.reversed : card.meaning.upright}\n\n`;
    });

    result += `### 整体解读\n这个牌阵提供了关于您问题的全面视角。`;
    result += `从当前状况到最终结果的发展路径已经显现，请仔细思考每个位置的含义。`;

    return result.trim();
  }
}
