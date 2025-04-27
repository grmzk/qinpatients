import { ISODate } from "./ISODateStrings";
import Department from "./Department";

export type MonitorState = {
  department: Department;
  diaryDate: ISODate;
};

type MonitorContextValue = {
  monitorState: MonitorState;
  setMonitorState: (newMonitorState: MonitorState) => void;
};

export default MonitorContextValue;
