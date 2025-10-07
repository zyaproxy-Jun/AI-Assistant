#!/usr/bin/env node

/**
 * 直接测试 MCP 服务器（不通过 HTTP API）
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 直接测试 MCP 服务器...\n');

const mcpProcess = spawn('node', [path.join(__dirname, 'dist', 'index.js')], {
    stdio: ['pipe', 'pipe', 'pipe']
});

let responseReceived = false;

mcpProcess.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    for (const line of lines) {
        if (line.trim()) {
            console.log('[MCP 输出]', line);
            
            try {
                const response = JSON.parse(line);
                if (response.id === 123) {
                    responseReceived = true;
                    console.log('\n✅ 收到响应:');
                    console.log(JSON.stringify(response, null, 2));
                    
                    if (response.result) {
                        const dreamResult = JSON.parse(response.result.content[0].text);
                        console.log('\n📊 梦境解析结果:');
                        console.log('- dream:', dreamResult.dream?.substring(0, 50) || '(空)');
                        console.log('- emotions:', dreamResult.emotions);
                        console.log('- symbols:', dreamResult.symbols?.length, '个');
                        if (dreamResult.symbols && dreamResult.symbols.length > 0) {
                            dreamResult.symbols.forEach(s => {
                                console.log(`  • ${s.symbol}`);
                            });
                        }
                    }
                    
                    setTimeout(() => {
                        mcpProcess.kill();
                        process.exit(0);
                    }, 1000);
                }
            } catch (e) {
                // 不是 JSON，忽略
            }
        }
    }
});

mcpProcess.stderr.on('data', (data) => {
    console.error('[MCP 错误]', data.toString().trim());
});

mcpProcess.on('close', (code) => {
    console.log(`\nMCP 进程退出，代码: ${code}`);
    if (!responseReceived) {
        console.log('❌ 未收到响应');
    }
});

// 等待启动
setTimeout(() => {
    console.log('\n📤 发送测试请求...\n');
    
    const request = {
        jsonrpc: '2.0',
        id: 123,
        method: 'tools/call',
        params: {
            name: 'interpret_dream',
            arguments: {
                dream_description: '我梦见自己在飞翔，飞过高山和海洋',
                emotions: ['开心', '兴奋'],
                recurring: false
            }
        }
    };
    
    console.log('请求内容:', JSON.stringify(request, null, 2));
    
    mcpProcess.stdin.write(JSON.stringify(request) + '\n');
    
    // 超时检测
    setTimeout(() => {
        if (!responseReceived) {
            console.log('\n❌ 30秒超时，未收到响应');
            mcpProcess.kill();
            process.exit(1);
        }
    }, 30000);
}, 2000);
