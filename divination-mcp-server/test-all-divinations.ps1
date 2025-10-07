# 占卜功能快速测试脚本 (PowerShell)
# 测试所有 7 种占卜系统

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║        🔮 占卜 MCP 服务器 - 功能测试                      ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$apiBase = "http://localhost:3000/api"
$total = 0
$passed = 0
$failed = 0

function Test-API {
    param(
        [string]$Name,
        [string]$Endpoint,
        [string]$Data
    )
    
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    Write-Host "🧪 测试: $Name" -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
    
    $script:total++
    
    try {
        $response = Invoke-RestMethod -Uri "$apiBase/$Endpoint" -Method Post -Body $Data -ContentType "application/json" -ErrorAction Stop
        
        if ($response -and -not $response.error) {
            Write-Host "✅ 通过" -ForegroundColor Green
            $preview = ($response | ConvertTo-Json -Compress).Substring(0, [Math]::Min(150, ($response | ConvertTo-Json -Compress).Length))
            Write-Host "响应预览: $preview..." -ForegroundColor Gray
            $script:passed++
        } else {
            Write-Host "❌ 失败 - 响应包含错误" -ForegroundColor Red
            Write-Host "错误: $($response.error)" -ForegroundColor Red
            $script:failed++
        }
    } catch {
        Write-Host "❌ 失败" -ForegroundColor Red
        Write-Host "错误: $($_.Exception.Message)" -ForegroundColor Red
        $script:failed++
    }
    Write-Host ""
}

Write-Host "开始测试所有占卜功能..." -ForegroundColor Cyan
Write-Host ""

# 1. 塔罗牌
Test-API -Name "塔罗牌占卜" -Endpoint "tarot" -Data @'
{
  "question": "我今年的事业运势如何？",
  "spread_type": "single",
  "language": "zh-CN"
}
'@

# 2. 紫微斗数
Test-API -Name "紫微斗数排盘" -Endpoint "ziwei" -Data @'
{
  "birth_year": 1990,
  "birth_month": 5,
  "birth_day": 15,
  "birth_hour": 14,
  "gender": "male",
  "language": "zh-CN"
}
'@

# 3. 西方占星
Test-API -Name "西方占星星盘" -Endpoint "astrology" -Data @'
{
  "birth_year": 1990,
  "birth_month": 5,
  "birth_day": 15,
  "birth_hour": 14,
  "birth_minute": 30,
  "latitude": 39.9042,
  "longitude": 116.4074,
  "timezone": 8,
  "language": "zh-CN"
}
'@

# 4. 梦境解析
Test-API -Name "梦境解析" -Endpoint "dream" -Data @'
{
  "dream_description": "我梦见自己在飞翔，飞过高山和海洋，感觉很自由。",
  "emotions": ["自由", "兴奋"],
  "recurring": false,
  "language": "zh-CN"
}
'@

# 5. 八字排盘
Test-API -Name "八字排盘" -Endpoint "bazi" -Data @'
{
  "birth_year": 1990,
  "birth_month": 5,
  "birth_day": 15,
  "birth_hour": 14,
  "gender": "male",
  "language": "zh-CN"
}
'@

# 6. 易经占卜
Test-API -Name "易经占卜" -Endpoint "iching" -Data @'
{
  "question": "最近应该换工作吗？",
  "method": "three_coins",
  "language": "zh-CN"
}
'@

# 7. 数字命理
Test-API -Name "数字命理" -Endpoint "divination" -Data @'
{
  "tool": "numerology_reading",
  "args": {
    "birth_date": "1990-05-15",
    "full_name": "张三",
    "language": "zh-CN"
  }
}
'@

# 测试总结
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                    📊 测试总结                             ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "总测试数: $total" -ForegroundColor White
Write-Host "通过: $passed" -ForegroundColor Green
Write-Host "失败: $failed" -ForegroundColor Red
Write-Host ""

if ($failed -eq 0) {
    Write-Host "All tests passed!" -ForegroundColor Green
} else {
    Write-Host "Warning: $failed tests failed" -ForegroundColor Yellow
}
