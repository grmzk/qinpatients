import AuthContextProvider from "./contexts/AuthContextProvider";
import AuthRoutes from "./routes";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <AuthContextProvider>
        <AuthRoutes />
      </AuthContextProvider>
    </div>
  );
}

export default App;
