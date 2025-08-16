import { SyntheticEvent } from "react";

import { TitleOptionsState } from "../../types/EditorTabTypes";

import styles from "./TitleOptions.module.css";

type TitleOptionsProps = {
  state: TitleOptionsState;
  setState: (newState: TitleOptionsState) => void;
  radio?: boolean;
};

function TitleOptions({ state, setState, radio = false }: TitleOptionsProps) {
  function handleOptionOnChange(e: SyntheticEvent) {
    const event = e as React.ChangeEvent<HTMLInputElement>;
    const newState = structuredClone(state);
    Object.entries(newState.options).map(([key, option]) => {
      if (radio) {
        option.checked = state.name + key === event.target.id;
      } else if (state.name + key === event.target.id) {
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
          const id = state.name + key;
          return (
            <div key={id}>
              <input
                type={radio ? "radio" : "checkbox"}
                className={styles.option}
                id={id}
                name={state.name}
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
