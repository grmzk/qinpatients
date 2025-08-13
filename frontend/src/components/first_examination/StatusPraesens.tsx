import {
  AdditionalSupportState,
  ConditionState,
  IntoxicationState,
  MindState,
  StatusPraesensState,
} from "../../types/EditorTabTypes";

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
  const setMindState = (newMindState: MindState) => {
    setState({ ...state, mind: newMindState });
  };
  const setIntoxicationState = (newIntoxicationState: IntoxicationState) => {
    setState({ ...state, intoxication: newIntoxicationState });
  };
  return (
    <div className={styles.main}>
      <div className={styles.title}>Status praesens</div>
      <TitleOptions state={state.condition} setState={setConditionState} radio />
      <TitleOptions state={state.additionalSupport} setState={setAdditionalSupportState} />
      <TitleOptions state={state.mind} setState={setMindState} radio />
      <TitleOptions state={state.intoxication} setState={setIntoxicationState} />
    </div>
  );
}

export default StatusPraesens;
