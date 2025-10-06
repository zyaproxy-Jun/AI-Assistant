#!/bin/bash

# 综合占卜 MCP Server 功能测试脚本
# Simple functional test script

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║      🔮 综合占卜 MCP Server - 功能测试 🔮                ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 测试计数
TOTAL=0
PASSED=0

# 启动服务器
echo -e "${BLUE}🚀 启动 MCP 服务器...${NC}"
node dist/index.js &
SERVER_PID=$!
sleep 2

if ps -p $SERVER_PID > /dev/null; then
    echo -e "${GREEN}✅ 服务器已启动 (PID: $SERVER_PID)${NC}"
    echo ""
else
    echo -e "${RED}❌ 服务器启动失败${NC}"
    exit 1
fi

# 测试函数
test_tool() {
    local tool_name=$1
    local request=$2
    local description=$3
    
    TOTAL=$((TOTAL + 1))
    echo -e "${BLUE}测试 $TOTAL: $description${NC}"
    echo "═══════════════════════════════════════════════════════════"
    
    # 发送请求并获取响应
    response=$(echo "$request" | node dist/index.js 2>/dev/null | tail -n 1)
    
    # 检查响应
    if echo "$response" | grep -q "\"result\""; then
        echo -e "${GREEN}✅ 测试通过${NC}"
        PASSED=$((PASSED + 1))
        
        # 显示部分结果
        if command -v jq &> /dev/null; then
            echo "$response" | jq -r '.result.content[0].text' 2>/dev/null | head -n 5
        fi
    else
        echo -e "${RED}❌ 测试失败${NC}"
        echo "响应: $response"
    fi
    echo ""
}

# 测试 1: 列出工具
echo -e "${YELLOW}📋 测试工具列表${NC}"
echo "═══════════════════════════════════════════════════════════"
TOTAL=$((TOTAL + 1))

list_request='{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
response=$(echo "$list_request" | node dist/index.js 2>/dev/null | tail -n 1)

if echo "$response" | grep -q "tarot_reading"; then
    echo -e "${GREEN}✅ 工具列表测试通过${NC}"
    PASSED=$((PASSED + 1))
    
    # 统计工具数量
    if command -v jq &> /dev/null; then
        tool_count=$(echo "$response" | jq '.result.tools | length')
        echo "   找到 $tool_count 个工具"
    fi
else
    echo -e "${RED}❌ 工具列表测试失败${NC}"
fi
echo ""

# 测试 2: 塔罗占卜
echo -e "${YELLOW}🃏 测试塔罗占卜${NC}"
echo "═══════════════════════════════════════════════════════════"
TOTAL=$((TOTAL + 1))

tarot_request='{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"tarot_reading","arguments":{"spread_type":"single","question":"今天的运势","language":"zh-CN"}}}'
response=$(echo "$tarot_request" | node dist/index.js 2>/dev/null | tail -n 1)

if echo "$response" | grep -q "\"cards\""; then
    echo -e "${GREEN}✅ 塔罗占卜测试通过${NC}"
    PASSED=$((PASSED + 1))
    
    if command -v jq &> /dev/null; then
        echo "$response" | jq -r '.result.content[0].text' 2>/dev/null | head -n 10
    fi
else
    echo -e "${RED}❌ 塔罗占卜测试失败${NC}"
fi
echo ""

# 测试 3: 易经卜卦
echo -e "${YELLOW}☯️  测试易经卜卦${NC}"
echo "═══════════════════════════════════════════════════════════"
TOTAL=$((TOTAL + 1))

iching_request='{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"iching_divination","arguments":{"question":"测试问题","method":"coins","language":"zh-CN"}}}'
response=$(echo "$iching_request" | node dist/index.js 2>/dev/null | tail -n 1)

if echo "$response" | grep -q "\"question\""; then
    echo -e "${GREEN}✅ 易经卜卦测试通过${NC}"
    PASSED=$((PASSED + 1))
    
    if command -v jq &> /dev/null; then
        echo "$response" | jq -r '.result.content[0].text' 2>/dev/null | head -n 10
    fi
else
    echo -e "${RED}❌ 易经卜卦测试失败${NC}"
fi
echo ""

# 测试 4: 易经卦象
echo -e "${YELLOW}☯️  测试易经卦象解读${NC}"
echo "═══════════════════════════════════════════════════════════"
TOTAL=$((TOTAL + 1))

hexagram_request='{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"iching_hexagram","arguments":{"hexagram_number":1,"changing_lines":[],"language":"zh-CN"}}}'
response=$(echo "$hexagram_request" | node dist/index.js 2>/dev/null | tail -n 1)

if echo "$response" | grep -q "\"hexagram_name\""; then
    echo -e "${GREEN}✅ 易经卦象测试通过${NC}"
    PASSED=$((PASSED + 1))
    
    if command -v jq &> /dev/null; then
        echo "$response" | jq -r '.result.content[0].text' 2>/dev/null | head -n 10
    fi
else
    echo -e "${RED}❌ 易经卦象测试失败${NC}"
fi
echo ""

# 停止服务器
kill $SERVER_PID 2>/dev/null
echo -e "${BLUE}🛑 服务器已停止${NC}"
echo ""

# 打印总结
echo "═══════════════════════════════════════════════════════════"
echo -e "${YELLOW}📊 测试总结${NC}"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "总测试数: $TOTAL"
echo "通过数量: $PASSED"
echo "失败数量: $((TOTAL - PASSED))"
echo ""

SUCCESS_RATE=$(awk "BEGIN {printf \"%.1f\", ($PASSED/$TOTAL)*100}")
echo "成功率: $SUCCESS_RATE%"
echo ""

if [ $PASSED -eq $TOTAL ]; then
    echo -e "${GREEN}🎉 所有测试通过！项目功能正常！${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  部分测试失败，请检查详细日志${NC}"
    exit 1
fi
