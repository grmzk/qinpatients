import { ReactNode } from "react";

import styles from "./NavButton.module.css";

type NavButtonProps = {
  children: ReactNode;
};

function NavButton({ children }: NavButtonProps) {
  return (
    <button className={styles.navButton} type="button">
      {children}
    </button>
  );
}

export default NavButton;
