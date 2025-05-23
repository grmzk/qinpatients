import { TextareaExtendedState } from "../../types/EditorTabTypes";

import TextareaExtended from "./TextareaExtended";

type ComplaintsProps = {
  state?: TextareaExtendedState;
  setState: (state: TextareaExtendedState) => void;
};

function Complaits({ state, setState }: ComplaintsProps) {
  const complaintsState: TextareaExtendedState = state ?? {
    title: "Жалобы",
    text: "",
    rows: 1,
    options: {
      encephalopathy: {
        title: "энцефалопатия",
        text: "невозможно выяснить ввиду выраженной энцефалопатии у пациента. ",
        checked: false,
      },
      graveCondition: {
        title: "тяжёлое состояние",
        text: "невозможно выяснить ввиду тяжести состояния пациента. ",
        checked: false,
      },
    },
  };

  return <TextareaExtended state={complaintsState} setState={setState} />;
}

export default Complaits;
