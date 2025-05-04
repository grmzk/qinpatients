import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setDepartmentMonitor, setDiaryDateMonitor } from "../../redux/slices/monitorSlice";
import Department from "../../types/Department";
import { ISODate } from "../../types/ISODateStrings";
import DateSelector from "../common/DateSelector";
import DepartmentSelector from "../common/DepartmentSelector";
import MainContentLayout from "../layouts/MainContentLayout";
import MonitorTable from "./MonitorTable";

function Monitor() {
  const department = useAppSelector((state) => state.monitor.department);
  const diaryDate = useAppSelector((state) => state.monitor.diaryDate);

  const dispatch = useAppDispatch();
  const setDepartment = (department: Department) => dispatch(setDepartmentMonitor(department));
  const setDiaryDate = (diaryDate: ISODate) => dispatch(setDiaryDateMonitor(diaryDate));

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
