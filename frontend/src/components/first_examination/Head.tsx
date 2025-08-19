import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setEditorTabHeadState } from "../../redux/slices/editorSlice";
import { BodyPartState } from "../../types/EditorTabTypes";

import BodyPart from "./BodyPart";

type HeadProps = {
  id: string;
};

function Head({ id }: HeadProps) {
  console.log("RENDER HEAD");

  const state = useAppSelector((state) => state.editor.editorTabs[id]?.state.head);

  if (!state) {
    throw "Tab with id=" + id + " not found!";
  }

  const dispatch = useAppDispatch();

  const setState = (newState: BodyPartState) => {
    dispatch(setEditorTabHeadState({ id, state: newState }));
  };

  return <BodyPart state={state} setState={setState} />;
}

export default Head;
