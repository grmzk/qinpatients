import { useEffect, useState } from "react";

import { useMonitorContext } from "../../contexts/MonitorContextProvider";
import { DateISODate } from "../../types/DateISOStrings";
import Departments from "../../types/Departments";
import MainContentLayout from "../layouts/MainContentLayout";
import DateSelector from "./DateSelector";
import DepartmentSelector from "./DepartmentSelector";
import MonitorTable from "./MonitorTable";

function Monitor() {
  const { monitorState, setMonitorState } = useMonitorContext();
  const [department, setDepartment] = useState<Departments>(monitorState.department);
  const [diaryDate, setDiaryDate] = useState<DateISODate>(monitorState.diaryDate);

  useEffect(() => {
    setMonitorState({ department, diaryDate });
  }, [department, diaryDate, setMonitorState]);

  return (
    <MainContentLayout>
      <>
        <DateSelector diaryDate={diaryDate} setDiaryDate={setDiaryDate} />
        <DepartmentSelector selectedDepartment={department} setSelectedDepartment={setDepartment} />
      </>
      <MonitorTable department={department} diaryDate={diaryDate} />
    </MainContentLayout>
  );
}

export default Monitor;
