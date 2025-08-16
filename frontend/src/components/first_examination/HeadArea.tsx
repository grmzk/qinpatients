import { TitleOptionsState } from "../../types/EditorTabTypes";
import styles from "./HeadArea.module.css";
import TitleOptions from "./TitleOptions";
import Wound from "./Wound";

function HeadArea() {
  const damagesState: TitleOptionsState = {
    name: "damages",
    title: "Лобная область",
    options: {
      edema: {
        title: "отёк",
        checked: false,
      },
      ecchymosis: {
        title: "кровоподтёк",
        checked: false,
      },
      pain: {
        title: "боль",
        checked: false,
      },
      crepitation: {
        title: "крепитация",
        checked: false,
      },
      abrasions: {
        title: "ссадины",
        checked: false,
      },
    },
  };
  return (
    <div className={styles.main}>
      {/* <div className={styles.title}>Лобная область</div> */}
      <hr />
      <TitleOptions state={damagesState} setState={(newState: TitleOptionsState) => true} />
      <Wound />
    </div>
  );
}

export default HeadArea;
