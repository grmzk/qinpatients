import CaseDiseaseResponse from "./CaseDiseaseResponse";
import EditorType from "./EditorType";
import PatientInfoResponse from "./PatientInfoResponse";

export type EditorTab = {
  id: string;
  editorType: EditorType;
  patientInfo: PatientInfoResponse;
  caseDisease: CaseDiseaseResponse;
};

export type EditorState = {
  storedEditorId?: string;
  editorTabs: EditorTab[];
};

export type EditorTabPayload = Omit<EditorTab, "id">;
