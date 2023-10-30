import { createSlice } from "@reduxjs/toolkit";

const followingPostsSlice = createSlice({
    name: "followingPosts",
    initialState: {
        loading: false,
        posts: [],
        totalPosts: 0,
        error: null,
    },
    reducers: {
        postFollowingRequest: (state) => {
            state.loading = true;
        },
        postFollowingSuccess: (state, action) => {
            state.loading = false;
            state.posts = [...state.posts, ...action.payload.posts];
            state.totalPosts = action.payload.totalPosts;
        },
        postFollowingReset: (state) => {
            state.posts = [];
            state.totalPosts = 0;
        },
        postFollowingFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    postFollowingRequest,
    postFollowingSuccess,
    postFollowingReset,
    postFollowingFailure,
    clearErrors,
} = followingPostsSlice.actions;

export default followingPostsSlice.reducer;
