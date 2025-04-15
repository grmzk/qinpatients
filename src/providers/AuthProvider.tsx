import axios from "axios";
import { Context, ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextProps = {
  children: ReactNode;
};

type ContextValue = {
  token: string | null;
  setToken: (newToken: string) => void;
};

const initialValue: ContextValue = {
  token: null,
  setToken: (newToken: string) => {},
};

const AuthContext: Context<ContextValue> = createContext(initialValue);

function AuthProvider({ children }: AuthContextProps) {
  const [token, setToken_] = useState(localStorage.getItem("token"));

  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        setToken_(null);
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

  const contextValue: ContextValue = useMemo(
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
