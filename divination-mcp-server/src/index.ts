#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

// Import divination modules
import { TarotService } from './services/tarot.js';
import { ZiWeiService } from './services/ziwei.js';
import { AstrologyService } from './services/astrology.js';
import { DreamService } from './services/dream.js';
import { BaZiService } from './services/bazi.js';
import { IChingService } from './services/iching.js';

// Initialize services
const tarotService = new TarotService();
const ziWeiService = new ZiWeiService();
const astrologyService = new AstrologyService();
const dreamService = new DreamService();
const baZiService = new BaZiService();
const iChingService = new IChingService();

// Define available tools
const tools: Tool[] = [
  // Tarot Tools
  {
    name: 'tarot_reading',
    description: '塔罗牌占卜 - 提供单张牌、三张牌或凯尔特十字牌阵解读。Tarot card reading with various spreads.',
    inputSchema: {
      type: 'object',
      properties: {
        spread_type: {
          type: 'string',
          enum: ['single', 'three_card', 'celtic_cross'],
          description: '牌阵类型: single(单张), three_card(三张牌), celtic_cross(凯尔特十字)',
        },
        question: {
          type: 'string',
          description: '占卜问题 (可选)',
        },
        language: {
          type: 'string',
          enum: ['zh-CN', 'zh-TW', 'en'],
          default: 'zh-CN',
          description: '输出语言',
        },
      },
      required: ['spread_type'],
    },
  },
  
  // Zi Wei Dou Shu Tools
  {
    name: 'ziwei_chart',
    description: '紫微斗数排盘 - 根据出生信息生成紫微斗数命盘。Generate Zi Wei Dou Shu astrology chart.',
    inputSchema: {
      type: 'object',
      properties: {
        solar_date: {
          type: 'string',
          description: '阳历日期 YYYY-MM-DD',
        },
        lunar_date: {
          type: 'string',
          description: '农历日期 YYYY-MM-DD (可选，如果提供则使用农历)',
        },
        birth_hour: {
          type: 'number',
          description: '出生时辰 (0-23)',
          minimum: 0,
          maximum: 23,
        },
        gender: {
          type: 'string',
          enum: ['male', 'female', '男', '女'],
          description: '性别',
        },
        is_leap_month: {
          type: 'boolean',
          default: false,
          description: '是否闰月',
        },
        language: {
          type: 'string',
          enum: ['zh-CN', 'zh-TW', 'en'],
          default: 'zh-CN',
        },
      },
      required: ['birth_hour', 'gender'],
    },
  },
  
  // Western Astrology Tools
  {
    name: 'birth_chart',
    description: '西洋占星星盘分析 - 生成并解读出生星盘。Generate and interpret Western astrology birth chart.',
    inputSchema: {
      type: 'object',
      properties: {
        date: {
          type: 'string',
          description: '出生日期 YYYY-MM-DD',
        },
        time: {
          type: 'string',
          description: '出生时间 HH:MM',
        },
        latitude: {
          type: 'number',
          description: '纬度',
        },
        longitude: {
          type: 'number',
          description: '经度',
        },
        timezone: {
          type: 'string',
          description: '时区 (e.g., Asia/Shanghai)',
        },
        language: {
          type: 'string',
          enum: ['zh-CN', 'zh-TW', 'en'],
          default: 'zh-CN',
        },
      },
      required: ['date', 'time', 'latitude', 'longitude', 'timezone'],
    },
  },
  
  // Dream Interpretation Tools
  {
    name: 'interpret_dream',
    description: '梦境解析 - 基于心理学和传统象征解读梦境。Interpret dreams with psychological and symbolic analysis.',
    inputSchema: {
      type: 'object',
      properties: {
        dream_description: {
          type: 'string',
          description: '梦境描述',
        },
        emotions: {
          type: 'array',
          items: { type: 'string' },
          description: '梦中情绪 (可选)',
        },
        recurring: {
          type: 'boolean',
          default: false,
          description: '是否重复出现的梦',
        },
        language: {
          type: 'string',
          enum: ['zh-CN', 'zh-TW', 'en'],
          default: 'zh-CN',
        },
      },
      required: ['dream_description'],
    },
  },
  
  // BaZi Tools
  {
    name: 'bazi_analysis',
    description: '八字命理分析 - 生成四柱八字并分析五行、十神、大运。BaZi (Four Pillars) destiny analysis.',
    inputSchema: {
      type: 'object',
      properties: {
        solar_date: {
          type: 'string',
          description: '阳历日期 YYYY-MM-DD',
        },
        lunar_date: {
          type: 'string',
          description: '农历日期 YYYY-MM-DD (可选)',
        },
        birth_hour: {
          type: 'number',
          description: '出生时辰 (0-23)',
          minimum: 0,
          maximum: 23,
        },
        gender: {
          type: 'string',
          enum: ['male', 'female', '男', '女'],
          description: '性别',
        },
        language: {
          type: 'string',
          enum: ['zh-CN', 'zh-TW', 'en'],
          default: 'zh-CN',
        },
      },
      required: ['birth_hour', 'gender'],
    },
  },
  
  // I-Ching Tools
  {
    name: 'iching_divination',
    description: '易经卜卦 - 使用三枚硬币法或蓍草法进行卦象占卜。I-Ching divination using coin or yarrow stalk method.',
    inputSchema: {
      type: 'object',
      properties: {
        question: {
          type: 'string',
          description: '占卜问题',
        },
        method: {
          type: 'string',
          enum: ['coins', 'yarrow', 'random'],
          default: 'coins',
          description: '占卜方法: coins(硬币法), yarrow(蓍草法), random(随机)',
        },
        language: {
          type: 'string',
          enum: ['zh-CN', 'zh-TW', 'en'],
          default: 'zh-CN',
        },
      },
      required: ['question'],
    },
  },
  
  // Hexagram Interpretation
  {
    name: 'iching_hexagram',
    description: '易经卦象解读 - 解读指定的卦象及变卦。Interpret specific I-Ching hexagram.',
    inputSchema: {
      type: 'object',
      properties: {
        hexagram_number: {
          type: 'number',
          description: '卦象编号 (1-64)',
          minimum: 1,
          maximum: 64,
        },
        changing_lines: {
          type: 'array',
          items: { type: 'number' },
          description: '变爻位置 (1-6) (可选)',
        },
        language: {
          type: 'string',
          enum: ['zh-CN', 'zh-TW', 'en'],
          default: 'zh-CN',
        },
      },
      required: ['hexagram_number'],
    },
  },
];

