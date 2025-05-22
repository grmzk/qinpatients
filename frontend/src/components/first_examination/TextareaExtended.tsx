import { SyntheticEvent, useState } from "react";

import { TextareaExtendedState } from "../../types/EditorTabTypes";

import styles from "./TextareaExtended.module.css";

type TextareaExtendedProps = {
  state: TextareaExtendedState;
  setState: (state: TextareaExtendedState) => void;
};

function TextareaExtended({ state, setState }: TextareaExtendedProps) {
  const [text, setText] = useState(state.text);
  const [rows, setRows] = useState(state.rows);

  if (!text) {
    for (const option of Object.values(state.options)) {
      if (option.checked) {
        setText(option.text);
      }
    }
  }

  function handleFieldsetOnChange(event: SyntheticEvent<HTMLFieldSetElement>) {
    const newState = structuredClone(state);
    for (const element of event.currentTarget.elements) {
      if (!(element instanceof HTMLInputElement)) {
        continue;
      }
      if (element === event.target) {
        newState.options[element.id].checked = !newState.options[element.id].checked;
      } else {
        newState.options[element.id].checked = false;
      }
      if (newState.options[element.id].checked) {
        newState.text = newState.options[element.id].text + newState.text;
      } else {
        newState.text = newState.text.replace(newState.options[element.id].text, "");
      }
    }
    newState.rows = rows;
    setState(newState);
  }

  return (
    <div className={styles.main}>
      <div className={styles.title}>{state.title}</div>
      <fieldset className={styles.fieldset} onChange={handleFieldsetOnChange}>
        {Object.keys(state.options).map((key, index) => (
          <div key={index}>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="textareaExtended"
              id={key}
              checked={state.options[key].checked}
              readOnly
            />
            <label className={styles.checkboxLabel} htmlFor={key}>
              {state.options[key].title}
            </label>
          </div>
        ))}
      </fieldset>
      <div className={styles.textareaBlock}>
        <textarea
          className={styles.textarea}
          name="complaintsText"
          rows={rows}
          value={text}
          onChange={(event) => setText(event.target.value)}
          onBlur={(event) => setState({ ...state, text: event.target.value, rows: rows })}
          onScrollEnd={(event) => setRows(++event.currentTarget.rows)}
        ></textarea>
      </div>
    </div>
  );
}

export default TextareaExtended;
