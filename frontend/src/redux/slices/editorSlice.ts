import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { EditorTabPayload, EditorState } from "../../types/EditorState";
import {
  AdditionalSupportState,
  AnamnesisGynecologicalState,
  AnamnesisVitaeState,
  BreathState,
  ConditionState,
  FirstExaminationTabState,
  IntoxicationState,
  MindState,
  SkinState,
  StatusPraesensState,
  TextareaExtendedState,
} from "../../types/EditorTabTypes";

// const initialState: EditorState = {
//   order: [],
//   editorTabs: {},
// };

const complaintsInitialState: TextareaExtendedState = {
  title: "Жалобы",
  text: "",
  rows: 1,
  options: {
    complaintsEncephalopathy: {
      title: "энцефалопатия",
      text: "невозможно достоверно выяснить ввиду выраженной энцефалопатии у пациента. ",
      checked: false,
    },
    complaintsGraveCondition: {
      title: "тяжёлое состояние",
      text: "невозможно выяснить ввиду тяжести состояния пациента. ",
      checked: false,
    },
  },
};

const anamnesisMorbiInitialState: TextareaExtendedState = {
  title: "Anamnesis morbi",
  text: "со слов пациента: ",
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

const anamnesisGynecologicalInitialState: AnamnesisGynecologicalState = {
  title: "Anamnesis gynecological",
  textOrOptions: {
    pregnancies: {
      title: "Беременности",
      optionChecked: true,
      optionText: "нет данных",
      text: "",
    },
    childbirths: {
      title: "Роды",
      optionChecked: true,
      optionText: "нет данных",
      text: "",
    },
    mensis: {
      title: "Менструация",
      optionChecked: true,
      optionText: "нет данных",
      text: "",
    },
  },
};

const conditionInitialState: ConditionState = {
  name: "condition",
  title: "Общее состояние",
  options: {
    satisfactory: {
      optionTitle: "удовлетворительное",
      optionChecked: true,
    },
    relativelySatisfactory: {
      optionTitle: "относительно удовлетворительное",
      optionChecked: false,
    },
    middleGrave: {
      optionTitle: "средней тяжести",
      optionChecked: false,
    },
    grave: {
      optionTitle: "тяжелое",
      optionChecked: false,
    },
    critical: {
      optionTitle: "крайне тяжелое",
      optionChecked: false,
    },
  },
};

const additionalSupportInitialState: AdditionalSupportState = {
  name: "additionalSupport",
  title: "Доп. поддержка",
  options: {
    oxygen: {
      optionTitle: "подача увлажненного кислорода",
      optionChecked: false,
    },
    vent: {
      optionTitle: "ИВЛ",
      optionChecked: false,
    },
    vasopressors: {
      optionTitle: "вазопрессорная поддержка",
      optionChecked: false,
    },
  },
};

const mindInitialState: MindState = {
  name: "mind",
  title: "Сознание",
  options: {
    lucid: {
      optionTitle: "ясное",
      optionChecked: true,
    },
    encephalopathy: {
      optionTitle: "энцефалопатия",
      optionChecked: false,
    },
    disoriented: {
      optionTitle: "дезориентирован",
      optionChecked: false,
    },
    confusion: {
      optionTitle: "спутанное",
      optionChecked: false,
    },
    stun: {
      optionTitle: "оглушение",
      optionChecked: false,
    },
    sopor: {
      optionTitle: "сопор",
      optionChecked: false,
    },
    coma: {
      optionTitle: "кома",
      optionChecked: false,
    },
  },
};

const intoxicationInitialState: IntoxicationState = {
  name: "intoxication",
  title: "Опьянение",
  options: {
    alcohol: {
      optionTitle: "алкогольное опьянение",
      optionChecked: false,
    },
    drug: {
      optionTitle: "наркотическое опьянение",
      optionChecked: false,
    },
  },
};

const skinInitialState: SkinState = {
  name: "skin",
  title: "Кожные покровы",
  options: {
    normal: {
      optionTitle: "обычной окраски",
      optionChecked: true,
    },
    palePink: {
      optionTitle: "бледно-розовые",
      optionChecked: false,
    },
    pale: {
      optionTitle: "бледные",
      optionChecked: false,
    },
    acrocyanosis: {
      optionTitle: "акроцианоз",
      optionChecked: false,
    },
    cyanosis: {
      optionTitle: "цианоз",
      optionChecked: false,
    },
    icteric: {
      optionTitle: "иктеричные",
      optionChecked: false,
    },
  },
};

const breathRightInitialState: BreathState = {
  name: "breathRight",
  title: "Дыхание справа",
  options: {
    transferred: {
      optionTitle: "проводится",
      optionChecked: true,
    },
    weaked: {
      optionTitle: "ослаблено",
      optionChecked: false,
    },
    notTransferred: {
      optionTitle: "не проводится",
      optionChecked: false,
    },
  },
};

const breathLeftInitialState: BreathState = {
  name: "breathLeft",
  title: "Дыхание слева",
  options: {
    transferred: {
      optionTitle: "проводится",
      optionChecked: true,
    },
    weaked: {
      optionTitle: "ослаблено",
      optionChecked: false,
    },
    notTransferred: {
      optionTitle: "не проводится",
      optionChecked: false,
    },
  },
};

const statusPraesensInitialState: StatusPraesensState = {
  condition: conditionInitialState,
  additionalSupport: additionalSupportInitialState,
  mind: mindInitialState,
  intoxication: intoxicationInitialState,
  skin: skinInitialState,
  breathRight: breathRightInitialState,
  breathLeft: breathLeftInitialState,
};

const firstExaminationInitialState: FirstExaminationTabState = {
  complaints: complaintsInitialState,
  anamnesisMorbi: anamnesisMorbiInitialState,
  anamnesisVitae: anamnesisVitaeInitialState,
  anamnesisGynecological: anamnesisGynecologicalInitialState,
  statusPraesens: statusPraesensInitialState,
};

const initialState: EditorState = {
  currentEditorTabId: "0",
  order: [{ id: "0", title: "ГРИШКОВА ГАЛИНА НИКОЛАЕВНА" }],
  editorTabs: {
    "0": {
      editorType: "FIRST_EXAMINATION",
      patientInfo: {
        patient_id: 7681403,
        full_name: "ГРИШКОВА ГАЛИНА НИКОЛАЕВНА",
        birthday: "1956-07-30",
        age: "69 лет",
        workplace: "",
        address: "ОМСКАЯ ОБЛАСТЬ, Г. ОМСК, ЛЕНИНСКИЙ ОКРУГ, УЛ. СЕРОВА, Д. 18, КВ. 19",
        extra_info: "ВЗЯТА ЛЕНИНГРАДСКАЯ ПЛОЩАДЬ 1 ДТП",
      },
      caseDisease: {
        card_id: 1367418,
        admission_date: "2025-08-14T07:15:00",
        admission_outcome_date: "2025-08-14T09:10:00",
        department: "ТРАВМАТОЛОГИЯ",
        diagnosis: "УШ М ТК ГОЛОВЫ РАСТЯЖ МЫШЦ ШЕИ З ПЕРЕЛОМ ПРОКСИМАЛЬНОГО МЕТАЭПИФЕЗА ЛЕВ БОЛЬШЕБЕРЦ КОСТИ ",
        inpatient_id: 13221,
        inpatient_department: "ТРАВМАТОЛОГИЯ",
        doctor: "Поздеев Максим Владимирович",
        result: "ГОСПИТАЛИЗАЦИЯ [ТРАВМАТОЛОГИЯ]",
        is_reanimation: false,
        is_outcome: true,
        is_inpatient: true,
      },
      state: firstExaminationInitialState,
    },
  },
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addEditorTab: (state: EditorState, action: PayloadAction<EditorTabPayload>) => {
      const id = uuidv4();
      state.order.push({ id: id, title: action.payload.patientInfo.full_name });
      state.currentEditorTabId = id;
      state.editorTabs[id] = {
        ...action.payload,
        state: firstExaminationInitialState,
      };
    },
    deleteEditorTab: (state: EditorState, action: PayloadAction<string>) => {
      state.order = state.order.filter((item) => item.id !== action.payload);
      delete state.editorTabs[action.payload];
      if (state.currentEditorTabId === action.payload) {
        state.currentEditorTabId = state.order.at(-1)?.id;
      }
    },
    setCurrentEditorTabId: (state: EditorState, action: PayloadAction<string | undefined>) => {
      state.currentEditorTabId = action.payload;
    },
    setEditorTabState: (state: EditorState, action: PayloadAction<{ id: string; state: FirstExaminationTabState }>) => {
      state.editorTabs[action.payload.id].state = action.payload.state;
    },
    setEditorTabComplaintsState: (
      state: EditorState,
      action: PayloadAction<{ id: string; state: TextareaExtendedState }>
    ) => {
      state.editorTabs[action.payload.id].state.complaints = action.payload.state;
    },
    setEditorTabAnamnesisMorbiState: (
      state: EditorState,
      action: PayloadAction<{ id: string; state: TextareaExtendedState }>
    ) => {
      state.editorTabs[action.payload.id].state.anamnesisMorbi = action.payload.state;
    },
    setEditorTabAnamnesisVitaeState: (
      state: EditorState,
      action: PayloadAction<{ id: string; state: AnamnesisVitaeState }>
    ) => {
      state.editorTabs[action.payload.id].state.anamnesisVitae = action.payload.state;
    },
    setEditorTabAnamnesisGynecologicalState: (
      state: EditorState,
      action: PayloadAction<{ id: string; state: AnamnesisGynecologicalState }>
    ) => {
      state.editorTabs[action.payload.id].state.anamnesisGynecological = action.payload.state;
    },
    setEditorTabStatusPraesensState: (
      state: EditorState,
      action: PayloadAction<{ id: string; state: StatusPraesensState }>
    ) => {
      state.editorTabs[action.payload.id].state.statusPraesens = action.payload.state;
    },
  },
});

export const {
  addEditorTab,
  deleteEditorTab,
  setCurrentEditorTabId,
  setEditorTabState,
  setEditorTabComplaintsState,
  setEditorTabAnamnesisMorbiState,
  setEditorTabAnamnesisVitaeState,
  setEditorTabAnamnesisGynecologicalState,
  setEditorTabStatusPraesensState,
} = editorSlice.actions;

export default editorSlice.reducer;
