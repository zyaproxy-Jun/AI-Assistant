/**
 * Multimodal Renderer - 多模态内容渲染服务
 * 将占卜结果和商品信息转换为 Botpress 消息格式
 */

import { DivinationResult } from '../types/divination';
import { Product, ProductRecommendation } from '../types/product';

export interface BotpressMessage {
  type: 'text' | 'image' | 'card' | 'carousel';
  payload: any;
}

export class MultimodalRenderer {
  /**
   * 渲染占卜结果为多模态消息
   * 包含文本 + 图像 + 可视化
   */
  renderDivinationResult(result: DivinationResult): BotpressMessage[] {
    const messages: BotpressMessage[] = [];

    // 1. 主要解释文本
    messages.push({
      type: 'text',
      payload: {
        text: this.formatInterpretation(result)
      }
    });

    // 2. 图像 (如果有)
    if (result.multimodal.image) {
      messages.push({
        type: 'image',
        payload: {
          imageUrl: result.multimodal.image,
          title: `${this.getDivinationTypeName(result.type)}结果图`
        }
      });
    }

    // 3. 动画/可视化 (如果有)
    if (result.multimodal.animation) {
      messages.push({
        type: 'image',
        payload: {
          imageUrl: result.multimodal.animation,
          title: '动态展示'
        }
      });
    }

    // 4. 关键信息卡片
    messages.push({
      type: 'card',
      payload: {
        title: `${this.getDivinationTypeName(result.type)}解读`,
        subtitle: `置信度: ${(result.confidence * 100).toFixed(0)}%`,
        imageUrl: result.multimodal.image || undefined,
        actions: [
          {
            type: 'postback',
            label: '查看推荐商品',
            payload: 'VIEW_PRODUCTS'
          },
          {
            type: 'postback',
            label: '重新占卜',
            payload: 'RESTART_DIVINATION'
          }
        ]
      }
    });

    return messages;
  }

  /**
   * 格式化占卜解释文本
   */
  private formatInterpretation(result: DivinationResult): string {
    const icon = this.getDivinationIcon(result.type);
    const typeName = this.getDivinationTypeName(result.type);
    
    let text = `${icon} **${typeName}结果**\n\n`;
    text += `${result.interpretation}\n\n`;
    
    if (result.themes.length > 0) {
      text += `🎯 **主题**: ${result.themes.join(', ')}\n`;
    }
    
    if (result.keywords.length > 0) {
      text += `🔑 **关键词**: ${result.keywords.join(', ')}\n`;
    }
    
    const sentimentText = {
      positive: '😊 积极',
      negative: '😔 需要注意',
      neutral: '😐 中性'
    }[result.sentiment];
    text += `💭 **情感倾向**: ${sentimentText}\n`;
    
    return text;
  }

  /**
   * 渲染商品推荐为轮播卡片
   */
  renderProductCarousel(recommendations: ProductRecommendation[]): BotpressMessage {
    const cards = recommendations.map(rec => this.createProductCard(rec));
    
    return {
      type: 'carousel',
      payload: {
        cards
      }
    };
  }

  /**
   * 渲染单个商品卡片
   */
  renderProductCard(recommendation: ProductRecommendation): BotpressMessage {
    return {
      type: 'card',
      payload: this.createProductCard(recommendation)
    };
  }

  /**
   * 创建商品卡片数据
   */
  private createProductCard(recommendation: ProductRecommendation) {
    const { product, matchScore, matchReasons } = recommendation;
    
    // 构建副标题
    let subtitle = `💰 ¥${product.price} ${product.currency}\n`;
    subtitle += `⭐ 匹配度: ${(matchScore * 100).toFixed(0)}%\n`;
    
    // 添加匹配理由
    if (matchReasons && matchReasons.length > 0) {
      subtitle += `\n✨ ${matchReasons[0]}`; // 只显示第一个理由
    }

    return {
      title: product.name,
      subtitle,
      imageUrl: product.images[0] || '',
      actions: [
        {
          type: 'url',
          label: '查看详情',
          url: `/products/${product.id}`
        },
        {
          type: 'postback',
          label: '立即购买',
          payload: `BUY_${product.id}`
        }
      ]
    };
  }

  /**
   * 渲染商品详情页
   */
  renderProductDetail(product: Product): BotpressMessage[] {
    const messages: BotpressMessage[] = [];

    // 1. 商品主图
    if (product.images.length > 0) {
      messages.push({
        type: 'image',
        payload: {
          imageUrl: product.images[0],
          title: product.name
        }
      });
    }

    // 2. 商品详情卡片
    let detailText = `**${product.name}**\n\n`;
    detailText += `${product.description}\n\n`;
    detailText += `💰 价格: ¥${product.price} ${product.currency}\n`;
    detailText += `📦 类型: ${product.type === 'physical' ? '实物商品' : '数字商品'}\n`;
    detailText += `📊 库存: ${product.stock > 0 ? `${product.stock} 件` : '缺货'}\n`;
    
    if (product.features && product.features.length > 0) {
      detailText += `\n✨ **特色**:\n`;
      product.features.forEach(feature => {
        detailText += `  • ${feature}\n`;
      });
    }

    messages.push({
      type: 'text',
      payload: { text: detailText }
    });

    // 3. 操作按钮
    if (product.stock > 0) {
      messages.push({
        type: 'card',
        payload: {
          title: '立即购买',
          subtitle: product.customizable ? '支持个性化定制' : '现货供应',
          actions: [
            {
              type: 'postback',
              label: '加入购物车',
              payload: `ADD_TO_CART_${product.id}`
            },
            {
              type: 'postback',
              label: '立即购买',
              payload: `BUY_NOW_${product.id}`
            }
          ]
        }
      });
    }

    return messages;
  }

  /**
   * 渲染推荐引导消息
   */
  renderRecommendationIntro(count: number): BotpressMessage {
    return {
      type: 'text',
      payload: {
        text: `🛍️ 根据您的占卜结果，我为您精选了 ${count} 款商品：`
      }
    };
  }

  /**
   * 渲染无匹配商品消息
   */
  renderNoProductsFound(): BotpressMessage[] {
    return [
      {
        type: 'text',
        payload: {
          text: '😅 抱歉，暂时没有找到完全匹配的商品。让我为您推荐一些热门商品：'
        }
      }
    ];
  }

  /**
   * 获取占卜类型图标
   */
  private getDivinationIcon(type: string): string {
    const icons: Record<string, string> = {
      dream: '🌙',
      tarot: '🃏',
      iching: '📿',
      ziwei: '⭐',
      bazi: '🎋',
      astrology: '🌌'
    };
    return icons[type] || '🔮';
  }

  /**
   * 获取占卜类型中文名称
   */
  private getDivinationTypeName(type: string): string {
    const names: Record<string, string> = {
      dream: '解梦',
      tarot: '塔罗牌',
      iching: '易经',
      ziwei: '紫微斗数',
      bazi: '八字',
      astrology: '星座运势'
    };
    return names[type] || '占卜';
  }
}

/**
 * 创建 Multimodal Renderer 实例 (工厂函数)
 */
export function createMultimodalRenderer(): MultimodalRenderer {
  return new MultimodalRenderer();
}
