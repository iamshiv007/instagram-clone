import { createSlice } from "@reduxjs/toolkit";

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    allUsersRequest: (state) => {
      state.loading = true;
    },
    allUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
    },
    allUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  allUsersRequest,
  allUsersSuccess,
  allUsersFailure,
  clearErrors,
} = allUsersSlice.actions;

export default allUsersSlice.reducer;
