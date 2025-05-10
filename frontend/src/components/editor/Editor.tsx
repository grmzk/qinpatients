import { FaBookMedical } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { deleteTabEditor } from "../../redux/slices/editorSlice";
import { EditorState } from "../../types/EditorState";
import { capitalizeString } from "../../utils/capitalizeString";

import styles from "./Editor.module.css";

function Editor() {
  const tabs: EditorState[] = useAppSelector((state) => state.editor);

  const dispatch = useAppDispatch();

  function handleButtonOnClick() {
    console.log("BUTTON CLICKED");
  }

  function handleCloseIconOnClick(event: React.MouseEvent, id: string) {
    event.stopPropagation();
    dispatch(deleteTabEditor(id));
  }

  return (
    <div className={styles.editor}>
      {tabs.map((tab) => (
        <button onClick={handleButtonOnClick} key={tab.id}>
          <FaBookMedical className={styles.icon} />
          <div className={styles.buttonText}>{capitalizeString(tab.patientInfo.full_name)}</div>
          <IoMdCloseCircle
            className={`${styles.icon} ${styles.close}`}
            size="1.25em"
            title="закрыть"
            onClick={(event) => handleCloseIconOnClick(event, tab.id)}
          />
        </button>
      ))}
    </div>
  );
}

export default Editor;
