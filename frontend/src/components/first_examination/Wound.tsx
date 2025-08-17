import { v4 as uuidv4 } from "uuid";

import { WoundState } from "../../types/EditorTabTypes";

import styles from "./Wound.module.css";

type WoundProps = {
  state: WoundState;
  setState: (newState: WoundState) => void;
};

function Wound({ state, setState }: WoundProps) {
  const uuid = uuidv4();
  return (
    <div className={styles.main}>
      <div className={styles.title}></div>
      <div className={styles.optionsLayout}>
        <input
          type="checkbox"
          className={styles.option}
          id={"wound" + uuid}
          checked={state.woundChecked}
          onChange={() => setState({ ...state, woundChecked: !state.woundChecked })}
        />
        <label className={styles.optionLabel} htmlFor={"wound" + uuid}>
          рана
        </label>
        <input
          type="radio"
          className={styles.option}
          id={"woundStraightEdges" + uuid}
          name={"woundEdges" + uuid}
          value={state.edges}
          checked={state.edges === "straight"}
          disabled={!state.woundChecked}
          onChange={() => setState({ ...state, edges: "straight" })}
        />
        <label className={styles.optionLabel} htmlFor={"woundStraightEdges" + uuid}>
          ровные края
        </label>
        <input
          type="radio"
          className={styles.option}
          id={"woundUnstraightEdges" + uuid}
          name={"woundEdges" + uuid}
          value={state.edges}
          checked={state.edges === "unstraight"}
          disabled={!state.woundChecked}
          onChange={() => setState({ ...state, edges: "unstraight" })}
        />
        <label className={styles.optionLabel} htmlFor={"woundUnstraightEdges" + uuid}>
          неровные края
        </label>
        <input
          type="text"
          className={styles.text}
          id={"woundSize" + uuid}
          value={state.size}
          disabled={!state.woundChecked}
          onChange={(event) => setState({ ...state, size: event.currentTarget.value })}
        />
      </div>
    </div>
  );
}

export default Wound;
