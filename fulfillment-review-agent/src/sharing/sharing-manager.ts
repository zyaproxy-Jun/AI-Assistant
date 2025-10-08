import type { SocialPlatformConfig, SocialPlatform, ShareContent, ShareResponse } from '../types/fulfillment.js'

/**
 * 社交平台配置
 */
const SOCIAL_PLATFORMS: SocialPlatformConfig[] = [
  {
    id: 'matrix',
    name: 'Matrix',
    displayName: 'Matrix',
    logo: '/assets/logos/matrix.svg',
    color: '#000000',
    enabled: true
  },
  {
    id: 'telegram',
    name: 'Telegram',
    displayName: 'Telegram',
    logo: '/assets/logos/telegram.svg',
    color: '#0088cc',
    shareUrlTemplate: 'https://t.me/share/url?url={url}&text={text}',
    enabled: true
  },
  {
    id: 'shorts-stack',
    name: 'ShortsStack',
    displayName: 'Shorts Stack',
    logo: '/assets/logos/shorts-stack.svg',
    color: '#FF0000',
    enabled: true
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    displayName: 'TikTok',
    logo: '/assets/logos/tiktok.svg',
    color: '#000000',
    enabled: true
  },
  {
    id: 'discord',
    name: 'Discord',
    displayName: 'Discord',
    logo: '/assets/logos/discord.svg',
    color: '#5865F2',
    enabled: true
  },
  {
    id: 'discourse',
    name: 'Discourse',
    displayName: 'Discourse',
    logo: '/assets/logos/discourse.svg',
    color: '#000000',
    enabled: true
  },
  {
    id: 'reddit',
    name: 'Reddit',
    displayName: 'Reddit',
    logo: '/assets/logos/reddit.svg',
    color: '#FF4500',
    shareUrlTemplate: 'https://reddit.com/submit?url={url}&title={text}',
    enabled: true
  },
  {
    id: 'x',
    name: 'X',
    displayName: 'X (Twitter)',
    logo: '/assets/logos/x.svg',
    color: '#000000',
    shareUrlTemplate: 'https://twitter.com/intent/tweet?text={text}&url={url}&hashtags={hashtags}',
    enabled: true
  },
  {
    id: 'facebook',
    name: 'Facebook',
    displayName: 'Facebook',
    logo: '/assets/logos/facebook.svg',
    color: '#1877F2',
    shareUrlTemplate: 'https://www.facebook.com/sharer/sharer.php?u={url}',
    enabled: true
  },
  {
    id: 'youtube',
    name: 'YouTube',
    displayName: 'YouTube',
    logo: '/assets/logos/youtube.svg',
    color: '#FF0000',
    enabled: true
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    displayName: 'Pinterest',
    logo: '/assets/logos/pinterest.svg',
    color: '#E60023',
    shareUrlTemplate: 'https://pinterest.com/pin/create/button/?url={url}&description={text}&media={image}',
    enabled: true
  },
  {
    id: 'instagram',
    name: 'Instagram',
    displayName: 'Instagram',
    logo: '/assets/logos/instagram.svg',
    color: '#E4405F',
    enabled: true
  },
  {
    id: 'fiverr',
    name: 'Fiverr',
    displayName: 'Fiverr',
    logo: '/assets/logos/fiverr.svg',
    color: '#1DBF73',
    enabled: true
  }
]

/**
 * 分享管理器
 */
export class SharingManager {
  /**
   * 获取所有启用的平台
   */
  getEnabledPlatforms(): SocialPlatformConfig[] {
    return SOCIAL_PLATFORMS.filter(p => p.enabled)
  }

  /**
   * 获取特定平台配置
   */
  getPlatform(platformId: SocialPlatform): SocialPlatformConfig | null {
    return SOCIAL_PLATFORMS.find(p => p.id === platformId) || null
  }

  /**
   * 生成分享链接
   */
  generateShareLinks(content: ShareContent): ShareResponse {
    const platforms = this.getEnabledPlatforms()
    
    return {
      platforms: platforms.map(platform => ({
        platform: platform.id,
        name: platform.displayName,
        logo: platform.logo,
        color: platform.color,
        shareUrl: this.buildShareUrl(platform, content)
      }))
    }
  }

  /**
   * 构建分享 URL
   */
  private buildShareUrl(platform: SocialPlatformConfig, content: ShareContent): string {
    if (!platform.shareUrlTemplate) {
      // 如果没有模板，返回基础分享页面
      const baseUrl = process.env.SHARING_BASE_URL || 'https://ether-ai.com/share'
      return `${baseUrl}/${content.orderId}?platform=${platform.id}`
    }

    // 使用模板生成 URL
    let url = platform.shareUrlTemplate
    
    url = url.replace('{url}', encodeURIComponent(content.url))
    url = url.replace('{text}', encodeURIComponent(`${content.title} - ${content.description}`))
    
    if (content.imageUrl) {
      url = url.replace('{image}', encodeURIComponent(content.imageUrl))
    }
    
    if (content.hashtags && content.hashtags.length > 0) {
      url = url.replace('{hashtags}', content.hashtags.join(','))
    }

    return url
  }

  /**
   * 生成分享内容
   */
  generateShareContent(orderId: string, orderNumber: string): ShareContent {
    const baseUrl = process.env.SHARING_BASE_URL || 'https://ether-ai.com/share'
    
    return {
      orderId,
      orderNumber,
      title: '我在 Ether AI Assistant 体验了占卜服务！',
      description: '精准的占卜解读，专业的商品推荐，优质的用户体验。',
      url: `${baseUrl}/${orderId}`,
      hashtags: ['EtherAI', '占卜', 'AI助手', '塔罗牌', '星座'],
      imageUrl: `${baseUrl}/og-image.png`
    }
  }

  /**
   * 记录分享事件（用于统计）
   */
  async logShareEvent(
    orderId: string,
    userId: string,
    platform: SocialPlatform
  ): Promise<void> {
    // TODO: 保存到数据库或分析系统
    console.log(`User ${userId} shared order ${orderId} on ${platform}`)
  }

  /**
   * 渲染分享面板 HTML（用于 Botpress）
   */
  renderSharingPanel(content: ShareContent): string {
    const response = this.generateShareLinks(content)
    
    let html = '<div class="sharing-panel">'
    html += '<h3>分享您的体验</h3>'
    html += '<p>点击图标跳转到对应平台分享</p>'
    html += '<div class="platform-grid">'
    
    response.platforms.forEach(platform => {
      html += `
        <a href="${platform.shareUrl}" target="_blank" class="platform-item" style="border-color: ${platform.color}">
          <img src="${platform.logo}" alt="${platform.name}" />
          <span>${platform.name}</span>
        </a>
      `
    })
    
    html += '</div>'
    html += '</div>'
    
    return html
  }

  /**
   * 生成分享卡片数据（用于 Botpress Carousel）
   */
  generateSharingCarousel(content: ShareContent): any {
    const response = this.generateShareLinks(content)
    
    return {
      type: 'carousel',
      items: response.platforms.map(platform => ({
        title: platform.name,
        subtitle: '点击分享到 ' + platform.name,
        image: platform.logo,
        actions: [
          {
            type: 'open_url',
            label: '分享',
            value: platform.shareUrl
          }
        ]
      }))
    }
  }
}

// 导出单例
export const sharingManager = new SharingManager()
