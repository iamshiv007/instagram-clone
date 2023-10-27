import { createSlice } from "@reduxjs/toolkit";

const allMessagesSlice = createSlice({
  name: "allMessages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
  },
  reducers: {
    allMessagesRequest: (state) => {
      state.loading = true;
    },
    allMessagesSuccess: (state, action) => {
      state.loading = false;
      state.messages = action.payload;
    },
    allMessagesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    allMessagesAdd: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  allMessagesRequest,
  allMessagesSuccess,
  allMessagesFailure,
  allMessagesAdd,
  clearErrors,
} = allMessagesSlice.actions;

export default allMessagesSlice.reducer;
