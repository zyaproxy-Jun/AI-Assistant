import Lunar from 'lunar-javascript';

// 分析 1983年9月29日 的八字
const solar = Lunar.Solar.fromYmd(1983, 9, 29);
const lunar = solar.getLunar();
const baZi = lunar.getEightChar();

console.log('\n╔════════════════════════════════════════╗');
console.log('║  1983年09月29日 八字详细分析          ║');
console.log('╚════════════════════════════════════════╝\n');

console.log('📅 阳历：', solar.toFullString());
console.log('📅 农历：', lunar.toFullString());
console.log('\n🎋 完整八字：', baZi.toString());
console.log('');
console.log('┌─────────────────────────────────┐');
console.log('│  四柱详情                        │');
console.log('├─────────────────────────────────┤');
console.log('│  年柱：', baZi.getYear(), '           │');
console.log('│  月柱：', baZi.getMonth(), '           │');
console.log('│  日柱：', baZi.getDay(), '            │');
console.log('└─────────────────────────────────┘');

console.log('\n📝 月柱计算分析：');
console.log('   农历月份：', lunar.getMonth(), '月');
console.log('   月干：', baZi.getMonth().substring(0, 1));
console.log('   月支：', baZi.getMonth().substring(1, 2));

// 获取节气信息
console.log('\n🌸 节气信息：');
const jieQi = solar.getJieQi();
console.log('   当前节气：', jieQi || '无');

// 获取当月节气
const jieQiTable = solar.getJieQiTable();
console.log('   本月节气：');
for (const [name, date] of Object.entries(jieQiTable)) {
  const jqDate = Lunar.Solar.fromJulianDay(date);
  console.log(`   ${name}: ${jqDate.toYmd()}`);
}

console.log('\n💡 月柱计算说明：');
console.log('   八字的月柱不是按照农历月份计算');
console.log('   而是按照节气（二十四节气的节）来划分');
console.log('   每个月以节气为界：');
console.log('   - 立春后为寅月（正月）');
console.log('   - 惊蛰后为卯月（二月）');
console.log('   - 清明后为辰月（三月）');
console.log('   - 立夏后为巳月（四月）');
console.log('   - 芒种后为午月（五月）');
console.log('   - 小暑后为未月（六月）');
console.log('   - 立秋后为申月（七月）');
console.log('   - 白露后为酉月（八月）');
console.log('   - 寒露后为戌月（九月）⬅️');
console.log('   - 立冬后为亥月（十月）');
console.log('   - 大雪后为子月（十一月）');
console.log('   - 小寒后为丑月（十二月）');

// 检查1983年9月的节气
console.log('\n🔍 1983年9月关键节气：');
const bailu = Lunar.Solar.fromYmd(1983, 9, 8);  // 大约白露时间
const hanlu = Lunar.Solar.fromYmd(1983, 10, 8); // 大约寒露时间
console.log('   白露（进入酉月）：约 9月7-8日');
console.log('   寒露（进入戌月）：约 10月8-9日');
console.log('   → 9月29日 在白露之后、寒露之前');
console.log('   → 所以月支应该是 酉月');

console.log('\n⚠️  问题分析：');
console.log('   如果月柱显示为"壬戌"，其中：');
console.log('   - 月支"戌"是寒露后的月份');
console.log('   - 但9月29日还未到寒露');
console.log('   - 正确的月支应该是"酉"');
console.log('   - 需要检查节气计算逻辑');
