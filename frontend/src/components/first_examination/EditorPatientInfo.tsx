import { useAppSelector } from "../../hooks/reduxHooks";
import PatientInfo from "../patient_history/PatientInfo";

type EditorPatientInfoProps = {
  id: string;
};

function EditorPatientInfo({ id }: EditorPatientInfoProps) {
  console.log("RENDER PATIENT INFO");

  const patientInfo = useAppSelector((state) => state.editor.editorTabs[id]?.patientInfo);

  if (!patientInfo) {
    throw "Tab with id=" + id + " not found!";
  }

  return <PatientInfo patientInfo={patientInfo} />;
}

export default EditorPatientInfo;
