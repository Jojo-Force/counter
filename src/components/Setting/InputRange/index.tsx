import s from "./style.module.scss";

const InputRange = ({ min, max, step, value, onChange }) => {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <input
      className={s.range}
      type={"range"}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(e)}
      style={{
        background: `linear-gradient(to right, red 0%, red ${percent}%, white ${percent}%, white 100%)`,
      }}
    ></input>
  );
};

export default InputRange;
