import PatientInfoResponse from "../../types/PatientInfoResponse";
import MainContentLayout from "../layouts/MainContentLayout";
import PatientInfo from "../patient_history/PatientInfo";

import styles from "./FirstExamination.module.css";

type FirstExaminationProps = {
  patientInfo: PatientInfoResponse;
};

function FirstExamination({ patientInfo }: FirstExaminationProps) {
  return (
    <MainContentLayout>
      <PatientInfo patientInfo={patientInfo} />
      <div />
    </MainContentLayout>
  );
}

export default FirstExamination;
