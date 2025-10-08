# 🔑 环境变量配置指南

## 配置步骤

所有 `.env` 文件已创建完成！现在需要填入相应的 API Keys 和配置信息。

---

## 智能体 1: 占卜计算智能体

**文件路径**: `fortune-telling-mcp-server/.env`

### 必填项 (⭐ 重要)

```bash
# OpenAI API Key (用于 DALL-E 图像生成)
OPENAI_API_KEY=sk-xxx...  # ⭐ 必须填写

# API 服务器配置
API_PORT=3000              # 可保持默认
```

### 可选项

```bash
# Stability AI (可选，如果不用 DALL-E)
STABILITY_API_KEY=sk-xxx...

# 其他配置保持默认即可
```

### 如何获取 OpenAI API Key

1. 访问 https://platform.openai.com/api-keys
2. 登录你的 OpenAI 账户
3. 点击 "Create new secret key"
4. 复制 API Key (格式: sk-proj-xxx...)
5. 粘贴到 `OPENAI_API_KEY=` 后面

---

## 智能体 2: 交易与订单智能体

**文件路径**: `transaction-order-agent/.env`

### 必填项 (⭐ 重要)

```bash
# MongoDB (必须)
MONGODB_URI=mongodb://localhost:27017/divination-orders  # ⭐ 本地 MongoDB

# 至少配置一个支付网关
# 选项 1: Stripe (推荐，简单易用)
STRIPE_SECRET_KEY=sk_test_xxx...  # ⭐ Stripe 测试密钥
STRIPE_PUBLIC_KEY=pk_test_xxx...
STRIPE_WEBHOOK_SECRET=whsec_xxx...

# 选项 2: PayPal
PAYPAL_CLIENT_ID=xxx...
PAYPAL_CLIENT_SECRET=xxx...
PAYPAL_MODE=sandbox  # 测试模式

# 选项 3: 支付宝 (需要企业账户)
ALIPAY_APP_ID=xxx...
ALIPAY_PRIVATE_KEY=xxx...
ALIPAY_PUBLIC_KEY=xxx...

# 选项 4: 微信支付 (需要企业账户)
WECHAT_APP_ID=wx_xxx...
WECHAT_MCH_ID=xxx...
WECHAT_API_V3_KEY=xxx...

# 选项 5: USDC 加密货币
USDC_PROVIDER_URL=https://mainnet.infura.io/v3/your_infura_key
USDC_WALLET_ADDRESS=0x...
```

### 可选项 (Botpress 集成)

```bash
# Botpress (如果使用 Botpress Cloud)
BOTPRESS_API_URL=https://api.botpress.cloud
BOTPRESS_BOT_ID=your_bot_id
BOTPRESS_TOKEN=bp_pat_xxx...

# 交付智能体 URL
FULFILLMENT_AGENT_URL=http://localhost:3003
```

### 如何获取 Stripe API Keys (推荐新手使用)

1. 访问 https://dashboard.stripe.com/register
2. 注册 Stripe 账户 (免费)
3. 进入 Dashboard → Developers → API Keys
4. 复制 "Secret key" (sk_test_xxx) 和 "Publishable key" (pk_test_xxx)
5. 测试环境无需验证，可以直接使用

### 如何获取 PayPal Credentials

1. 访问 https://developer.paypal.com
2. 登录 PayPal 开发者账户
3. 进入 My Apps & Credentials
4. 在 Sandbox 环境下创建应用
5. 复制 Client ID 和 Secret

---

## 智能体 3: 交付、评价与分享智能体

**文件路径**: `fulfillment-review-agent/.env`

### 必填项 (⭐ 重要)

```bash
# MongoDB (必须)
MONGODB_URI=mongodb://localhost:27017/divination-fulfillment  # ⭐

# 邮件配置 (用于数字商品交付) - 推荐使用 Gmail
EMAIL_HOST=smtp.gmail.com          # ⭐
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com    # ⭐ 你的 Gmail 地址
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx # ⭐ Gmail 应用专用密码
EMAIL_FROM=noreply@ether-ai.com
```

### 可选项 (物流追踪)

```bash
# 如果销售实物商品，需要配置物流 API
SF_EXPRESS_API_KEY=xxx...      # 顺丰
EMS_API_KEY=xxx...             # EMS
YTO_API_KEY=xxx...             # 圆通
# ... 其他快递公司
```

### 如何获取 Gmail 应用专用密码

1. 访问 https://myaccount.google.com/security
2. 确保启用了 **两步验证**
3. 搜索 "应用专用密码" (App passwords)
4. 选择 "邮件" 和设备类型
5. 生成密码 (格式: xxxx xxxx xxxx xxxx)
6. 复制到 `EMAIL_PASSWORD=` 后面

⚠️ **注意**: 
- 必须先启用 Google 账户的两步验证
- 不能使用普通密码，必须使用应用专用密码

### 其他邮件服务商配置

**使用 QQ 邮箱**:
```bash
EMAIL_HOST=smtp.qq.com
EMAIL_PORT=587
EMAIL_USER=your_email@qq.com
EMAIL_PASSWORD=授权码  # QQ 邮箱设置中获取授权码
```

