#!/bin/bash

# 综合占卜 MCP Server 测试脚本
# Test script for Divination MCP Server

echo "🔮 综合占卜 MCP Server 测试脚本"
echo "================================"
echo ""

# 检查 Node.js
echo "✓ 检查 Node.js 版本..."
node --version

# 检查构建文件
echo "✓ 检查构建文件..."
if [ -f "dist/index.js" ]; then
    echo "  构建文件存在"
else
    echo "  ❌ 构建文件不存在，运行 npm run build"
    npm run build
fi

echo ""
echo "================================"
echo "🌟 测试 1: 塔罗占卜"
echo "================================"
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"tarot_reading","arguments":{"spread_type":"single","question":"今天的运势","language":"zh-CN"}}}' | node dist/index.js 2>/dev/null | tail -n 1 | jq -r '.result.content[0].text' | head -n 20

echo ""
echo "================================"
echo "🌟 测试 2: 易经卜卦"
echo "================================"
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"iching_divination","arguments":{"question":"我应该如何规划未来","method":"coins","language":"zh-CN"}}}' | node dist/index.js 2>/dev/null | tail -n 1 | jq -r '.result.content[0].text' | head -n 20

echo ""
echo "================================"
echo "✅ 测试完成！"
echo "================================"
echo ""
echo "📝 使用提示："
echo "1. 查看完整文档: cat README.md"
echo "2. 查看使用指南: cat USAGE_GUIDE.md"
echo "3. 查看开发文档: cat DEVELOPMENT.md"
echo ""
echo "🚀 在 Claude Desktop 中配置此服务器："
echo "   编辑配置文件并添加："
echo '   {
  "mcpServers": {
    "divination": {
      "command": "node",
      "args": ["'$(pwd)'/dist/index.js"]
    }
  }
}'
echo ""
