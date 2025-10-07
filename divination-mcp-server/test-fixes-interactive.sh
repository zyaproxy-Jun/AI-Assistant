#!/bin/bash

# 综合占卜系统 - 3个修复功能快速测试
# 测试：西洋占星、八字命理、梦境解析

echo "🔮 综合占卜系统 - 修复功能测试"
echo "=================================================="
echo ""

API_URL="http://localhost:3000"

echo "📋 测试计划："
echo "  1. 西洋占星 - 验证无警告，月亮星座正常"
echo "  2. 八字命理 - 验证月柱计算正确（壬午）"
echo "  3. 梦境解析 - 验证symbols和emotions有数据"
echo ""
echo "=================================================="
echo ""

# 测试1: 西洋占星
echo "🌌 测试1: 西洋占星 (1990-05-15 14:00)"
echo "--------------------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL/api/astrology" \
  -H "Content-Type: application/json" \
  -d '{
    "year": 1990,
    "month": 5,
    "day": 15,
    "hour": 14,
    "minute": 0,
    "latitude": 39.9,
    "longitude": 116.4,
    "timezone": "Asia/Shanghai",
    "language": "zh-CN"
  }')

echo "$RESPONSE" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    content = json.loads(data['content'][0]['text'])
    
    print(f\"  ✅ 太阳星座: {content['sunSign']}\")
    print(f\"  ✅ 月亮星座: {content['moonSign']}\")
    print(f\"  ✅ 上升星座: {content['ascendant']}\")
    print(f\"  ✅ 计算方法: {content['calculationMethod']}\")
    
    if 'undefined' in content['moonSign']:
        print('  ❌ 错误：月亮星座为undefined')
    elif '不可用' in content.get('interpretation', ''):
        print('  ❌ 错误：仍有API不可用警告')
    else:
        print('  🎉 测试通过：无警告，月亮星座正常！')
except Exception as e:
    print(f'  ❌ 解析错误: {e}')
" 2>/dev/null || echo "  ⚠️ 需要安装python3"

echo ""

# 测试2: 八字命理
echo "🎋 测试2: 八字命理 (1990-05-15 14:00)"
echo "--------------------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL/api/bazi" \
  -H "Content-Type: application/json" \
  -d '{
    "year": 1990,
    "month": 5,
    "day": 15,
    "hour": 14,
    "gender": "男",
    "language": "zh-CN"
  }')

echo "$RESPONSE" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    content = json.loads(data['content'][0]['text'])
    
    pillars = content['four_pillars']
    print(f\"  ✅ 年柱: {pillars['year']['pillar']}\")
    print(f\"  ✅ 月柱: {pillars['month']['pillar']}\")
    print(f\"  ✅ 日柱: {pillars['day']['pillar']}\")
    print(f\"  ✅ 时柱: {pillars['hour']['pillar']}\")
    
    if pillars['month']['pillar'] == '壬午':
        print('  🎉 测试通过：月柱正确（壬午，符合五虎遁）！')
    elif pillars['month']['pillar'] == '辛戌':
        print('  ❌ 错误：月柱为辛戌（修复前的错误）')
    else:
        print(f\"  ⚠️ 月柱为 {pillars['month']['pillar']}，请验证\")
except Exception as e:
    print(f'  ❌ 解析错误: {e}')
" 2>/dev/null || echo "  ⚠️ 需要安装python3"

echo ""

# 测试3: 梦境解析
echo "💭 测试3: 梦境解析"
echo "--------------------------------------------------"
RESPONSE=$(curl -s -X POST "$API_URL/api/dream" \
  -H "Content-Type: application/json" \
  -d '{
    "dream": "梦见在天空中飞翔，穿过云层，感觉很自由",
    "emotions": ["快乐", "自由", "兴奋"],
    "recurring": false,
    "language": "zh-CN"
  }')

echo "$RESPONSE" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    content = json.loads(data['content'][0]['text'])
    
    symbols = content.get('symbols', [])
    emotions = content.get('emotions', [])
    
    print(f\"  ✅ Symbols数量: {len(symbols)}\")
    if symbols:
        print(f\"     - 第一个符号: {symbols[0]['symbol']} - {symbols[0]['meaning'][:30]}...\")
    
    print(f\"  ✅ Emotions数量: {len(emotions)}\")
    if emotions:
        print(f\"     - 情绪列表: {', '.join(emotions)}\")
    
    if len(symbols) > 0 and len(emotions) > 0:
        print('  🎉 测试通过：symbols和emotions都有数据！')
    else:
        print('  ❌ 错误：symbols或emotions为空')
except Exception as e:
    print(f'  ❌ 解析错误: {e}')
" 2>/dev/null || echo "  ⚠️ 需要安装python3"

echo ""
echo "=================================================="
echo "✅ 测试完成！"
echo ""
echo "🌐 Web界面: http://localhost:8080"
echo "🔧 API服务: http://localhost:3000"
echo "📊 详细报告: FIX_3_ISSUES_REPORT.md"
echo "=================================================="
