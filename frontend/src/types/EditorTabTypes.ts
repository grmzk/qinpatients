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

export type TextOrOptionStateSetState = {
  state: TextOrOptionState;
  setState: (state: TextOrOptionState) => void;
};

export interface FormTextOrOptionsState {
  title: string;
  textOrOptions: {
    [key: string]: TextOrOptionStateSetState;
  };
}

export interface AnamnesisVitaeState extends FormTextOrOptionsState {
  textOrOptions: {
    tuberculosis?: TextOrOptionStateSetState;
  };
}

export type FirstExaminationTabState = {
  complaints?: TextareaExtendedState;
  anamnesisMorbi?: TextareaExtendedState;
  anamnesisVitae?: AnamnesisVitaeState;
};
