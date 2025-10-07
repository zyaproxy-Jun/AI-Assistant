#!/bin/bash

echo "════════════════════════════════════════════════════════"
echo "🔮 测试 Divination MCP Server API 端点"
echo "════════════════════════════════════════════════════════"
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 测试健康检查
echo "1️⃣  测试健康检查端点..."
curl -s http://localhost:3000/health
echo ""
echo ""

# 测试塔罗占卜
echo "2️⃣  测试塔罗占卜 API..."
curl -s -X POST http://localhost:3000/api/tarot \
  -H "Content-Type: application/json" \
  -d '{
    "spread_type": "single",
    "question": "今天的运势如何？"
  }' | jq -r '.cards[0].nameCN + " - " + .cards[0].keywords[0]' 2>/dev/null || echo "塔罗占卜请求已发送"
echo ""
echo ""

# 测试紫微斗数
echo "3️⃣  测试紫微斗数 API..."
curl -s -X POST http://localhost:3000/api/ziwei \
  -H "Content-Type: application/json" \
  -d '{
    "solar_date": "1990-05-15",
    "hour": 14,
    "gender": "男"
  }' | jq -r '.basic_info.zodiac + " - " + .soul_and_body.soul' 2>/dev/null || echo "紫微斗数请求已发送"
echo ""
echo ""

# 测试西洋占星
echo "4️⃣  测试西洋占星 API..."
curl -s -X POST http://localhost:3000/api/astrology \
  -H "Content-Type: application/json" \
  -d '{
    "date": "1990-05-15",
    "time": "14:30",
    "latitude": 39.9042,
    "longitude": 116.4074,
    "city": "北京"
  }' | jq -r '.sun_sign' 2>/dev/null || echo "西洋占星请求已发送"
echo ""
echo ""

# 测试梦境解析
echo "5️⃣  测试梦境解析 API..."
curl -s -X POST http://localhost:3000/api/dream \
  -H "Content-Type: application/json" \
  -d '{
    "dream": "梦见在天空中飞翔"
  }' | jq -r '.interpretation' | head -50 2>/dev/null || echo "梦境解析请求已发送"
echo ""
echo ""

# 测试八字命理
echo "6️⃣  测试八字命理 API..."
curl -s -X POST http://localhost:3000/api/bazi \
  -H "Content-Type: application/json" \
  -d '{
    "solar_date": "1990-05-15",
    "hour": 14,
    "gender": "男"
  }' | jq -r '.basic_info.bazi' 2>/dev/null || echo "八字命理请求已发送"
echo ""
echo ""

# 测试易经卜卦
echo "7️⃣  测试易经卜卦 API..."
curl -s -X POST http://localhost:3000/api/iching \
  -H "Content-Type: application/json" \
  -d '{
    "question": "事业发展"
  }' | jq -r '.hexagram_name' 2>/dev/null || echo "易经卜卦请求已发送"
echo ""
echo ""

echo "════════════════════════════════════════════════════════"
echo "✅ 所有 API 测试完成！"
echo "════════════════════════════════════════════════════════"
