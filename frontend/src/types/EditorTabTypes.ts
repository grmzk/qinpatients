export type EditorTabType = "FIRST_EXAMINATION";

export type TextareaExtendedState = {
  title: string;
  text: string;
  rows: number;
  options: {
    [key: string]: {
      title: string;
      text: string;
      checked: boolean;
    };
  };
};

export type TextOrOptionState = {
  title: string;
  optionChecked: boolean;
  optionText: string;
  text: string;
};

export interface FormTextOrOptionsState {
  title: string;
  textOrOptions: {
    [key: string]: TextOrOptionState;
  };
}

export interface AnamnesisVitaeState extends FormTextOrOptionsState {
  textOrOptions: {
    tuberculosis?: TextOrOptionState;
    hepatitis?: TextOrOptionState;
    hiv?: TextOrOptionState;
    diabetes?: TextOrOptionState;
    drugs?: TextOrOptionState;
    allergy?: TextOrOptionState;
    tetanus?: TextOrOptionState;
    operations?: TextOrOptionState;
    trauma?: TextOrOptionState;
  };
}

export interface AnamnesisGynecologicalState extends FormTextOrOptionsState {
  textOrOptions: {
    pregnancies?: TextOrOptionState;
    childbirths?: TextOrOptionState;
    mensis?: TextOrOptionState;
  };
}

type TitleOption = {
  optionTitle: string;
  optionChecked: boolean;
};

export interface TitleOptionsState {
  name: string;
  title: string;
  options: {
    [key: string]: TitleOption;
  };
}

export interface ConditionState extends TitleOptionsState {
  name: string;
  title: string;
  options: {
    satisfactory?: TitleOption;
    relativelySatisfactory?: TitleOption;
    middleGrave?: TitleOption;
    grave?: TitleOption;
    critical?: TitleOption;
  };
}

export interface AdditionalSupportState extends TitleOptionsState {
  name: string;
  title: string;
  options: {
    oxygen?: TitleOption;
    vent?: TitleOption;
    vasopressors?: TitleOption;
  };
}

export interface MindState extends TitleOptionsState {
  name: string;
  title: string;
  options: {
    lucid?: TitleOption;
    encephalopathy?: TitleOption;
    disoriented?: TitleOption;
    confusion?: TitleOption;
    stun?: TitleOption;
    sopor?: TitleOption;
    coma?: TitleOption;
  };
}

export interface IntoxicationState extends TitleOptionsState {
  name: string;
  title: string;
  options: {
    alcohol?: TitleOption;
    drug?: TitleOption;
  };
}

export type StatusPraesensState = {
  condition: ConditionState;
  additionalSupport: AdditionalSupportState;
  mind: MindState;
  intoxication: IntoxicationState;
};

export type FirstExaminationTabState = {
  complaints: TextareaExtendedState;
  anamnesisMorbi: TextareaExtendedState;
  anamnesisVitae: AnamnesisVitaeState;
  anamnesisGynecological: AnamnesisGynecologicalState;
  statusPraesens: StatusPraesensState;
};
