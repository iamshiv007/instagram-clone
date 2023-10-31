import axios from 'axios';
import { authFailure, authRequest, authSuccess, logoutFailure, logoutRequest, logoutSuccess } from '../reducers/user/authReducer';
import { userDetailsFailure, userDetailsRequest, userDetailsSuccess } from '../reducers/user/userDetailsReducer';
import { allUsersFailure, allUsersRequest, allUsersSuccess } from '../reducers/user/allUsersReducer';
import { followUserFailure, followUserRequest, followUserSuccess } from '../reducers/user/followUserReducer';
import { passwordFailure, passwordRequest, passwordSuccess } from '../reducers/user/passwordReducer';
import { updateProfileFailure, updateProfileRequest, updateProfileSuccess } from '../reducers/user/profileReducer';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

// Login User
export const loginUser = (userId, password) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const { data } = await axios.post(`${baseUrl}/api/user/login`, { userId, password, });

    dispatch(authSuccess(data));

  } catch (error) {
    dispatch(authFailure(error?.response?.data.message || error.message || 'Something went wrong !'));
  }
};

// Register User
export const registerUser = (userData) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const { data } = await axios.post(`${baseUrl}/api/user/signup`, userData);

    dispatch(authSuccess(data));

  } catch (error) {
    dispatch(
      authFailure(error?.response?.data.message || error.message || 'Something went wrong !'));
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  dispatch(authRequest());

  try {
    const { data } = await axios.get(`${baseUrl}/api/user/me`);

    dispatch(authSuccess(data));

  } catch (error) {
    dispatch(
      authFailure(error?.response?.data.message || error.message || 'Something went wrong !'));
  }
};

// Logout User
export const logoutUser = () => async (dispatch) => {
  dispatch(logoutRequest());

  try {
    const { data } = await axios.get(`${baseUrl}/api/user/logout`);

    dispatch(logoutSuccess(data));

  } catch (error) {
    dispatch(
      logoutFailure(error?.response?.data.message || error.message || 'Something went wrong !'));
  }
};

// Get User Details
export const getUserDetails = (username) => async (dispatch) => {
  dispatch(userDetailsRequest());

  try {
    const { data } = await axios.get(`${baseUrl}/api/user/details/userName/${username}`);

    dispatch(userDetailsSuccess(data));

  } catch (error) {
    dispatch(
      userDetailsFailure(error?.response?.data.message || error.message || 'Something went wrong !'));
  }
};

// Get User Details By ID
export const getUserDetailsById = (userId) => async (dispatch) => {
  dispatch(userDetailsRequest());

  try {
    const { data } = await axios.get(`${baseUrl}/api/user/details/id/${userId}`);

    dispatch(userDetailsSuccess(data));

  } catch (error) {
    dispatch(userDetailsFailure(error?.response?.data.message || error.message || 'Something went wrong !'));
  }
};

// Get Suggested Users
export const getSuggestedUsers = () => async (dispatch) => {
  dispatch(allUsersRequest());

  try {
    const { data } = await axios.get(`${baseUrl}/api/user/suggested`);

    dispatch(allUsersSuccess(data));

  } catch (error) {
    dispatch(allUsersFailure(error?.response?.data.message || error.message || 'Something went wrong !'));
  }
};

// Follow | Unfollow User
export const followUser = (userId) => async (dispatch) => {
  dispatch(followUserRequest());
  try {
    const { data } = await axios.get(`${baseUrl}/api/user/follow/${userId}`);

    dispatch(followUserSuccess(data));

  } catch (error) {
    dispatch(
      followUserFailure(error?.response?.data.message || error.message || 'Something went wrong !'));
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  dispatch(passwordRequest());

  try {
    const { data } = await axios.post(`${baseUrl}/api/user/password/forgot`, { email });

    dispatch(passwordSuccess(data));
  } catch (error) {
    dispatch(passwordFailure(error?.response?.data.message || error.message || 'Something went wrong !'));
  }
};

// Reset Password
export const resetPassword = (token, password) => async (dispatch) => {
  dispatch(passwordRequest());

  try {
    const { data } = await axios.put(`${baseUrl}/api/user/password/reset/${token}`, { password });

    dispatch(passwordSuccess(data));

  } catch (error) {
    dispatch(passwordFailure(error?.response?.data.message || error.message || 'Something went wrong !'));
  }
};

// Update User Profile
export const updateProfile = (userData) => async (dispatch) => {
  dispatch(updateProfileRequest());

  try {
    const { data } = await axios.put(`${baseUrl}/api/user/update/profile`, userData);

    dispatch(updateProfileSuccess(data));

  } catch (error) {
    dispatch(updateProfileFailure(error?.response?.data.message || error.message || 'Something went wrong !'));
  }
};

// Update User Password
export const updatePassword = (passwords) => async (dispatch) => {
  dispatch(passwordRequest());

  try {
    const { data } = await axios.put(`${baseUrl}/api/user/update/password`, passwords);

    dispatch(passwordSuccess(data));

  } catch (error) {
    dispatch(passwordFailure(error?.response?.data.message || error.message || 'Something went wrong !'));
  }
};
