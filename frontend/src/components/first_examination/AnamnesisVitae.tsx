import { AnamnesisVitaeState } from "../../types/EditorTabTypes";

import FormTextOrOptions from "./FormTextOrOptions";

type AnamnesisVitaeProps = {
  state?: AnamnesisVitaeState;
  setState: (state: AnamnesisVitaeState) => void;
};

function AnamnesisVitae({ state, setState }: AnamnesisVitaeProps) {
  const anamnesisVitaeState: AnamnesisVitaeState = {
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

  if (!state) {
    setState(anamnesisVitaeState);
    return <></>;
  }

  return <FormTextOrOptions state={state} setState={setState} />;
}

export default AnamnesisVitae;
