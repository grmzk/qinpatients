import DateSelector from "./DateSelector";
import DepartmentSelector from "./DepartmentSelector";
import MonitorTable from "./MonitorTable";
import { DEFAULT_DEPARTMENT, DEPARTMENTS } from "../../../config/constants";
import { useState } from "react";
import { getDiaryToday } from "../../../utils/getDiaryIsoDate";
import "./Monitor.css";

function Monitor() {
  const [departmentId, setDepartmentId] = useState(DEFAULT_DEPARTMENT);
  const [diaryDate, setDiaryDate] = useState(getDiaryToday());

  return (
    <div className="content">
      <div className="cards-left">
        <DateSelector diaryDate={diaryDate} setDiaryDate={setDiaryDate} />
        <DepartmentSelector
          departmentId={departmentId}
          setDepartmentId={setDepartmentId}
        />
      </div>
      <MonitorTable
        department={DEPARTMENTS[departmentId]}
        diaryDate={diaryDate}
      />
    </div>
  );
}

export default Monitor;
