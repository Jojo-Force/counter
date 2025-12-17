// components/PinyinText.tsx
import React from "react";
import { usePinyinText } from "@/hooks/usePinyinText";
import style from "../style.module.scss";

interface PinyinTextProps {
  text: string;
  pinyin?: string[];
  globalSetting: any;
}

const PinyinText: React.FC<PinyinTextProps> = ({
  text,
  pinyin,
  globalSetting,
}) => {
  const pinyinNodes = usePinyinText(text, pinyin);

  return (
    <p
      className={style.text}
      style={{
        fontSize: `${globalSetting.fontSize}px`,
        lineHeight: `${globalSetting.lineHeight}`,
      }}
    >
      {pinyinNodes}
    </p>
  );
};

export default PinyinText;
