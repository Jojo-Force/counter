import s from "./style.module.scss";
import type { SettingProps } from "../../types/api";
import { Modal, Switch } from "antd";
import React, { useRef, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import InputRange from "./InputRange";
import clsx from "clsx";

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

const Setting = ({
  msgSucess,
  msgError,
  itemDatas,
  currentId,
  setItemDatas,
  setShowSetting,
  setNowCount,
  nowCount,
  globalSetting,
  setGlobalSetting,
}: SettingProps) => {
  const inputCount = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isValidPositiveNumber = (value: string): boolean => {
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num) && num > 0;
  };

  const handleOk = () => {
    const addCount = inputCount.current?.value.trim() ?? "0";
    if (!isValidPositiveNumber(addCount)) {
      alert("非法输入");
      setIsModalOpen(false);
      return;
    }
    setItemDatas(
      itemDatas.map((i) =>
        i.id === currentId ? { ...i, num: i.num + parseInt(addCount) } : i,
      ),
    );
    setNowCount(nowCount + parseInt(addCount));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showConfirm = (msg) => {
    Modal.confirm({
      title: msg,
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: "是",
      cancelText: "否",
      style: {
        fontSize: "2rem",
        marginTop: "20vh",
      },
      onOk() {
        //setQuizOrSetting(QUIZ_PAGE);
        setItemDatas(
          itemDatas.map((i) => (i.id === currentId ? { ...i, num: 0 } : i)),
        );
        setNowCount(0);
        msgSucess("已经清空");
      },
      onCancel() {
        console.log("Cancel");
        //setSettingValue(lastSettingValue);
        //setQuizOrSetting(QUIZ_PAGE);
      },
    });
  };

  const showConfirmSub = (msg) => {
    Modal.confirm({
      title: msg,
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: "是",
      cancelText: "否",
      style: {
        fontSize: "2rem",
        marginTop: "20vh",
      },
      onOk() {
        //setQuizOrSetting(QUIZ_PAGE);
        setItemDatas(
          itemDatas.map((i) =>
            i.id === currentId ? { ...i, num: i.num - 1 } : i,
          ),
        );
        setNowCount(nowCount - 1);
        msgSucess("已经减一");
      },
      onCancel() {
        console.log("Cancel");
        //setSettingValue(lastSettingValue);
        //setQuizOrSetting(QUIZ_PAGE);
      },
    });
  };
  const goBack = () => {
    setShowSetting(false);
  };
  const clearBtn = () => {
    showConfirm("是否要清空计数");
  };

  const subBtn = () => {
    showConfirmSub("是否要计数减一");
  };
  const addBtn = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={s.setting}>
      <div className={clsx(s.setting__box, s.mb)}>
        <button onClick={clearBtn} className={s.btn}>
          清空计数
        </button>
      </div>
      <div className={s.setting__box}>
        <button onClick={subBtn} className={s.btn}>
          计数减一
        </button>
      </div>
      <div className={s.setting__box}>
        <button onClick={addBtn} className={s.btn}>
          增加计数
        </button>
      </div>
      <div className={s.setting__box__big}>
        <span className={s.setting__box__title}>行高</span>
        <InputRange
          min={1}
          max={10}
          step={0.1}
          value={globalSetting.lineHeight}
          onChange={(e) =>
            setGlobalSetting({ ...globalSetting, lineHeight: e.target.value })
          }
        />
      </div>
      <div className={s.setting__box__big}>
        <span className={s.setting__box__title}>大小</span>
        <InputRange
          min={1}
          max={30}
          step={1}
          value={globalSetting.fontSize}
          onChange={(e) =>
            setGlobalSetting({ ...globalSetting, fontSize: e.target.value })
          }
        />
      </div>
      <div className={s.setting__box__big}>
        <span className={s.setting__box__title}>横轴</span>
        <InputRange
          min={-200}
          max={50}
          step={1}
          value={globalSetting.buttonX}
          onChange={(e) =>
            setGlobalSetting({ ...globalSetting, buttonX: e.target.value })
          }
        />
      </div>
      <div className={s.setting__box__big}>
        <span className={s.setting__box__title}>竖轴</span>
        <InputRange
          min={-400}
          max={400}
          step={1}
          value={globalSetting.buttonY}
          onChange={(e) =>
            setGlobalSetting({ ...globalSetting, buttonY: e.target.value })
          }
        />
      </div>
      {/*<div className={s.setting__box}>*/}
      {/*  <span className={s.spanName}>计数声音</span>*/}
      {/*  <Switch defaultChecked onChange={onChange} />*/}
      {/*</div>*/}
      {/*<div className={s.setting__box}>*/}
      {/*  <span className={s.spanName}>计数震动</span>*/}
      {/*  <Switch defaultChecked onChange={onChange} />*/}
      {/*</div>*/}
      {/*<div className={s.setting__box}>*/}
      {/*  <span className={s.spanName}>单次计数</span>*/}
      {/*  <Switch defaultChecked onChange={onChange} />*/}
      {/*</div>*/}
      <div className={s.setting__box}>
        <button onClick={goBack} className={s.btn}>
          返回
        </button>
      </div>
      <Modal
        title=""
        okText="是"
        cancelText="否"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        width={300}
      >
        <input ref={inputCount} placeholder={"请输入增加的计数"} />
      </Modal>
    </div>
  );
};

export default Setting;
