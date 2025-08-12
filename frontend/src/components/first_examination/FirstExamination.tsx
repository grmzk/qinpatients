import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setEditorTabState } from "../../redux/slices/editorSlice";
import { AnamnesisVitaeState, TextareaExtendedState } from "../../types/EditorTabTypes";
import PatientInfoResponse from "../../types/PatientInfoResponse";
import MainContentLayout from "../layouts/MainContentLayout";
import PatientInfo from "../patient_history/PatientInfo";

import FormTextOrOptions from "./FormTextOrOptions";
import TextareaExtended from "./TextareaExtended";

import styles from "./FirstExamination.module.css";

type FirstExaminationProps = {
  id: string;
  patientInfo: PatientInfoResponse;
};

function FirstExamination({ id, patientInfo }: FirstExaminationProps) {
  const editorTabState = useAppSelector((state) => state.editor.editorTabs.find((tab) => tab.id === id)?.state);

  const dispatch = useAppDispatch();

  if (!editorTabState) {
    throw "Tab with id=" + id + " not found!";
  }

  const setComplaintsState = (complaintsState: TextareaExtendedState) => {
    dispatch(setEditorTabState({ id, state: { ...editorTabState, complaints: complaintsState } }));
  };
  const setAnamnesisMorbiState = (anamnesisMorbiState: TextareaExtendedState) => {
    dispatch(setEditorTabState({ id, state: { ...editorTabState, anamnesisMorbi: anamnesisMorbiState } }));
  };
  const setAnamnesisVitaeState = (anamnesisVitaeState: AnamnesisVitaeState) => {
    dispatch(setEditorTabState({ id, state: { ...editorTabState, anamnesisVitae: anamnesisVitaeState } }));
  };

  return (
    <MainContentLayout>
      <PatientInfo patientInfo={patientInfo} />
      <div className={styles.mainArea}>
        <div className={styles.title}>Первичный осмотр</div>
        <div className={styles.block}>
          <TextareaExtended state={editorTabState.complaints} setState={setComplaintsState} />
          <TextareaExtended state={editorTabState.anamnesisMorbi} setState={setAnamnesisMorbiState} />
          <FormTextOrOptions state={editorTabState.anamnesisVitae} setState={setAnamnesisVitaeState} />
        </div>
        <div className={styles.block}></div>
      </div>
    </MainContentLayout>
  );
}

export default FirstExamination;
