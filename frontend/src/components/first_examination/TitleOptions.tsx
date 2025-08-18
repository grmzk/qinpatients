import { SyntheticEvent } from "react";

import { v4 as uuidv4 } from "uuid";

import { TitleOptionsState } from "../../types/EditorTabTypes";

import styles from "./TitleOptions.module.css";

type TitleOptionsProps = {
  state: TitleOptionsState;
  setState: (newState: TitleOptionsState) => void;
  radio?: boolean;
};

function TitleOptions({ state, setState, radio = false }: TitleOptionsProps) {
  const uuid = uuidv4();

  function handleOptionOnChange(e: SyntheticEvent) {
    const event = e as React.ChangeEvent<HTMLInputElement>;
    const newState = structuredClone(state);
    Object.entries(newState.options).map(([key, option]) => {
      if (radio) {
        option.checked = key === event.target.value;
      } else if (key === event.target.value) {
        option.checked = event.target.checked;
      }
    });
    setState(newState);
  }

  return (
    <div className={styles.main}>
      <div className={styles.title}>{state.title ? state.title + ":" : ""}</div>
      <div className={styles.optionsLayout} onChange={handleOptionOnChange}>
        {Object.entries(state.options).map(([key, option]) => {
          const id = state.name + key + uuid;
          return (
            <div key={id}>
              <input
                type={radio ? "radio" : "checkbox"}
                className={styles.option}
                id={id}
                name={state.name + uuid}
                value={key}
                checked={option.checked}
                readOnly
              />
              <label className={styles.optionLabel} htmlFor={id}>
                {option.title}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TitleOptions;
