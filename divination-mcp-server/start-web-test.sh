#!/bin/bash

###############################################################################
# 网页测试界面快速启动脚本
# Web Testing Interface Quick Start Script
###############################################################################

echo ""
echo "🔮 综合占卜系统 - 网页测试界面"
echo "============================================================"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js"
    echo "请先安装 Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo ""

# 检查文件是否存在
if [ ! -f "test-web.html" ] || [ ! -f "web-server.js" ]; then
    echo "❌ 错误: 缺少必要文件"
    echo "请确保 test-web.html 和 web-server.js 存在"
    exit 1
fi

echo "✅ 文件检查通过"
echo ""
echo "🚀 正在启动测试服务器..."
echo ""

# 启动服务器
node web-server.js

# 如果服务器被关闭
echo ""
echo "👋 服务器已停止"
echo ""
