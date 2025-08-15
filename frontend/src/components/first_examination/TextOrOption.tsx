import { v4 as uuidv4 } from "uuid";

import { TextOrOptionState } from "../../types/EditorTabTypes";

import styles from "./TextOrOption.module.css";

type TextOrOptionProps = {
  state: TextOrOptionState;
  setState: (state: TextOrOptionState) => void;
};

function TextOrOption({ state, setState }: TextOrOptionProps) {
  const optionId = uuidv4();

  return (
    <div className={styles.main}>
      <div className={styles.title}>{state.title + ":"}</div>
      <input
        type="checkbox"
        className={styles.optionCheckbox}
        id={optionId}
        checked={state.optionChecked}
        onChange={() => setState({ ...state, optionChecked: !state.optionChecked })}
      />
      <label className={styles.optionLabel} htmlFor={optionId}>
        {state.optionText}
      </label>
      <input
        type="text"
        className={styles.text}
        id={uuidv4()}
        value={state.text}
        onChange={(event) => setState({ ...state, text: event.currentTarget.value })}
        onFocus={() => state.optionChecked && setState({ ...state, optionChecked: false })}
      />
    </div>
  );
}

export default TextOrOption;
