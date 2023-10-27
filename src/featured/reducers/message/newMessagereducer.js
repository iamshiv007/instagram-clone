import { createSlice } from "@reduxjs/toolkit";

const newMessageSlice = createSlice({
  name: "newMessage",
  initialState: {
    loading: false,
    success: false,
    newMessage: {},
    error: null,
  },
  reducers: {
    newMessageRequest: (state) => {
      state.loading = true;
    },
    newMessageSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.newMessage = action.payload.newMessage;
    },
    newMessageReset: (state) => {
      state.success = false;
      state.newMessage = {};
    },
    newMessageFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  newMessageRequest,
  newMessageSuccess,
  newMessageReset,
  newMessageFailure,
  clearErrors,
} = newMessageSlice.actions;

export default newMessageSlice.reducer;
