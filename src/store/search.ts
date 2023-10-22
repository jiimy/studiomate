import { createSlice } from "@reduxjs/toolkit";

type Search = {
  keyword: string;
  error: string;
};

const initialState: Search = {
  keyword: '',
  error: '',
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    input: (state: Search, action) => {
      state.keyword = action.payload;
    },
    reset: (state, action) => {
      state.keyword = initialState.keyword;
    },
    ERROR: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { input, reset, ERROR } = searchSlice.actions;
export default searchSlice.reducer;
