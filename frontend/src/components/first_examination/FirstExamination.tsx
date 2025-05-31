import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setEditorTabState } from "../../redux/slices/editorSlice";
import { TextareaExtendedState } from "../../types/EditorTabTypes";
import PatientInfoResponse from "../../types/PatientInfoResponse";
import MainContentLayout from "../layouts/MainContentLayout";
import PatientInfo from "../patient_history/PatientInfo";

import AnamnesisMorbi from "./AnamnesisMorbi";
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

  return (
    <MainContentLayout>
      <PatientInfo patientInfo={patientInfo} />
      <div className={styles.mainArea}>
        <div className={styles.title}>Первичный осмотр</div>
        <div className={styles.block}>
          <Complaints state={editorTabState?.complaints} setState={setComplaintsState} />
          <AnamnesisMorbi state={editorTabState?.anamnesisMorbi} setState={setAnamnesisMorbiState} />
        </div>
        <div className={styles.block}></div>
      </div>
    </MainContentLayout>
  );
}

export default FirstExamination;
