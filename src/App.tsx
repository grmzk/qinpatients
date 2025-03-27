import "./App.css";
import Header from "./components/Header";
import DepartmentSelector from "./components/DepartmentSelector";
import { useState } from "react";
import DateSelector from "./components/DateSelector";
import getDiaryToday from "./utils/getDiaryToday";
import { DEFAULT_DEPARTMENT } from "./constants";
import Monitor from "./components/Monitor";

function App() {
  const [departmentId, setDepartmentId] = useState(DEFAULT_DEPARTMENT);
  const [diaryDate, setDiaryDate] = useState(getDiaryToday());

  return (
    <div className="App">
      <Header />
      <section className="content">
        <div className="grid">
          <div className="grid-item">
            <DateSelector diaryDate={diaryDate} setDiaryDate={setDiaryDate} />
            <DepartmentSelector
              departmentId={departmentId}
              setDepartmentId={setDepartmentId}
            />
          </div>
          <div className="grid-item">
            <Monitor />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
