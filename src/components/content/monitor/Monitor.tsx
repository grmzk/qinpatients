import { useState } from "react";

import { DEFAULT_DEPARTMENT, DEPARTMENTS } from "../../../configs/constants";
import { getDiaryToday } from "../../../utils/getDiaryIsoDate";
import { DateISODate } from "../../types/DateISOStrings";
import DateSelector from "./DateSelector";
import DepartmentSelector from "./DepartmentSelector";
import MonitorTable from "./MonitorTable";

import "./Monitor.css";

function Monitor() {
  const [departmentId, setDepartmentId] = useState(DEFAULT_DEPARTMENT);
  const [diaryDate, setDiaryDate] = useState<DateISODate>(getDiaryToday());

  return (
    <div className="content">
      <div className="cards-left">
        <DateSelector diaryDate={diaryDate} setDiaryDate={setDiaryDate} />
        <DepartmentSelector departmentId={departmentId} setDepartmentId={setDepartmentId} />
      </div>
      <MonitorTable department={DEPARTMENTS[departmentId]} diaryDate={diaryDate} />
    </div>
  );
}

export default Monitor;
