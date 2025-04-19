type AuthContextValue = {
  token: string | null;
  setToken: (newToken: string | null) => void;
};

export default AuthContextValue;
