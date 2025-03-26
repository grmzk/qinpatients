import "./App.css";
import Header from "./components/Header";
import DepartmentSelector from "./components/DepartmentSelector";
import { useState } from "react";

function App() {
  const [departmentId, setDepartmentId] = useState(0);
  console.log(departmentId);

  return (
    <div className="App">
      <Header />
      <section className="content">
        <div className="grid">
          <div className="grid-item">
            <DepartmentSelector
              departmentId={departmentId}
              setDepartmentId={setDepartmentId}
            />
          </div>
          <div className="grid-item">
            test
            <br />
            test
            <br />
            test
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
