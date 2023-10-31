import axios from "axios";
import { allChatsFailure, allChatsRequest, allChatsSuccess } from "../reducers/chat/allChatsReducer";
import { newChatFailure, newChatRequest, newChatSuccess } from "../reducers/chat/newChatReducer";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const getAllChats = () => async (dispatch) => {
    dispatch(allChatsRequest());

    try {
        const { data } = await axios.get(`${baseUrl}/api/chat/my`);

        dispatch(allChatsSuccess(data));

    } catch (error) {
        dispatch(allChatsFailure(error?.response?.data.message || error.message || "Something went wrong!"));
    }
};

const addNewChat = (userId) => async (dispatch) => {
    dispatch(newChatRequest());

    try {
        const { data } = await axios.post(`${baseUrl}/api/chat/new`, { receiverId: userId });

        dispatch(newChatSuccess(data));

    } catch (error) {
        dispatch(newChatFailure(error?.response?.data.message || error.message || "Something went wrong!"));
    }
};
export { getAllChats, addNewChat }