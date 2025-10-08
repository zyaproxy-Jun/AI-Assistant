# 部署指南

## 架构概览

```
┌──────────────────┐
│  用户前端界面     │
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│ Botpress Cloud   │ ← 托管智能体
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│  集成层 (本项目)  │
└─────┬──────┬─────┘
      │      │
      ↓      ↓
┌─────────┐ ┌──────────┐
│ MCP API │ │ 商品数据库│
└─────────┘ └──────────┘
```

## 部署选项

### 选项 1: Botpress Cloud (推荐)

**优点**:
- 无需管理基础设施
- 自动扩展
- 内置监控和日志
- 多渠道支持

**步骤**:

1. **安装 Botpress CLI**
```bash
npm install -g @botpress/cli
```

2. **登录 Botpress**
```bash
bp login
```

3. **初始化项目** (如果是新项目)
```bash
bp init
```

4. **部署集成**
```bash
cd botpress-divination-agent
bp deploy
```

5. **发布为公开版本** (可选)
```bash
bp deploy --public
```

### 选项 2: 自托管

**优点**:
- 完全控制
- 数据隐私
- 自定义配置

**要求**:
- Node.js 服务器
- 数据库 (PostgreSQL 推荐)
- 反向代理 (Nginx/Apache)

**步骤**:

1. **准备服务器环境**
```bash
# 安装 Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 PM2 (进程管理器)
npm install -g pm2
```

2. **克隆项目**
```bash
git clone https://github.com/zyaproxy-Jun/AI-Assistant.git
cd AI-Assistant/botpress-divination-agent
```

3. **安装依赖**
```bash
npm install
```

4. **配置环境变量**
```bash
cp .env.example .env
nano .env
```

5. **构建项目**
```bash
npm run build
```

6. **启动服务**
```bash
pm2 start dist/index.js --name ether-agent
pm2 save
```

7. **配置 Nginx 反向代理**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## MCP Server 部署

### 本地开发

```bash
cd divination-mcp-server
node api-server.js
```

### 生产环境

使用 PM2:

```bash
cd divination-mcp-server
pm2 start api-server.js --name mcp-server
pm2 save
pm2 startup
```

### Docker 部署

创建 `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "api-server.js"]
```

构建并运行:

```bash
docker build -t mcp-server .
docker run -d -p 3000:3000 --name mcp-server mcp-server
```

### Docker Compose (推荐)

创建 `docker-compose.yml`:

```yaml
version: '3.8'

services:
  mcp-server:
    build: ./divination-mcp-server
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  botpress-agent:
    build: ./botpress-divination-agent
    ports:
      - "3001:3001"
    environment:
      - MCP_SERVER_URL=http://mcp-server:3000
      - NODE_ENV=production
    depends_on:
      - mcp-server
    restart: unless-stopped
```

启动所有服务:

```bash
docker-compose up -d
```

## 商品数据库部署

### 选项 1: 使用 JSON 文件 (简单)

- 优点: 简单快速
- 缺点: 不适合大量数据
- 适用: 商品少于 1000 个

当前项目默认使用此方式 (`data/products.json`)

### 选项 2: MongoDB (推荐)

```bash
# 安装 MongoDB
sudo apt-get install mongodb

# 启动 MongoDB
sudo systemctl start mongodb
```

修改代码以连接 MongoDB:

```typescript
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URL)
await client.connect()
const db = client.db('ether_assistant')
const productsCollection = db.collection('products')
```

### 选项 3: PostgreSQL

```sql
CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'CNY',
    description TEXT,
    images JSONB,
    tags JSONB,
    matching_rules JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 监控和日志

### 使用 PM2 监控

```bash
pm2 monit
pm2 logs ether-agent
pm2 logs mcp-server
```

### 集成日志服务

使用 Winston 或 Pino 记录日志:

```typescript
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})
```

### Botpress Cloud 监控

在 Botpress Studio 中:
- Analytics → 查看使用统计
- Logs → 查看运行日志
- Debugger → 实时调试对话

## 性能优化

### 1. 启用缓存

```typescript
import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 600 }) // 10分钟缓存

