# Service Status Checker
# Check if all three agents are running

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Three Agents System Status Check" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Checking services..." -ForegroundColor Yellow
Write-Host ""

# Check ports
$ports = @(3000, 3002, 3003)
$services = @(
    @{Port=3000; Name="Agent 1 - Fortune-Telling MCP Server"; URL="http://localhost:3000"},
    @{Port=3002; Name="Agent 2 - Transaction & Order Agent"; URL="http://localhost:3002"},
    @{Port=3003; Name="Agent 3 - Fulfillment, Review & Sharing Agent"; URL="http://localhost:3003"}
)

foreach ($service in $services) {
    $connection = Get-NetTCPConnection -LocalPort $service.Port -State Listen -ErrorAction SilentlyContinue
    
    if ($connection) {
        Write-Host "[OK]" -ForegroundColor Green -NoNewline
        Write-Host " $($service.Name)" -ForegroundColor White
        Write-Host "     Running on port $($service.Port)" -ForegroundColor Gray
        Write-Host "     URL: $($service.URL)" -ForegroundColor Gray
        
        # Try to check health endpoint
        try {
            $response = Invoke-WebRequest -Uri "$($service.URL)/health" -Method GET -TimeoutSec 2 -ErrorAction Stop
            if ($response.StatusCode -eq 200) {
                Write-Host "     Health: OK" -ForegroundColor Green
            }
        } catch {
            Write-Host "     Health: No response" -ForegroundColor Yellow
        }
    } else {
        Write-Host "[ERROR]" -ForegroundColor Red -NoNewline
        Write-Host " $($service.Name)" -ForegroundColor White
        Write-Host "     Not running on port $($service.Port)" -ForegroundColor Gray
    }
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check MongoDB
Write-Host "Checking MongoDB..." -ForegroundColor Yellow
$mongoProcess = Get-Process mongod -ErrorAction SilentlyContinue
if ($mongoProcess) {
    Write-Host "[OK] MongoDB is running (Process ID: $($mongoProcess.Id))" -ForegroundColor Green
} else {
    Write-Host "[WARNING] MongoDB process not detected" -ForegroundColor Yellow
    Write-Host "If you're using MongoDB as a service or Docker, this is normal" -ForegroundColor Gray
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Show running Node.js processes
Write-Host "Node.js processes:" -ForegroundColor Yellow
$nodeProcesses = Get-Process node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    $nodeProcesses | Select-Object Id, ProcessName, @{Name='Memory(MB)';Expression={[math]::Round($_.WS/1MB,2)}} | Format-Table
} else {
    Write-Host "No Node.js processes running" -ForegroundColor Gray
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Quick Test Commands:" -ForegroundColor Green
Write-Host ""
Write-Host "Test Agent 1 (Tarot):" -ForegroundColor Cyan
Write-Host '  Invoke-WebRequest -Uri "http://localhost:3000/health" -Method GET' -ForegroundColor Gray
Write-Host ""
Write-Host "Test Agent 2 (Orders):" -ForegroundColor Cyan
Write-Host '  Invoke-WebRequest -Uri "http://localhost:3002/health" -Method GET' -ForegroundColor Gray
Write-Host ""
Write-Host "Test Agent 3 (Fulfillment):" -ForegroundColor Cyan
Write-Host '  Invoke-WebRequest -Uri "http://localhost:3003/health" -Method GET' -ForegroundColor Gray
Write-Host ""
Write-Host "Run E2E Test:" -ForegroundColor Cyan
Write-Host '  node test-e2e-flow.js' -ForegroundColor Gray
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
