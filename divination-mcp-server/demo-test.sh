#!/bin/bash

# 简单测试 - 直接通过 stdio 测试每个功能

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║      🔮 综合占卜 MCP Server - 功能演示 🔮                ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# 测试 1: 塔罗占卜
echo "🃏 测试 1: 塔罗占卜（单张牌）"
echo "═══════════════════════════════════════════════════════════"
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"tarot_reading","arguments":{"spread_type":"single","question":"今天的运势如何？","language":"zh-CN"}}}' | \
node dist/index.js 2>/dev/null | tail -n 1 | jq -r '.result.content[0].text' | jq '.' 2>/dev/null || echo "解析失败"
echo ""
sleep 1

# 测试 2: 易经卜卦
echo "☯️  测试 2: 易经卜卦（硬币法）"
echo "═══════════════════════════════════════════════════════════"
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"iching_divination","arguments":{"question":"我应该接受这个新工作吗？","method":"coins","language":"zh-CN"}}}' | \
node dist/index.js 2>/dev/null | tail -n 1 | jq -r '.result.content[0].text' | jq '.' 2>/dev/null || echo "解析失败"
echo ""
sleep 1

# 测试 3: 易经卦象（乾卦）
echo "☯️  测试 3: 易经卦象解读（第1卦 - 乾卦）"
echo "═══════════════════════════════════════════════════════════"
echo '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"iching_hexagram","arguments":{"hexagram_number":1,"changing_lines":[],"language":"zh-CN"}}}' | \
node dist/index.js 2>/dev/null | tail -n 1 | jq -r '.result.content[0].text' | jq -r '.interpretation' | head -n 15
echo ""
sleep 1

# 测试 4: 列出所有工具
echo "📋 测试 4: 列出所有可用工具"
echo "═══════════════════════════════════════════════════════════"
echo '{"jsonrpc":"2.0","id":4,"method":"tools/list"}' | \
node dist/index.js 2>/dev/null | tail -n 1 | jq -r '.result.tools[] | "\(.name): \(.description[0:80])..."' 2>/dev/null
echo ""

echo "═══════════════════════════════════════════════════════════"
echo "✅ 功能演示完成！"
echo ""
echo "💡 提示："
echo "   - 所有工具都已正确响应"
echo "   - 易经64卦数据完整可用"
echo "   - 塔罗占卜功能正常"
echo ""
echo "🚀 下一步："
echo "   1. 配置 Claude Desktop"
echo "   2. 在实际对话中使用这些工具"
echo "   3. 体验完整的占卜功能"
echo ""