**使用 163 邮箱**:
```bash
EMAIL_HOST=smtp.163.com
EMAIL_PORT=465
EMAIL_USER=your_email@163.com
EMAIL_PASSWORD=授权码  # 163 邮箱设置中获取授权码
```

---

## 快速开始 (最小配置)

如果你只是想快速测试系统，只需配置以下内容：

### 1. 智能体 1 (占卜计算)
```bash
OPENAI_API_KEY=sk-proj-xxx...  # 必须
```

### 2. 智能体 2 (交易订单)
```bash
MONGODB_URI=mongodb://localhost:27017/divination-orders  # 必须

# 测试环境可以暂时注释掉支付网关配置
# 系统会模拟支付成功
```

### 3. 智能体 3 (交付评价)
```bash
MONGODB_URI=mongodb://localhost:27017/divination-fulfillment  # 必须

EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email@gmail.com  # 必须
EMAIL_PASSWORD=your_app_password  # 必须
```

---

## 配置检查清单

使用此清单确保所有必要的配置都已完成：

### ✅ 智能体 1
- [ ] OpenAI API Key 已填写
- [ ] API_PORT=3000 已设置

### ✅ 智能体 2
- [ ] MongoDB URI 已配置
- [ ] 至少一个支付网关已配置 (推荐 Stripe)
- [ ] PORT=3002 已设置

### ✅ 智能体 3
- [ ] MongoDB URI 已配置
- [ ] 邮件服务器已配置 (Gmail 应用密码)
- [ ] PORT=3003 已设置

### ✅ 系统要求
- [ ] MongoDB 服务已启动 (`net start MongoDB`)
- [ ] Node.js 18+ 已安装
- [ ] 所有依赖已安装 (`npm install`)

---

## 编辑 .env 文件

### 方法 1: 使用 VS Code (推荐)

在 VS Code 中打开以下文件并编辑：
- `fortune-telling-mcp-server/.env`
- `transaction-order-agent/.env`
- `fulfillment-review-agent/.env`

### 方法 2: 使用记事本

```powershell
notepad fortune-telling-mcp-server\.env
notepad transaction-order-agent\.env
notepad fulfillment-review-agent\.env
```

### 方法 3: 使用命令行

```powershell
code fortune-telling-mcp-server\.env
code transaction-order-agent\.env
code fulfillment-review-agent\.env
```

---

## 安全提示 ⚠️

1. **不要提交 .env 文件到 Git**
   - `.env` 文件已在 `.gitignore` 中
   - 只提交 `.env.example` 作为模板

2. **保护你的 API Keys**
   - 不要在公开场合分享 API Keys
   - 定期轮换密钥
   - 使用环境变量，不要硬编码

3. **使用测试环境**
   - Stripe: 使用 `sk_test_` 开头的密钥
   - PayPal: 使用 `sandbox` 模式
   - 生产环境需要切换到正式密钥

---

## 故障排查

### 问题 1: OpenAI API Key 无效

**错误**: `Authentication error: Invalid API key`

**解决方案**:
1. 确认 API Key 格式正确 (sk-proj-xxx...)
2. 检查是否有空格或换行符
3. 确认账户有额度
4. 重新生成新的 API Key

### 问题 2: MongoDB 连接失败

**错误**: `MongoServerError: connect ECONNREFUSED`

**解决方案**:
```powershell
# 启动 MongoDB 服务
net start MongoDB

# 检查服务状态
Get-Service MongoDB

# 测试连接
mongosh
```

### 问题 3: Gmail 邮件发送失败

**错误**: `Invalid login: 535-5.7.8 Username and Password not accepted`

**解决方案**:
1. 确认已启用 Google 两步验证
2. 使用应用专用密码，不是普通密码
3. 检查 EMAIL_PORT=587 (TLS) 或 465 (SSL)
4. 允许不够安全的应用访问 (不推荐)

### 问题 4: Stripe 测试卡号

测试环境可以使用以下卡号：
- 成功: 4242 4242 4242 4242
- 失败: 4000 0000 0000 0002
- 需要验证: 4000 0025 0000 3155

---

## 下一步

配置完成后，执行以下步骤：

1. **构建项目**
```powershell
cd fortune-telling-mcp-server; npm run build
cd ..\transaction-order-agent; npm run build
cd ..\fulfillment-review-agent; npm run build
```

2. **启动 MongoDB**
```powershell
net start MongoDB
```

3. **启动服务**
```powershell
# 终端 1
cd fortune-telling-mcp-server; npm run api

# 终端 2
cd transaction-order-agent; npm start

# 终端 3
cd fulfillment-review-agent; npm start
```

4. **运行测试**
```powershell
node test-e2e-flow.js
```

---

## 获取帮助

如果遇到问题，请检查：
1. `INSTALLATION_SUMMARY.md` - 安装总结
2. `DEPLOYMENT_GUIDE.md` - 部署指南
3. `TESTING_GUIDE.md` - 测试指南
4. 各智能体的 `README.md` 文件

祝配置顺利！🚀
