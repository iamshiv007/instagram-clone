import { createSlice } from "@reduxjs/toolkit";

const savePostSlice = createSlice({
  name: "savePost",
  initialState: {
    loading: false,
    success: false,
    message: null,
    error: null,
  },
  reducers: {
    saveUnsavePostRequest: (state) => {
      state.loading = true;
    },
    saveUnsavePostSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    saveUnsavePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    saveUnsavePostReset: (state) => {
      state.success = false;
      state.message = null;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  saveUnsavePostRequest,
  saveUnsavePostSuccess,
  saveUnsavePostFailure,
  saveUnsavePostReset,
  clearErrors,
} = savePostSlice.actions;

export default savePostSlice.reducer;
