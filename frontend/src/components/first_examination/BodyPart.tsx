import { IoBody } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

import { headAreas, makeAreaState } from "../../redux/slices/editorSlice";
import { AreaState, AreaTitleName, BodyPartState, TitleOptionsState } from "../../types/EditorTabTypes";

import Area from "./Area";
import TitleOptions from "./TitleOptions";

import styles from "./BodyPart.module.css";

type BodyPartProps = {
  state: BodyPartState;
  setState: (newState: BodyPartState) => void;
};

function BodyPart({ state, setState }: BodyPartProps) {
  const uuid = uuidv4();

  const setAreaState = (newState: AreaState, index: number) => {
    setState({ ...state, areas: state.areas.map((area, i) => (i === index ? newState : area)) });
  };
  const deleteArea = (index: number) => {
    setState({ ...state, areas: state.areas.filter((_, i) => i !== index) });
  };
  const unshiftArea = (newAreaTitleName: AreaTitleName) => {
    setState({ ...state, areas: [makeAreaState(newAreaTitleName), ...state.areas] });
  };
  const setSymptoms = (newState: TitleOptionsState) => {
    setState({ ...state, symptoms: newState });
  };

  return (
    <div className={styles.main}>
      <div className={styles.titleBlock}>
        <input
          type="checkbox"
          className={styles.titleCheckbox}
          id={uuid}
          checked={state.enable}
          onChange={() => setState({ ...state, enable: !state.enable })}
        />
        <label className={styles.titleLabel} htmlFor={uuid}>
          <IoBody />
          {state.title}
        </label>
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
        {state.symptoms && <TitleOptions state={state.symptoms} setState={setSymptoms} />}
      </div>
    </div>
  );
}

export default BodyPart;
