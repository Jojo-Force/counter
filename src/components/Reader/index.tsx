import style from "./style.module.scss";

import type { QuizProps, ReaderProps } from "../../types/api";
import textData from "../../textdata";
import { useRef, useState } from "react";
import soundFile1 from "../../assets/sound/fish1.wav";
import soundFile2 from "../../assets/sound/fish2.wav";
import soundFile3 from "../../assets/sound/fish3.wav";
import { FormOutlined, SettingOutlined } from "@ant-design/icons";
import Setting from "../Setting";
import PinyinText from "./PinyinText";

const Reader = ({
  settingValue,
  setPageNum,
  currentId,
  itemDatas,
  setItemDatas,
  msgSucess,
  msgError,
  globalSetting,
  setGlobalSetting,
}: ReaderProps) => {
  const [nowCount, setNowCount] = useState(0);
  const [showSetting, setShowSetting] = useState(false);
  const countUp = () => {
    setItemDatas(
      itemDatas.map((i) => (i.id === currentId ? { ...i, num: i.num + 1 } : i)),
    );
    setNowCount(nowCount + 1);
    playAudio();
  };

  const audioRef = useRef(null);
  const sounds = [soundFile1, soundFile2, soundFile3];

  const playAudio = () => {
    if (audioRef.current) {
      const randomNum = Math.floor(Math.random() * 3);
      audioRef.current.src = sounds[randomNum];
      audioRef.current.load();
      audioRef.current.play();
    }
  };
  const switchPage = () => {
    setPageNum(1);
  };
  const showSettingBtn = () => {
    setShowSetting(true);
  };
  return (
    <div>
      <header className={style.bigTitle}>
        <div className={style.betweenBox}>
          <div className={style.quizName}>
            <SettingOutlined
              onClick={showSettingBtn}
              className={style.settingIcon}
            />
            <span className={style.quizNameNumber}>
              {itemDatas.find((item) => item.id === currentId)?.title ?? 0}
            </span>
          </div>
          <FormOutlined onClick={switchPage} className={style.formIcon} />{" "}
        </div>
      </header>
      <section>
        <div className={style.countContainer}>
          {/*<p className={style.title}>*/}
          {/*{*/}
          {/*  textData.find(*/}
          {/*    (t) =>*/}
          {/*      t.name ===*/}
          {/*      itemDatas.find((item) => item.id === currentId)?.selected,*/}
          {/*  )?.name*/}
          {/*}*/}
          <PinyinText
            globalSetting={globalSetting}
            pinyin={
              textData.find(
                (t) =>
                  t.name ===
                  itemDatas.find((item) => item.id === currentId)?.selected,
              )?.namePinyin
            }
            text={
              textData.find(
                (t) =>
                  t.name ===
                  itemDatas.find((item) => item.id === currentId)?.selected,
              )?.name
            }
          />
          {/*</p>*/}
          <span
            className={style.counter}
            onClick={() =>
              setGlobalSetting({
                ...globalSetting,
                singerCount: !globalSetting.singerCount,
              })
            }
          >
            {/*{globalSetting.singerCount === true && (itemDatas.find((item) => item.id === currentId)?.title ?? 0)}*/}
            {globalSetting.singerCount === false &&
              (itemDatas.find((item) => item.id === currentId)?.num ?? 0)}
            {globalSetting.singerCount === true && nowCount}
          </span>
          {/*<p*/}
          {/*  className={style.text}*/}
          {/*  style={{*/}
          {/*    fontSize: `${globalSetting.fontSize}px`,*/}
          {/*    lineHeight: `${globalSetting.lineHeight}`,*/}
          {/*  }}*/}
          {/*>*/}
          <PinyinText
            globalSetting={globalSetting}
            pinyin={
              textData.find(
                (t) =>
                  t.name ===
                  itemDatas.find((item) => item.id === currentId)?.selected,
              )?.pinyin
            }
            text={
              textData.find(
                (t) =>
                  t.name ===
                  itemDatas.find((item) => item.id === currentId)?.selected,
              )?.text
            }
          />
          {/*</p>*/}
          <button
            style={{
              transform: `translate(${globalSetting.buttonX}%, ${globalSetting.buttonY}%)`,
            }}
            className={style.countBtn}
            onClick={countUp}
          >
            {" "}
          </button>
          <audio ref={audioRef} src={soundFile1} preload="auto"></audio>
        </div>
      </section>

      {showSetting === true && (
        <Setting
          msgSucess={msgSucess}
          msgError={msgError}
          itemDatas={itemDatas}
          currentId={currentId}
          setItemDatas={setItemDatas}
          setShowSetting={setShowSetting}
          setNowCount={setNowCount}
          nowCount={nowCount}
          globalSetting={globalSetting}
          setGlobalSetting={setGlobalSetting}
        />
      )}
    </div>
  );
};

export default Reader;
