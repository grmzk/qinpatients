import { AnamnesisVitaeState } from "../../types/EditorTabTypes";

import FormTextOrOptions from "./FormTextOrOptions";

import styles from "./AnamnesisVitae.module.css";

type AnamnesisVitaeProps = {
  state: AnamnesisVitaeState;
  setState: (state: AnamnesisVitaeState) => void;
};

function AnamnesisVitae({ state, setState }: AnamnesisVitaeProps) {
  const setTextOrOptionState = (textOrOptionState) => setState({ ...state, textOrOptions: { ...state.textOrOptions, tuberculosis:  } }),

  const anamnesisVitaeState: AnamnesisVitaeState = {
    title: "Anamnesis vitae",
    textOrOptions: {
      tuberculosis: {
        state: {
          title: "Туберкулёз",
          optionChecked: true,
          optionText: "отрицает",
          text: "",
        },
        setState: function(tuberculosisState) {setState({ ...state, textOrOptions: { ...state.textOrOptions, [this]: } })},
      },
    },
  };
  return <FormTextOrOptions textOrOptions={textOrOptions} />;
}

export default AnamnesisVitae;
