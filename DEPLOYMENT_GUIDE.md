# 三智能体系统部署指南

## 系统架构

```
┌─────────────────────────────────────────────────┐
│              Nginx (反向代理)                     │
│            SSL Termination                       │
│         Port 80/443 → Load Balancing            │
└────┬─────────────┬──────────────┬───────────────┘
     │             │              │
     ↓             ↓              ↓
┌─────────┐  ┌────────────┐  ┌──────────────┐
│ Fortune │  │Transaction │  │ Fulfillment  │
│ Telling │  │   Order    │  │   Review     │
│  MCP    │  │   Agent    │  │    Agent     │
│ Server  │  │  (3002)    │  │   (3003)     │
│(stdio/  │  └────┬───────┘  └──────┬───────┘
│ 3000)   │       │                 │
└────┬────┘       │                 │
     │            ↓                 ↓
     │    ┌────────────────────────────┐
     │    │     MongoDB Cluster        │
     │    │  • orders DB               │
     │    │  • reviews DB              │
     │    │  • deliveries DB           │
     │    └────────────────────────────┘
     │
     ↓
┌────────────────────────────────────────┐
│         Botpress Cloud                 │
│  (botpress-divination-agent)           │
│      Port 3001 (dev mode)              │
└────────────────────────────────────────┘
```

## 前置要求

### 1. 系统要求
- **操作系统**: Linux (Ubuntu 20.04+) / macOS / Windows 10+
- **Node.js**: 18.0.0 或更高版本
- **MongoDB**: 6.0 或更高版本
- **内存**: 最少 4GB RAM
- **磁盘空间**: 最少 10GB

### 2. 依赖服务
- MongoDB 数据库
- Nginx (生产环境)
- Redis (可选，用于缓存)

### 3. API 密钥
- OpenAI API Key (用于 DALL-E 图像生成)
- Stripe API Key (信用卡支付)
- PayPal API Key (PayPal 支付)
- Alipay API Key (支付宝支付)
- WeChat Pay API Key (微信支付)
- 物流 API Keys (顺丰、EMS 等)

## 部署步骤

### 步骤 1: 环境准备

#### 1.1 安装 Node.js
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# macOS
brew install node@18

# Windows
# 从 https://nodejs.org 下载安装包
```

#### 1.2 安装 MongoDB
```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# 启动 MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# 验证安装
mongosh --version
```

#### 1.3 安装 Nginx (生产环境)
```bash
# Ubuntu/Debian
sudo apt-get install -y nginx

# macOS
brew install nginx

# 启动 Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 步骤 2: 克隆代码

```bash
cd /opt
git clone https://github.com/your-org/AI-Assistant.git
cd AI-Assistant
```

### 步骤 3: 部署智能体 1 - 占卜计算智能体

#### 3.1 安装依赖
```bash
cd fortune-telling-mcp-server
npm install
```

#### 3.2 配置环境变量
```bash
cp .env.example .env
nano .env

# 填入以下配置：
OPENAI_API_KEY=your_openai_key
STABILITY_API_KEY=your_stability_key
API_PORT=3000
ENABLE_IMAGE_GENERATION=true
```

#### 3.3 构建项目
```bash
npm run build
```

#### 3.4 运行服务

**开发模式**:
```bash
npm run dev
```

**生产模式 (MCP Server)**:
```bash
npm run mcp
```

**HTTP API 测试模式**:
```bash
npm run api
```

#### 3.5 验证服务
```bash
# 测试 HTTP API
curl http://localhost:3000/health

# 测试 MCP Server
node test-mcp-client.js
```

### 步骤 4: 部署智能体 2 - 交易与订单智能体

#### 4.1 安装依赖
```bash
cd ../transaction-order-agent
npm install
```

#### 4.2 配置环境变量
```bash
cp .env.example .env
nano .env

# 填入以下配置：
MONGODB_URI=mongodb://localhost:27017/divination-orders
STRIPE_SECRET_KEY=your_stripe_key
PAYPAL_CLIENT_ID=your_paypal_client_id
ALIPAY_APP_ID=your_alipay_app_id
WECHAT_APP_ID=your_wechat_app_id
PORT=3002
```

#### 4.3 构建项目
```bash
npm run build
```

#### 4.4 运行服务
```bash
npm start
```

#### 4.5 验证服务
```bash
curl http://localhost:3002/health
```

### 步骤 5: 部署智能体 3 - 交付评价分享智能体

#### 5.1 安装依赖
```bash
cd ../fulfillment-review-agent
npm install
```

#### 5.2 配置环境变量
```bash
cp .env.example .env
nano .env

# 填入以下配置：
MONGODB_URI=mongodb://localhost:27017/divination-fulfillment
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
SF_EXPRESS_API_KEY=your_sf_key
FEDEX_API_KEY=your_fedex_key
PORT=3003
```

#### 5.3 构建项目
```bash
npm run build
```

#### 5.4 运行服务
```bash
npm start
```

#### 5.5 验证服务
```bash
curl http://localhost:3003/health
```

### 步骤 6: 配置 Nginx (生产环境)

#### 6.1 创建 Nginx 配置
```bash
sudo nano /etc/nginx/sites-available/ether-ai
```

