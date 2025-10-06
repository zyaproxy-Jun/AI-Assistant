#!/usr/bin/env python3
"""
合并中文hexagrams数据和英文数据
Merge Chinese hexagrams data with English translations
"""

import json
import re

# 读取英文数据
with open('iching-english-data.json', 'r', encoding='utf-8') as f:
    english_data = json.load(f)

# 读取现有的TypeScript文件
with open('src/data/hexagrams.ts.backup', 'r', encoding='utf-8') as f:
    ts_content = f.read()

# 创建英文数据索引
english_map = {item['number']: item for item in english_data}

# 输出增强版TypeScript文件
output = """/**
 * Complete 64 Hexagrams of I-Ching (Enhanced with English translations)
 * 易经六十四卦完整数据（增强版-含英文翻译）
 * 
 * Chinese text (卦辞/象辞): From I-Ching (Book of Changes) original text
 * English translations: Based on i-ching.el by nik gaffney (FoAM)
 *   Repository: https://github.com/zzkt/i-ching
 *   License: GPL-3.0 (data extracted for educational purposes)
 *   Translations: Wilhelm-Baynes, Legge, Pearson
 *   Source: Wikipedia (CC-BY-SA), Unicode Standard
 * 
 * King Wen sequence (文王后天八卦序)
 */

export interface Hexagram {
  number: number;
  name: string;
  nameEn: string;
  symbol: string;
  trigrams: {
    upper: string;
    lower: string;
  };
  // 中文
  judgement: string;         // 卦辞（周易原文）
  image: string;             // 象辞（周易·象传）
  interpretation: string;    // 中文解读
  // 英文（来自i-ching.el）
  descriptionEn?: string;    // 英文描述
  judgementEn?: string;      // The Judgement (Wilhelm/Legge)
  imageEn?: string;          // The Image (Wilhelm)
  unicodeName?: string;      // Unicode标准名称
  lines?: string[];
}

export const HEXAGRAMS: Hexagram[] = [
"""

# 解析现有的TypeScript数据
hex_pattern = r'\{[^}]+number:\s*(\d+)[^}]+\}'

# 提取所有hexagram对象
matches = list(re.finditer(r'\{[\s\S]*?number:\s*(\d+)[\s\S]*?\},(?=\s*\{|\s*\];)', ts_content))

print(f"找到 {len(matches)} 个卦象对象")

for match in matches:
    hex_obj = match.group(0)
    number = int(match.group(1))
    
    # 移除末尾的逗号
    if hex_obj.endswith(','):
        hex_obj = hex_obj[:-1]
    
    # 如果有对应的英文数据，添加英文字段
    if number in english_map:
        eng = english_map[number]
        
        # 在对象末尾添加英文字段（在最后一个}之前）
        insert_pos = hex_obj.rfind('}')
        
        english_fields = f"""
    // English translations (from i-ching.el)
    descriptionEn: {json.dumps(eng['descriptionEn'], ensure_ascii=False)},
    judgementEn: {json.dumps(eng['judgementEn'], ensure_ascii=False)},
    imageEn: {json.dumps(eng['imageEn'], ensure_ascii=False)},
    unicodeName: {json.dumps(eng['unicodeName'], ensure_ascii=False)},
  """
        hex_obj = hex_obj[:insert_pos] + english_fields + hex_obj[insert_pos:]
    
    output += "  " + hex_obj + ",\n"

output += """];

// Helper functions
export function getHexagram(number: number): Hexagram | undefined {
  return HEXAGRAMS.find(h => h.number === number);
}

export function getHexagramName(number: number): string {
  const hexagram = getHexagram(number);
  return hexagram ? hexagram.name : '';
}

export function getAllHexagrams(): Hexagram[] {
  return HEXAGRAMS;
}
"""

# 写入新文件
with open('src/data/hexagrams-enhanced.ts', 'w', encoding='utf-8') as f:
    f.write(output)

print("✅ 增强版数据已生成: src/data/hexagrams-enhanced.ts")
print(f"   - 包含 {len(matches)} 个卦象")
print(f"   - 中文数据: 卦辞、象辞、解读")
print(f"   - 英文数据: 描述、判断、意象、Unicode名称")
