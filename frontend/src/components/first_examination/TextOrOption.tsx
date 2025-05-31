import { useState } from "react";

import { TextOrOptionState } from "../../types/EditorTabTypes";

import styles from "./TextOrOption.module.css";

type TextOrOptionProps = {
  state: TextOrOptionState;
  setState: (state: TextOrOptionState) => void;
};

function TextOrOption({ state, setState }: TextOrOptionProps) {
  const [text, setText] = useState<string>();

  return (
    <div className={styles.main}>
      <div className={styles.title}>{state.title + ":"}</div>
      <input type="checkbox" className={styles.optionCheckbox} id="option" checked={state.optionChecked} />
      <label className={styles.optionLabel} htmlFor="option">
        {state.optionText}
      </label>
      <input
        type="text"
        className={styles.text}
        value={text}
        onChange={(event) => setText(event.currentTarget.value)}
      />
    </div>
  );
}

export default TextOrOption;
