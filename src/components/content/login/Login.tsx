import CommonContentLayout from "../../layouts/CommonContentLayout";

import styles from "./Login.module.css";

function Login() {
  return (
    <CommonContentLayout>
      <div className={styles.title}>{"Авторизация".toUpperCase()}</div>
      <div className={styles.loginCard}>
        <form>
          <ul>
            <li>
              <label htmlFor="username">Логин:</label>
              <input type="text" id="username" autoComplete="username" />
            </li>
            <li>
              <label htmlFor="password">Пароль:</label>
              <input type="password" id="password" autoComplete="current-password" />
            </li>
            <li>
              <button type="submit">Вход</button>
            </li>
          </ul>
        </form>
      </div>
    </CommonContentLayout>
  );
}

export default Login;
