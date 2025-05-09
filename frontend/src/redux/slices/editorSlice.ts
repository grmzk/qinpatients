import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const fullnames: string[] = [
  "Петрова Алина Тимофеевна",
  "Голиков Андрей Ильич",
  "Константинов Иван Саввич",
  "Лебедева Арина Марковна",
  "Комарова Маргарита Романовна",
  "Седова Анастасия Владимировна",
  // "Ежова Ксения Михайловна",
  // "Иванов Дмитрий Глебович",
  // "Майоров Матвей Глебович",
  // "Андреева Ульяна Глебовна",
  // "Ларин Иван Тимофеевич",
  // "Лосев Олег Васильевич",
  // "Волков Марк Львович",
  // "Дубинин Матвей Аркадьевич",
  // "Ларин Илья Кириллович",
  // "Александров Михаил Даниэльевич",
  // "Морозова Анна Александровна",
  // "Никонов Руслан Артемьевич",
  // "Шевцов Иван Данилович",
  // "Щукин Александр Русланович",
  // "Левина Эмилия Юрьевна",
];

export type EditorState = {
  id: string;
  fullname: string;
};

const initialState: EditorState[] = fullnames.map((fullname) => ({ id: uuidv4(), fullname: fullname }));
// const initialState: EditorState[] = [];

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addTabEditor: (state: EditorState[], action: PayloadAction<string>) => {
      state.push({ id: uuidv4(), fullname: action.payload });
    },
    deleteTabEditor: (state: EditorState[], action: PayloadAction<string>) => {
      return state.filter((tab) => tab.id !== action.payload);
    },
  },
});

export const { addTabEditor, deleteTabEditor } = editorSlice.actions;

export default editorSlice.reducer;
