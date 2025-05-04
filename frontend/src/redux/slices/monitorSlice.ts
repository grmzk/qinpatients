import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { DEFAULT_DEPARTMENT } from "../../configs/config";
import Department from "../../types/Department";
import { ISODate } from "../../types/ISODateStrings";
import { MonitorState } from "../../types/MonitorContextValue";
import { getDiaryToday } from "../../utils/getDiaryIsoDate";

const initialState: MonitorState = {
  department: DEFAULT_DEPARTMENT,
  diaryDate: getDiaryToday(),
};

const monitorSlice = createSlice({
  name: "monitor",
  initialState,
  reducers: {
    setDepartmentMonitor: (state: MonitorState, action: PayloadAction<Department>) => {
      state.department = action.payload;
    },
    setDiaryDateMonitor: (state: MonitorState, action: PayloadAction<ISODate>) => {
      state.diaryDate = action.payload;
    },
  },
});

export const { setDepartmentMonitor, setDiaryDateMonitor } = monitorSlice.actions;

export default monitorSlice.reducer;
