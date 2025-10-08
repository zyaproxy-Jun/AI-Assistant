// MCP 协议类型定义

export interface MCPToolDefinition {
  name: string
  description: string
  inputSchema: {
    type: 'object'
    properties: Record<string, any>
    required?: string[]
  }
}

export interface MCPToolCallRequest {
  name: string
  arguments: Record<string, any>
}

export interface MCPToolCallResponse {
  content: Array<{
    type: 'text' | 'image' | 'resource'
    text?: string
    data?: string
    mimeType?: string
    uri?: string
    context_for_products?: any
  }>
  isError?: boolean
}

export interface MCPResourceDefinition {
  uri: string
  name: string
  description?: string
  mimeType?: string
}

export interface MCPPromptDefinition {
  name: string
  description?: string
  arguments?: Array<{
    name: string
    description?: string
    required?: boolean
  }>
}

export interface MCPServerCapabilities {
  tools?: {
    listChanged?: boolean
  }
  resources?: {
    subscribe?: boolean
    listChanged?: boolean
  }
  prompts?: {
    listChanged?: boolean
  }
  logging?: {}
}

export interface MCPServerInfo {
  name: string
  version: string
  protocolVersion?: string
  capabilities?: MCPServerCapabilities
}

export interface MCPContextValue {
  uri: string
  mimeType?: string
  text?: string
}

export interface MCPSamplingMessage {
  role: 'user' | 'assistant'
  content: {
    type: 'text' | 'image'
    text?: string
    data?: string
    mimeType?: string
  }
}
