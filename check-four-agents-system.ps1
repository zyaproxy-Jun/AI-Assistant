# 🚀 四智能体系统 - 快速启动脚本

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  Ether AI Assistant - 四智能体系统" -ForegroundColor Cyan
Write-Host "  快速启动和健康检查" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# 检查 MongoDB 状态
Write-Host "📊 检查 MongoDB 状态..." -ForegroundColor Yellow
try {
    $mongoProcess = Get-Process mongod -ErrorAction SilentlyContinue
    if ($mongoProcess) {
        Write-Host "✅ MongoDB 正在运行 (PID: $($mongoProcess.Id))" -ForegroundColor Green
    } else {
        Write-Host "❌ MongoDB 未运行" -ForegroundColor Red
        Write-Host "   请运行: .\start-mongodb-docker.ps1" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ 无法检查 MongoDB 状态" -ForegroundColor Red
}

Write-Host ""

# 智能体状态检查
Write-Host "🤖 检查智能体状态..." -ForegroundColor Yellow
Write-Host ""

$agents = @(
    @{
        Name = "占卜计算智能体 (MCP Server)"
        Port = 3000
        Path = "divination-mcp-server"
        Priority = "HIGH"
    },
    @{
        Name = "对话与导购智能体 (Botpress)"
        Port = 3001
        Path = "conversation-recommendation-agent"
        Priority = "HIGH"
    },
    @{
        Name = "交易与订单智能体"
        Port = 3002
        Path = "transaction-order-agent"
        Priority = "MEDIUM"
    },
    @{
        Name = "交付、评价与分享智能体"
        Port = 3003
        Path = "fulfillment-review-agent"
        Priority = "MEDIUM"
    }
)

foreach ($agent in $agents) {
    $port = $agent.Port
    $name = $agent.Name
    $path = $agent.Path
    $priority = $agent.Priority
    
    Write-Host "[$priority] $name (端口 $port)" -ForegroundColor Cyan
    
    # 检查端口是否被占用
    try {
        $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
        if ($connection) {
            Write-Host "   ✅ 服务正在运行" -ForegroundColor Green
            
            # 尝试健康检查
            try {
                $response = Invoke-WebRequest -Uri "http://localhost:$port/health" -Method GET -TimeoutSec 2 -ErrorAction SilentlyContinue
                if ($response.StatusCode -eq 200) {
                    Write-Host "   ✅ 健康检查通过" -ForegroundColor Green
                }
            } catch {
                Write-Host "   ⚠️  健康检查失败 (可能未实现 /health 端点)" -ForegroundColor Yellow
            }
        } else {
            Write-Host "   ❌ 服务未运行" -ForegroundColor Red
            Write-Host "   启动命令: cd $path; npm start" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "   ❌ 无法检查端口状态" -ForegroundColor Red
    }
    
    # 检查目录是否存在
    if (Test-Path $path) {
        Write-Host "   📁 目录存在: $path" -ForegroundColor Gray
        
        # 检查是否已安装依赖
        if (Test-Path "$path\node_modules") {
            Write-Host "   📦 依赖已安装" -ForegroundColor Gray
        } else {
            Write-Host "   ⚠️  依赖未安装 - 运行: cd $path; npm install" -ForegroundColor Yellow
        }
        
        # 检查是否已构建
        if (Test-Path "$path\dist") {
            Write-Host "   🔨 代码已构建" -ForegroundColor Gray
        } else {
            Write-Host "   ⚠️  代码未构建 - 运行: cd $path; npm run build" -ForegroundColor Yellow
        }
    } else {
        Write-Host "   ⚠️  目录不存在: $path" -ForegroundColor Yellow
    }
    
    Write-Host ""
}

# 系统完整性检查
Write-Host "🔍 系统完整性检查..." -ForegroundColor Yellow
Write-Host ""

# 检查关键文档
$docs = @(
    "FOUR_AGENTS_SYSTEM_REDESIGN.md",
    "IMPLEMENTATION_GUIDE.md",
    "REDESIGN_COMPLETION_REPORT.md"
)

foreach ($doc in $docs) {
    if (Test-Path $doc) {
        Write-Host "✅ 文档存在: $doc" -ForegroundColor Green
    } else {
        Write-Host "❌ 文档缺失: $doc" -ForegroundColor Red
    }
}

Write-Host ""

# 快速操作菜单
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  快速操作菜单" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. 查看系统设计文档" -ForegroundColor White
Write-Host "   code FOUR_AGENTS_SYSTEM_REDESIGN.md" -ForegroundColor Gray
Write-Host ""
Write-Host "2. 查看实施指南" -ForegroundColor White
Write-Host "   code IMPLEMENTATION_GUIDE.md" -ForegroundColor Gray
Write-Host ""
Write-Host "3. 查看完成报告" -ForegroundColor White
Write-Host "   code REDESIGN_COMPLETION_REPORT.md" -ForegroundColor Gray
Write-Host ""
Write-Host "4. 安装对话与导购智能体依赖" -ForegroundColor White
Write-Host "   cd conversation-recommendation-agent; npm install" -ForegroundColor Gray
Write-Host ""
Write-Host "5. 启动 MongoDB (如果未运行)" -ForegroundColor White
Write-Host "   .\start-mongodb-docker.ps1" -ForegroundColor Gray
Write-Host ""
Write-Host "6. 运行端到端测试" -ForegroundColor White
Write-Host "   node test-e2e-flow.js" -ForegroundColor Gray
Write-Host ""

# 下一步建议
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  📋 建议的下一步操作" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔥 高优先级任务:" -ForegroundColor Red
Write-Host ""
Write-Host "1️⃣  完成对话与导购智能体实现" -ForegroundColor Yellow
Write-Host "   - 创建 MCP Client 服务" -ForegroundColor Gray
Write-Host "   - 实现商品匹配算法" -ForegroundColor Gray
Write-Host "   - 添加多模态渲染" -ForegroundColor Gray
Write-Host ""
Write-Host "2️⃣  测试占卜 → 推荐流程" -ForegroundColor Yellow
Write-Host "   - 确保 MCP Server 正常运行" -ForegroundColor Gray
Write-Host "   - 测试 API 调用" -ForegroundColor Gray
Write-Host "   - 验证商品匹配结果" -ForegroundColor Gray
Write-Host ""
Write-Host "3️⃣  准备商品数据" -ForegroundColor Yellow
Write-Host "   - 创建 products.json" -ForegroundColor Gray
Write-Host "   - 定义占卜亲和度规则" -ForegroundColor Gray
Write-Host "   - 导入到 MongoDB" -ForegroundColor Gray
Write-Host ""

Write-Host "📚 参考文档:" -ForegroundColor Cyan
Write-Host "   - 系统设计: FOUR_AGENTS_SYSTEM_REDESIGN.md" -ForegroundColor Gray
Write-Host "   - 实施指南: IMPLEMENTATION_GUIDE.md" -ForegroundColor Gray
Write-Host "   - 完成报告: REDESIGN_COMPLETION_REPORT.md" -ForegroundColor Gray
Write-Host ""

Write-Host "✨ 祝您开发顺利！" -ForegroundColor Green
Write-Host ""
