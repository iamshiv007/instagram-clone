import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState: {
        user: {},
        loading: false,
        error: null,
    },
    reducers: {
        userDetailsRequest: (state) => {
            state.loading = true;
        },
        userDetailsSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
        },
        userDetailsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userDetailsReset: (state) => {
            state.user = {};
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    userDetailsRequest,
    userDetailsSuccess,
    userDetailsFailure,
    userDetailsReset,
    clearErrors,
} = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
