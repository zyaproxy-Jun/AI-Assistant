# Four Agents System - Quick Check
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Ether AI - Four Agents System Check" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check MongoDB
Write-Host "Checking MongoDB..." -ForegroundColor Yellow
$mongoContainer = docker ps --filter "name=mongodb" --format "{{.Names}}" 2>$null
if ($mongoContainer) {
    Write-Host "[OK] MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "[WARNING] MongoDB is not running" -ForegroundColor Red
    Write-Host "  Run: .\start-mongodb-docker.ps1" -ForegroundColor Yellow
}
Write-Host ""

# Check Agent Directories
Write-Host "Checking Agent Directories..." -ForegroundColor Yellow
$agents = @{
    "conversation-recommendation-agent" = "NEW - Dialog & Recommendation"
    "divination-mcp-server" = "MCP Server - Fortune Telling"
    "transaction-order-agent" = "Transaction & Order"
    "fulfillment-review-agent" = "Fulfillment & Review"
}

foreach ($dir in $agents.Keys) {
    $desc = $agents[$dir]
    if (Test-Path $dir) {
        Write-Host "[OK] $desc" -ForegroundColor Green
        Write-Host "     Path: $dir" -ForegroundColor Gray
        
        # Check node_modules
        if (Test-Path "$dir\node_modules") {
            Write-Host "     [OK] Dependencies installed" -ForegroundColor Green
        } else {
            Write-Host "     [TODO] Run: cd $dir; npm install" -ForegroundColor Yellow
        }
    } else {
        Write-Host "[MISSING] $desc" -ForegroundColor Red
        Write-Host "          Path: $dir" -ForegroundColor Gray
    }
    Write-Host ""
}

# Check Documentation
Write-Host "Checking Documentation..." -ForegroundColor Yellow
$docs = @(
    "FOUR_AGENTS_SYSTEM_REDESIGN.md",
    "IMPLEMENTATION_GUIDE.md",
    "REDESIGN_COMPLETION_REPORT.md"
)

foreach ($doc in $docs) {
    if (Test-Path $doc) {
        Write-Host "[OK] $doc" -ForegroundColor Green
    } else {
        Write-Host "[MISSING] $doc" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Next Steps" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Install conversation-recommendation-agent dependencies:" -ForegroundColor White
Write-Host "   cd conversation-recommendation-agent" -ForegroundColor Gray
Write-Host "   npm install" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Review system design:" -ForegroundColor White
Write-Host "   code FOUR_AGENTS_SYSTEM_REDESIGN.md" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Follow implementation guide:" -ForegroundColor White
Write-Host "   code IMPLEMENTATION_GUIDE.md" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Check completion report:" -ForegroundColor White
Write-Host "   code REDESIGN_COMPLETION_REPORT.md" -ForegroundColor Gray
Write-Host ""
