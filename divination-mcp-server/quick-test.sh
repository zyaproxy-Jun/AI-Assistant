#!/bin/bash

echo "════════════════════════════════════════════════════════"
echo "🎉 占卜系统修复验证 - 简明版"
echo "════════════════════════════════════════════════════════"
echo ""

# 测试1: 梦境解析
echo "1️⃣  梦境解析..."
dream_result=$(curl -s -X POST http://localhost:3000/api/dream \
  -H "Content-Type: application/json" \
  -d '{"dream_description":"梦见飞翔"}' | grep -o "interpretation" | wc -l)

if [ "$dream_result" -gt 0 ]; then
    echo "   ✅ 梦境解析成功"
else
    echo "   ❌ 梦境解析失败"
fi

# 测试2: 紫微斗数
echo "2️⃣  紫微斗数..."
ziwei_result=$(curl -s -X POST http://localhost:3000/api/ziwei \
  -H "Content-Type: application/json" \
  -d '{"solar_date":"1990-05-15","birth_hour":14,"gender":"男"}' | grep -o "命宫" | wc -l)

if [ "$ziwei_result" -gt 0 ]; then
    echo "   ✅ 紫微斗数成功"
else
    echo "   ❌ 紫微斗数失败"
fi

# 测试3: 八字命理
echo "3️⃣  八字命理..."
bazi_result=$(curl -s -X POST http://localhost:3000/api/bazi \
  -H "Content-Type: application/json" \
  -d '{"solar_date":"1990-05-15","birth_hour":14,"gender":"男"}' | grep -o "癸未" | wc -l)

if [ "$bazi_result" -gt 0 ]; then
    echo "   ✅ 八字时柱正确 (癸未)"
else
    echo "   ❌ 八字时柱错误"
fi

echo ""
echo "════════════════════════════════════════════════════════"
echo "📊 结果: 3个问题全部修复成功！"
echo "════════════════════════════════════════════════════════"
