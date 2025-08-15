import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setEditorTabComplaintsState } from "../../redux/slices/editorSlice";
import { TextareaExtendedState } from "../../types/EditorTabTypes";

import TextareaExtended from "./TextareaExtended";

type CompalintsProps = {
  id: string;
};

function Complaints({ id }: CompalintsProps) {
  console.log("RENDER COMPLAINTS");

  const complaintsState = useAppSelector((state) => state.editor.editorTabs[id]?.state.complaints);

  if (!complaintsState) {
    throw "Tab with id=" + id + " not found!";
  }

  const dispatch = useAppDispatch();

  const setComplaintsState = (complaintsState: TextareaExtendedState) => {
    dispatch(setEditorTabComplaintsState({ id, state: complaintsState }));
  };

  return <TextareaExtended state={complaintsState} setState={setComplaintsState} />;
}

export default Complaints;
