import { TitleTextsState } from "../../types/EditorTabTypes";

import styles from "./TitleText.module.css";

type TitleTextProps = {
  state: TitleTextsState;
  setState: (newState: TitleTextsState) => void;
};

function TitleText({ state, setState }: TitleTextProps) {
  return (
    <div className={styles.main}>
      <div className={styles.title}>{state.title ? state.title + ":" : ""}</div>
      <div className={styles.optionsLayout}>
        {Object.entries(state.options).map(([key, option]) => {
          const id = state.name + key;
          return (
            <div key={id}>
              <label className={styles.optionLabel} htmlFor={id}>
                {option.title}
              </label>
              <input
                type="text"
                className={styles.option}
                id={id}
                name={state.name}
                value={option.text}
                onChange={(event) =>
                  setState({
                    ...state,
                    options: { ...state.options, [key]: { ...state.options[key], text: event.currentTarget.value } },
                  })
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TitleText;
