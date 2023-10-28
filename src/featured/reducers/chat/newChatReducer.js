import { createSlice } from "@reduxjs/toolkit";

const newChatSlice = createSlice({
  name: "newChat",
  initialState: {
    loading: false,
    success: false,
    chat: null,
    error: null,
  },
  reducers: {
    newChatRequest: (state) => {
      state.loading = true;
    },
    newChatSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.chat = action.payload.newChat;
    },
    newChatFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newChatReset: (state) => {
      state.success = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  newChatRequest,
  newChatSuccess,
  newChatFailure,
  newChatReset,
  clearErrors,
} = newChatSlice.actions;

export default newChatSlice.reducer;
