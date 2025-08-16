import { TitleTextsState, WoundState } from "../../types/EditorTabTypes";

import styles from "./Wound.module.css";

type WoundProps = {
  state: TitleTextsState;
  setState: (newState: TitleTextsState) => void;
};

// function Wound({ state, setState }: WoundProps) {
function Wound() {
  const state: WoundState = {
    area: "frontalRegion",
    wound: {
      checked: false,
      straightEdges: false,
      unstraightEdges: false,
      size: "2,0 x 0,5 см",
    },
  };
  return (
    <div className={styles.main}>
      <div className={styles.title}></div>
      <div className={styles.optionsLayout}>
        <input
          type="checkbox"
          className={styles.option}
          id={state.area + "Wound"}
          checked={state.wound.checked}
          // onChange={(event) =>
          //   setState({
          //     ...state,
          //     options: { ...state.options, [key]: { ...state.options[key], text: event.currentTarget.value } },
          //   })
          // }
        />
        <label className={styles.optionLabel} htmlFor={state.area + "Wound"}>
          рана
        </label>
        <input
          type="radio"
          className={styles.option}
          id={state.area + "WoundStraightEdges"}
          name={state.area + "WoundEdges"}
          checked={state.wound.straightEdges}
          // onChange={(event) =>
          //   setState({
          //     ...state,
          //     options: { ...state.options, [key]: { ...state.options[key], text: event.currentTarget.value } },
          //   })
          // }
        />
        <label className={styles.optionLabel} htmlFor={state.area + "WoundStraightEdges"}>
          ровные края
        </label>
        <input
          type="radio"
          className={styles.option}
          id={state.area + "WoundUnstraightEdges"}
          name={state.area + "WoundEdges"}
          checked={state.wound.unstraightEdges}
          // onChange={(event) =>
          //   setState({
          //     ...state,
          //     options: { ...state.options, [key]: { ...state.options[key], text: event.currentTarget.value } },
          //   })
          // }
        />
        <label className={styles.optionLabel} htmlFor={state.area + "WoundUnstraightEdges"}>
          неровные края
        </label>
        <input
          type="text"
          className={styles.text}
          id={state.area + "WoundSize"}
          value={state.wound.size}
          // onChange={(event) =>
          //   setState({
          //     ...state,
          //     options: { ...state.options, [key]: { ...state.options[key], text: event.currentTarget.value } },
          //   })
          // }
        />
      </div>
    </div>
  );
}

export default Wound;
