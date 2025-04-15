import AuthProvider from "./providers/AuthProvider";
import AuthRoutes from "./routes";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <AuthProvider>
        <AuthRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
