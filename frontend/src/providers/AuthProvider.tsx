import axios from "axios";
import { Context, ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

import AuthContextValue from "../types/AuthContextValue";

type AuthContextProps = {
  children: ReactNode;
};

const initialValue: AuthContextValue = {
  token: localStorage.getItem("token"),
  setToken: (newToken: string | null) => {},
};

const AuthContext: Context<AuthContextValue> = createContext(initialValue);

function AuthProvider({ children }: AuthContextProps) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.status === 401) {
        setToken(null);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const contextValue: AuthContextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
