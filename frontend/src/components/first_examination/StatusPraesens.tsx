import { AdditionalSupportState, ConditionState, StatusPraesensState } from "../../types/EditorTabTypes";

import TitleOptions from "./TitleOptions";

import styles from "./StatusPraesens.module.css";

type StatusPraesensProps = {
  state: StatusPraesensState;
  setState: (newState: StatusPraesensState) => void;
};

function StatusPraesens({ state, setState }: StatusPraesensProps) {
  const setConditionState = (newConditionState: ConditionState) => {
    setState({ ...state, condition: newConditionState });
  };
  const setAdditionalSupportState = (newAdditionalSupportState: AdditionalSupportState) => {
    setState({ ...state, additionalSupport: newAdditionalSupportState });
  };
  return (
    <div className={styles.main}>
      <div className={styles.title}>Status praesens</div>
      <TitleOptions state={state.condition} setState={setConditionState} radio />
      <TitleOptions state={state.additionalSupport} setState={setAdditionalSupportState} />
    </div>
  );
}

export default StatusPraesens;
