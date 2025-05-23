import CaseDiseaseResponse from "./CaseDiseaseResponse";
import { EditorTabType, FirstExaminationTabState } from "./EditorTabTypes";
import PatientInfoResponse from "./PatientInfoResponse";

export type EditorTab = {
  id: string;
  editorType: EditorTabType;
  patientInfo: PatientInfoResponse;
  caseDisease: CaseDiseaseResponse;
  state?: FirstExaminationTabState;
};

export type EditorState = {
  currentEditorTabId?: string;
  editorTabs: EditorTab[];
};

export type EditorTabPayload = Omit<EditorTab, "id">;
