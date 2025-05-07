import Department from "./Department";
import { ISODate } from "./ISODateStrings";

export type MonitorState = {
  department: Department;
  diaryDate: ISODate;
};

type MonitorContextValue = {
  monitorState: MonitorState;
  setMonitorState: (newMonitorState: MonitorState) => void;
};

export default MonitorContextValue;
