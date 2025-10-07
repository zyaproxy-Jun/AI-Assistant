# 启动交互式测试服务器
# 同时启动 API Server (端口 3000) 和 Web Server (端口 8080)

Write-Host "`n" -ForegroundColor Cyan
Write-Host "╔══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  🔮 综合占卜系统 - 交互式测试服务器启动                     ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# 检查是否在正确的目录
if (-not (Test-Path "package.json")) {
    Write-Host "❌ 错误: 请在 divination-mcp-server 目录下运行此脚本" -ForegroundColor Red
    exit 1
}

# 检查是否已编译
if (-not (Test-Path "dist/index.js")) {
    Write-Host "⚠️  未找到编译文件，正在编译..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 编译失败" -ForegroundColor Red
        exit 1
    }
}

Write-Host "📦 准备启动服务..." -ForegroundColor Green
Write-Host ""

# 启动 API Server (后台)
Write-Host "🚀 启动 API Server (端口 3000)..." -ForegroundColor Cyan
$apiJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    node api-server.js
}

# 等待 API Server 启动
Start-Sleep -Seconds 2

# 检查 API Server 是否正常
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/health" -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ API Server 启动成功" -ForegroundColor Green
} catch {
    Write-Host "❌ API Server 启动失败" -ForegroundColor Red
    Stop-Job $apiJob
    Remove-Job $apiJob
    exit 1
}

Write-Host ""
Write-Host "🌐 启动 Web Server (端口 8080)..." -ForegroundColor Cyan
$webJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    node web-server.js
}

# 等待 Web Server 启动
Start-Sleep -Seconds 1

Write-Host "✅ Web Server 启动成功" -ForegroundColor Green
Write-Host ""

# 显示访问信息
Write-Host "╔══════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║              🎉 服务器已成功启动！                        ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "📋 访问地址:" -ForegroundColor Yellow
Write-Host "   🌐 交互式测试页面: http://localhost:8080/test-interactive.html" -ForegroundColor White
Write-Host "   📄 静态展示页面:   http://localhost:8080/index.html" -ForegroundColor White
Write-Host "   🔌 API 健康检查:   http://localhost:3000/health" -ForegroundColor White
Write-Host ""
Write-Host "💡 功能说明:" -ForegroundColor Yellow
Write-Host "   • test-interactive.html - 可直接测试所有占卜功能" -ForegroundColor White
Write-Host "   • index.html - 查看系统参数说明" -ForegroundColor White
Write-Host "   • API Server - 提供实际占卜计算服务" -ForegroundColor White
Write-Host ""
Write-Host "📝 支持的占卜系统:" -ForegroundColor Yellow
Write-Host "   🃏 塔罗占卜   ⭐ 紫微斗数   🌌 西洋占星" -ForegroundColor White
Write-Host "   💭 梦境解析   🎋 八字命理   ☯️  易经占卜" -ForegroundColor White
Write-Host ""
Write-Host "⏹️  停止服务: 按 Ctrl+C 或运行 ./stop-test-server.ps1" -ForegroundColor Yellow
Write-Host ""

# 在浏览器中打开测试页面
Start-Sleep -Seconds 1
Write-Host "🌐 正在打开测试页面..." -ForegroundColor Cyan
Start-Process "http://localhost:8080/test-interactive.html"

Write-Host ""
Write-Host "⌨️  按任意键查看日志，或 Ctrl+C 停止服务器..." -ForegroundColor Gray
Write-Host ""

# 持续显示日志
try {
    while ($true) {
        $apiOutput = Receive-Job $apiJob -ErrorAction SilentlyContinue
        $webOutput = Receive-Job $webJob -ErrorAction SilentlyContinue
        
        if ($apiOutput) {
            Write-Host "[API] $apiOutput" -ForegroundColor Blue
        }
        if ($webOutput) {
            Write-Host "[Web] $webOutput" -ForegroundColor Green
        }
        
        Start-Sleep -Milliseconds 500
    }
} finally {
    # 清理
    Write-Host "`n👋 正在停止服务器..." -ForegroundColor Yellow
    Stop-Job $apiJob -ErrorAction SilentlyContinue
    Stop-Job $webJob -ErrorAction SilentlyContinue
    Remove-Job $apiJob -ErrorAction SilentlyContinue
    Remove-Job $webJob -ErrorAction SilentlyContinue
    Write-Host "✅ 服务器已停止" -ForegroundColor Green
}
