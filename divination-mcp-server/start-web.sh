#!/bin/bash

# 快速启动网页测试服务器脚本

echo "🔮 综合占卜系统 - 网页测试服务器"
echo "================================"
echo ""

# 检查是否已构建
if [ ! -d "dist" ]; then
    echo "📦 首次运行，正在安装依赖和构建..."
    npm install
    npm run build
    echo ""
fi

echo "🚀 启动测试服务器..."
echo ""
echo "提示："
echo "  - 在浏览器中访问: http://localhost:3000"
echo "  - 按 Ctrl+C 停止服务器"
echo ""

node web-server.js
