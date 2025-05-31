import { FormTextOrOptionsState } from "../../types/EditorTabTypes";

import TextOrOption from "./TextOrOption";

import styles from "./FormTextOrOptions.module.css";

type FormTextOrOptionsProps = {
  state: FormTextOrOptionsState;
};

function FormTextOrOptions({ state }: FormTextOrOptionsProps) {
  return (
    <div className={styles.main}>
      <div className={styles.title}>{state.title}</div>
      {Object.entries(state.textOrOptions).map(([key, textOrOption]) => (
        <TextOrOption state={textOrOption.state} setState={textOrOption.setState} key={key} />
      ))}
    </div>
  );
}

export default FormTextOrOptions;
