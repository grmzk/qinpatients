import { DateISODate } from "./DateISOStrings";
import Department from "./Department";

export type MonitorState = {
  department: Department;
  diaryDate: DateISODate;
};

type MonitorContextValue = {
  monitorState: MonitorState;
  setMonitorState: (newMonitorState: MonitorState) => void;
};

export default MonitorContextValue;
