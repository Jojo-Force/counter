import style from "./login.module.scss";
import initLoginBg from "./init.ts";
import { useEffect, useState } from "react";
import { message, Modal } from "antd";
const { confirm } = Modal;

import { ExclamationCircleOutlined } from "@ant-design/icons";
import Reader from "../components/Reader";
import Menu from "../components/Menu";
import { useStorage } from "../storage/useStorage";

const View = () => {
  const {
    itemDatas,
    setItemDatas,
    groupDatas,
    setGroupDatas,
    globalSetting,
    setGlobalSetting,
    isHydrated,
  } = useStorage();

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

  const [pageNum, setPageNum] = useState(1);
  const [currentId, setCurrentId] = useState(1);

  useEffect(() => {
    if (pageNum === 1) {
      setGlobalSetting({ ...globalSetting, nowItemId: -1 });
    }
    if (pageNum === 2) {
      setGlobalSetting({ ...globalSetting, nowItemId: currentId });
    }
  }, [pageNum, currentId]);

  useEffect(() => {
    if (globalSetting.nowItemId >= 0) {
      setPageNum2(2, globalSetting.nowItemId);
    }
  }, []);

  const setPageNum2 = (val, id) => {
    console.log(val, id);
    setCurrentId(id);
    setPageNum(val);
  };

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
        //setQuizOrSetting(QUIZ_PAGE);
      },
      onCancel() {
        console.log("Cancel");
        //setSettingValue(lastSettingValue);
        //setQuizOrSetting(QUIZ_PAGE);
      },
    });
  };
  if (!isHydrated) {
    return null; // 或 <div style={{visibility: 'hidden'}}></div>
  }

  return (
    <div className={style.loginPage}>
      {/* 登录盒子 */}
      <div className={style.loginBox}>
        <main className={style.main}>
          {/* 标题部分 */}

          {/* 表单部分 */}

          {pageNum === 2 && (
            <Reader
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