// Create MCP server
const server = new Server(
  {
    name: 'divination-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle list tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'tarot_reading':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                await tarotService.reading(
                  args?.spread_type as string || "single",
                  args?.question as string || "",
                  args?.language as string || "zh-CN"
                ),
                null,
                2
              ),
            },
          ],
        };

      case 'ziwei_chart':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                await ziWeiService.generateChart(args),
                null,
                2
              ),
            },
          ],
        };

      case 'birth_chart':
        // Parse date and time from args
        const [year, month, day] = (args?.date as string || "").split('-').map(Number);
        const [hour, minute] = (args?.time as string || "12:00").split(':').map(Number);
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                await astrologyService.getBirthChart(
                  year,
                  month,
                  day,
                  hour,
                  minute,
                  args?.latitude as number || 0,
                  args?.longitude as number || 0,
                  args?.language as string || 'zh'
                ),
                null,
                2
              ),
            },
          ],
        };

      case 'interpret_dream':
        const dreamDesc = args?.dream_description as string || "";
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                await dreamService.interpret(
                  dreamDesc,
                  args?.emotions as string[] || [],
                  args?.recurring as boolean || false,
                  args?.language as string || "zh-CN"
                ),
                null,
                2
              ),
            },
          ],
        };

      case 'bazi_analysis':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                await baZiService.analyze(args),
                null,
                2
              ),
            },
          ],
        };

      case 'iching_divination':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                await iChingService.divinate(
                  args?.question as string || "",
                  args?.method as string || "coins",
                  args?.language as string || "zh-CN"
                ),
                null,
                2
              ),
            },
          ],
        };

      case 'iching_hexagram':
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                await iChingService.interpretHexagram(
                  args?.hexagram_number as number || 1,
                  args?.changing_lines as number[] || [],
                  args?.language as string || "zh-CN"
                ),
                null,
                2
              ),
            },
          ],
        };

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ error: errorMessage }, null, 2),
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Divination MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
