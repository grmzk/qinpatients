import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setEditorTabAnamnesisGynecologicalState } from "../../redux/slices/editorSlice";
import { AnamnesisGynecologicalState } from "../../types/EditorTabTypes";

import FormTextOrOptions from "./FormTextOrOptions";

type AnamnesisGynecologicalProps = {
  id: string;
};

function AnamnesisGynecological({ id }: AnamnesisGynecologicalProps) {
  console.log("RENDER ANAMNESIS GYNECOLOGICAL");

  const anamnesisGynecologicalState = useAppSelector(
    (state) => state.editor.editorTabs[id]?.state.anamnesisGynecological
  );

  if (!anamnesisGynecologicalState) {
    throw "Tab with id=" + id + " not found!";
  }

  const dispatch = useAppDispatch();

  const setAnamnesisGynecologicalState = (newState: AnamnesisGynecologicalState) => {
    dispatch(setEditorTabAnamnesisGynecologicalState({ id, state: newState }));
  };

  return <FormTextOrOptions state={anamnesisGynecologicalState} setState={setAnamnesisGynecologicalState} />;
}

export default AnamnesisGynecological;
