import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import styles from "./Head.module.css";
import HeadArea from "./HeadArea";

type HeadProps = {
  id: string;
};

function Head({ id }: HeadProps) {
  console.log("RENDER STATUS PRAESENS");

  // const state = useAppSelector((state) => state.editor.editorTabs[id]?.state.statusPraesens);

  // if (!state) {
  //   throw "Tab with id=" + id + " not found!";
  // }

  // const dispatch = useAppDispatch();

  // const setState = (newState: StatusPraesensState) => {
  //   dispatch(setEditorTabStatusPraesensState({ id, state: newState }));
  // };
  // const setConditionState = (newConditionState: ConditionState) => {
  //   setState({ ...state, condition: newConditionState });
  // };

  return (
    <div className={styles.main}>
      <div className={styles.title}>Голова</div>
      <HeadArea />
      {/* <TitleOptions state={state.condition} setState={setConditionState} radio /> */}
    </div>
  );
}

export default Head;
