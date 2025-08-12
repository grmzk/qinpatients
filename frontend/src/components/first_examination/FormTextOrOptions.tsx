import { FormTextOrOptionsState, TextOrOptionState } from "../../types/EditorTabTypes";

import TextOrOption from "./TextOrOption";

import styles from "./FormTextOrOptions.module.css";

type FormTextOrOptionsProps = {
  state: FormTextOrOptionsState;
  setState: (state: FormTextOrOptionsState) => void;
};

function FormTextOrOptions({ state, setState }: FormTextOrOptionsProps) {
  return (
    <div className={styles.main}>
      <div className={styles.title}>{state.title}</div>
      {Object.entries(state.textOrOptions).map(([key, textOrOption]) => (
        <TextOrOption
          state={textOrOption}
          setState={(newState: TextOrOptionState) => {
            setState({ ...state, textOrOptions: { ...state.textOrOptions, [key]: { ...newState } } });
          }}
          key={key}
        />
      ))}
    </div>
  );
}

export default FormTextOrOptions;
