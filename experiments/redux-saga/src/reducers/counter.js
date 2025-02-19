import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: function (state) {
      state.value += 1;
    },
    decrement: function (state) {
      state.value -= 1;
    },
    incrementByAmount: function (state, action) {
      state.value += action.payload;
    },
  },
});

export const counterActions = counterSlice.actions;

export const counterReducer = counterSlice.reducer;
