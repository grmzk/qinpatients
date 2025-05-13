import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { EditorTabPayload, EditorState } from "../../types/EditorState";

const initialState: EditorState = {
  editorTabs: [],
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addEditorTab: (state: EditorState, action: PayloadAction<EditorTabPayload>) => {
      const id = uuidv4();
      state.storedEditorId = id;
      state.editorTabs.push({ ...action.payload, id: id });
    },
    deleteEditorTab: (state: EditorState, action: PayloadAction<string>) => {
      state.editorTabs = state.editorTabs.filter((editorTab) => editorTab.id !== action.payload);
      if (state.storedEditorId === action.payload) {
        state.storedEditorId = undefined;
      }
    },
    setStoredEditorId: (state: EditorState, action: PayloadAction<string | undefined>) => {
      state.storedEditorId = action.payload;
    },
  },
});

export const { addEditorTab, deleteEditorTab, setStoredEditorId } = editorSlice.actions;

export default editorSlice.reducer;
