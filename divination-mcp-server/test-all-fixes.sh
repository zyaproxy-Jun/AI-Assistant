#!/bin/bash

echo "================================================"
echo "🧪 测试所有占卜功能修复"
echo "================================================"
echo ""

API_URL="http://localhost:3000/api"

# 颜色代码
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 测试1: 西洋占星 - 检查是否有警告信息和undefined
echo "📊 测试1: 西洋占星 (检查API警告和moonSign)"
echo "--------------------------------------------"
ASTRO_RESULT=$(curl -s -X POST "$API_URL/astrology" \
  -H "Content-Type: application/json" \
  -d '{
    "year": 1990,
    "month": 5,
    "day": 15,
    "hour": 14,
    "minute": 30,
    "latitude": 39.9,
    "longitude": 116.4,
    "timezone": 8,
    "language": "zh"
  }')

# 检查是否包含警告信息
if echo "$ASTRO_RESULT" | grep -q "API服务不可用\|不具有专业精度\|Fallback"; then
    echo -e "${RED}❌ 失败：仍然显示API不可用警告${NC}"
else
    echo -e "${GREEN}✅ 成功：无API不可用警告${NC}"
fi

# 检查moonSign是否为undefined
if echo "$ASTRO_RESULT" | grep -q '"moonSign": "undefined"'; then
    echo -e "${RED}❌ 失败：月亮星座仍为undefined${NC}"
else
    echo -e "${GREEN}✅ 成功：月亮星座已正确计算${NC}"
fi

# 显示计算方法
CALC_METHOD=$(echo "$ASTRO_RESULT" | grep -o '"calculationMethod": "[^"]*"' | head -1)
echo -e "${YELLOW}计算方法: $CALC_METHOD${NC}"

# 显示太阳和月亮星座
SUN_SIGN=$(echo "$ASTRO_RESULT" | grep -o '"sunSign": "[^"]*"' | head -1)
MOON_SIGN=$(echo "$ASTRO_RESULT" | grep -o '"moonSign": "[^"]*"' | head -1)
echo -e "${YELLOW}$SUN_SIGN${NC}"
echo -e "${YELLOW}$MOON_SIGN${NC}"

echo ""

# 测试2: 八字月柱
echo "📊 测试2: 八字月柱 (检查是否为壬午)"
echo "--------------------------------------------"
BAZI_RESULT=$(curl -s -X POST "$API_URL/bazi" \
  -H "Content-Type: application/json" \
  -d '{
    "year": 1990,
    "month": 5,
    "day": 15,
    "hour": 14,
    "gender": "男",
    "language": "zh"
  }')

# 提取月柱
MONTH_PILLAR=$(echo "$BAZI_RESULT" | grep -o '"month":[^}]*}' | grep -o '"pillar": "[^"]*"')
echo -e "${YELLOW}月柱: $MONTH_PILLAR${NC}"

# 检查是否为壬午（正确值）
if echo "$MONTH_PILLAR" | grep -q "壬午"; then
    echo -e "${GREEN}✅ 成功：月柱为壬午（正确，使用五虎遁算法）${NC}"
elif echo "$MONTH_PILLAR" | grep -q "辛戌"; then
    echo -e "${RED}❌ 失败：月柱仍为辛戌（错误）${NC}"
else
    echo -e "${YELLOW}⚠️ 月柱值: $MONTH_PILLAR${NC}"
fi

# 显示完整四柱
echo -e "${YELLOW}四柱：${NC}"
echo "$BAZI_RESULT" | grep -o '"four_pillars":[^}]*}[^}]*}[^}]*}[^}]*}[^}]*}' | sed 's/,/\n/g' | grep pillar

echo ""

# 测试3: 梦境解析
echo "📊 测试3: 梦境解析 (检查symbols和emotions)"
echo "--------------------------------------------"
DREAM_RESULT=$(curl -s -X POST "$API_URL/dream" \
  -H "Content-Type: application/json" \
  -d '{
    "dreamDescription": "梦见在天空中飞翔，穿过云层，感觉很自由",
    "emotions": ["快乐", "自由", "兴奋"],
    "recurring": false,
    "language": "zh"
  }')

# 检查symbols是否为空
if echo "$DREAM_RESULT" | grep -q '"symbols": \[\]'; then
    echo -e "${RED}❌ 失败：symbols为空数组${NC}"
else
    echo -e "${GREEN}✅ 成功：symbols有数据${NC}"
    SYMBOLS=$(echo "$DREAM_RESULT" | grep -o '"symbols":[^]]*]' | head -1)
    echo -e "${YELLOW}$SYMBOLS${NC}"
fi

# 检查emotions是否为空
if echo "$DREAM_RESULT" | grep -q '"emotions": \[\]'; then
    echo -e "${RED}❌ 失败：emotions为空数组${NC}"
else
    echo -e "${GREEN}✅ 成功：emotions有数据${NC}"
    EMOTIONS=$(echo "$DREAM_RESULT" | grep -o '"emotions":[^]]*]' | head -1)
    echo -e "${YELLOW}$EMOTIONS${NC}"
fi

echo ""
echo "================================================"
echo "✅ 测试完成"
echo "================================================"
echo ""
echo "💡 提示："
echo "  - 如需查看完整响应，请查看日志: tail -f /tmp/api-server.log"
echo "  - 访问Web界面测试: http://localhost:8080"
echo ""
