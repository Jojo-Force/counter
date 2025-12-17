import re
import os
import json
import string

# 构建正则：汉字 + 中文标点 + 英文标点 + 数字
chinese_chars = r'\u4e00-\u9fff'
chinese_punctuation = r'\u3000-\u303f\uff00-\uffef'
english_punctuation = re.escape(string.punctuation)
digits = r'0-9'

# 合并所有要删除的字符
pattern = f'[{chinese_chars}{chinese_punctuation}{english_punctuation}{digits}]'

for i in range(1, 19):
    input_file = f"{i}.txt"
    output_file = f"{i}out.txt"

    if not os.path.exists(input_file):
        print(f"⚠️ 跳过 {input_file}（不存在）")
        continue

    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.read().splitlines()

    cleaned_lines = []
    for line in lines:
        # 删除汉字、标点、数字
        cleaned = re.sub(pattern, '', line)
        stripped = cleaned.strip()
        if stripped:
            cleaned_lines.append(stripped)

    # 生成紧凑单行 JS 数组
    js_array_str = json.dumps(
        cleaned_lines,
        ensure_ascii=False,
        separators=(',', ':')  # 无空格，最紧凑
    )

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_array_str)

    print(f"✅ {input_file} → {output_file}")