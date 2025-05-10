import { FaBookMedical } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { deleteTabEditor, EditorState } from "../../redux/slices/editorSlice";

import styles from "./Editor.module.css";

function Editor() {
  const tabs: EditorState[] = useAppSelector((state) => state.editor);

  const dispatch = useAppDispatch();
  const deleteTab = (id: string) => dispatch(deleteTabEditor(id));

  function handleButtonOnClick() {
    console.log("BUTTON CLICKED");
  }

  function handleCloseIconOnClick(event: React.MouseEvent, id: string) {
    event.stopPropagation();
    console.log("CLOSE CLICKED");
    deleteTab(id);
  }
  return (
    <div className={styles.editor}>
      {tabs.map((tab) => (
        <button onClick={handleButtonOnClick} key={tab.id}>
          <FaBookMedical className={styles.icon} />
          <div className={styles.buttonText}>{tab.fullname}</div>
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
