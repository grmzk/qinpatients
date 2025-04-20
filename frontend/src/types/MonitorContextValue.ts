import { DateISODate } from "./DateISOStrings";
import Departments from "./Departments";

export type MonitorState = {
  department: Departments;
  diaryDate: DateISODate;
};

type MonitorContextValue = {
  monitorState: MonitorState;
  setMonitorState: (newMonitorState: MonitorState) => void;
};

export default MonitorContextValue;
