import { SyntheticEvent } from "react";

import { FaBookMedical } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { deleteEditorTab, setCurrentEditorTabId } from "../../redux/slices/editorSlice";
import { EditorTab } from "../../types/EditorState";
import { capitalizeString } from "../../utils/capitalizeString";
import FirstExamination from "../first_examination/FirstExamination";

import styles from "./Editor.module.css";

function Editor() {
  const editorTabs: EditorTab[] = useAppSelector((state) => state.editor.editorTabs);
  const currentEditorTabId = useAppSelector((state) => state.editor.currentEditorTabId);

  const dispatch = useAppDispatch();

  console.log("RENDER");

  if (!editorTabs.length || !currentEditorTabId) {
    return (
      <div className={styles.editorTabsMain}>
        <div className={styles.noEditorTabs}>Нет открытых вкладок</div>
      </div>
    );
  }

  const currentEditorTab = editorTabs.find((editorTab) => editorTab.id === currentEditorTabId);
  const CurrentEditorTabComponent = () =>
    currentEditorTab ? <FirstExamination id={currentEditorTab.id} patientInfo={currentEditorTab.patientInfo} /> : null;

  function handleCloseIconOnClick(event: SyntheticEvent, id: string) {
    event.preventDefault();
    event.stopPropagation();
    dispatch(deleteEditorTab(id));
  }

  function handleEditorTabsInputOnChange(editorId: string) {
    dispatch(setCurrentEditorTabId(editorId));
  }

  return (
    <>
      <div className={styles.editorTabsMain}>
        <div className={styles.editorTabs}>
          {editorTabs.map((editorTab) => (
            <div key={editorTab.id}>
              <input
                type="radio"
                name="editorTabs"
                id={editorTab.id}
                value={editorTab.id}
                checked={editorTab.id === currentEditorTabId}
                onChange={() => handleEditorTabsInputOnChange(editorTab.id)}
              />
              <FaBookMedical className={styles.icon} />
              <label htmlFor={editorTab.id}>{capitalizeString(editorTab.patientInfo.full_name)}</label>
              <IoMdCloseCircle
                className={`${styles.icon} ${styles.close}`}
                size="1.25em"
                title="закрыть"
                onClick={(event) => handleCloseIconOnClick(event, editorTab.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <CurrentEditorTabComponent />
    </>
  );
}

export default Editor;
