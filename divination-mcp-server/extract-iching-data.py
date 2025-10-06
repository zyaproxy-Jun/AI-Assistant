#!/usr/bin/env python3
"""
提取 i-ching.el 中的64卦英文数据
Extract 64 hexagrams English data from i-ching.el
"""

import re
import json

def parse_iching_el(filepath):
    """解析 i-ching.el 文件，提取hexagram数据"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 找到 i-ching-hexagram-summary 变量
    pattern = r'\(defvar i-ching-hexagram-summary\s+\'?\((.*?)\)\s*"'
    match = re.search(pattern, content, re.DOTALL)
    
    if not match:
        print("找不到 i-ching-hexagram-summary")
        return []
    
    hexagram_data = match.group(1)
    
    # 解析每个hexagram（格式：(number "symbol" "description" "judgement" "image" "unicode-name")）
    # 使用更精确的正则表达式
    hexagram_pattern = r'\((\d+)\s+"([^"]+)"\s+"([^"]+)"\s+"([^"]+)"\s+"([^"]+)"\s+"([^"]+)"\)'
    
    hexagrams = []
    matches = re.findall(hexagram_pattern, content, re.DOTALL)
    
    for match in matches:
        number, symbol, description, judgement, image, unicode_name = match
        
        # 清理多余的空白字符
        description = ' '.join(description.split())
        judgement = ' '.join(judgement.split())
        image = ' '.join(image.split())
        unicode_name = ' '.join(unicode_name.split())
        
        hexagrams.append({
            'number': int(number),
            'symbol': symbol,
            'descriptionEn': description,
            'judgementEn': judgement,
            'imageEn': image,
            'unicodeName': unicode_name
        })
    
    return sorted(hexagrams, key=lambda x: x['number'])

def main():
    filepath = '/workspaces/AI-Assistant/iching-source/i-ching.el'
    
    print(f"正在解析 {filepath}...")
    hexagrams = parse_iching_el(filepath)
    
    print(f"找到 {len(hexagrams)} 个卦象")
    
    if hexagrams:
        # 输出为JSON
        output_file = '/workspaces/AI-Assistant/divination-mcp-server/iching-english-data.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(hexagrams, f, ensure_ascii=False, indent=2)
        
        print(f"数据已保存到: {output_file}")
        
        # 显示前3个作为示例
        print("\n前3个卦象示例：")
        for hex in hexagrams[:3]:
            print(f"\n{hex['number']}. {hex['symbol']}")
            print(f"  描述: {hex['descriptionEn'][:100]}...")
            print(f"  卦辞: {hex['judgementEn'][:80]}...")
    else:
        print("未能解析到数据")

if __name__ == '__main__':
    main()
