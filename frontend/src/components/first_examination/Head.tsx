import { v4 as uuidv4 } from "uuid";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setEditorTabHeadState } from "../../redux/slices/editorSlice";
import { HeadAreaState, HeadState } from "../../types/EditorTabTypes";

import HeadArea from "./HeadArea";

import styles from "./Head.module.css";

type HeadProps = {
  id: string;
};

function Head({ id }: HeadProps) {
  console.log("RENDER STATUS PRAESENS");

  const state = useAppSelector((state) => state.editor.editorTabs[id]?.state.head);

  if (!state) {
    throw "Tab with id=" + id + " not found!";
  }

  const dispatch = useAppDispatch();

  const setState = (newState: HeadState) => {
    dispatch(setEditorTabHeadState({ id, state: newState }));
  };

  const setHeadAreaState = (newState: HeadAreaState, index: number) => {
    setState({ ...state, areas: state.areas.map((area, i) => (i === index ? newState : area)) });
  };
  const deleteHeadAreaState = (index: number) => {
    setState({ ...state, areas: state.areas.filter((_, i) => i !== index) });
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>Голова</div>
      {state.areas.map((area, index) => (
        <HeadArea
          state={area}
          setState={(newState: HeadAreaState) => setHeadAreaState(newState, index)}
          deleteArea={() => deleteHeadAreaState(index)}
          key={uuidv4()}
        />
      ))}
    </div>
  );
}

export default Head;
