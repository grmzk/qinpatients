import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setEditorTabState } from "../../redux/slices/editorSlice";
import { TextareaExtendedState } from "../../types/EditorTabTypes";
import PatientInfoResponse from "../../types/PatientInfoResponse";
import MainContentLayout from "../layouts/MainContentLayout";
import PatientInfo from "../patient_history/PatientInfo";

import TextareaExtended from "./TextareaExtended";

import styles from "./FirstExamination.module.css";

type FirstExaminationProps = {
  id: string;
  patientInfo: PatientInfoResponse;
};

function FirstExamination({ id, patientInfo }: FirstExaminationProps) {
  const state = useAppSelector((state) => state.editor.editorTabs.find((tab) => tab.id === id)?.state);

  const complaintsInitialState: TextareaExtendedState = {
    title: "Жалобы",
    text: "",
    rows: 1,
    options: {
      encephalopathy: {
        title: "энцефалопатия",
        text: "невозможно выяснить ввиду выраженной энцефалопатии у пациента. ",
        checked: false,
      },
      graveCondition: {
        title: "тяжёлое состояние",
        text: "невозможно выяснить ввиду тяжести состояния пациента. ",
        checked: false,
      },
    },
  };
  const anamnesisMorbiInitialState: TextareaExtendedState = {
    title: "Anamnesis morbi",
    text: "",
    rows: 1,
    options: {
      patientTell: {
        title: "со слов пациента",
        text: "со слов пациента: ",
        checked: true,
      },
      escortTell: {
        title: "со слов сопровождения",
        text: "со слов сопровождения: ",
        checked: false,
      },
      emergencyTell: {
        title: "со слов бригады СМП",
        text: "со слов бригады СМП: ",
        checked: false,
      },
      withoutAdditions: {
        title: "без дополнений",
        text: "без дополнений",
        checked: false,
      },
    },
  };

  const dispatch = useAppDispatch();

  if (!state) {
    dispatch(
      setEditorTabState({
        id,
        state: { complaints: complaintsInitialState, anamnesisMorbi: anamnesisMorbiInitialState },
      })
    );
    return <></>;
  }

  const setComplaintsState = (complaintsState: TextareaExtendedState) => {
    dispatch(setEditorTabState({ id, state: { ...state, complaints: complaintsState } }));
  };
  const setAnamnesisMorbiState = (anamnesisMorbiState: TextareaExtendedState) => {
    dispatch(setEditorTabState({ id, state: { ...state, anamnesisMorbi: anamnesisMorbiState } }));
  };

  return (
    <MainContentLayout>
      <PatientInfo patientInfo={patientInfo} />
      <div className={styles.mainArea}>
        <div className={styles.title}>Первичный осмотр</div>
        <div className={styles.block}>
          <TextareaExtended state={state.complaints} setState={setComplaintsState} />
          <TextareaExtended state={state.anamnesisMorbi} setState={setAnamnesisMorbiState} />
        </div>
        <div className={styles.block}></div>
      </div>
    </MainContentLayout>
  );
}

export default FirstExamination;
