#!/usr/bin/env node

/**
 * 简单的 HTTP 服务器，用于演示测试网页
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8080;
const HOST = '0.0.0.0';

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // 只提供 test-web.html 文件
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

server.listen(PORT, HOST, () => {
  console.log('');
  console.log('🔮 综合占卜系统测试服务器已启动');
  console.log('='.repeat(60));
  console.log('');
  console.log(`  本地访问: http://localhost:${PORT}`);
  console.log(`  网络访问: http://${HOST}:${PORT}`);
  console.log('');
  console.log('='.repeat(60));
  console.log('');
  console.log('📝 注意事项：');
  console.log('  1. 这是一个演示网页，展示所有占卜功能的参数');
  console.log('  2. 实际调用需要通过 Claude Desktop 的 MCP 协议');
  console.log('  3. 按 Ctrl+C 停止服务器');
  console.log('');
  console.log('✅ 支持的占卜系统：');
  console.log('  🃏 塔罗占卜 - 78张完整塔罗牌');
  console.log('  ⭐ 紫微斗数 - 中国传统命理');
  console.log('  🌌 西洋占星 - 专业星盘计算');
  console.log('  💭 梦境解析 - AI心理分析');
  console.log('  🎋 八字命理 - 四柱推算');
  console.log('  ☯️ 易经卜卦 - 六十四卦');
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
  server.close(() => {
    console.log('✅ 服务器已关闭');
    process.exit(0);
  });
});
