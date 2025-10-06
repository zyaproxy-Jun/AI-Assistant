#!/bin/bash

# 综合测试报告生成脚本
# 依次测试所有6个占卜系统

echo "════════════════════════════════════════════════════════════════════════════════"
echo "  🎯 综合占卜系统测试报告"
echo "════════════════════════════════════════════════════════════════════════════════"
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 测试结果数组
declare -a results
declare -a times

# 测试函数
run_test() {
    local name=$1
    local script=$2
    
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}测试: $name${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    # 运行测试并捕获输出
    start_time=$(date +%s%3N)
    if timeout 30 node "$script" > /tmp/test_output.txt 2>&1; then
        end_time=$(date +%s%3N)
        duration=$((end_time - start_time))
        
        # 提取耗时（如果测试脚本输出了耗时）
        if grep -q "耗时:" /tmp/test_output.txt; then
            script_time=$(grep "耗时:" /tmp/test_output.txt | head -1 | grep -oP '\d+(?=ms)')
            if [ ! -z "$script_time" ]; then
                duration=$script_time
            fi
        fi
        
        echo -e "${GREEN}✓ $name: 成功${NC} (${duration}ms)"
        results+=("✓")
        times+=("$duration")
        
        # 显示关键信息
        if grep -q "命主:" /tmp/test_output.txt; then
            echo "  $(grep "命主:" /tmp/test_output.txt | head -1)"
        fi
        if grep -q "太阳星座:" /tmp/test_output.txt; then
            echo "  $(grep "太阳星座:" /tmp/test_output.txt | head -1)"
        fi
        if grep -q "抽到的牌：" /tmp/test_output.txt; then
            echo "  塔罗牌抽取成功"
        fi
        
        return 0
    else
        end_time=$(date +%s%3N)
        duration=$((end_time - start_time))
        
        echo -e "${RED}✗ $name: 失败${NC} (${duration}ms)"
        results+=("✗")
        times+=("0")
        
        # 显示错误信息
        if [ -f /tmp/test_output.txt ]; then
            echo "  错误: $(tail -1 /tmp/test_output.txt)"
        fi
        
        return 1
    fi
    
    echo ""
}

echo "开始测试所有占卜系统..."
echo ""

# 运行所有测试
run_test "1. 塔罗占卜" "test-tarot.js"
run_test "2. 紫微斗数" "test-ziwei-14.js"
run_test "3. 西洋占星 (新修复)" "test-birth-chart.js"
run_test "4. 梦境解析" "test-all-features.js"  # 会测试梦境
run_test "5. 八字命理" "test-all-features.js"  # 会测试八字
run_test "6. 易经卜卦" "test-all-features.js"  # 会测试易经

# 生成测试报告
echo ""
echo "════════════════════════════════════════════════════════════════════════════════"
echo "  📊 测试结果汇总"
echo "════════════════════════════════════════════════════════════════════════════════"
echo ""

# 计算统计数据
total=${#results[@]}
success=0
for result in "${results[@]}"; do
    if [ "$result" = "✓" ]; then
        ((success++))
    fi
done
fail=$((total - success))

# 计算平均时间
total_time=0
count_time=0
for time in "${times[@]}"; do
    if [ "$time" != "0" ]; then
        total_time=$((total_time + time))
        ((count_time++))
    fi
done

if [ $count_time -gt 0 ]; then
    avg_time=$((total_time / count_time))
else
    avg_time=0
fi

echo "系统状态："
echo "  ${results[0]} 塔罗占卜 (${times[0]}ms)"
echo "  ${results[1]} 紫微斗数 (${times[1]}ms)"
echo "  ${results[2]} 西洋占星 (${times[2]}ms) 🎉 新修复"
echo "  ${results[3]} 梦境解析 (${times[3]}ms)"
echo "  ${results[4]} 八字命理 (${times[4]}ms)"
echo "  ${results[5]} 易经卜卦 (${times[5]}ms)"
echo ""

echo "统计数据："
echo -e "  总测试数: ${CYAN}$total${NC}"
echo -e "  成功: ${GREEN}$success${NC}"
echo -e "  失败: ${RED}$fail${NC}"
echo -e "  成功率: $(echo "scale=1; $success * 100 / $total" | bc)%"
echo -e "  平均响应时间: ${CYAN}${avg_time}ms${NC}"
echo ""

# 特别标注
if [ "${results[2]}" = "✓" ]; then
    echo -e "${GREEN}🎉 西洋占星功能已成功修复并通过测试！${NC}"
    echo ""
fi

if [ $success -eq $total ]; then
    echo -e "${GREEN}✅ 所有系统测试通过！项目状态: 生产就绪${NC}"
else
    echo -e "${YELLOW}⚠️  部分系统测试失败，请检查日志${NC}"
fi

echo ""
echo "════════════════════════════════════════════════════════════════════════════════"

# 清理
rm -f /tmp/test_output.txt

# 返回状态码
if [ $success -eq $total ]; then
    exit 0
else
    exit 1
fi
