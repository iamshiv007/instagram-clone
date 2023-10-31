import axios from "axios";
import { allMessagesFailure, allMessagesRequest, allMessagesSuccess } from "../reducers/message/allMessagesReducer";
import { newMessageFailure, newMessageRequest, newMessageSuccess } from "../reducers/message/newMessagereducer";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const getAllMessages = (chatId) => async (dispatch) => {
    dispatch(allMessagesRequest());

    try {
        const { data } = await axios.get(`${baseUrl}/api/messages/${chatId}`);

        dispatch(allMessagesSuccess(data));

    } catch (error) {
        dispatch(allMessagesFailure(error?.response?.data.message || error.message || "Something went wrong!"));
    }
};

export const addNewMessage = (messageData) => async (dispatch) => {
    dispatch(newMessageRequest());

    try {
        const { data } = await axios.post(`${baseUrl}/api/message/new`, messageData);

        dispatch(newMessageSuccess(data));

    } catch (error) {
        dispatch(newMessageFailure(error?.response?.data.message || error.message || "Something went wrong!"));
    }
};

