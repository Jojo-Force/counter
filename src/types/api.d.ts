// 这个文件转为定义请求参数的类型，和响应的类型
// {
//     "msg":"22",
//     "img":"22",
//     "code":200,
//     "captchaEnabled":true,
//     "uuid":"222",
// }

import type Password from "antd/es/input/Password";
import type { RadioChangeEvent } from "antd";

// 验证码的响应类型约束
interface CaptchaAPIRes {
  msg: string;
  img: string;
  code: number;
  captchaEnabled: boolean;
  uuid: string;
}

interface LoginAPIReq {
  username: string;
  password: string;
  code: string;
  uuid: string;
}

interface LoginAPIRes {
  msg: string;
  code: number;
  token: string;
}

interface Work {
  ask: string;
  A: string;
  B: string;
  C: string;
  D: string;
  answer: string;
}

interface SingleQuizProps {
  onRadioChange: (e: RadioChangeEvent) => void; // ✅ 正确类型
  value: string;
  rightAnswer: string;
  workData: Work;
}

interface MultiQuizProps {
  onCheckBoxChange: (checkedValues: string[]) => void;
  rightAnswer: string;
  mulValue: string[];
  workData: Work;
}

interface JudgeQuizProps {
  onRadioChange: (e: RadioChangeEvent) => void;
  value: string;
  rightAnswer: string;
}

interface ReaderProps {
  number: number;
  workData: Work;
  settingValue: number;
  quizType: number;
  onRadioChange: (e: RadioChangeEvent) => void;
  rightAnswer: string;
  value: string;
  life: number;
  onCheckBoxChange: (checkedValues: string[]) => void;
  goNext: () => void;
  getAnswer: () => void;
  showAnswerBtn: boolean;
  mulValue: string[];
  switchPage: () => void;
}

interface SettingProps {
  onSettingCheckBoxChange: (e: RadioChangeEvent) => void;
  settingValue: number;
  settingOpen: boolean;
  goBack: () => void;
  switchPage: () => void;
}

interface TextData {
  name: string;
  text: string;
  pinyin: string[];
  namePinyin: string[];
}

interface itemProps {
  id: number;
  groupId: number;
  num: number;
  title: string;
  time: string;
  name: string;
  onClick: () => void;
  deleteClick: () => void;
}
