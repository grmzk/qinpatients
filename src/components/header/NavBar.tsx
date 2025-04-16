import { NavLink } from "react-router";

import { useAuth } from "../../providers/AuthProvider";
import { getDataRepository } from "../../repositories/DataRepository";

import styles from "./NavBar.module.css";

function NavBar() {
  const { token, setToken } = useAuth();

  async function handleLogoutClick() {
    await getDataRepository()
      .logout()
      .then(() => {
        setToken(null);
      })
      .catch(console.error);
  }

  return (
    <div className={styles.navBar}>
      <NavLink to="">
        <button>Монитор</button>
      </NavLink>
      <NavLink to="login">
        {token ? <button onClick={() => handleLogoutClick()}>Выход</button> : <button>Вход</button>}
      </NavLink>
    </div>
  );
}

export default NavBar;
