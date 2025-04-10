import { useState } from "react";

import Monitor from "./components/content/monitor/Monitor";
import Header from "./components/header/Header";

import styles from "./App.module.css";

function App() {
  const [content, setContent] = useState(<Monitor />);

  return (
    <div className={styles.App}>
      <Header />
      {content}
    </div>
  );
}

export default App;
