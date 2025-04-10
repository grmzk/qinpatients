import { SyntheticEvent } from "react";

import { ContentName, isContentName } from "../types/Content";

import styles from "./NavButton.module.css";

type NavButtonProps = {
  name: string;
  title: string;
  setSelected: (selected: ContentName | null) => void;
};

function NavButton({ name, title, setSelected }: NavButtonProps) {
  function handleClick(event: SyntheticEvent) {
    const contentName = event.currentTarget.getAttribute("name");
    if (!isContentName(contentName)) {
      console.error(`Content name "${contentName}" is invalid.`);
      return;
    }
    setSelected(contentName);
  }

  return (
    <button className={styles.NavButton} type="button" name={name} onClick={handleClick}>
      {title}
    </button>
  );
}

export default NavButton;
