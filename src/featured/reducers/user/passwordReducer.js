import { createSlice } from "@reduxjs/toolkit";

const passwordSlice = createSlice({
    name: "password",
    initialState: {
        loading: false,
        error: null,
        isUpdate: false
    },
    reducers: {
        passwordRequest: (state) => {
            state.loading = true;
        },
        passwordSuccess: (state, action) => {
            state.loading = false;
            state.isUpdate = true;
        },
        passwordFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        passwordReset: (state, action) => {
            state.isUpdate = false
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
    passwordReset,
    clearErrors,
} = passwordSlice.actions;

export default passwordSlice.reducer;
