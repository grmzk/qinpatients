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

  const dispatch = useAppDispatch();
  const setComplaintsState = (complaintsState: TextareaExtendedState) => {
    dispatch(setEditorTabState({ id, state: { complaints: complaintsState } }));
  };

  const complaintsInitialState = {
    title: "Жалобы",
    text: "",
    rows: 1,
    options: {
      encephalopathy: {
        title: "энцефалопатия",
        text: "невозможно выяснить ввиду выраженной энцефалопатии у пациента. ",
        isChecked: false,
      },
      graveCondition: {
        title: "тяжёлое состояние",
        text: "невозможно выяснить ввиду тяжести состояния пациента. ",
        isChecked: false,
      },
    },
  };

  return (
    <MainContentLayout>
      <PatientInfo patientInfo={patientInfo} />
      <div className={styles.mainArea}>
        <div className={styles.title}>Первичный осмотр</div>
        <div className={styles.block}>
          <TextareaExtended state={state?.complaints ?? complaintsInitialState} setState={setComplaintsState} />
        </div>
        <div className={styles.block}></div>
      </div>
    </MainContentLayout>
  );
}

export default FirstExamination;
