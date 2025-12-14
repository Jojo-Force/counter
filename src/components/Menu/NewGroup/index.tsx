import textData from "../../../textdata";
import s from "./style.module.scss";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Select } from "antd";
const { confirm } = Modal;
import { QUIZ_PAGE } from "../../../constant";
import { useRef, useState } from "react";
import clsx from "clsx";

interface NewProps {
  setShowNewGroup: () => void;
  setGroupData: (any) => void;
}
const NewGroup = ({ setShowNewGroup, setGroupData }: NewProps) => {
  const groupNameRef = useRef<HTMLInputElement>(null);

  const handleConfirm = () => {
    const groupName = groupNameRef.current?.value.trim();

    if (!groupName) {
      alert("请填写所有字段");
      return;
    }

    console.log("新建组:", {
      groupName,
    });

    setGroupData({
      groupName: groupName,
    });
    setShowNewGroup(false);
  };

  const handleCancel = () => {
    if (groupNameRef.current) groupNameRef.current.value = "";
    setShowNewGroup(false);
  };

  return (
    <div className={s.box}>
      <p>添加新的分组</p>
      <input ref={groupNameRef} placeholder={"分组名称"} />
      <button className={s.btn} onClick={handleConfirm}>
        确定
      </button>
      <button className={clsx(s.btn, s.btnCancel)} onClick={handleCancel}>
        取消
      </button>
    </div>
  );
};

export default NewGroup;
