import { v4 as uuidv4 } from "uuid";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { headAreas, makeAreaState, setEditorTabHeadState } from "../../redux/slices/editorSlice";
import { AreaState, AreaTitleName, BodyPartState } from "../../types/EditorTabTypes";

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

  const setState = (newState: BodyPartState) => {
    dispatch(setEditorTabHeadState({ id, state: newState }));
  };

  const setHeadAreaState = (newState: AreaState, index: number) => {
    setState({ ...state, areas: state.areas.map((area, i) => (i === index ? newState : area)) });
  };
  const deleteArea = (index: number) => {
    setState({ ...state, areas: state.areas.filter((_, i) => i !== index) });
  };
  const unshiftArea = (newAreaTitleName: AreaTitleName) => {
    setState({ ...state, areas: [makeAreaState(newAreaTitleName), ...state.areas] });
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>Голова</div>
      <div className={styles.areaSelectors}>
        {headAreas.map(({ title, name }, index) => (
          <button key={index} onClick={() => unshiftArea({ title, name })}>
            {title}
          </button>
        ))}
      </div>
      {state.areas.map((area, index) => (
        <HeadArea
          state={area}
          setState={(newState: AreaState) => setHeadAreaState(newState, index)}
          deleteArea={() => deleteArea(index)}
          key={uuidv4()}
        />
      ))}
    </div>
  );
}

export default Head;
