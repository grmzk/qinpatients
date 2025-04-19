import AuthContextProvider from "./contexts/AuthContextProvider";
import MonitorContextProvider from "./contexts/MonitorContextProvider";
import AuthRoutes from "./routes";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <AuthContextProvider>
        <MonitorContextProvider>
          <AuthRoutes />
        </MonitorContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
