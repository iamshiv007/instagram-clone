import { createSlice } from "@reduxjs/toolkit";

const likePostSlice = createSlice({
  name: "likePost",
  initialState: {
    loading: false,
    success: false,
    message: null,
    error: null,
  },
  reducers: {
    likeUnlikePostRequest: (state) => {
      state.loading = true;
    },
    likeUnlikePostSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    likeUnlikePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    likeUnlikePostReset: (state) => {
      state.success = false;
      state.message = null;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  likeUnlikePostRequest,
  likeUnlikePostSuccess,
  likeUnlikePostFailure,
  likeUnlikePostReset,
  clearErrors,
} = likePostSlice.actions;

export default likePostSlice.reducer;
