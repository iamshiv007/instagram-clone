import axios from "axios"
import { deletePostFailure, deletePostRequest, deletePostSuccess } from "../reducers/posts/deletePostReducer";
import { postFollowingFailure, postFollowingRequest, postFollowingSuccess } from "../reducers/posts/followingPostsReducer";
import { likeUnlikePostRequest, likeUnlikePostSuccess } from "../reducers/posts/likePostReducer";
import { newCommentFailure, newCommentRequest, newCommentSuccess } from "../reducers/posts/newCommentReducer";
import { newPostFailure, newPostRequest, newPostSuccess } from "../reducers/posts/postCreationReducer";
import { postDetailsFailure, postDetailsRequest, postDetailsSuccess } from "../reducers/posts/postDetailsReducer";
import { saveUnsavePostFailure, saveUnsavePostRequest, saveUnsavePostSuccess } from "../reducers/posts/savePostReducer";

export const addNewPost = (postData) => async (dispatch) => {
  dispatch(newPostRequest());

  try {
    const { data } = await axios.post("/api/post/new", postData);

    dispatch(newPostSuccess(data));
  } catch (error) {
    dispatch(newPostFailure(error?.response?.data.message ||
      error.message ||
      "Something went wrong !"));
  }
};

export const getPostsOfFollowing = (page = 1) => async (dispatch) => {
  dispatch(postFollowingRequest());

  try {
    const { data } = await axios.get(`/api/post/following?page=${page}`);
    dispatch(postFollowingSuccess(data));
  } catch (error) {
    dispatch(postFollowingFailure(error?.response?.data.message ||
      error.message ||
      "Something went wrong !"));
  }
};

export const likePost = (postId) => async (dispatch) => {
  dispatch(likeUnlikePostRequest());

  try {
    const { data } = await axios.get(`/api/post/lke/${postId}`);
    dispatch(likeUnlikePostSuccess(data));
  } catch (error) {
    dispatch(likeUnlikePostSuccess(error?.response?.data.message ||
      error.message ||
      "Something went wrong !"));
  }
};

export const addComment = (postId, comment) => async (dispatch) => {
  dispatch(newCommentRequest());

  try {
    const { data } = await axios.post(`/api/post/comment/new/${postId}`, { comment });

    dispatch(newCommentSuccess(data));
  } catch (error) {
    dispatch(newCommentFailure(error?.response?.data.message ||
      error.message ||
      "Something went wrong !"));
  }
};

export const savePost = (postId) => async (dispatch) => {
  dispatch(saveUnsavePostRequest());

  try {
    const { data } = await axios.post(`/api/post/save/${postId}`);
    dispatch(saveUnsavePostSuccess(data));
  } catch (error) {
    dispatch(saveUnsavePostFailure(error?.response?.data.message ||
      error.message ||
      "Something went wrong !"));
  }
};

export const deletePost = (postId) => async (dispatch) => {
  dispatch(deletePostRequest());

  try {
    const { data } = await axios.delete(`/api/post/${postId}`);
    dispatch(deletePostSuccess(data));
  } catch (error) {
    dispatch(deletePostFailure(error?.response?.data.message ||
      error.message ||
      "Something went wrong !"));
  }
};

export const getPostDetails = (postId) => async (dispatch) => {
  dispatch(postDetailsRequest());

  try {
    const { data } = await axios.get(`/api/post/detail/${postId}`);
    dispatch(postDetailsSuccess(data));
  } catch (error) {
    dispatch(postDetailsFailure(error?.response?.data.message ||
      error.message ||
      "Something went wrong !"));
  }
};
