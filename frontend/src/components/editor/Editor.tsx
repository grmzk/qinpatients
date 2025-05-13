import { SyntheticEvent, useEffect, useState } from "react";

import { FaBookMedical } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { Navigate, NavLink, useParams } from "react-router";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { deleteEditorTab, setStoredEditorId } from "../../redux/slices/editorSlice";
import { EditorTab } from "../../types/EditorState";
import { capitalizeString } from "../../utils/capitalizeString";
import FirstExamination from "../first_examination/FirstExamination";

import styles from "./Editor.module.css";

function Editor() {
  const editorTabs: EditorTab[] = useAppSelector((state) => state.editor.editorTabs);
  const storedEditorId = useAppSelector((state) => state.editor.storedEditorId);
  const [currentEditorId, setCurrentEditorId] = useState<string>();

  const { editorId: urlEditorId } = useParams();

  const dispatch = useAppDispatch();

  console.log("RENDER");

  useEffect(() => {
    console.log("EFFECT");
    currentEditorId && dispatch(setStoredEditorId(currentEditorId));
  }, [dispatch, currentEditorId]);

  if (!editorTabs.length) {
    return (
      <div className={styles.editorTabsMain}>
        <div className={styles.noEditorTabs}>Нет открытых вкладок</div>
      </div>
    );
  }

  if (!storedEditorId) {
    console.log(editorTabs);
    const lastEditorId = editorTabs.at(-1)?.id ?? "";
    console.log(lastEditorId);
    if (lastEditorId !== urlEditorId) {
      return <Navigate to={lastEditorId} />;
    }
  }

  if (!urlEditorId && storedEditorId) {
    return <Navigate to={storedEditorId} />;
  }

  const currentEditorTab = editorTabs.find((editorTab) => editorTab.id === urlEditorId);

  if (currentEditorTab && currentEditorTab.id !== currentEditorId) {
    setCurrentEditorId(currentEditorTab.id);
  }

  const EditorWorkspace = () =>
    currentEditorTab ? <FirstExamination patientInfo={currentEditorTab.patientInfo} /> : null;

  function handleCloseIconOnClick(event: SyntheticEvent, id: string) {
    event.preventDefault();
    event.stopPropagation();
    dispatch(deleteEditorTab(id));
  }

  return (
    <>
      <div className={styles.editorTabsMain}>
        <div className={styles.editorTabs}>
          {editorTabs.map((editorTab) => (
            <NavLink className={styles.navLink} to={editorTab.id} key={editorTab.id}>
              <button>
                <FaBookMedical className={styles.icon} />
                <div className={styles.buttonText}>{capitalizeString(editorTab.patientInfo.full_name)}</div>
                <IoMdCloseCircle
                  className={`${styles.icon} ${styles.close}`}
                  size="1.25em"
                  title="закрыть"
                  onClick={(event) => handleCloseIconOnClick(event, editorTab.id)}
                />
              </button>
            </NavLink>
          ))}
        </div>
      </div>
      <EditorWorkspace />
    </>
  );
}

export default Editor;
