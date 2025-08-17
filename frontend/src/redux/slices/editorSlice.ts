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
  FunctionalState,
  HeadState,
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
      title: "удовлетворительное",
      checked: true,
    },
    relativelySatisfactory: {
      title: "относительно удовлетворительное",
      checked: false,
    },
    middleGrave: {
      title: "средней тяжести",
      checked: false,
    },
    grave: {
      title: "тяжелое",
      checked: false,
    },
    critical: {
      title: "крайне тяжелое",
      checked: false,
    },
  },
};

const additionalSupportInitialState: AdditionalSupportState = {
  name: "additionalSupport",
  title: "Доп. поддержка",
  options: {
    oxygen: {
      title: "подача увлажненного кислорода",
      checked: false,
    },
    vent: {
      title: "ИВЛ",
      checked: false,
    },
    vasopressors: {
      title: "вазопрессорная поддержка",
      checked: false,
    },
  },
};

const mindInitialState: MindState = {
  name: "mind",
  title: "Сознание",
  options: {
    lucid: {
      title: "ясное",
      checked: true,
    },
    encephalopathy: {
      title: "энцефалопатия",
      checked: false,
    },
    disoriented: {
      title: "дезориентирован",
      checked: false,
    },
    confusion: {
      title: "спутанное",
      checked: false,
    },
    stun: {
      title: "оглушение",
      checked: false,
    },
    sopor: {
      title: "сопор",
      checked: false,
    },
    coma: {
      title: "кома",
      checked: false,
    },
  },
};

const intoxicationInitialState: IntoxicationState = {
  name: "intoxication",
  title: "Опьянение",
  options: {
    alcohol: {
      title: "алкогольное опьянение",
      checked: false,
    },
    drug: {
      title: "наркотическое опьянение",
      checked: false,
    },
  },
};

const skinInitialState: SkinState = {
  name: "skin",
  title: "Кожные покровы",
  options: {
    normal: {
      title: "обычной окраски",
      checked: true,
    },
    palePink: {
      title: "бледно-розовые",
      checked: false,
    },
    pale: {
      title: "бледные",
      checked: false,
    },
    acrocyanosis: {
      title: "акроцианоз",
      checked: false,
    },
    cyanosis: {
      title: "цианоз",
      checked: false,
    },
    icteric: {
      title: "иктеричные",
      checked: false,
    },
  },
};

const breathRightInitialState: BreathState = {
  name: "breathRight",
  title: "Дыхание справа",
  options: {
    transferred: {
      title: "проводится",
      checked: true,
    },
    weaked: {
      title: "ослаблено",
      checked: false,
    },
    notTransferred: {
      title: "не проводится",
      checked: false,
    },
  },
};

const breathLeftInitialState: BreathState = {
  name: "breathLeft",
  title: "Дыхание слева",
  options: {
    transferred: {
      title: "проводится",
      checked: true,
    },
    weaked: {
      title: "ослаблено",
      checked: false,
    },
    notTransferred: {
      title: "не проводится",
      checked: false,
    },
  },
};

const functionalInitialState: FunctionalState = {
  name: "functionalState",
  title: "",
  options: {
    temperature: {
      title: "T тела",
      text: "36,6",
    },
    breathRate: {
      title: "ЧДД",
      text: "16",
    },
    saturation: {
      title: "SpO2",
      text: "97%",
    },
    pulse: {
      title: "ЧСС",
      text: "76",
    },
    bloodPressure: {
      title: "АД",
      text: "120/70",
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
  functionalState: functionalInitialState,
};

const headInitialState: HeadState = {
  areas: [
    {
      title: "Лобная область",
      name: "frontalArea",
      side: "",
      damages: {
        visualPalpation: {
          name: "frontalArea",
          title: "",
          options: {
            edema: {
              title: "отёк",
              checked: false,
            },
            ecchymosis: {
              title: "кровоподтёк",
              checked: false,
            },
            pain: {
              title: "боль",
              checked: false,
            },
            crepitation: {
              title: "крепитация",
              checked: false,
            },
            abrasions: {
              title: "ссадины",
              checked: false,
            },
          },
        },
        wound: {
          woundChecked: false,
          edges: "straight",
          size: "2,0 x 0,5 см",
        },
      },
    },
  ],
};

const firstExaminationInitialState: FirstExaminationTabState = {
  complaints: complaintsInitialState,
  anamnesisMorbi: anamnesisMorbiInitialState,
  anamnesisVitae: anamnesisVitaeInitialState,
  anamnesisGynecological: anamnesisGynecologicalInitialState,
  statusPraesens: statusPraesensInitialState,
  head: headInitialState,
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
    setEditorTabHeadState: (state: EditorState, action: PayloadAction<{ id: string; state: HeadState }>) => {
      state.editorTabs[action.payload.id].state.head = action.payload.state;
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
  setEditorTabHeadState,
} = editorSlice.actions;

export default editorSlice.reducer;
