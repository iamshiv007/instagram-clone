import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        loading: false,
        isUpdated: false,
        error: null,
    },
    reducers: {
        updateProfileRequest: (state) => {
            state.loading = true;
        },
        updateProfileSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updateProfileFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateProfileReset: (state) => {
            state.isUpdated = false;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailure,
    updateProfileReset,
    clearErrors,
} = profileSlice.actions;

export default profileSlice.reducer;
