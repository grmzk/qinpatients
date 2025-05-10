import CaseDiseaseResponse from "./CaseDiseaseResponse";
import EditorType from "./EditorType";
import PatientInfoResponse from "./PatientInfoResponse";

export type EditorState = {
  id: string;
  editorType: EditorType;
  patientInfo: PatientInfoResponse;
  caseDisease: CaseDiseaseResponse;
};

export type EditorPayload = Omit<EditorState, "id">;
