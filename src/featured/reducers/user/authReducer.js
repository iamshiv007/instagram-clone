import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {},
        loading: false,
        isAuthenticated: false,
        message: null,
        error: null,
    },
    reducers: {
        authRequest: (state) => {
            state.loading = true;
        },
        logoutRequest: (state) => {
            state.loading = true;
        },
        authSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        },
        logoutSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.message = action.payload.message
        },
        authFailure: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.message = action.payload.message;
            state.error = action.payload;
        },
        logoutFailure: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.message = action.payload.message;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    authRequest,
    logoutRequest,
    authSuccess,
    logoutSuccess,
    authFailure,
    logoutFailure,
    clearErrors,
} = authSlice.actions;

export default authSlice.reducer;
