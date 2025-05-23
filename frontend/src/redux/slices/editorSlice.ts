import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { EditorTabPayload, EditorState } from "../../types/EditorState";
import { FirstExaminationTabState } from "../../types/EditorTabTypes";

const initialState: EditorState = {
  editorTabs: [],
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addEditorTab: (state: EditorState, action: PayloadAction<EditorTabPayload>) => {
      const id = uuidv4();
      state.currentEditorTabId = id;
      state.editorTabs.push({ ...action.payload, id: id });
    },
    deleteEditorTab: (state: EditorState, action: PayloadAction<string>) => {
      state.editorTabs = state.editorTabs.filter((editorTab) => editorTab.id !== action.payload);
      if (state.currentEditorTabId === action.payload) {
        state.currentEditorTabId = state.editorTabs.at(-1)?.id;
      }
    },
    setCurrentEditorTabId: (state: EditorState, action: PayloadAction<string | undefined>) => {
      state.currentEditorTabId = action.payload;
    },
    setEditorTabState: (state: EditorState, action: PayloadAction<{ id: string; state: FirstExaminationTabState }>) => {
      const tab = state.editorTabs.find((tab) => tab.id === action.payload.id);
      if (tab) {
        tab.state = action.payload.state;
      }
    },
  },
});

export const { addEditorTab, deleteEditorTab, setCurrentEditorTabId, setEditorTabState } = editorSlice.actions;

export default editorSlice.reducer;
