import { createSlice } from "@reduxjs/toolkit";

const newCommentSlice = createSlice({
  name: "newComment",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    newCommentRequest: (state) => {
      state.loading = true;
    },
    newCommentSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    newCommentReset: (state) => {
      state.success = false;
    },
    newCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  newCommentRequest,
  newCommentSuccess,
  newCommentReset,
  newCommentFailure,
  clearErrors,
} = newCommentSlice.actions;

export default newCommentSlice.reducer;
