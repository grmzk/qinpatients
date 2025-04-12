import { useState } from "react";

import { DEFAULT_DEPARTMENT, DEPARTMENTS } from "../../../configs/constants";
import { DateISODate } from "../../../types/DateISOStrings";
import { getDiaryToday } from "../../../utils/getDiaryIsoDate";
import DateSelector from "./DateSelector";
import DepartmentSelector from "./DepartmentSelector";
import MonitorTable from "./MonitorTable";

import styles from "./Monitor.module.css";

function Monitor() {
  const [departmentId, setDepartmentId] = useState(DEFAULT_DEPARTMENT);
  const [diaryDate, setDiaryDate] = useState<DateISODate>(getDiaryToday());

  return (
    <div className={styles.contentContainer}>
      <div className={styles.stickyPanel}>
        <DateSelector diaryDate={diaryDate} setDiaryDate={setDiaryDate} />
        <DepartmentSelector departmentId={departmentId} setDepartmentId={setDepartmentId} />
      </div>
      <MonitorTable department={DEPARTMENTS[departmentId]} diaryDate={diaryDate} />
    </div>
  );
}

export default Monitor;
