import { useState } from "react";

import Monitor from "./components/content/monitor/Monitor";
import Header from "./components/header/Header";

import "./App.css";

function App() {
  const [content, setContent] = useState(<Monitor />);

  return (
    <div className="App">
      <Header />
      {content}
    </div>
  );
}

export default App;
