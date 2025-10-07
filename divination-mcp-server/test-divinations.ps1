# Divination API Test Script
# Test all 7 divination systems

Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host "  Divination MCP Server - Function Test" -ForegroundColor Cyan
Write-Host "===========================================================" -ForegroundColor Cyan
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
    
    Write-Host "----------------------------------------------------------" -ForegroundColor Gray
    Write-Host "Testing: $Name" -ForegroundColor Yellow
    Write-Host "----------------------------------------------------------" -ForegroundColor Gray
    
    $script:total++
    
    try {
        $response = Invoke-RestMethod -Uri "$apiBase/$Endpoint" -Method Post -Body $Data -ContentType "application/json" -ErrorAction Stop
        
        if ($response -and -not $response.error) {
            Write-Host "[PASS]" -ForegroundColor Green
            $jsonStr = ($response | ConvertTo-Json -Compress -Depth 2)
            $preview = $jsonStr.Substring(0, [Math]::Min(120, $jsonStr.Length))
            Write-Host "Preview: $preview..." -ForegroundColor Gray
            $script:passed++
        } else {
            Write-Host "[FAIL] - Response contains error" -ForegroundColor Red
            if ($response.error) {
                Write-Host "Error: $($response.error)" -ForegroundColor Red
            }
            $script:failed++
        }
    } catch {
        Write-Host "[FAIL]" -ForegroundColor Red
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        $script:failed++
    }
    Write-Host ""
}

Write-Host "Starting tests..." -ForegroundColor Cyan
Write-Host ""

# Test 1: Tarot
Test-API -Name "Tarot Reading" -Endpoint "tarot" -Data @'
{
  "question": "What is my career prospect this year?",
  "spread_type": "single",
  "language": "zh-CN"
}
'@

# Test 2: Ziwei
Test-API -Name "Ziwei Doushu Chart" -Endpoint "ziwei" -Data @'
{
  "birth_year": 1990,
  "birth_month": 5,
  "birth_day": 15,
  "birth_hour": 14,
  "gender": "male",
  "language": "zh-CN"
}
'@

# Test 3: Astrology
Test-API -Name "Western Astrology" -Endpoint "astrology" -Data @'
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

# Test 4: Dream
Test-API -Name "Dream Interpretation" -Endpoint "dream" -Data @'
{
  "dream_description": "I was flying over mountains and oceans, feeling very free.",
  "emotions": ["freedom", "excitement"],
  "recurring": false,
  "language": "zh-CN"
}
'@

# Test 5: Bazi
Test-API -Name "Bazi Analysis" -Endpoint "bazi" -Data @'
{
  "birth_year": 1990,
  "birth_month": 5,
  "birth_day": 15,
  "birth_hour": 14,
  "gender": "male",
  "language": "zh-CN"
}
'@

# Test 6: I Ching
Test-API -Name "I Ching Divination" -Endpoint "iching" -Data @'
{
  "question": "Should I change my job recently?",
  "method": "three_coins",
  "language": "zh-CN"
}
'@

# Test 7: Numerology
Test-API -Name "Numerology Reading" -Endpoint "divination" -Data @'
{
  "tool": "numerology_reading",
  "args": {
    "birth_date": "1990-05-15",
    "full_name": "Zhang San",
    "language": "zh-CN"
  }
}
'@

# Summary
Write-Host ""
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host "  Test Summary" -ForegroundColor Cyan
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Total tests: $total" -ForegroundColor White
Write-Host "Passed: $passed" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor Red
Write-Host ""

if ($failed -eq 0) {
    Write-Host "All tests passed!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "Warning: $failed test(s) failed" -ForegroundColor Yellow
    exit 1
}
