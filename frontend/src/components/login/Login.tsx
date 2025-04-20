import { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../../contexts/AuthContextProvider";
import { getDataRepository } from "../../repositories/DataRepository";
import Loader from "../common/Loader";
import CommonContentLayout from "../layouts/CommonContentLayout";

import styles from "./Login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    if (!submitted) {
      return;
    }
    function handleAuthSuccess({ auth_token }: { auth_token: string }) {
      setToken(auth_token);
      navigate("/", { relative: "path", replace: true });
    }
    function handleError(err: AxiosError) {
      if (err.status === 400) {
        setIncorrect(true);
      }
    }
    getDataRepository()
      .login(username, password)
      .then(handleAuthSuccess)
      .catch(handleError)
      .finally(() => setSubmitted(false));
  }, [submitted, username, password, navigate, setToken]);

  useEffect(() => {
    setIncorrect(false);
  }, [username, password]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <CommonContentLayout>
      <div className={styles.title}>{"Авторизация".toUpperCase()}</div>
      <div className={styles.loginForm}>
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
      {incorrect && <div className={styles.warning}>Введен неправильный логин или пароль</div>}
      {submitted && (
        <div className={styles.loading}>
          <Loader />
        </div>
      )}
    </CommonContentLayout>
  );
}

export default Login;
