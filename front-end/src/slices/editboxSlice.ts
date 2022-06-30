import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ResultObj {
  best_one: string;
  suggestions: Array<string>;
  correct: boolean;
}

export interface EditBoxState {
  data: Array<string>;
  nodeResult: Array<ResultObj>;
  rustResult: Array<ResultObj>;
}

const initialState: EditBoxState = {
  data: [],
  nodeResult: [],
  rustResult: [],
};

export const historySlice = createSlice({
  name: 'editbox',
  initialState,
  reducers: {
    setNodeResults: (state, action: PayloadAction<Array<any>>) => {
      state.nodeResult = [...action.payload];
    },
    setRustResults: (state, action: PayloadAction<Array<any>>) => {
      state.rustResult = [...action.payload];
    },
    setWordsOfSentence: (state, action: PayloadAction<Array<string>>) => {
      state.data = [...action.payload];
    },
    setAllEmpty: (state) => {
      state.data = [];
      state.nodeResult = [];
      state.rustResult = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setNodeResults,
  setRustResults,
  setWordsOfSentence,
  setAllEmpty,
} = historySlice.actions;

export default historySlice.reducer;
