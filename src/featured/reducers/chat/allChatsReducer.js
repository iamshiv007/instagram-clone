import { createSlice } from "@reduxjs/toolkit";

const allChatsSlice = createSlice({
  name: "allChats",
  initialState: {
    loading: false,
    chats: [],
    error: null,
  },
  reducers: {
    allChatsRequest: (state) => {
      state.loading = true;
    },
    allChatsSuccess: (state, action) => {
      state.loading = false;
      state.chats = action.payload.chats;
    },
    allChatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  allChatsRequest,
  allChatsSuccess,
  allChatsFailure,
  clearErrors,
} = allChatsSlice.actions;

export default allChatsSlice.reducer;
