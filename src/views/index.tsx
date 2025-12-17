import style from "./login.module.scss";
import initLoginBg from "./init.ts";
import { useEffect, useState } from "react";
import { message, Modal } from "antd";
const { confirm } = Modal;

import { ExclamationCircleOutlined } from "@ant-design/icons";
import Quiz from "../components/Quiz";
import Setting from "../components/Setting";
import Menu from "../components/Menu";

const View = () => {
  // 加载完这个组件之后，加载背景

  const msgSucess = (str: string) => {
    message.success(
      {
        content: str,
        className: "custom-class",
        style: {
          fontSize: "2rem",
          marginTop: "20vh",
        },
      },
      2,
    );
  };

  const msgError = (str: string) => {
    message.error(
      {
        content: str,
        className: "custom-class",
        style: {
          fontSize: "2rem",
          marginTop: "20vh",
        },
      },
      2,
    );
  };
  const saveData = () => {
    try {
      localStorage.setItem("itemDatas", JSON.stringify(itemDatas));
      localStorage.setItem("groupDatas", JSON.stringify(groupDatas));
      localStorage.setItem("globalSetting", JSON.stringify(globalSetting));
    } catch (e) {
      console.error("保存失败", e);
      // 可选：提示用户“存储空间已满”等
    }
  };

  const loadData = () => {
    const data = localStorage.getItem("itemDatas");
    const setdata = data ? JSON.parse(data) : [];
    setItemDatas(setdata);

    const data2 = localStorage.getItem("groupDatas");
    const setdata2 = data2 ? JSON.parse(data2) : [];
    setGroupDatas(setdata2);
  };

  const initData = () => {};

  const [pageNum, setPageNum] = useState(1);
  const [currentId, setCurrentId] = useState(1);

  const [itemDatas, setItemDatas] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("itemDatas") || "[]");
    } catch {
      return [];
    }
  });

  const [groupDatas, setGroupDatas] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("groupDatas") || "[]");
    } catch {
      return [];
    }
  });

  const [globalSetting, setGlobalSetting] = useState({
    singerCount: false,
    username: "纪善馨",
    nowGroupId: 1,
    nowItemId: 7,
    fontSize: "30",
    lineHeight: "1.5",
    buttonX: "-50",
    buttonY: "0",
    pinyinEnable: false,
  });

  useEffect(() => {
    console.log("number 已更新为：", itemDatas, groupDatas);
    saveData();
  }, [itemDatas, groupDatas]);

  useEffect(() => {
    if (pageNum === 1) {
      setGlobalSetting({ ...globalSetting, nowItemId: -1 });
    }
    if (pageNum === 2) {
      setGlobalSetting({ ...globalSetting, nowItemId: currentId });
    }
  }, [pageNum, currentId]);

  useEffect(() => {
    if (pageNum === 1) {
      setGlobalSetting({ ...globalSetting, nowItemId: -1 });
    }
    if (pageNum === 2) {
      setGlobalSetting({ ...globalSetting, nowItemId: currentId });
    }
  }, [pageNum, currentId]);

  useEffect(() => {
    if (globalSetting.nowItemId > 0) {
      setPageNum2(2, globalSetting.nowItemId);
    }
  }, []);

  const setPageNum2 = (val, id) => {
    console.log(val, id);
    setCurrentId(id);
    setPageNum(val);
  };
  // useEffect(() => {
  //   console.log("number 已更新为：", number, showAnswerBtn);
  //   setQuizType(getQuizType());
  //   saveData();
  // }, [number, showAnswerBtn]);

  // useEffect(() => {
  //   if (life <= 0) {
  //     msgError("游戏失败！");
  //     setNumber(1);
  //     setValue("");
  //     setMulValue([""]);
  //     setRightAnswer("");
  //     setLife(LIFE_INIT);
  //     setShowAnswerBtn(false);
  //   }
  // }, [life, settingValue]);

  const showConfirm = () => {
    confirm({
      title: "要选择新的题库，重新开始吗?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      okText: "是",
      cancelText: "否",
      style: {
        fontSize: "2rem",
        marginTop: "20vh",
      },
      onOk() {
        msgSucess("选择了新的题目，重新开始！");
        //setLastSettingValue(settingValue);
        initData();
        //setQuizOrSetting(QUIZ_PAGE);
      },
      onCancel() {
        console.log("Cancel");
        //setSettingValue(lastSettingValue);
        //setQuizOrSetting(QUIZ_PAGE);
      },
    });
  };
  return (
    <div className={style.loginPage}>
      {/* 登录盒子 */}
      <div className={style.loginBox}>
        <main className={style.main}>
          {/* 标题部分 */}

          {/* 表单部分 */}

          {pageNum === 2 && (
            <Quiz
              setPageNum={setPageNum2}
              currentId={currentId}
              itemDatas={itemDatas}
              setItemDatas={setItemDatas}
              msgSucess={msgSucess}
              msgError={msgError}
              globalSetting={globalSetting}
              setGlobalSetting={setGlobalSetting}
            />
          )}
          {pageNum === 1 && (
            <Menu
              setPageNum2={setPageNum2}
              itemDatas={itemDatas}
              setItemDatas={setItemDatas}
              groupDatas={groupDatas}
              setGroupDatas={setGroupDatas}
              msgSucess={msgSucess}
              msgError={msgError}
              globalSetting={globalSetting}
              setGlobalSetting={setGlobalSetting}
            />
          )}
          {
            // <Setting
            //   onSettingCheckBoxChange={onSettingCheckBoxChange}
            //   settingValue={settingValue}
            //   goBack={goBack}
            //   settingOpen={settingOpen}
            // />
          }
          {/*<div className='quiz'>*/}

          {/*</div>*/}
        </main>
      </div>
    </div>
  );
};

export default View;
