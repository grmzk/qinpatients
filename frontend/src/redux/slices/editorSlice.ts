import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { EditorTabPayload, EditorState } from "../../types/EditorState";
import { AnamnesisVitaeState, FirstExaminationTabState, TextareaExtendedState } from "../../types/EditorTabTypes";

const initialState: EditorState = {
  editorTabs: [],
};

const complaintsInitialState: TextareaExtendedState = {
  title: "Жалобы",
  text: "",
  rows: 1,
  options: {
    encephalopathy: {
      title: "энцефалопатия",
      text: "невозможно достоверно выяснить ввиду выраженной энцефалопатии у пациента. ",
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
      text: "без дополнений.",
      checked: false,
    },
  },
};

const anamnesisVitaeInitialState: AnamnesisVitaeState = {
  title: "Anamnesis vitae",
  textOrOptions: {
    tuberculosis: {
      title: "Туберкулёз",
      optionChecked: true,
      optionText: "отрицает",
      text: "",
    },
    hepatitis: {
      title: "Гепатит",
      optionChecked: true,
      optionText: "отрицает",
      text: "",
    },
    hiv: {
      title: "ВИЧ",
      optionChecked: true,
      optionText: "отрицает",
      text: "",
    },
    diabetes: {
      title: "Сахарный диабет",
      optionChecked: true,
      optionText: "отрицает",
      text: "",
    },
    drugs: {
      title: "Наркоанамнез",
      optionChecked: true,
      optionText: "отрицает",
      text: "",
    },
    allergy: {
      title: "Аллергия",
      optionChecked: true,
      optionText: "отрицает",
      text: "",
    },
    tetanus: {
      title: "Проф. столбняка",
      optionChecked: true,
      optionText: "нет данных",
      text: "",
    },
    operations: {
      title: "Операции",
      optionChecked: true,
      optionText: "нет данных",
      text: "",
    },
    trauma: {
      title: "Травмы",
      optionChecked: true,
      optionText: "нет данных",
      text: "",
    },
  },
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addEditorTab: (state: EditorState, action: PayloadAction<EditorTabPayload>) => {
      const id = uuidv4();
      state.currentEditorTabId = id;
      state.editorTabs.push({
        ...action.payload,
        id: id,
        state: {
          complaints: complaintsInitialState,
          anamnesisMorbi: anamnesisMorbiInitialState,
          anamnesisVitae: anamnesisVitaeInitialState,
        },
      });
    },
    deleteEditorTab: (state: EditorState, action: PayloadAction<string>) => {
      state.editorTabs = state.editorTabs.filter((editorTab) => editorTab.id !== action.payload);
      if (state.currentEditorTabId === action.payload) {
        state.currentEditorTabId = state.editorTabs.at(-1)?.id;
      }
    },
    setCurrentEditorTabId: (state: EditorState, action: PayloadAction<string | undefined>) => {
      state.currentEditorTabId = action.payload;
    },
    setEditorTabState: (state: EditorState, action: PayloadAction<{ id: string; state: FirstExaminationTabState }>) => {
      const tab = state.editorTabs.find((tab) => tab.id === action.payload.id);
      if (tab) {
        tab.state = action.payload.state;
      }
    },
  },
});

export const { addEditorTab, deleteEditorTab, setCurrentEditorTabId, setEditorTabState } = editorSlice.actions;

export default editorSlice.reducer;
