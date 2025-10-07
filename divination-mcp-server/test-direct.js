#!/usr/bin/env node

/**
 * 简单测试 - 直接在前端调用 MCP 工具
 * 不需要 API Server，直接测试
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// 导入所有工具
import { tarotReading } from './dist/tools/tarot.js';
import { ziweiAstrology } from './dist/tools/ziwei.js';
import { birthChart } from './dist/tools/astrology.js';
import { dreamInterpretation } from './dist/tools/dream.js';
import { baziAnalysis } from './dist/tools/bazi.js';
import { ichingDivination } from './dist/tools/iching.js';

console.log('🔮 测试占卜工具...\n');

// 测试塔罗
console.log('🃏 测试塔罗占卜...');
try {
  const result = await tarotReading({ question: '我的事业发展如何？' });
  console.log('✅ 塔罗占卜成功');
  console.log(result.content[0].text.substring(0, 200) + '...\n');
} catch (error) {
  console.error('❌ 塔罗占卜失败:', error.message);
}

// 测试紫微
console.log('⭐ 测试紫微斗数...');
try {
  const result = await ziweiAstrology({
    year: 1990,
    month: 5,
    day: 15,
    hour: 6,
    gender: 1
  });
  console.log('✅ 紫微斗数成功');
  console.log(result.content[0].text.substring(0, 200) + '...\n');
} catch (error) {
  console.error('❌ 紫微斗数失败:', error.message);
}

// 测试八字
console.log('🎋 测试八字命理...');
try {
  const result = await baziAnalysis({
    year: 1990,
    month: 5,
    day: 15,
    hour: 14,
    gender: 1
  });
  console.log('✅ 八字命理成功');
  console.log(result.content[0].text.substring(0, 200) + '...\n');
} catch (error) {
  console.error('❌ 八字命理失败:', error.message);
}

// 测试梦境
console.log('💭 测试梦境解析...');
try {
  const result = await dreamInterpretation({
    description: '我梦见自己在飞翔'
  });
  console.log('✅ 梦境解析成功');
  console.log(result.content[0].text.substring(0, 200) + '...\n');
} catch (error) {
  console.error('❌ 梦境解析失败:', error.message);
}

// 测试易经
console.log('☯️ 测试易经占卜...');
try {
  const result = await ichingDivination({
    question: '我是否应该换工作？',
    method: '时间起卦'
  });
  console.log('✅ 易经占卜成功');
  console.log(result.content[0].text.substring(0, 200) + '...\n');
} catch (error) {
  console.error('❌ 易经占卜失败:', error.message);
}

console.log('✅ 所有测试完成！');
