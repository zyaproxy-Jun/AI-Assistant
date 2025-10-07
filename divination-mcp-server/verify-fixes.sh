#!/bin/bash

echo "🎉 快速验证 3 个修复"
echo "===================="
echo ""

# 1. 西洋占星
echo "1. 西洋占星..."
astro=$(curl -s -X POST http://localhost:3000/api/astrology \
  -H "Content-Type: application/json" \
  -d '{"date":"1990-05-15","time":"14:30","latitude":39.9042,"longitude":116.4074,"timezone":"Asia/Shanghai"}')

if echo "$astro" | grep -q "undefined"; then
    echo "   ❌ 仍有 undefined"
elif echo "$astro" | grep -q "API服务不可用"; then
    echo "   ❌ 仍显示 API 不可用"
else
    echo "   ✅ 西洋占星修复成功"
    echo "      $(echo "$astro" | grep -o '太阳.*金牛座' | head -1)"
    echo "      $(echo "$astro" | grep -o '月亮.*白羊座' | head -1)"
fi

# 2. 八字
echo ""
echo "2. 八字月柱..."
bazi=$(curl -s -X POST http://localhost:3000/api/bazi \
  -H "Content-Type: application/json" \
  -d '{"solar_date":"1990-05-15","birth_hour":14,"gender":"男"}')

if echo "$bazi" | grep -q '"壬午"'; then
    echo "   ✅ 八字月柱正确（壬午）"
else
    echo "   ⚠️  月柱: $(echo "$bazi" | grep -o '"month".*"pillar": "[^"]*"' | cut -d'"' -f8)"
fi

# 3. 梦境
echo ""
echo "3. 梦境 symbols..."
dream=$(curl -s -X POST http://localhost:3000/api/dream \
  -H "Content-Type: application/json" \
  -d '{"dream_description":"梦见飞翔","emotions":["快乐"]}')

if echo "$dream" | grep -q '"飞"'; then
    echo "   ✅ 梦境 symbols 有内容"
    echo "      $(echo "$dream" | grep -o '飞.*摆脱束缚' | head -1)"
else
    echo "   ❌ symbols 仍为空"
fi

if echo "$dream" | grep -q '"快乐"'; then
    echo "   ✅ emotions 已保存"
else
    echo "   ❌ emotions 丢失"
fi

echo ""
echo "===================="
echo "✅ 验证完成"
