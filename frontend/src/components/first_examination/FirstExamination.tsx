import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setEditorTabState } from "../../redux/slices/editorSlice";
import { AnamnesisVitaeState, TextareaExtendedState } from "../../types/EditorTabTypes";
import PatientInfoResponse from "../../types/PatientInfoResponse";
import MainContentLayout from "../layouts/MainContentLayout";
import PatientInfo from "../patient_history/PatientInfo";

import AnamnesisMorbi from "./AnamnesisMorbi";
import AnamnesisVitae from "./AnamnesisVitae";
import Complaints from "./Complaints";

import styles from "./FirstExamination.module.css";

type FirstExaminationProps = {
  id: string;
  patientInfo: PatientInfoResponse;
};

function FirstExamination({ id, patientInfo }: FirstExaminationProps) {
  const editorTabState = useAppSelector((state) => state.editor.editorTabs.find((tab) => tab.id === id)?.state);

  const dispatch = useAppDispatch();

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
          <Complaints state={editorTabState?.complaints} setState={setComplaintsState} />
          <AnamnesisMorbi state={editorTabState?.anamnesisMorbi} setState={setAnamnesisMorbiState} />
          <AnamnesisVitae state={editorTabState?.anamnesisVitae} setState={setAnamnesisVitaeState} />
        </div>
        <div className={styles.block}></div>
      </div>
    </MainContentLayout>
  );
}

export default FirstExamination;