// 缓存占卜结果
function cacheResult(key: string, value: any) {
  cache.set(key, value)
}
```

### 2. 数据库索引

```sql
-- MongoDB
db.products.createIndex({ "matchingRules.divinationTypes": 1 })
db.products.createIndex({ "category": 1, "popularity": -1 })

-- PostgreSQL
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_popularity ON products(popularity DESC);
```

### 3. CDN 加速

将图片资源上传到 CDN:
- 阿里云 OSS
- 腾讯云 COS
- AWS S3

### 4. 负载均衡

使用 Nginx 负载均衡多个 MCP Server 实例:

```nginx
upstream mcp_backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}

server {
    location / {
        proxy_pass http://mcp_backend;
    }
}
```

## 安全建议

### 1. API 密钥管理

使用环境变量或密钥管理服务:

```bash
# 使用 dotenv-vault
npm install dotenv-vault
dotenv-vault login
dotenv-vault push
```

### 2. 限流

```typescript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100 // 最多100个请求
})

app.use('/api/', limiter)
```

### 3. HTTPS

```bash
# 使用 Let's Encrypt
sudo apt-get install certbot
sudo certbot --nginx -d your-domain.com
```

### 4. 数据验证

```typescript
import Joi from 'joi'

const schema = Joi.object({
  dream_description: Joi.string().min(10).max(1000).required(),
  emotions: Joi.array().items(Joi.string())
})
```

## 备份策略

### 数据库备份

```bash
# MongoDB
mongodump --db ether_assistant --out /backup/$(date +%Y%m%d)

# PostgreSQL
pg_dump ether_assistant > /backup/ether_$(date +%Y%m%d).sql
```

### 自动备份脚本

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d_%H%M%S)

# 备份数据库
mongodump --db ether_assistant --out $BACKUP_DIR/mongo_$DATE

# 备份代码
tar -czf $BACKUP_DIR/code_$DATE.tar.gz /path/to/project

# 删除7天前的备份
find $BACKUP_DIR -mtime +7 -delete
```

配置 crontab:

```bash
# 每天凌晨2点执行备份
0 2 * * * /path/to/backup.sh
```

## 回滚策略

### 使用 PM2

```bash
# 保存当前版本
pm2 save

# 回滚到之前的版本
pm2 reload ecosystem.config.js --update-env

# 或者从 Git 回滚
git checkout previous-commit
npm install
npm run build
pm2 restart all
```

### 使用 Docker

```bash
# 标记镜像版本
docker tag mcp-server:latest mcp-server:v1.0.0

# 回滚
docker stop mcp-server
docker rm mcp-server
docker run -d -p 3000:3000 --name mcp-server mcp-server:v1.0.0
```

## 扩展建议

### 水平扩展

1. 使用多个 MCP Server 实例
2. 配置负载均衡器
3. 使用 Redis 共享会话

### 垂直扩展

1. 增加服务器内存和 CPU
2. 优化数据库查询
3. 使用缓存减少计算

## 故障排查

### 常见问题

1. **端口被占用**
```bash
# 查找占用端口的进程
lsof -i :3000
# 杀死进程
kill -9 <PID>
```

2. **内存不足**
```bash
# 增加 Node.js 内存限制
node --max-old-space-size=4096 api-server.js
```

3. **连接超时**
- 检查防火墙设置
- 验证网络连通性
- 增加超时时间

## 更新部署

```bash
# 拉取最新代码
git pull origin master

# 安装新依赖
npm install

# 重新构建
npm run build

# 重新部署
bp deploy

# 重启服务
pm2 restart all
```

## 支持

- 📧 Email: support@ether-ai.com
- 💬 Discord: [Botpress Community](https://discord.gg/botpress)
- 📖 Docs: [项目文档](README.md)
