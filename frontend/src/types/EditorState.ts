import CaseDiseaseResponse from "./CaseDiseaseResponse";
import { EditorTabType, FirstExaminationTabState } from "./EditorTabTypes";
import PatientInfoResponse from "./PatientInfoResponse";

export type EditorTab = {
  editorType: EditorTabType;
  patientInfo: PatientInfoResponse;
  caseDisease: CaseDiseaseResponse;
  state: FirstExaminationTabState;
};

export type EditorTabIdTitle = {
  id: string;
  title: string;
};

export type EditorState = {
  currentEditorTabId?: string;
  order: EditorTabIdTitle[];
  editorTabs: {
    [key: string]: EditorTab;
  };
};

export type EditorTabPayload = Omit<EditorTab, "id" | "state">;
