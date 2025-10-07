import Lunar from 'lunar-javascript';

console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║        八字月柱修复验证 - 1983年9月29日测试           ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

// 测试日期：1983年9月29日 14:00
const solar = Lunar.Solar.fromYmdHms(1983, 9, 29, 14, 0, 0);
const lunar = solar.getLunar();
const baZi = lunar.getEightChar();

console.log('📅 测试日期：1983年9月29日 14:00');
console.log('📅 农历：', lunar.toString());
console.log('');

console.log('🎋 完整八字：', baZi.toString());
console.log('');

console.log('┌─────────────────────────────────────┐');
console.log('│  四柱详情                            │');
console.log('├─────────────────────────────────────┤');
console.log('│  年柱：', baZi.getYear(), '                  │');
console.log('│  月柱：', baZi.getMonth(), '⬅️ 修复重点      │');
console.log('│  日柱：', baZi.getDay(), '                   │');
console.log('│  时柱：', baZi.getTime(), '                  │');
console.log('└─────────────────────────────────────┘');

console.log('\n✅ 验证结果：');
const monthPillar = baZi.getMonth();
if (monthPillar === '辛酉') {
  console.log('   ✅ 月柱正确！ 显示为 "辛酉"');
  console.log('   ✅ 说明节气计算正常（白露后、寒露前）');
} else if (monthPillar === '壬戌') {
  console.log('   ❌ 月柱错误！ 显示为 "壬戌"');
  console.log('   ❌ 应该是 "辛酉"（9月29日在白露后、寒露前）');
} else {
  console.log('   ⚠️  月柱为：', monthPillar);
  console.log('   ⚠️  预期为：辛酉');
}

console.log('\n📊 节气验证：');
console.log('   9月8日前后 - 白露 → 进入酉月');
console.log('   10月8日前后 - 寒露 → 进入戌月');
console.log('   9月29日位于白露之后、寒露之前');
console.log('   因此月柱应该是"辛酉"');

// 测试另一个日期：1983年10月29日（应该是壬戌）
console.log('\n');
console.log('╔════════════════════════════════════════════════════════╗');
console.log('║        对比测试 - 1983年10月29日测试                   ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

const solar2 = Lunar.Solar.fromYmdHms(1983, 10, 29, 14, 0, 0);
const lunar2 = solar2.getLunar();
const baZi2 = lunar2.getEightChar();

console.log('📅 测试日期：1983年10月29日 14:00');
console.log('🎋 完整八字：', baZi2.toString());
console.log('   月柱：', baZi2.getMonth(), '⬅️ 应该是"壬戌"（寒露后）');

console.log('\n✅ 对比结果：');
console.log('   9月29日 → 月柱：', baZi.getMonth(), '（酉月）');
console.log('   10月29日 → 月柱：', baZi2.getMonth(), '（戌月）');

console.log('\n🎉 修复总结：');
console.log('   使用 lunar-javascript 的 getEightChar() 方法');
console.log('   自动基于节气计算月柱，确保准确性');
console.log('   不再使用简化的公历月份计算');
console.log('');
