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

  // 提供 HTML 文件
  if (req.url === '/' || req.url === '/index.html' || req.url === '/test-interactive.html') {
    let fileName = 'index.html';
    
    if (req.url === '/test-interactive.html') {
      fileName = 'test-interactive.html';
    } else if (req.url === '/') {
      // 默认重定向到交互式测试页面
      res.writeHead(302, { 'Location': '/test-interactive.html' });
      res.end();
      return;
    }
    
    const filePath = path.join(__dirname, fileName);
    
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
  console.log('📝 可用页面：');
  console.log('  1. http://localhost:8080/test-interactive.html (交互式测试)');
  console.log('  2. http://localhost:8080/index.html (静态展示)');
  console.log('');
  console.log('💡 说明：');
  console.log('  • test-interactive.html - 可实际测试所有占卜功能');
  console.log('  • index.html - 查看系统参数和功能说明');
  console.log('  • 需要同时启动 API Server (端口 3000)');
  console.log('  • 按 Ctrl+C 停止服务器');
  console.log('');
  console.log('✅ 支持的占卜系统：');
  console.log('  � 塔罗占卜   ⭐ 紫微斗数   🌌 西洋占星');
  console.log('  💭 梦境解析   🎋 八字命理   ☯️  易经占卜');
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
