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
        <span className={s.items__num}>{num}</span>
        <span className={s.items__title}>{title}</span>
        <span className={s.items__time}>{time}</span>
        <span className={s.items__name}>{name}</span>
      </div>

      <CloseOutlined className={s.deleteBtn} onClick={() => deleteClick(id)} />
    </div>
  );
};

export default item;
