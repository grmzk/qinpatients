import { NavLink } from "react-router";

import NavButton from "./NavButton";

import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <div className={styles.navBar}>
      <NavLink to="">
        <NavButton>Монитор</NavButton>
      </NavLink>
      <NavLink to="login">
        <NavButton>Вход</NavButton>
      </NavLink>
    </div>
  );
}

export default NavBar;
