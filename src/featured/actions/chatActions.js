import axios from "axios";
import { allChatsFailure, allChatsRequest, allChatsSuccess } from "../reducers/chat/allChatsReducer";
import { newChatFailure, newChatRequest, newChatSuccess } from "../reducers/chat/newChatReducer";


const fetchAllChats = () => async (dispatch) => {
    dispatch(allChatsRequest());

    try {
        const { data } = await axios.get("/api/chat/my");
        dispatch(allChatsSuccess(data));
    } catch (error) {
        dispatch(allChatsFailure(error?.response?.data.message || error.message || "Something went wrong!"));
    }
};

const addNewChat = (chatData) => async (dispatch) => {
    dispatch(newChatRequest());

    try {
        const { data } = await axios.post("/api/chat/new", chatData);
        dispatch(newChatSuccess(data));
    } catch (error) {
        dispatch(newChatFailure(error?.response?.data.message || error.message || "Something went wrong!"));
    }
};
export { fetchAllChats, addNewChat }