import { v4 as uuidv4 } from "uuid";

import { headAreas, makeAreaState } from "../../redux/slices/editorSlice";
import { AreaState, AreaTitleName, BodyPartState } from "../../types/EditorTabTypes";

import Area from "./Area";

import styles from "./BodyPart.module.css";

type BodyPartProps = {
  state: BodyPartState;
  setState: (newState: BodyPartState) => void;
};

function BodyPart({ state, setState }: BodyPartProps) {
  const setAreaState = (newState: AreaState, index: number) => {
    setState({ ...state, areas: state.areas.map((area, i) => (i === index ? newState : area)) });
  };
  const deleteArea = (index: number) => {
    setState({ ...state, areas: state.areas.filter((_, i) => i !== index) });
  };
  const unshiftArea = (newAreaTitleName: AreaTitleName) => {
    setState({ ...state, areas: [makeAreaState(newAreaTitleName), ...state.areas] });
  };

  return (
    <div className={styles.main}>
      <div className={styles.titleBlock}>
        <div className={styles.title}>Голова</div>
        <button onClick={() => setState({ ...state, enable: !state.enable })}>
          {state.enable ? "отключить" : "включить"}
        </button>
      </div>
      <div className={state.enable ? "" : styles.disabled}>
        <div className={styles.areaSelector}>
          {headAreas.map(({ title, name }, index) => (
            <button key={index} onClick={() => unshiftArea({ title, name })}>
              {title}
            </button>
          ))}
        </div>
        {state.areas.map((area, index) => (
          <Area
            state={area}
            setState={(newState: AreaState) => setAreaState(newState, index)}
            deleteArea={() => deleteArea(index)}
            key={uuidv4()}
          />
        ))}
      </div>
    </div>
  );
}

export default BodyPart;
