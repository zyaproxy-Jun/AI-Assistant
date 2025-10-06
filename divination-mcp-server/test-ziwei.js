#!/usr/bin/env node

/**
 * 紫微斗数测试脚本
 * Test Zi Wei Dou Shu (Purple Star Astrology)
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testZiwei() {
  console.log('');
  console.log('='.repeat(70));
  console.log('⭐ 紫微斗数测试 - Zi Wei Dou Shu Test');
  console.log('='.repeat(70));
  console.log('');

  const serverPath = join(__dirname, 'dist', 'index.js');
  
  console.log('🚀 启动 MCP 服务器...');
  const transport = new StdioClientTransport({
    command: 'node',
    args: [serverPath]
  });

  const client = new Client({
    name: 'ziwei-test',
    version: '1.0.0'
  }, {
    capabilities: {}
  });

  try {
    await client.connect(transport);
    console.log('✅ 服务器连接成功');
    console.log('');

    // 测试参数
    const testParams = {
      solar_date: '2000-01-01',
      birth_hour: 16,  // 下午4点（申时）
      gender: '男',
      language: 'zh-CN'
    };

    console.log('📋 测试参数：');
    console.log(JSON.stringify(testParams, null, 2));
    console.log('');
    console.log('💡 提示：birth_hour 使用24小时制（0-23）');
    console.log('   - 0-12时：直接使用');
    console.log('   - 13-23时：自动转换为下午时辰');
    console.log('');

    console.log('🔮 正在生成紫微命盘...');
    console.log('');

    const startTime = Date.now();
    const result = await client.callTool({
      name: 'ziwei_chart',
      arguments: testParams
    });
    const duration = Date.now() - startTime;

    console.log('✅ 命盘生成成功！');
    console.log(`⏱️  耗时: ${duration}ms`);
    console.log('');
    console.log('='.repeat(70));
    console.log('📊 紫微命盘结果：');
    console.log('='.repeat(70));
    console.log('');

    // 解析并美化显示结果
    if (result.content && result.content.length > 0) {
      const content = result.content[0];
      
      if (content.type === 'text') {
        try {
          const data = JSON.parse(content.text);
          
          // 显示基本信息
          if (data.basic_info) {
            console.log('👤 基本信息：');
            console.log('-'.repeat(70));
            console.log(`  出生日期: ${data.basic_info.solar_date || testParams.solar_date}`);
            console.log(`  出生时辰: ${testParams.birth_hour}时 (${getChineseHour(testParams.birth_hour)})`);
            console.log(`  性别: ${testParams.gender}`);
            console.log(`  农历: ${data.basic_info.lunar_date || '未知'}`);
            console.log('');
          }

          // 显示命盘信息
          if (data.astrolabe) {
            console.log('🌟 命盘信息：');
            console.log('-'.repeat(70));
            
            if (data.astrolabe.gender) {
              console.log(`  性别: ${data.astrolabe.gender}`);
            }
            if (data.astrolabe.solarDate) {
              console.log(`  阳历: ${data.astrolabe.solarDate}`);
            }
            if (data.astrolabe.lunarDate) {
              console.log(`  农历: ${data.astrolabe.lunarDate}`);
            }
            if (data.astrolabe.chineseDate) {
              console.log(`  干支: ${data.astrolabe.chineseDate}`);
            }
            console.log('');

            // 十二宫位
            if (data.astrolabe.palaces && data.astrolabe.palaces.length > 0) {
              console.log('🏛️  十二宫位：');
              console.log('-'.repeat(70));
              
              const palaceNames = {
                '命宫': '命宮 (Self Palace)',
                '兄弟宫': '兄弟宮 (Siblings Palace)',
                '夫妻宫': '夫妻宮 (Marriage Palace)',
                '子女宫': '子女宮 (Children Palace)',
                '财帛宫': '財帛宮 (Wealth Palace)',
                '疾厄宫': '疾厄宮 (Health Palace)',
                '迁移宫': '遷移宮 (Travel Palace)',
                '仆役宫': '僕役宮 (Friends Palace)',
                '官禄宫': '官祿宮 (Career Palace)',
                '田宅宫': '田宅宮 (Property Palace)',
                '福德宫': '福德宮 (Fortune Palace)',
                '父母宫': '父母宮 (Parents Palace)'
              };

              data.astrolabe.palaces.forEach((palace, index) => {
                const palaceName = palace.name || `宫位${index + 1}`;
                const displayName = palaceNames[palaceName] || palaceName;
                console.log(`  ${index + 1}. ${displayName}`);
                
                // 显示主星
                if (palace.majorStars && palace.majorStars.length > 0) {
                  console.log(`     主星: ${palace.majorStars.join(', ')}`);
                }
                
                // 显示副星
                if (palace.minorStars && palace.minorStars.length > 0 && palace.minorStars.length <= 5) {
                  console.log(`     副星: ${palace.minorStars.join(', ')}`);
                }
              });
              console.log('');
            }
          }

          // 显示原始JSON（仅关键部分）
          console.log('📄 完整数据：');
          console.log('-'.repeat(70));
          console.log(JSON.stringify(data, null, 2).substring(0, 1000) + '...');
          console.log('');

        } catch (e) {
          // 如果不是JSON，直接显示
          console.log(content.text);
          console.log('');
        }
      }
    }

    console.log('='.repeat(70));
    console.log('✅ 紫微斗数测试完成！');
    console.log('='.repeat(70));
    console.log('');

    // 清理
    await client.close();

  } catch (error) {
    console.error('');
    console.error('='.repeat(70));
    console.error('❌ 测试失败：');
    console.error('='.repeat(70));
    console.error('');
    console.error('错误信息:', error.message);
    console.error('');
    if (error.stack) {
      console.error('错误堆栈:', error.stack);
      console.error('');
    }
    console.error('='.repeat(70));
    console.error('');
    process.exit(1);
  }
}

// 时辰对照
function getChineseHour(hour) {
  const hours = [
    '子时', '丑时', '寅时', '卯时',
    '辰时', '巳时', '午时', '未时',
    '申时', '酉时', '戌时', '亥时'
  ];
  
  const timeRanges = [
    '23-1时', '1-3时', '3-5时', '5-7时',
    '7-9时', '9-11时', '11-13时', '13-15时',
    '15-17时', '17-19时', '19-21时', '21-23时'
  ];

  let index;
  if (hour >= 23 || hour < 1) {
    index = 0;
  } else {
    index = Math.floor((hour + 1) / 2);
  }

  return `${hours[index]} (${timeRanges[index]})`;
}

// 运行测试
testZiwei().catch(error => {
  console.error('未捕获的错误:', error);
  process.exit(1);
});