```nginx
# Fortune-Telling MCP Server (HTTP API)
upstream fortune_telling {
    server localhost:3000;
}

# Transaction Order Agent
upstream transaction_order {
    server localhost:3002;
}

# Fulfillment Review Agent
upstream fulfillment_review {
    server localhost:3003;
}

server {
    listen 80;
    server_name api.ether-ai.com;

    # Fortune-Telling API
    location /api/divination/ {
        proxy_pass http://fortune_telling;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Transaction API
    location /api/orders/ {
        proxy_pass http://transaction_order;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/webhooks/ {
        proxy_pass http://transaction_order;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Fulfillment API
    location /api/fulfillment/ {
        proxy_pass http://fulfillment_review;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/reviews/ {
        proxy_pass http://fulfillment_review;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/sharing/ {
        proxy_pass http://fulfillment_review;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 6.2 启用配置
```bash
sudo ln -s /etc/nginx/sites-available/ether-ai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 步骤 7: 使用 PM2 管理进程 (生产环境推荐)

#### 7.1 安装 PM2
```bash
npm install -g pm2
```

#### 7.2 创建 ecosystem.config.js
```bash
cd /opt/AI-Assistant
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [
    {
      name: 'fortune-telling-mcp',
      cwd: './fortune-telling-mcp-server',
      script: 'dist/mcp-server.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'fortune-telling-api',
      cwd: './fortune-telling-mcp-server',
      script: 'dist/api-server.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'transaction-order',
      cwd: './transaction-order-agent',
      script: 'dist/index.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      }
    },
    {
      name: 'fulfillment-review',
      cwd: './fulfillment-review-agent',
      script: 'dist/index.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3003
      }
    }
  ]
}
```

#### 7.3 启动所有服务
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 7.4 查看状态
```bash
pm2 status
pm2 logs
pm2 monit
```

### 步骤 8: 配置 SSL (可选但推荐)

#### 8.1 安装 Certbot
```bash
sudo apt-get install -y certbot python3-certbot-nginx
```

#### 8.2 获取证书
```bash
sudo certbot --nginx -d api.ether-ai.com
```

#### 8.3 自动续期
```bash
sudo systemctl status certbot.timer
```

## 监控和维护

### 日志管理

#### 查看应用日志
```bash
# PM2 日志
pm2 logs fortune-telling-api
pm2 logs transaction-order
pm2 logs fulfillment-review

# Nginx 日志
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# MongoDB 日志
sudo tail -f /var/log/mongodb/mongod.log
```

### 备份策略

#### MongoDB 备份
```bash
# 创建备份脚本
nano /opt/backup-mongodb.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/backups/mongodb"
mkdir -p $BACKUP_DIR

mongodump --out $BACKUP_DIR/backup_$DATE

# 删除30天前的备份
find $BACKUP_DIR -type d -mtime +30 -exec rm -rf {} \;
```

```bash
chmod +x /opt/backup-mongodb.sh

# 添加到 crontab (每天凌晨2点备份)
crontab -e
0 2 * * * /opt/backup-mongodb.sh
```

### 性能监控

#### 使用 PM2 监控
```bash
pm2 install pm2-server-monit
```

#### 数据库监控
```bash
mongosh
> db.serverStatus()
> db.stats()
```

## 故障排查

### 服务无法启动
```bash
# 检查端口占用
sudo lsof -i :3000
sudo lsof -i :3002
sudo lsof -i :3003

# 检查日志
pm2 logs --err
```

### 数据库连接失败
```bash
# 检查 MongoDB 状态
sudo systemctl status mongod

# 测试连接
mongosh --eval "db.adminCommand('ping')"
```

### 支付回调失败
```bash
# 检查 webhook URL 是否可访问
curl -X POST https://api.ether-ai.com/api/webhooks/payment-success

# 检查防火墙
sudo ufw status
```

## 扩展部署

### 使用 Docker 部署

#### Dockerfile 示例
```dockerfile
# fortune-telling-mcp-server/Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
COPY data ./data

EXPOSE 3000
CMD ["node", "dist/mcp-server.js"]
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  fortune-telling:
    build: ./fortune-telling-mcp-server
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017
    depends_on:
      - mongodb

  transaction-order:
    build: ./transaction-order-agent
    ports:
      - "3002:3002"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017
    depends_on:
      - mongodb

  fulfillment-review:
    build: ./fulfillment-review-agent
    ports:
      - "3003:3003"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017
    depends_on:
      - mongodb

volumes:
  mongodb_data:
```

#### 启动 Docker 容器
```bash
docker-compose up -d
```

## 安全建议

1. **使用环境变量**: 不要将敏感信息硬编码
2. **启用 HTTPS**: 使用 SSL/TLS 加密通信
3. **配置防火墙**: 只开放必要端口
4. **定期更新**: 保持依赖包最新版本
5. **限制访问**: 使用 API Key 或 JWT 认证
6. **日志审计**: 记录所有关键操作
7. **数据备份**: 定期备份数据库

## 联系支持

如有问题，请联系：
- 邮箱: support@ether-ai.com
- GitHub Issues: https://github.com/your-org/AI-Assistant/issues
