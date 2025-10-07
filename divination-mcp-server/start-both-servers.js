#!/usr/bin/env node

/**
 * 统一启动脚本 - 同时启动 API Server 和 Web Server
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('');
console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║  🔮 综合占卜系统 - 交互式测试服务器                        ║');
console.log('╚══════════════════════════════════════════════════════════╝');
console.log('');

let apiProcess = null;
let webProcess = null;

// 启动 API Server
function startAPIServer() {
    console.log('🚀 启动 API Server (端口 3000)...');
    apiProcess = spawn('node', [join(__dirname, 'api-server.js')], {
        stdio: 'inherit',
        cwd: __dirname
    });

    apiProcess.on('error', (err) => {
        console.error('❌ API Server 错误:', err);
    });

    apiProcess.on('exit', (code) => {
        console.log(`\n⚠️  API Server 退出 (代码: ${code})`);
        cleanup();
    });
}

// 启动 Web Server
function startWebServer() {
    console.log('🌐 启动 Web Server (端口 8080)...');
    webProcess = spawn('node', [join(__dirname, 'web-server.js')], {
        stdio: 'inherit',
        cwd: __dirname
    });

    webProcess.on('error', (err) => {
        console.error('❌ Web Server 错误:', err);
    });

    webProcess.on('exit', (code) => {
        console.log(`\n⚠️  Web Server 退出 (代码: ${code})`);
        cleanup();
    });
}

// 清理进程
function cleanup() {
    console.log('\n\n👋 正在停止服务器...');
    
    if (apiProcess && !apiProcess.killed) {
        apiProcess.kill('SIGTERM');
    }
    
    if (webProcess && !webProcess.killed) {
        webProcess.kill('SIGTERM');
    }
    
    setTimeout(() => {
        console.log('✅ 服务器已停止');
        process.exit(0);
    }, 1000);
}

// 监听退出信号
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// 启动服务
console.log('');
startAPIServer();

// 等待 2 秒后启动 Web Server
setTimeout(() => {
    startWebServer();
    
    setTimeout(() => {
        console.log('');
        console.log('╔══════════════════════════════════════════════════════════╗');
        console.log('║              🎉 服务器已成功启动！                        ║');
        console.log('╚══════════════════════════════════════════════════════════╝');
        console.log('');
        console.log('📋 访问地址:');
        console.log('   🌐 交互式测试: http://localhost:8080/test-interactive.html');
        console.log('   📄 静态展示:   http://localhost:8080/index.html');
        console.log('   🔌 API 状态:   http://localhost:3000/health');
        console.log('');
        console.log('💡 功能说明:');
        console.log('   • 填写表单即可直接测试各项占卜功能');
        console.log('   • 所有计算都在本地完成，无需网络');
        console.log('   • 支持 6 种占卜系统的完整功能');
        console.log('');
        console.log('⏹️  停止服务: 按 Ctrl+C');
        console.log('');
    }, 2000);
}, 2000);
