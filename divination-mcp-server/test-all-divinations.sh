#!/bin/bash

# 占卜功能快速测试脚本
# 测试所有 7 种占卜系统

echo "╔════════════════════════════════════════════════════════════╗"
echo "║        🔮 占卜 MCP 服务器 - 功能测试                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

API_BASE="http://localhost:3000/api"

# 颜色代码
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 测试计数
total=0
passed=0
failed=0

# 测试函数
test_api() {
    local name=$1
    local endpoint=$2
    local data=$3
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🧪 测试: $name"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    total=$((total + 1))
    
    response=$(curl -s -X POST \
        -H "Content-Type: application/json" \
        -d "$data" \
        "$API_BASE/$endpoint" 2>&1)
    
    if [ $? -eq 0 ] && echo "$response" | grep -q -v "error"; then
        echo -e "${GREEN}✅ 通过${NC}"
        echo "响应预览: $(echo "$response" | head -c 150)..."
        passed=$((passed + 1))
    else
        echo -e "${RED}❌ 失败${NC}"
        echo "错误: $response"
        failed=$((failed + 1))
    fi
    echo ""
}

echo "开始测试所有占卜功能..."
echo ""

# 1. 塔罗牌
test_api "塔罗牌占卜" "tarot" '{
  "question": "我今年的事业运势如何？",
  "spread_type": "single",
  "language": "zh-CN"
}'

# 2. 紫微斗数
test_api "紫微斗数排盘" "ziwei" '{
  "birth_year": 1990,
  "birth_month": 5,
  "birth_day": 15,
  "birth_hour": 14,
  "gender": "male",
  "language": "zh-CN"
}'

# 3. 西方占星
test_api "西方占星星盘" "astrology" '{
  "birth_year": 1990,
  "birth_month": 5,
  "birth_day": 15,
  "birth_hour": 14,
  "birth_minute": 30,
  "latitude": 39.9042,
  "longitude": 116.4074,
  "timezone": 8,
  "language": "zh-CN"
}'

# 4. 梦境解析
test_api "梦境解析" "dream" '{
  "dream_description": "我梦见自己在飞翔，飞过高山和海洋，感觉很自由。",
  "emotions": ["自由", "兴奋"],
  "recurring": false,
  "language": "zh-CN"
}'

# 5. 八字排盘
test_api "八字排盘" "bazi" '{
  "birth_year": 1990,
  "birth_month": 5,
  "birth_day": 15,
  "birth_hour": 14,
  "gender": "male",
  "language": "zh-CN"
}'

# 6. 易经占卜
test_api "易经占卜" "iching" '{
  "question": "最近应该换工作吗？",
  "method": "three_coins",
  "language": "zh-CN"
}'

# 7. 数字命理
test_api "数字命理" "divination" '{
  "tool": "numerology_reading",
  "args": {
    "birth_date": "1990-05-15",
    "full_name": "张三",
    "language": "zh-CN"
  }
}'

# 测试总结
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    📊 测试总结                             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "总测试数: $total"
echo -e "${GREEN}通过: $passed${NC}"
echo -e "${RED}失败: $failed${NC}"
echo ""

if [ $failed -eq 0 ]; then
    echo -e "${GREEN}🎉 所有测试通过！${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️ 有 $failed 个测试失败${NC}"
    exit 1
fi
