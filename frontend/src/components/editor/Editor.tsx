import { SyntheticEvent } from "react";

import { FaBookMedical } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { deleteEditorTab, setCurrentEditorTabId } from "../../redux/slices/editorSlice";
import { capitalizeString } from "../../utils/capitalizeString";
import FirstExamination from "../first_examination/FirstExamination";

import styles from "./Editor.module.css";

function Editor() {
  const currentEditorTabId = useAppSelector((state) => state.editor.currentEditorTabId);
  const tabsOrder = useAppSelector((state) => state.editor.order);

  const dispatch = useAppDispatch();

  console.log("RENDER EDITOR");

  if (!tabsOrder.length || !currentEditorTabId) {
    return (
      <div className={styles.editorTabsMain}>
        <div className={styles.noEditorTabs}>Нет открытых вкладок</div>
      </div>
    );
  }

  const CurrentEditorTabComponent = () => (currentEditorTabId ? <FirstExamination id={currentEditorTabId} /> : null);

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
          {tabsOrder.map(({ id, title }) => (
            <div key={id}>
              <input
                type="radio"
                name="editorTabs"
                id={id}
                value={id}
                checked={id === currentEditorTabId}
                onChange={() => handleEditorTabsInputOnChange(id)}
              />
              <FaBookMedical className={styles.icon} />
              <label htmlFor={id}>{capitalizeString(title)}</label>
              <IoMdCloseCircle
                className={`${styles.icon} ${styles.close}`}
                size="1.25em"
                title="закрыть"
                onClick={(event) => handleCloseIconOnClick(event, id)}
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
