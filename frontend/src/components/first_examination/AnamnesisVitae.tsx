import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setEditorTabAnamnesisVitaeState } from "../../redux/slices/editorSlice";
import { AnamnesisVitaeState } from "../../types/EditorTabTypes";

import FormTextOrOptions from "./FormTextOrOptions";

type AnamnesisVitaeProps = {
  id: string;
};

function AnamnesisVitae({ id }: AnamnesisVitaeProps) {
  console.log("RENDER ANAMNESIS VITAE");

  const anamnesisVitaeState = useAppSelector((state) => state.editor.editorTabs[id]?.state.anamnesisVitae);

  if (!anamnesisVitaeState) {
    throw "Tab with id=" + id + " not found!";
  }

  const dispatch = useAppDispatch();

  const setAnamnesisVitaeState = (newState: AnamnesisVitaeState) => {
    dispatch(setEditorTabAnamnesisVitaeState({ id, state: newState }));
  };

  return <FormTextOrOptions state={anamnesisVitaeState} setState={setAnamnesisVitaeState} />;
}

export default AnamnesisVitae;
