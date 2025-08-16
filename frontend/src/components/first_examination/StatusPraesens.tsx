import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setEditorTabStatusPraesensState } from "../../redux/slices/editorSlice";
import {
  AdditionalSupportState,
  BreathState,
  ConditionState,
  FunctionalState,
  IntoxicationState,
  MindState,
  SkinState,
  StatusPraesensState,
} from "../../types/EditorTabTypes";

import TitleOptions from "./TitleOptions";
import TitleText from "./TitleText";

import styles from "./StatusPraesens.module.css";

type StatusPraesensProps = {
  id: string;
};

function StatusPraesens({ id }: StatusPraesensProps) {
  console.log("RENDER STATUS PRAESENS");

  const state = useAppSelector((state) => state.editor.editorTabs[id]?.state.statusPraesens);

  if (!state) {
    throw "Tab with id=" + id + " not found!";
  }

  const dispatch = useAppDispatch();

  const setState = (newState: StatusPraesensState) => {
    dispatch(setEditorTabStatusPraesensState({ id, state: newState }));
  };
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
    setState({ ...state, breathLeft: newBreathLeftState });
  };
  const setFunctionalState = (newFunctionalState: FunctionalState) => {
    setState({ ...state, functionalState: newFunctionalState });
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
      <TitleText state={state.functionalState} setState={setFunctionalState} />
    </div>
  );
}

export default StatusPraesens;
