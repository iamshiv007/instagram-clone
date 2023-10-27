import { createSlice } from "@reduxjs/toolkit";

const passwordSlice = createSlice({
    name: "password",
    initialState: {
        message: null,
        loading: false,
        error: null,
    },
    reducers: {
        passwordRequest: (state) => {
            state.loading = true;
        },
        passwordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        passwordFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Clear errors
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    passwordRequest,
    passwordSuccess,
    passwordFailure,
    clearErrors,
} = passwordSlice.actions;

export default passwordSlice.reducer;
