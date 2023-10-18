import { createSlice } from "@reduxjs/toolkit";

type Search = {
  keyword: string;
};

const initialState: Search = {
  keyword: '',
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    input: (state: Search, action) => {
      // state.number += action.payload;
      state.keyword = action.payload
        // state.number += 1; // counter type의 number 키값
    },
    reset: (state, action) => {
      state.keyword = '';
    },
  },
});

export const { input, reset } = searchSlice.actions;
export default searchSlice.reducer;
