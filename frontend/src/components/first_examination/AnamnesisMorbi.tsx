import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setEditorTabAnamnesisMorbiState } from "../../redux/slices/editorSlice";
import { TextareaExtendedState } from "../../types/EditorTabTypes";

import TextareaExtended from "./TextareaExtended";

type AnamnesisMorbiProps = {
  id: string;
};

function AnamnesisMorbi({ id }: AnamnesisMorbiProps) {
  console.log("RENDER ANAMNESIS MORBI");

  const anamnesisMorbiState = useAppSelector((state) => state.editor.editorTabs[id]?.state.anamnesisMorbi);

  if (!anamnesisMorbiState) {
    throw "Tab with id=" + id + " not found!";
  }

  const dispatch = useAppDispatch();

  const setAnamnesisMorbiState = (newState: TextareaExtendedState) => {
    dispatch(setEditorTabAnamnesisMorbiState({ id, state: newState }));
  };

  return <TextareaExtended state={anamnesisMorbiState} setState={setAnamnesisMorbiState} />;
}

export default AnamnesisMorbi;
