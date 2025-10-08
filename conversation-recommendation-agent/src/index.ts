/**
 * Conversation & Recommendation Agent - 主入口
 * 对话与导购智能体
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { triggerDivination, getParameterCollectionForm, validateParameters } from './actions/trigger-divination';
import { matchProducts, getProductDetail, searchProducts } from './actions/match-products';
import { DivinationType } from './types/divination';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// 中间件
app.use(cors());
app.use(express.json());

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'conversation-recommendation-agent',
    timestamp: new Date().toISOString()
  });
});

/**
 * API 路由: 获取占卜参数表单
 * GET /api/divination/forms/:type
 */
app.get('/api/divination/forms/:type', (req, res) => {
  const type = req.params.type as DivinationType;
  
  const validTypes: DivinationType[] = ['dream', 'tarot', 'iching', 'ziwei', 'bazi', 'astrology'];
  if (!validTypes.includes(type)) {
    return res.status(400).json({
      success: false,
      error: `无效的占卜类型: ${type}`
    });
  }

  const form = getParameterCollectionForm(type);
  res.json({
    success: true,
    form
  });
});

/**
 * API 路由: 执行占卜
 * POST /api/divination/perform
 */
app.post('/api/divination/perform', async (req, res) => {
  try {
    const { type, parameters, userId, language } = req.body;

    // 验证必填字段
    if (!type || !userId) {
      return res.status(400).json({
        success: false,
        error: '缺少必填字段: type, userId'
      });
    }

    // 验证参数完整性
    const validation = validateParameters(type, parameters);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: '参数验证失败',
        missingFields: validation.missingFields,
        errors: validation.errors
      });
    }

    // 执行占卜
    const result = await triggerDivination({
      type,
      parameters,
      userId,
      language
    });

    res.json(result);
  } catch (error: any) {
    console.error('[API] 占卜执行失败:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * API 路由: 商品匹配
 * POST /api/products/match
 */
app.post('/api/products/match', async (req, res) => {
  try {
    const { divinationResult, userId, limit } = req.body;

    if (!divinationResult || !userId) {
      return res.status(400).json({
        success: false,
        error: '缺少必填字段: divinationResult, userId'
      });
    }

    const result = await matchProducts({
      divinationResult,
      userId,
      limit
    });

    res.json(result);
  } catch (error: any) {
    console.error('[API] 商品匹配失败:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * API 路由: 获取商品详情
 * GET /api/products/:productId
 */
app.get('/api/products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await getProductDetail(productId);
    res.json(result);
  } catch (error: any) {
    console.error('[API] 获取商品详情失败:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * API 路由: 搜索商品
 * GET /api/products/search?q=xxx
 */
app.get('/api/products/search', async (req, res) => {
  try {
    const query = req.query.q as string;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: '缺少搜索关键词'
      });
    }

    const result = await searchProducts(query, limit);
    res.json(result);
  } catch (error: any) {
    console.error('[API] 商品搜索失败:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * API 路由: 完整流程测试
 * POST /api/test/full-flow
 */
app.post('/api/test/full-flow', async (req, res) => {
  try {
    const { type, parameters, userId } = req.body;

    console.log('[Test] 开始完整流程测试...');

    // 步骤 1: 执行占卜
    console.log('[Test] 步骤 1: 执行占卜...');
    const divinationResult = await triggerDivination({
      type,
      parameters,
      userId
    });

    if (!divinationResult.success) {
      return res.json({
        success: false,
        step: 'divination',
        error: divinationResult.error
      });
    }

    // 步骤 2: 匹配商品
    console.log('[Test] 步骤 2: 匹配商品...');
    const productResult = await matchProducts({
      divinationResult: divinationResult.divinationResult!,
      userId,
      limit: 3
    });

    if (!productResult.success) {
      return res.json({
        success: false,
        step: 'product_matching',
        error: productResult.error
      });
    }

    console.log('[Test] 完整流程测试成功！');

    res.json({
      success: true,
      flow: {
        step1_divination: {
          success: true,
          messages: divinationResult.messages,
          result: divinationResult.divinationResult
        },
        step2_products: {
          success: true,
          messages: productResult.messages,
          recommendations: productResult.recommendations
        }
      }
    });
  } catch (error: any) {
    console.error('[Test] 完整流程测试失败:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log('║   对话与导购智能体 (Conversation & Recommendation)    ║');
  console.log('╚═══════════════════════════════════════════════════════╝');
  console.log(`\n🚀 服务已启动: http://localhost:${PORT}`);
  console.log(`\n📍 可用端点:`);
  console.log(`   GET  /health - 健康检查`);
  console.log(`   GET  /api/divination/forms/:type - 获取占卜表单`);
  console.log(`   POST /api/divination/perform - 执行占卜`);
  console.log(`   POST /api/products/match - 商品匹配`);
  console.log(`   GET  /api/products/:id - 获取商品详情`);
  console.log(`   GET  /api/products/search - 搜索商品`);
  console.log(`   POST /api/test/full-flow - 完整流程测试`);
  console.log(`\n🔗 MCP Server: ${process.env.MCP_SERVER_URL || 'http://localhost:3000'}`);
  console.log(`🔗 MongoDB: ${process.env.MONGODB_URL || 'mongodb://localhost:27017'}`);
  console.log('\n✨ 准备就绪，等待请求...\n');
});

export default app;
