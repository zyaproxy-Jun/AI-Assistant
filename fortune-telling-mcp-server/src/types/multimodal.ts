// 多模态输出类型定义

export interface ImageGenerationOptions {
  prompt: string
  size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792'
  quality?: 'standard' | 'hd'
  style?: 'vivid' | 'natural'
  n?: number
}

export interface ImageGenerationResult {
  url: string
  revisedPrompt?: string
  base64?: string
  format: 'png' | 'jpg' | 'webp'
}

export interface SVGRenderOptions {
  width: number
  height: number
  backgroundColor?: string
  style?: 'modern' | 'classic' | 'mystical'
}

export interface SVGRenderResult {
  svg: string
  viewBox: string
  width: number
  height: number
}

export interface AnimationGenerationOptions {
  duration: number
  fps?: number
  loop?: boolean
  style?: 'smooth' | 'energetic' | 'calm'
  theme?: string
}

export interface LottieAnimation {
  v: string // Lottie version
  fr: number // Frame rate
  ip: number // In point
  op: number // Out point
  w: number // Width
  h: number // Height
  nm: string // Name
  ddd: number // 3D
  assets: any[]
  layers: any[]
}

export interface AnimationGenerationResult {
  lottieJson: LottieAnimation
  gifUrl?: string
  duration: number
  fps: number
}

export interface TextFormattingOptions {
  format: 'markdown' | 'json' | 'plain' | 'html'
  includeMetadata?: boolean
  maxLength?: number
  style?: 'detailed' | 'concise' | 'poetic'
}

export interface TextFormattingResult {
  content: string
  format: string
  metadata?: {
    wordCount: number
    readingTime: number
    language: string
  }
}

export interface MultimodalGenerationRequest {
  type: 'tarot' | 'astrology' | 'iching' | 'dream' | 'ziwei' | 'bazi'
  data: any
  formats: ('text' | 'image' | 'animation')[]
  options?: {
    image?: ImageGenerationOptions
    svg?: SVGRenderOptions
    animation?: AnimationGenerationOptions
    text?: TextFormattingOptions
  }
}

export interface MultimodalGenerationResult {
  text?: TextFormattingResult
  image?: ImageGenerationResult | SVGRenderResult
  animation?: AnimationGenerationResult
  processingTime: number
}

// 图像样式模板
export interface ImageStyleTemplate {
  name: string
  description: string
  basePrompt: string
  styleKeywords: string[]
  colorScheme: string[]
  mood: string
}

// SVG 元素类型
export interface SVGElement {
  type: 'circle' | 'rect' | 'path' | 'text' | 'line' | 'polygon'
  attributes: Record<string, any>
  style?: Record<string, any>
  children?: SVGElement[]
}

// 动画关键帧
export interface AnimationKeyframe {
  time: number
  properties: Record<string, any>
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'
}
