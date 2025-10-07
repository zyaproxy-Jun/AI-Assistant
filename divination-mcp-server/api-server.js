#!/usr/bin/env node

/**
 * Divination MCP Server - HTTP API Bridge
 * 将 MCP Server 功能暴露为 HTTP API 供前端调用
 */

import http from 'http';
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

// MCP Server instance
let mcpProcess = null;

// Start MCP Server
function startMCPServer() {
    console.log('🚀 Starting MCP Server...');
    
    mcpProcess = spawn('node', [path.join(__dirname, 'dist', 'index.js')], {
        stdio: ['pipe', 'pipe', 'pipe']
    });

    mcpProcess.stdout.on('data', (data) => {
        console.log(`[MCP] ${data.toString().trim()}`);
    });

    mcpProcess.stderr.on('data', (data) => {
        console.error(`[MCP Error] ${data.toString().trim()}`);
    });

    mcpProcess.on('close', (code) => {
        console.log(`MCP Server exited with code ${code}`);
        mcpProcess = null;
    });

    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('✅ MCP Server started');
            resolve();
        }, 1000);
    });
}

// Call MCP Tool
async function callMCPTool(toolName, args) {
    return new Promise((resolve, reject) => {
        const request = {
            jsonrpc: '2.0',
            id: Date.now(),
            method: 'tools/call',
            params: {
                name: toolName,
                arguments: args
            }
        };

        if (!mcpProcess || mcpProcess.killed) {
            return reject(new Error('MCP Server not running'));
        }

        let responseData = '';
        let errorData = '';
        let timeout;

        const cleanup = () => {
            clearTimeout(timeout);
            mcpProcess.stdout.removeListener('data', onData);
            mcpProcess.stderr.removeListener('data', onError);
        };

        const onData = (data) => {
            responseData += data.toString();
            
            try {
                // Try to parse complete JSON response
                const lines = responseData.trim().split('\n');
                for (const line of lines) {
                    if (line.trim()) {
                        const response = JSON.parse(line);
                        if (response.id === request.id) {
                            cleanup();
                            if (response.error) {
                                reject(new Error(response.error.message || 'MCP call failed'));
                            } else {
                                resolve(response.result);
                            }
                            return;
                        }
                    }
                }
            } catch (e) {
                // Not complete JSON yet, wait for more data
            }
        };

        const onError = (data) => {
            errorData += data.toString();
        };

        mcpProcess.stdout.on('data', onData);
        mcpProcess.stderr.on('data', onError);

        // Set timeout
        timeout = setTimeout(() => {
            cleanup();
            reject(new Error('MCP call timeout'));
        }, 30000); // 30 second timeout

        // Send request
        mcpProcess.stdin.write(JSON.stringify(request) + '\n');
    });
}

// HTTP Request Handler
const server = http.createServer(async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Health check
    if (req.url === '/health' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'ok',
            mcpStatus: mcpProcess && !mcpProcess.killed ? 'running' : 'stopped',
            timestamp: new Date().toISOString()
        }));
        return;
    }

    // Serve index.html
    if (req.url === '/' && req.method === 'GET') {
        const indexPath = path.join(__dirname, 'index.html');
        if (fs.existsSync(indexPath)) {
            const content = fs.readFileSync(indexPath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(content);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('index.html not found');
        }
        return;
    }

    // API endpoints
    if (req.url.startsWith('/api/') && req.method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const endpoint = req.url.substring(5); // Remove '/api/'
                
                let result;
                const startTime = Date.now();

                switch (endpoint) {
                    case 'tarot':
                        result = await callMCPTool('tarot_reading', data);
                        break;
                    
                    case 'ziwei':
                        result = await callMCPTool('ziwei_chart', data);
                        break;
                    
                    case 'astrology':
                        result = await callMCPTool('birth_chart', data);
                        break;
                    
                    case 'dream':
                        result = await callMCPTool('interpret_dream', data);
                        break;
                    
                    case 'bazi':
                        result = await callMCPTool('bazi_analysis', data);
                        break;
                    
                    case 'iching':
                        result = await callMCPTool('iching_divination', data);
                        break;
                    
                    default:
                        throw new Error('Unknown API endpoint');
                }

                const responseTime = Date.now() - startTime;
                
                console.log(`✅ ${endpoint} request completed in ${responseTime}ms`);
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    ...result,
                    _meta: {
                        responseTime,
                        timestamp: new Date().toISOString()
                    }
                }));
            } catch (error) {
                console.error(`❌ API Error: ${error.message}`);
                
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: error.message,
                    timestamp: new Date().toISOString()
                }));
            }
        });

        return;
    }

    // 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...');
    
    if (mcpProcess && !mcpProcess.killed) {
        mcpProcess.kill();
    }
    
    server.close(() => {
        console.log('👋 Server closed');
        process.exit(0);
    });
});

// Start server
async function start() {
    console.log('╔════════════════════════════════════════╗');
    console.log('║  🔮 Divination MCP Server - API Mode  ║');
    console.log('╚════════════════════════════════════════╝');
    console.log();
    
    try {
        await startMCPServer();
        
        server.listen(PORT, () => {
            console.log();
            console.log('🌐 HTTP API Server started:');
            console.log(`   http://localhost:${PORT}`);
            console.log();
            console.log('📡 Available endpoints:');
            console.log('   GET  /              - Web UI');
            console.log('   GET  /health        - Health check');
            console.log('   POST /api/tarot     - Tarot reading');
            console.log('   POST /api/ziwei     - Ziwei chart');
            console.log('   POST /api/astrology - Birth chart');
            console.log('   POST /api/dream     - Dream interpretation');
            console.log('   POST /api/bazi      - Bazi analysis');
            console.log('   POST /api/iching    - I Ching divination');
            console.log();
            console.log('✨ Ready to serve requests!');
            console.log('   Press Ctrl+C to stop');
            console.log();
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
}

start();
