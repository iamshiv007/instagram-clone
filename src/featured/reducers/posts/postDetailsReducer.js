import { createSlice } from "@reduxjs/toolkit";

const postDetailsSlice = createSlice({
  name: "postDetails",
  initialState: {
    loading: false,
    post: {},
    error: null,
  },
  reducers: {
    postDetailsRequest: (state) => {
      state.loading = true;
    },
    postDetailsSuccess: (state, action) => {
      state.loading = false;
      state.post = action.payload.post;
    },
    postDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    postDetailsReset: (state) => {
      state.loading = false;
      state.post = {};
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  postDetailsRequest,
  postDetailsSuccess,
  postDetailsFailure,
  postDetailsReset,
  clearErrors,
} = postDetailsSlice.actions;

export default postDetailsSlice.reducer;
