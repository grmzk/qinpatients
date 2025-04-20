import { Context, ReactNode, createContext, useContext, useState } from "react";

import { DEFAULT_DEPARTMENT } from "../configs/config";
import MonitorContextValue, { MonitorState } from "../types/MonitorContextValue";
import { getDiaryToday } from "../utils/getDiaryIsoDate";

type MonitorContextProviderProps = {
  children: ReactNode;
};

const initialMonitorState: MonitorState = {
  department: DEFAULT_DEPARTMENT,
  diaryDate: getDiaryToday(),
};

const initialValue: MonitorContextValue = {
  monitorState: initialMonitorState,
  setMonitorState: (newMonitorState: MonitorState) => {},
};

const MonitorContext: Context<MonitorContextValue> = createContext(initialValue);

function MonitorContextProvider({ children }: MonitorContextProviderProps) {
  const [monitorState, setMonitorState] = useState<MonitorState>(initialMonitorState);
  const contextValue: MonitorContextValue = {
    monitorState,
    setMonitorState,
  };

  return <MonitorContext.Provider value={contextValue}>{children}</MonitorContext.Provider>;
}

export const useMonitorContext = () => {
  return useContext(MonitorContext);
};

export default MonitorContextProvider;
