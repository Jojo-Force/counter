import textData from "../../../textdata";
import s from "./style.module.scss";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Select } from "antd";
const { confirm } = Modal;
import { QUIZ_PAGE } from "../../../constant";
import { useRef, useState } from "react";
import clsx from "clsx";

interface NewProps {
  setShowNew: () => void;
  setData: (any) => void;
  groupDatas: any;
}
const New = ({ setShowNew, setData, groupDatas }: NewProps) => {
  const handleChange = (value: string) => {
    setSelected(value);
  };
  const handleGroupChange = (value: number) => {
    setSelectedGroup(value);
  };
  const counterNameRef = useRef<HTMLInputElement>(null);
  const personNameRef = useRef<HTMLInputElement>(null);

  const [selected, setSelected] = useState<string>();
  const [selectedGroup, setSelectedGroup] = useState(-1);

  const handleConfirm = () => {
    const counterName = counterNameRef.current?.value.trim();
    const personName = personNameRef.current?.value.trim();

    if (!counterName || !personName || !selected || selectedGroup === -1) {
      alert("请填写所有字段");
      return;
    }

    console.log("新建计数器:", {
      counterName,
      personName,
      category: selected,
    });

    const date = new Date();

    const formattedDate = date
      .toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // 24小时制
      })
      .replace(/\//g, "-")
      .replace(",", "");

    setData({
      groupId: selectedGroup,
      num: 0,
      title: counterName,
      time: formattedDate,
      name: personName,
      selected: selected,
    });
    // TODO: 调用 API / 更新状态
  };

  const handleCancel = () => {
    if (counterNameRef.current) counterNameRef.current.value = "";
    if (personNameRef.current) personNameRef.current.value = "";
    setSelected(undefined);
    setShowNew(false);
  };

  return (
    <div className={s.box}>
      <p>添加新计数器</p>
      <Select
        defaultValue="请选择"
        style={{ width: "80%", height: "40px", fontSize: "3rem" }}
        onChange={handleChange}
        options={textData.map((t) => ({
          value: t.name,
          label: t.name,
        }))}
      />
      <Select
        defaultValue="分组"
        style={{ width: "80%", height: "40px", fontSize: "3rem" }}
        onChange={handleGroupChange}
        options={groupDatas.map((g) => ({
          value: g.id,
          label: g.groupName,
        }))}
      />
      <input ref={counterNameRef} placeholder={"计数器名称"} />
      <input ref={personNameRef} placeholder={"计数者姓名"} />
      <button className={s.btn} onClick={handleConfirm}>
        确定
      </button>
      <button className={clsx(s.btn, s.btnCancel)} onClick={handleCancel}>
        取消
      </button>
    </div>
  );
};

export default New;
