import { createSlice } from "@reduxjs/toolkit";

const deletePostSlice = createSlice({
  name: "deletePost",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    deletePostRequest: (state) => {
      state.loading = true;
    },
    deletePostSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    deletePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePostReset: (state) => {
      state.success = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
  deletePostReset,
  clearErrors,
} = deletePostSlice.actions;

export default deletePostSlice.reducer;
