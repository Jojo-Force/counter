// hooks/usePinyinText.tsx
import { useMemo } from "react";
import { pinyin } from "pinyin-pro";

export const usePinyinText = (text: string, pinyin: string[]) => {
  return useMemo(() => {
    const result: React.ReactNode[] = [];
    let keyIndex = 0;
    let count = 0;

    for (const char of text) {
      if (/[\u4e00-\u9fa5]/.test(char)) {
        // const py = pinyin(char, { toneType: "symbol", type: "array" })[0] || "";
        const py = pinyin[count] || "";
        result.push(
          <ruby key={keyIndex++}>
            {char}
            <rt>{py}</rt>
          </ruby>,
        );
        count++;
      } else {
        // 非汉字：直接作为文本节点
        result.push(<span key={keyIndex++}>{char}</span>);
      }
    }

    return result;
  }, [text]);
};
