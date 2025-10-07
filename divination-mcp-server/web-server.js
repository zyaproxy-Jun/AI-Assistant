#!/usr/bin/env node

/**
 * HTTP 服务器，提供占卜功能测试网页和 API 接口
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8080;
const HOST = '0.0.0.0';

// MCP 客户端
let mcpClient = null;
let isConnecting = false;

// 初始化 MCP 客户端连接
async function initMCPClient() {
  if (mcpClient || isConnecting) return mcpClient;
  
  isConnecting = true;
  try {
    const serverPath = path.join(__dirname, 'dist', 'index.js');
    const transport = new StdioClientTransport({
      command: 'node',
      args: [serverPath]
    });

    const client = new Client({
      name: 'web-test-client',
      version: '1.0.0'
    }, {
      capabilities: {}
    });

    await client.connect(transport);
    mcpClient = client;
    console.log('✓ MCP 客户端连接成功');
    return client;
  } catch (error) {
    console.error('✗ MCP 客户端连接失败:', error.message);
    throw error;
  } finally {
    isConnecting = false;
  }
}

// 处理 API 请求
async function handleAPIRequest(req, res) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const { tool, args } = JSON.parse(body);
      
      // 确保 MCP 客户端已连接
      const client = await initMCPClient();
      
      // 调用 MCP 工具
      const result = await client.callTool({
        name: tool,
        arguments: args
      });

      // 返回结果
      res.writeHead(200, { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify({
        success: true,
        result: result.content[0].text
      }));
    } catch (error) {
      console.error('API 调用错误:', error);
      res.writeHead(500, { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify({
        success: false,
        error: error.message
      }));
    }
  });
}

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // API 端点
  if (req.url === '/api/divination') {
    handleAPIRequest(req, res);
    return;
  }

  // CORS 预检请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // 提供 test-web.html 文件
  if (req.url === '/' || req.url === '/index.html' || req.url === '/test-web.html') {
    const filePath = path.join(__dirname, 'test-web.html');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 - Internal Server Error');
        return;
      }
      
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Not Found');
  }
});

server.listen(PORT, HOST, async () => {
  console.log('');
  console.log('🔮 综合占卜系统测试服务器已启动');
  console.log('='.repeat(60));
  console.log('');
  console.log(`  本地访问: http://localhost:${PORT}`);
  console.log(`  网络访问: http://${HOST}:${PORT}`);
  console.log(`  API 端点: http://localhost:${PORT}/api/divination`);
  console.log('');
  console.log('='.repeat(60));
  console.log('');
  
  // 初始化 MCP 客户端
  try {
    await initMCPClient();
    console.log('');
    console.log('✅ 支持的占卜系统：');
    console.log('  🃏 塔罗占卜 - 78张完整塔罗牌');
    console.log('  ⭐ 紫微斗数 - 中国传统命理');
    console.log('  🌌 西洋占星 - 专业星盘计算');
    console.log('  💭 梦境解析 - AI心理分析');
    console.log('  🎋 八字命理 - 四柱推算');
    console.log('  ☯️ 易经卜卦 - 六十四卦');
    console.log('');
    console.log('📝 现在可以在网页中实际测试占卜功能！');
  } catch (error) {
    console.log('');
    console.log('⚠️  无法连接 MCP 服务器');
    console.log('   页面仍然可以访问，但功能调用会失败');
  }
  console.log('');
  console.log('按 Ctrl+C 停止服务器');
  console.log('');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ 端口 ${PORT} 已被占用，请关闭其他程序或更改端口`);
  } else {
    console.error('❌ 服务器错误:', err);
  }
  process.exit(1);
});

// 优雅退出
process.on('SIGINT', () => {
  console.log('\n\n👋 正在关闭服务器...');
  
  if (mcpClient) {
    mcpClient.close().catch(() => {});
  }
  
  server.close(() => {
    console.log('✅ 服务器已关闭');
    process.exit(0);
  });
});
