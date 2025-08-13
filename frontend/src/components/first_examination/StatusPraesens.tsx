import {
  AdditionalSupportState,
  BreathState,
  ConditionState,
  IntoxicationState,
  MindState,
  SkinState,
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
  const setSkinState = (newSkinState: SkinState) => {
    setState({ ...state, skin: newSkinState });
  };
  const setBreathRightState = (newBreathRightState: BreathState) => {
    setState({ ...state, breathRight: newBreathRightState });
  };
  const setBreathLeftState = (newBreathLeftState: BreathState) => {
    setState({ ...state, breathRight: newBreathLeftState });
  };
  return (
    <div className={styles.main}>
      <div className={styles.title}>Status praesens</div>
      <TitleOptions state={state.condition} setState={setConditionState} radio />
      <TitleOptions state={state.additionalSupport} setState={setAdditionalSupportState} />
      <TitleOptions state={state.mind} setState={setMindState} radio />
      <TitleOptions state={state.intoxication} setState={setIntoxicationState} />
      <TitleOptions state={state.skin} setState={setSkinState} radio />
      <TitleOptions state={state.breathRight} setState={setBreathRightState} radio />
      <TitleOptions state={state.breathLeft} setState={setBreathLeftState} radio />
    </div>
  );
}

export default StatusPraesens;
