#!/usr/bin/env node

import { astro } from 'iztro';

console.log('测试 iztro 时辰格式...\n');

// 测试不同的时辰格式
const testCases = [
  { hour: 16, desc: '数字16（下午4点）' },
  { hour: '16', desc: '字符串"16"' },
  { hour: '申时', desc: '申时（15-17点）' },
  { hour: 15, desc: '数字15' },
  { hour: 17, desc: '数字17' },
];

for (const test of testCases) {
  try {
    console.log(`测试: ${test.desc} (${test.hour})`);
    const result = astro.bySolar('2000-01-01', test.hour, '男', true, 'zh-CN');
    console.log(`✅ 成功! 命宫: ${result.palace('命宫').name}`);
  } catch (error) {
    console.log(`❌ 失败: ${error.message}`);
  }
  console.log('');
}

// 显示时辰对照表
console.log('时辰对照表:');
console.log('子时: 23-1   (可用: 23, 0, "子时")');
console.log('丑时: 1-3    (可用: 1, 2, "丑时")');
console.log('寅时: 3-5    (可用: 3, 4, "寅时")');
console.log('卯时: 5-7    (可用: 5, 6, "卯时")');
console.log('辰时: 7-9    (可用: 7, 8, "辰时")');
console.log('巳时: 9-11   (可用: 9, 10, "巳时")');
console.log('午时: 11-13  (可用: 11, 12, "午时")');
console.log('未时: 13-15  (可用: 13, 14, "未时")');
console.log('申时: 15-17  (可用: 15, 16, "申时")');
console.log('酉时: 17-19  (可用: 17, 18, "酉时")');
console.log('戌时: 19-21  (可用: 19, 20, "戌时")');
console.log('亥时: 21-23  (可用: 21, 22, "亥时")');
