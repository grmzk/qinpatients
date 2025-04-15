import { Outlet, useNavigate } from "react-router";

import { DataRepository } from "../../repositories/DataRepository";
import NavBar from "./NavBar";

import styles from "./Header.module.css";

function Header() {
  DataRepository.navigate = useNavigate();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.brand}>
          <img className={styles.logo} src="./img/qinpatients-logo.png" alt="logo" />
          <h1 className={styles.title}>QInPatients</h1>
        </div>
        <NavBar />
      </header>
      <Outlet />
    </>
  );
}

export default Header;
