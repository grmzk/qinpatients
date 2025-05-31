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

export type FirstExaminationTabState = {
  complaints?: TextareaExtendedState;
  anamnesisMorbi?: TextareaExtendedState;
};
