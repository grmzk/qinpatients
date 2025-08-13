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

export type StatusPraesensState = {
  condition: ConditionState;
};

export type FirstExaminationTabState = {
  complaints: TextareaExtendedState;
  anamnesisMorbi: TextareaExtendedState;
  anamnesisVitae: AnamnesisVitaeState;
  anamnesisGynecological: AnamnesisGynecologicalState;
  statusPraesens: StatusPraesensState;
};
