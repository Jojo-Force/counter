// components/PinyinText.tsx
import React from "react";
import { usePinyinText } from "@/hooks/usePinyinText";
import style from "../style.module.scss";

interface PinyinTextProps {
  text: string;
  pinyin?: string[];
  className: string;
  style?: any;
  globalSetting: any;
}

const PinyinText: React.FC<PinyinTextProps> = ({
  text,
  pinyin,
  className,
  style,
  globalSetting,
}) => {
  const pinyinNodes = usePinyinText(text, pinyin);

  return globalSetting.pinyinEnable ? (
    <p className={className} style={style}>
      {pinyinNodes}
    </p>
  ) : (
    <p className={className} style={style}>
      {text}
    </p>
  );
};

export default PinyinText;
