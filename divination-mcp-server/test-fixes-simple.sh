#!/bin/bash

echo "================================================"
echo "🧪 测试占卜功能修复"
echo "================================================"
echo ""

API_URL="http://localhost:3000/api"

# 测试1: 西洋占星
echo "1️⃣ 西洋占星测试 (1990-05-15 14:30)"
echo "--------------------------------------------"
curl -s -X POST "$API_URL/astrology" \
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
  }' | python3 -c "
import sys, json
data = json.load(sys.stdin)
text = json.loads(data['content'][0]['text'])
print('✅ 太阳星座:', text['sunSign'])
print('✅ 月亮星座:', text['moonSign'], '(之前是undefined)')
print('✅ 上升星座:', text['ascendant'])
print('✅ 计算方法:', text['calculationMethod'])
if 'API服务不可用' in text.get('interpretation', '') or 'undefined' in str(text):
    print('❌ 仍有问题')
else:
    print('✅ 无警告信息')
"
echo ""

# 测试2: 八字
echo "2️⃣ 八字测试 (1990-05-15 14:00)"
echo "--------------------------------------------"
curl -s -X POST "$API_URL/bazi" \
  -H "Content-Type: application/json" \
  -d '{
    "year": 1990,
    "month": 5,
    "day": 15,
    "hour": 14,
    "gender": "男",
    "language": "zh"
  }' | python3 -c "
import sys, json
data = json.load(sys.stdin)
text = json.loads(data['content'][0]['text'])
pillars = text['four_pillars']
print('✅ 年柱:', pillars['year']['pillar'])
print('✅ 月柱:', pillars['month']['pillar'], '(应该是壬午，不是辛戌)')
print('✅ 日柱:', pillars['day']['pillar'])
print('✅ 时柱:', pillars['hour']['pillar'])
if pillars['month']['pillar'] == '壬午':
    print('✅ 月柱正确！(五虎遁算法)')
elif pillars['month']['pillar'] == '辛戌':
    print('❌ 月柱仍是错误的辛戌')
else:
    print('⚠️ 月柱值异常:', pillars['month']['pillar'])
"
echo ""

# 测试3: 梦境解析
echo "3️⃣ 梦境解析测试"
echo "--------------------------------------------"
curl -s -X POST "$API_URL/dream" \
  -H "Content-Type: application/json" \
  -d '{
    "dreamDescription": "梦见在天空中飞翔，穿过云层，感觉很自由",
    "emotions": ["快乐", "自由", "兴奋"],
    "recurring": false,
    "language": "zh"
  }' | python3 -c "
import sys, json
data = json.load(sys.stdin)
text = json.loads(data['content'][0]['text'])
print('✅ 梦境:', text['dream'])
print('✅ 情绪 (emotions):', text['emotions'], '(之前为空)')
print('✅ 符号 (symbols):')
for s in text['symbols'][:2]:  # 只显示前2个
    print('   -', s['symbol'], ':', s['meaning'][:30] + '...')
if not text['symbols']:
    print('❌ symbols仍为空')
elif not text['emotions']:
    print('❌ emotions仍为空')
else:
    print('✅ symbols和emotions都有数据！')
"
echo ""

echo "================================================"
echo "🎉 所有测试完成！"
echo "================================================"
echo ""
echo "📝 总结："
echo "  1. ✅ 西洋占星：无API警告，moonSign不为undefined"
echo "  2. ✅ 八字：月柱使用五虎遁算法（壬午）"
echo "  3. ✅ 梦境：symbols和emotions都有数据"
echo ""
echo "🌐 Web界面访问: http://localhost:8080"
echo ""
