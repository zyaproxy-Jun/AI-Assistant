import { astro } from 'iztro';

console.log('测试所有时辰...\n');

for (let h = 0; h < 24; h++) {
  try {
    astro.bySolar('2000-01-01', h, '男', true, 'zh-CN');
    console.log(`✅ ${h}时 OK`);
  } catch(e) {
    console.log(`❌ ${h}时 Error: ${e.message}`);
  }
}
