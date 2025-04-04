import "./App.css";
import Header from "./components/header/Header";
import Monitor from "./components/content/monitor/Monitor";
import { useState } from "react";

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
