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
    if (radio) {
      Object.entries(newState.options).map(([id, option]) => (option.optionChecked = id === event.target.id));
      setState(newState);
    } else {
      newState.options[event.target.id].optionChecked = event.target.checked;
      setState(newState);
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.title}>{state.title + ":"}</div>
      <div className={styles.optionsLayout} onChange={handleOptionOnChange}>
        {Object.entries(state.options).map(([id, option]) => (
          <div key={id}>
            <input
              type={radio ? "radio" : "checkbox"}
              className={styles.option}
              id={id}
              name={state.name}
              checked={option.optionChecked}
              readOnly
            />
            <label className={styles.optionLabel} htmlFor={id}>
              {option.optionTitle}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TitleOptions;
