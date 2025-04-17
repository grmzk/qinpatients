import { useState } from "react";

import { DEFAULT_DEPARTMENT } from "../../configs/config";
import DEPARTMENTS from "../../constants/departments";
import { DateISODate } from "../../types/DateISOStrings";
import { getDiaryToday } from "../../utils/getDiaryIsoDate";
import MainContentLayout from "../layouts/MainContentLayout";
import DateSelector from "./DateSelector";
import DepartmentSelector from "./DepartmentSelector";
import MonitorTable from "./MonitorTable";

function Monitor() {
  const [departmentId, setDepartmentId] = useState(DEFAULT_DEPARTMENT);
  const [diaryDate, setDiaryDate] = useState<DateISODate>(getDiaryToday());

  return (
    <MainContentLayout>
      <>
        <DateSelector diaryDate={diaryDate} setDiaryDate={setDiaryDate} />
        <DepartmentSelector departmentId={departmentId} setDepartmentId={setDepartmentId} />
      </>
      <MonitorTable department={DEPARTMENTS[departmentId]} diaryDate={diaryDate} />
    </MainContentLayout>
  );
}

export default Monitor;
