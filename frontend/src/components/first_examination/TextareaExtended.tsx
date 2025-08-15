import { TextareaExtendedState } from "../../types/EditorTabTypes";

import styles from "./TextareaExtended.module.css";

type TextareaExtendedProps = {
  state: TextareaExtendedState;
  setState: (state: TextareaExtendedState) => void;
};

function TextareaExtended({ state, setState }: TextareaExtendedProps) {
  function handleOptionsOnChange(optionKey: string) {
    const newState = structuredClone(state);
    Object.entries(newState.options).map(([key, option]) => {
      if (key === optionKey) {
        option.checked = !option.checked;
      } else {
        option.checked = false;
      }
      newState.text = option.checked ? option.text + newState.text : newState.text.replace(option.text, "");
    });
    setState(newState);
  }

  return (
    <div className={styles.main}>
      <div className={styles.title}>{state.title}</div>
      <div className={styles.options}>
        {Object.keys(state.options).map((key, index) => (
          <div key={index}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id={key}
              checked={state.options[key].checked}
              onChange={() => handleOptionsOnChange(key)}
            />
            <label className={styles.checkboxLabel} htmlFor={key}>
              {state.options[key].title}
            </label>
          </div>
        ))}
      </div>
      <div className={styles.textareaBlock}>
        <textarea
          className={styles.textarea}
          name="complaintsText"
          rows={state.rows}
          value={state.text}
          onScrollEnd={(event) => setState({ ...state, rows: ++event.currentTarget.rows })}
          onChange={(event) => setState({ ...state, text: event.currentTarget.value })}
        ></textarea>
      </div>
    </div>
  );
}

export default TextareaExtended;
