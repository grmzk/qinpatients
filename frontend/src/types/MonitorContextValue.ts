import { DateISODate } from "./DateISOStrings";

export type MonitorState = {
  departmentId: number;
  diaryDate: DateISODate;
};

type MonitorContextValue = {
  monitorState: MonitorState;
  setMonitorState: (newMonitorState: MonitorState) => void;
};

export default MonitorContextValue;
