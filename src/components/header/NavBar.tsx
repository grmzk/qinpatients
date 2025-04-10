import { useEffect, useState } from "react";

import CONTENT from "../../configs/content";
import { ContentName } from "../types/Content";
import NavButton from "./NavButton";

import styles from "./NavBar.module.css";
import buttonStyles from "./NavButton.module.css";

function NavBar() {
  const [selected, setSelected] = useState<ContentName | null>("Monitor");

  useEffect(() => {
    const navButtons = document.querySelectorAll(`.${buttonStyles.NavButton}`);
    navButtons.forEach((button) => {
      if (button.getAttribute("name") !== selected) {
        button.classList.remove(buttonStyles.selected);
        return;
      }
      button.classList.add(buttonStyles.selected);
    });
  }, [selected]);

  return (
    <div className={styles.navBar}>
      {Object.entries(CONTENT).map(([contentName, { title }]) => {
        return <NavButton name={contentName} title={title} setSelected={setSelected} key={contentName} />;
      })}
    </div>
  );
}

export default NavBar;
