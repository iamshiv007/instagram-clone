import axios from "axios";
import { allMessagesFailure, allMessagesRequest, allMessagesSuccess } from "../reducers/message/allMessagesReducer";
import { newMessageFailure, newMessageRequest, newMessageSuccess } from "../reducers/message/newMessagereducer";

export const fetchAllMessages = (chatId) => async (dispatch) => {
    dispatch(allMessagesRequest());

    try {
        const { data } = await axios.get(`/api/messages/${chatId}`);
        dispatch(allMessagesSuccess(data));
    } catch (error) {
        dispatch(allMessagesFailure(error?.response?.data.message || error.message || "Something went wrong!"));
    }
};

export const addNewMessage = (messageData) => async (dispatch) => {
    dispatch(newMessageRequest());

    try {
        const { data } = await axios.post("/api/message/new", messageData);
        dispatch(newMessageSuccess(data));
    } catch (error) {
        dispatch(newMessageFailure(error?.response?.data.message || error.message || "Something went wrong!"));
    }
};

