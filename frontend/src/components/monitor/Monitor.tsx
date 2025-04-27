import { useEffect, useState } from "react";

import { useMonitorContext } from "../../contexts/MonitorContextProvider";
import { ISODate } from "../../types/ISODateStrings";
import Department from "../../types/Department";
import DateSelector from "../common/DateSelector";
import DepartmentSelector from "../common/DepartmentSelector";
import MainContentLayout from "../layouts/MainContentLayout";
import MonitorTable from "./MonitorTable";

function Monitor() {
  const { monitorState, setMonitorState } = useMonitorContext();
  const [department, setDepartment] = useState<Department>(monitorState.department);
  const [diaryDate, setDiaryDate] = useState<ISODate>(monitorState.diaryDate);

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
