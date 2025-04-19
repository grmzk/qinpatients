import { Outlet } from "react-router";

import NavBar from "./NavBar";

import styles from "./Header.module.css";

function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.brand}>
          <img className={styles.logo} src="/img/qinpatients-logo.png" alt="logo" />
          <h1 className={styles.title}>QInPatients</h1>
        </div>
        <NavBar />
      </header>
      <Outlet />
    </>
  );
}

export default Header;
