import { createSlice } from "@reduxjs/toolkit";

const followUserSlice = createSlice({
    name: "followUser",
    initialState: {
        loading: false,
        success: false,
        message: null,
        error: null,
    },
    reducers: {
        followUserRequest: (state) => {
            state.loading = true;
        },
        followUserSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.message = action.payload.message;
        },
        followUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        followUserReset: (state) => {
            state.success = false;
            state.message = null;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    followUserRequest,
    followUserSuccess,
    followUserFailure,
    followUserReset,
    clearErrors,
} = followUserSlice.actions;

export default followUserSlice.reducer;
