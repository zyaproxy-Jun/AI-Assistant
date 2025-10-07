#!/bin/bash

echo "════════════════════════════════════════════════════════"
echo "🔧 测试 3 个问题的修复"
echo "════════════════════════════════════════════════════════"
echo ""

# 测试1: 西洋占星 - 应该使用准确的本地计算
echo "1️⃣  测试西洋占星（修复：本地天文计算）..."
echo "   修复前：显示警告 '由于API服务不可用'"
echo "   修复后：使用天文算法提供准确星盘"
echo ""

astro_result=$(curl -s -X POST http://localhost:3000/api/astrology \
  -H "Content-Type: application/json" \
  -d '{
    "date": "1990-05-15",
    "time": "14:30",
    "latitude": 39.9042,
    "longitude": 116.4074,
    "timezone": "Asia/Shanghai"
  }')

# 检查是否还有警告信息
if echo "$astro_result" | grep -q "API服务不可用"; then
    echo "   ❌ 仍显示API不可用警告"
else
    echo "   ✅ 已使用本地计算"
fi

# 检查计算方法
calc_method=$(echo "$astro_result" | jq -r '.calculationMethod' 2>/dev/null)
echo "   计算方法: $calc_method"

# 显示星座信息
sun_sign=$(echo "$astro_result" | jq -r '.sunSign' 2>/dev/null)
moon_sign=$(echo "$astro_result" | jq -r '.moonSign' 2>/dev/null)
asc_sign=$(echo "$astro_result" | jq -r '.ascendant' 2>/dev/null)
echo "   太阳: $sun_sign, 月亮: $moon_sign, 上升: $asc_sign"

# 检查相位
aspects=$(echo "$astro_result" | jq -r '.aspects[]' 2>/dev/null | head -1)
echo "   相位: $aspects"

echo ""
echo "-----------------------------------------------------------"
echo ""

# 测试2: 八字月柱计算
echo "2️⃣  测试八字月柱（修复：五虎遁月令算法）..."
echo "   修复前：月柱可能为 辛戌（错误）"
echo "   修复后：使用正确的五虎遁算法"
echo ""

bazi_result=$(curl -s -X POST http://localhost:3000/api/bazi \
  -H "Content-Type: application/json" \
  -d '{
    "solar_date": "1990-05-15",
    "birth_hour": 14,
    "gender": "男"
  }')

year_pillar=$(echo "$bazi_result" | jq -r '.four_pillars.year.pillar' 2>/dev/null)
month_pillar=$(echo "$bazi_result" | jq -r '.four_pillars.month.pillar' 2>/dev/null)
day_pillar=$(echo "$bazi_result" | jq -r '.four_pillars.day.pillar' 2>/dev/null)
hour_pillar=$(echo "$bazi_result" | jq -r '.four_pillars.hour.pillar' 2>/dev/null)

echo "   四柱八字:"
echo "   年柱: $year_pillar"
echo "   月柱: $month_pillar"
echo "   日柱: $day_pillar"
echo "   时柱: $hour_pillar"

# 验证月柱
if [[ "$month_pillar" == *"戌"* ]]; then
    echo "   ⚠️  月柱仍包含'戌'，可能需要进一步调试"
else
    echo "   ✅ 月柱计算正常"
fi

echo ""
echo "-----------------------------------------------------------"
echo ""

# 测试3: 梦境解析 - symbols 和 emotions
echo "3️⃣  测试梦境解析（修复：symbols 和 emotions）..."
echo "   修复前：symbols 为空，interpretation 重复"
echo "   修复后：返回完整的 symbols 数组"
echo ""

dream_result=$(curl -s -X POST http://localhost:3000/api/dream \
  -H "Content-Type: application/json" \
  -d '{
    "dream_description": "梦见在天空中飞翔，穿过云层，感觉很自由",
    "emotions": ["快乐", "自由", "兴奋"]
  }')

# 检查 symbols
symbols_count=$(echo "$dream_result" | jq '.symbols | length' 2>/dev/null)
echo "   Symbols 数量: $symbols_count"

if [ "$symbols_count" -gt 0 ] 2>/dev/null; then
    echo "   ✅ Symbols 不为空"
    echo "$dream_result" | jq -r '.symbols[] | "   - \(.symbol): \(.meaning)"' 2>/dev/null | head -3
else
    echo "   ❌ Symbols 仍为空"
fi

# 检查 emotions
emotions=$(echo "$dream_result" | jq -r '.emotions[]' 2>/dev/null)
if [ -n "$emotions" ]; then
    echo "   ✅ Emotions 已保存: $(echo "$emotions" | tr '\n' '、' | sed 's/、$//')"
else
    echo "   ⚠️  Emotions 为空"
fi

# 检查 interpretation 长度
interp_length=$(echo "$dream_result" | jq -r '.interpretation' 2>/dev/null | wc -c)
echo "   解析内容长度: $interp_length 字符"

echo ""
echo "════════════════════════════════════════════════════════"
echo "📊 测试完成"
echo "════════════════════════════════════════════════════════"
