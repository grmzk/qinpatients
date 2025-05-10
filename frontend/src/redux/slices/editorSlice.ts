import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { EditorPayload, EditorState } from "../../types/EditorState";

const initialState: EditorState[] = [];

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addTabEditor: (state: EditorState[], action: PayloadAction<EditorPayload>) => {
      state.push({ ...action.payload, id: uuidv4() });
    },
    deleteTabEditor: (state: EditorState[], action: PayloadAction<string>) => {
      return state.filter((tab) => tab.id !== action.payload);
    },
  },
});

export const { addTabEditor, deleteTabEditor } = editorSlice.actions;

export default editorSlice.reducer;
