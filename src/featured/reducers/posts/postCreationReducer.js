import { createSlice } from "@reduxjs/toolkit";

const postCreationSlice = createSlice({
  name: "postCreation",
  initialState: {
    loading: false,
    success: false,
    post: {},
    error: null,
  },
  reducers: {
    newPostRequest: (state) => {
      state.loading = true;
    },
    newPostSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.post = action.payload.post;
    },
    newPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newPostReset: (state) => {
      state.success = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  newPostRequest,
  newPostSuccess,
  newPostFailure,
  newPostReset,
  clearErrors,
} = postCreationSlice.actions;

export default postCreationSlice.reducer;
