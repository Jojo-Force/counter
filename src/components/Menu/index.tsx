import style from "./style.module.scss";
import { Select, Modal } from "antd";
import s from "./style.module.scss";
import type { SettingProps } from "../../types/api";
import Item from "./Item";
import {
  CloseCircleOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import New from "./New";
import { useEffect, useState } from "react";
import NewGroup from "./NewGroup";
import textData from "../../textdata";

const Menu = ({
  setPageNum2,
  itemDatas,
  setItemDatas,
  groupDatas,
  setGroupDatas,
  msgSucess,
  msgError,
  globalSetting,
  setGlobalSetting,
}: SettingProps) => {
  const [selectedGroupId, setSelectedGroupId] = useState(0);

  const [showNew, setShowNew] = useState(false);
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (globalSetting.nowGroupId >= 0) {
      setSelectedGroupId(globalSetting.nowGroupId);
    } else if (groupDatas.length === 0) {
      setSelectedGroupId(-1);
    } else {
      setSelectedGroupId(-2);
    }
    setIsHydrated(true);
  }, []);
  const addGroup = () => {
    if (!showNewGroup) {
      //setShowNew(false);
      setShowNewGroup(true);
    }
  };

  const add = () => {
    if (!showNew) {
      //setShowNew(false);
      setShowNew(true);
    }
  };

  const getId = (data) => {
    let id = 0;
    let getId = false;
    let i = 0;

    for (i = 0; ; i++) {
      getId = true;
      for (let j = 0; j < data.length; j++) {
        if (data[j].id === i) {
          getId = false;
          break;
        }
      }
      if (getId) {
        break;
      }
    }
    id = i;
    // console.log("getid:" + id);
    return id;
  };

  const setGroupData = (add) => {
    const id = getId(groupDatas);
    console.log(id);
    setGroupDatas([...groupDatas, { ...add, id: id }]);
    setShowNewGroup(false);
  };

  const setData = (add) => {
    const id = getId(itemDatas);
    console.log(id);
    setItemDatas([...itemDatas, { ...add, id: id }]);
    setShowNew(false);
  };
  const showConfirm = (msg, set, id, setD) => {
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
        set((prev) => prev.filter((p, index) => p.id !== id));

        if (setD !== null) {
          setD((prev) => prev.filter((p, index) => p.groupId !== id));
        }

        msgSucess("已经删除！");
        //setQuizOrSetting(QUIZ_PAGE);
      },
      onCancel() {
        console.log("Cancel");
        //setSettingValue(lastSettingValue);
        //setQuizOrSetting(QUIZ_PAGE);
      },
    });
  };
  const deleteClick = (id) => {
    console.log(id);
    showConfirm("确定要删除吗", setItemDatas, id, null);
  };

  const onClick = (id) => {
    // console.log("onClick" + id);
    setPageNum2(2, id);
  };
  const deleteGroup = () => {
    console.log(selectedGroupId);
    showConfirm(
      "确定要删除该组吗",
      setGroupDatas,
      selectedGroupId,
      setItemDatas,
    );
  };
  const handleGroupChange = (value: number) => {
    setSelectedGroupId(value);
    setGlobalSetting({ ...globalSetting, nowGroupId: value });
    console.log(value);
  };
  useEffect(() => {
    if (groupDatas.find((g) => g.id === selectedGroupId)) {
    } else if (groupDatas.length > 0) {
      setSelectedGroupId(() => groupDatas[0].id);
      setGlobalSetting({
        ...globalSetting,
        nowGroupId: groupDatas[0].id,
      });
    } else {
      setSelectedGroupId(() => -1);
      setGlobalSetting({
        ...globalSetting,
        nowGroupId: -1,
      });
    }
  }, [groupDatas]);

  if (!isHydrated) {
    return null; // 或 <div style={{visibility: 'hidden'}}></div>
  }
  return (
    <div className={style.menu}>
      <header className={style.bigTitle}>
        {!showNew && !showNewGroup && (
          <div className={style.betweenBox}>
            <div className={style.betweenBoxBox}>
              <PlusOutlined onClick={addGroup} className={style.settingIcon} />
              <CloseOutlined
                className={s.deleteGroupBtn}
                onClick={() => deleteGroup()}
              />
            </div>
            <Select
              value={selectedGroupId >= 0 ? selectedGroupId : "请添加组"}
              className={s.mainSelect}
              notFoundContent={null}
              onChange={handleGroupChange}
              options={groupDatas.map((t) => ({
                value: t.id,
                label: t.groupName,
              }))}
            />
            <PlusOutlined onClick={add} className={style.settingIcon} />
          </div>
        )}
      </header>
      <section className={s.section}>
        <div className={s.menu}>
          {!showNew && !showNewGroup && (
            <div className={s.menuBox}>
              {itemDatas
                .filter((item) => item.groupId === selectedGroupId)
                .map((item) => (
                  <Item
                    // key={item.id}
                    id={item.id}
                    num={item.num}
                    title={item.title}
                    name={item.name}
                    time={item.time}
                    onClick={onClick}
                    deleteClick={deleteClick}
                  />
                ))}
            </div>
          )}
        </div>
        {showNew && (
          <New
            setShowNew={setShowNew}
            setData={setData}
            groupDatas={groupDatas}
            globalSetting={globalSetting}
            setGlobalSetting={setGlobalSetting}
          />
        )}

        {showNewGroup && (
          <NewGroup
            setShowNewGroup={setShowNewGroup}
            setGroupData={setGroupData}
          />
        )}
      </section>
    </div>
  );
};

export default Menu;
