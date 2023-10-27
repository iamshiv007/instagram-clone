import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./reducers/user/authReducer";
import passwordReducer from "./reducers/user/passwordReducer";
import followUserReducer from "./reducers/user/followUserReducer";
import profileReducer from "./reducers/user/profileReducer";
import userDetailsReducer from "./reducers/user/userDetailsReducer";
import allUsersReducer from "./reducers/user/allUsersReducer";
import postCreationReducer from "./reducers/posts/postCreationReducer";
import followingPostsReducer from "./reducers/posts/followingPostsReducer";
import likePostReducer from "./reducers/posts/likePostReducer";
import newCommentReducer from "./reducers/posts/newCommentReducer";
import savePostReducer from "./reducers/posts/savePostReducer";
import deletePostReducer from "./reducers/posts/deletePostReducer";
import postDetailsReducer from "./reducers/posts/postDetailsReducer";
import allChatsReducer from "./reducers/chat/allChatsReducer";
import newChatReducer from "./reducers/chat/newChatReducer";
import allMessagesReducer from "./reducers/message/allMessagesReducer";
import newMessagereducer from "./reducers/message/newMessagereducer";

const rootReducer = combineReducers({
    auth: authReducer,
    password: passwordReducer,
    follow: followUserReducer,
    profile: profileReducer,
    userDetails: userDetailsReducer,
    users: allUsersReducer,
    newPost: postCreationReducer,
    posts: followingPostsReducer,
    likePost: likePostReducer,
    newComment: newCommentReducer,
    savePost: savePostReducer,
    deletePost: deletePostReducer,
    postDetails: postDetailsReducer,
    chats: allChatsReducer,
    newChat: newChatReducer,
    allMessages: allMessagesReducer,
    newMessage: newMessagereducer
})

export default rootReducer