import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  setEditorTabChestState,
  chestAreas,
  makeAreaState,
  chestAreaInitialState,
} from "../../redux/slices/editorSlice";
import { AreaTitleName, BodyPartState } from "../../types/EditorTabTypes";

import BodyPart from "./BodyPart";

type ChestProps = {
  id: string;
};

function Chest({ id }: ChestProps) {
  console.log("RENDER CHEST");

  const state = useAppSelector((state) => state.editor.editorTabs[id]?.state.chest);

  if (!state) {
    throw "Tab with id=" + id + " not found!";
  }

  const dispatch = useAppDispatch();

  const setState = (newState: BodyPartState) => {
    dispatch(setEditorTabChestState({ id, state: newState }));
  };

  return (
    <BodyPart
      state={state}
      setState={setState}
      areas={chestAreas}
      makeAreaState={(newAreaTitleName: AreaTitleName) => makeAreaState(chestAreaInitialState, newAreaTitleName)}
    />
  );
}

export default Chest;
