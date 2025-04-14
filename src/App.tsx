import { BrowserRouter, Route, Routes } from "react-router";

import Login from "./components/content/login/Login";
import Monitor from "./components/content/monitor/Monitor";
import Header from "./components/header/Header";

import styles from "./App.module.css";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Monitor />}></Route>
            <Route path="login" element={<Login />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
