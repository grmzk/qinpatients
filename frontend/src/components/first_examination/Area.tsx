import { MdDeleteForever } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

import { DamagesState, AreaState } from "../../types/EditorTabTypes";

import Damages from "./Damages";

import styles from "./Area.module.css";

type AreaProps = {
  state: AreaState;
  setState: (newState: AreaState) => void;
  deleteArea: () => void;
};

function Area({ state, setState, deleteArea }: AreaProps) {
  const uuid = uuidv4();
  return (
    <div className={styles.main}>
      <div className={styles.titleBlock}>
        <div className={styles.title}>{state.title}:</div>
        <div className={styles.sideBlock}>
          <input
            type="checkbox"
            className={styles.option}
            id={state.name + "right" + uuid}
            checked={state.side === "right"}
            onChange={() => setState({ ...state, side: state.side === "right" ? "" : "right" })}
          />
          <label className={styles.optionLabel} htmlFor={state.name + "right" + uuid}>
            справа
          </label>
          <input
            type="checkbox"
            className={styles.option}
            id={state.name + "left" + uuid}
            checked={state.side === "left"}
            onChange={() => setState({ ...state, side: state.side === "left" ? "" : "left" })}
          />
          <label className={styles.optionLabel} htmlFor={state.name + "left" + uuid}>
            слева
          </label>
        </div>
        <MdDeleteForever className={styles.deleteIcon} size={19} onClick={deleteArea} />
        {/* <button onClick={deleteArea}>удалить область</button> */}
      </div>
      <Damages
        state={state.damages}
        setState={(newState: DamagesState) => setState({ ...state, damages: { ...newState } })}
      />
    </div>
  );
}

export default Area;
