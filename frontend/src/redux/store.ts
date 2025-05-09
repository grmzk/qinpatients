import { configureStore } from "@reduxjs/toolkit";

import editorReducer from "./slices/editorSlice";
import monitorReducer from "./slices/monitorSlice";

const store = configureStore({
  reducer: {
    monitor: monitorReducer,
    editor: editorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
