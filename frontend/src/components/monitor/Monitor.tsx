import { useEffect, useState } from "react";

import DEPARTMENTS from "../../constants/departments";
import { useMonitorContext } from "../../contexts/MonitorContextProvider";
import { DateISODate } from "../../types/DateISOStrings";
import MainContentLayout from "../layouts/MainContentLayout";
import DateSelector from "./DateSelector";
import DepartmentSelector from "./DepartmentSelector";
import MonitorTable from "./MonitorTable";

function Monitor() {
  const { monitorState, setMonitorState } = useMonitorContext();
  const [departmentId, setDepartmentId] = useState(monitorState.departmentId);
  const [diaryDate, setDiaryDate] = useState<DateISODate>(monitorState.diaryDate);

  useEffect(() => {
    setMonitorState({ departmentId, diaryDate });
  }, [departmentId, diaryDate, setMonitorState]);

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
