/**
 * 导入商品数据到 MongoDB
 * 运行: node import-products.js
 */

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const MONGODB_URL = 'mongodb://admin:admin123@localhost:27017';
const DATABASE_NAME = 'ether_db';
const COLLECTION_NAME = 'products';

async function importProducts() {
  const client = new MongoClient(MONGODB_URL);

  try {
    console.log('🔗 连接到 MongoDB...');
    await client.connect();
    console.log('✅ 连接成功');

    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // 读取商品数据
    const productsPath = path.join(__dirname, 'src', 'data', 'products.json');
    console.log(`📖 读取商品数据: ${productsPath}`);
    const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    console.log(`✅ 读取到 ${productsData.length} 个商品`);

    // 清空现有数据 (可选)
    console.log('🗑️  清空现有商品数据...');
    await collection.deleteMany({});

    // 插入新数据
    console.log('📥 导入商品数据...');
    const result = await collection.insertMany(productsData);
    console.log(`✅ 成功导入 ${result.insertedCount} 个商品`);

    // 创建索引
    console.log('🔍 创建索引...');
    await collection.createIndex({ 'divinationAffinity.themes': 1 });
    await collection.createIndex({ 'divinationAffinity.keywords': 1 });
    await collection.createIndex({ stock: 1 });
    await collection.createIndex({ status: 1 });
    await collection.createIndex({ salesCount: -1 });
    console.log('✅ 索引创建完成');

    // 验证数据
    const count = await collection.countDocuments();
    console.log(`\n✨ 导入完成！当前数据库有 ${count} 个商品`);

    // 显示商品列表
    console.log('\n📦 商品列表:');
    const products = await collection.find({}).limit(10).toArray();
    products.forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.name} (${product.type}) - ¥${product.price}`);
    });

  } catch (error) {
    console.error('❌ 导入失败:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n🔌 数据库连接已关闭');
  }
}

// 运行导入
importProducts();
