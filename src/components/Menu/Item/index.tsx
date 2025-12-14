import s from "./style.module.scss";
import type { itemProps } from "../../../types/api";
import { CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";

const item = ({
  id,
  num,
  title,
  time,
  name,
  onClick,
  deleteClick,
}: itemProps) => {
  return (
    <div className={s.itemsBox}>
      <div className={s.items} onClick={() => onClick(id)}>
        <span>{num}</span>
        <span>{title}</span>
        <span>{time}</span>
        <span>{name}</span>
      </div>

      <CloseOutlined className={s.deleteBtn} onClick={() => deleteClick(id)} />
    </div>
  );
};

export default item;
