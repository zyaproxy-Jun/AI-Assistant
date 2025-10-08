# MongoDB Docker Quick Start Script

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " MongoDB Docker Quick Start" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is installed
Write-Host "Checking Docker installation..." -ForegroundColor Yellow
$dockerCmd = Get-Command docker -ErrorAction SilentlyContinue

if (-not $dockerCmd) {
    Write-Host ""
    Write-Host "[ERROR] Docker is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Docker Desktop first:" -ForegroundColor Yellow
    Write-Host "  https://www.docker.com/products/docker-desktop" -ForegroundColor Cyan
    Write-Host ""
    exit 1
}

Write-Host "[OK] Docker is installed" -ForegroundColor Green
Write-Host ""

# Check if Docker is running
Write-Host "Checking Docker service..." -ForegroundColor Yellow
$dockerInfo = docker info 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[ERROR] Docker is not running!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please start Docker Desktop and try again." -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Write-Host "[OK] Docker is running" -ForegroundColor Green
Write-Host ""

# Check if MongoDB container already exists
Write-Host "Checking existing MongoDB container..." -ForegroundColor Yellow
$existingContainer = docker ps -a --filter "name=mongodb-divination" --format "{{.Names}}"

if ($existingContainer -eq "mongodb-divination") {
    Write-Host ""
    Write-Host "[INFO] MongoDB container already exists" -ForegroundColor Yellow
    Write-Host ""
    
    # Check if running
    $runningContainer = docker ps --filter "name=mongodb-divination" --format "{{.Names}}"
    
    if ($runningContainer -eq "mongodb-divination") {
        Write-Host "[OK] MongoDB is already running" -ForegroundColor Green
        Write-Host ""
        Write-Host "Container Name: mongodb-divination" -ForegroundColor Cyan
        Write-Host "Port: 27017" -ForegroundColor Cyan
        Write-Host "Username: admin" -ForegroundColor Cyan
        Write-Host "Password: admin123" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Connection String:" -ForegroundColor Yellow
        Write-Host "  mongodb://admin:admin123@localhost:27017/?authSource=admin" -ForegroundColor Gray
        Write-Host ""
        
        # Show logs
        Write-Host "Recent logs:" -ForegroundColor Yellow
        docker logs --tail 10 mongodb-divination
        
    } else {
        Write-Host "[INFO] Starting existing container..." -ForegroundColor Yellow
        docker start mongodb-divination
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[OK] MongoDB container started successfully!" -ForegroundColor Green
        } else {
            Write-Host "[ERROR] Failed to start container" -ForegroundColor Red
            exit 1
        }
    }
} else {
    # Create new MongoDB container
    Write-Host ""
    Write-Host "Creating new MongoDB container..." -ForegroundColor Yellow
    Write-Host ""
    
    docker run -d `
        --name mongodb-divination `
        -p 27017:27017 `
        -e MONGO_INITDB_ROOT_USERNAME=admin `
        -e MONGO_INITDB_ROOT_PASSWORD=admin123 `
        -v mongodb-data:/data/db `
        mongo:6.0
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "[OK] MongoDB container created and started!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Container Name: mongodb-divination" -ForegroundColor Cyan
        Write-Host "Port: 27017" -ForegroundColor Cyan
        Write-Host "Username: admin" -ForegroundColor Cyan
        Write-Host "Password: admin123" -ForegroundColor Cyan
        Write-Host ""
        
        # Wait for MongoDB to be ready
        Write-Host "Waiting for MongoDB to be ready..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
        
        Write-Host "[OK] MongoDB is ready!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "[ERROR] Failed to create container" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "MongoDB Configuration:" -ForegroundColor Green
Write-Host ""
Write-Host "Connection Strings for .env files:" -ForegroundColor Yellow
Write-Host ""
Write-Host "transaction-order-agent/.env:" -ForegroundColor Cyan
Write-Host "  MONGODB_URI=mongodb://admin:admin123@localhost:27017/divination-orders?authSource=admin" -ForegroundColor Gray
Write-Host ""
Write-Host "fulfillment-review-agent/.env:" -ForegroundColor Cyan
Write-Host "  MONGODB_URI=mongodb://admin:admin123@localhost:27017/divination-fulfillment?authSource=admin" -ForegroundColor Gray
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Quick Commands:" -ForegroundColor Green
Write-Host ""
Write-Host "Stop MongoDB:" -ForegroundColor Yellow
Write-Host "  docker stop mongodb-divination" -ForegroundColor Gray
Write-Host ""
Write-Host "Start MongoDB:" -ForegroundColor Yellow
Write-Host "  docker start mongodb-divination" -ForegroundColor Gray
Write-Host ""
Write-Host "View logs:" -ForegroundColor Yellow
Write-Host "  docker logs -f mongodb-divination" -ForegroundColor Gray
Write-Host ""
Write-Host "Connect with mongosh:" -ForegroundColor Yellow
Write-Host "  docker exec -it mongodb-divination mongosh -u admin -p admin123" -ForegroundColor Gray
Write-Host ""
Write-Host "Remove container:" -ForegroundColor Yellow
Write-Host "  docker stop mongodb-divination" -ForegroundColor Gray
Write-Host "  docker rm mongodb-divination" -ForegroundColor Gray
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Update .env files with the connection strings above" -ForegroundColor White
Write-Host "2. Restart Agent 2 and Agent 3" -ForegroundColor White
Write-Host "3. Check services: .\check-services.ps1" -ForegroundColor White
Write-Host ""
Write-Host "MongoDB is ready to use!" -ForegroundColor Green
Write-Host ""
