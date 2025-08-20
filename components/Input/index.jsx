import { useState } from "react";
import styles from "./input.module.css";

function Input({ label }) {
  const [value, setValue] = useState("");
  return (
    <div className={styles.input}>
      <label>{label}</label>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}

export default Input;
