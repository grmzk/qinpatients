import { DamagesState, VisualPalpationState, WoundState } from "../../types/EditorTabTypes";

import TitleOptions from "./TitleOptions";
import Wound from "./Wound";

type DamagesProps = {
  state: DamagesState;
  setState: (newState: DamagesState) => void;
};

function Damages({ state, setState }: DamagesProps) {
  return (
    <div>
      <TitleOptions
        state={state.visualPalpation}
        setState={(newState: VisualPalpationState) => setState({ ...state, visualPalpation: newState })}
      />
      <Wound state={state.wound} setState={(newState: WoundState) => setState({ ...state, wound: newState })} />
    </div>
  );
}

export default Damages;
