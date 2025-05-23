import { TextareaExtendedState } from "../../types/EditorTabTypes";

import TextareaExtended from "./TextareaExtended";

type AnamnesisMorbiProps = {
  state?: TextareaExtendedState;
  setState: (state: TextareaExtendedState) => void;
};

function AnamnesisMorbi({ state, setState }: AnamnesisMorbiProps) {
  const anamnesisMorbiState: TextareaExtendedState = state ?? {
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
        text: "без дополнений",
        checked: false,
      },
    },
  };

  return <TextareaExtended state={anamnesisMorbiState} setState={setState} />;
}

export default AnamnesisMorbi;
