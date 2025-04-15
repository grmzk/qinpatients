import { FormEvent, useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router";

import { getDataRepository } from "../../../repositories/DataRepository";
import CommonContentLayout from "../../layouts/CommonContentLayout";

import styles from "./Login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!submitted) {
      return;
    }

    function authSuccess({ auth_token }: { auth_token: string }) {
      getDataRepository(auth_token);
      navigate("/", { relative: "path" });
    }

    getDataRepository().login(username, password).then(authSuccess).catch(console.error);
    setSubmitted(false);
  }, [submitted, username, password, navigate]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <CommonContentLayout>
      <div className={styles.title}>{"Авторизация".toUpperCase()}</div>
      <div className={styles.loginCard}>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label htmlFor="username">Логин:</label>
              <input
                type="text"
                id="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
