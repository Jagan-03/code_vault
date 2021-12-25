import request from "../api";
import { deleteRecord } from "./records";

export const getTrash = () => async (dispatch) => {
    try {
        dispatch({type : "GET_TRASH_REQUEST"});
        const { data } = await request("/trash");
        dispatch({type : "GET_TRASH_SUCCESS", payload : data})
    } catch (error) {
        dispatch({type : "GET_TRASH_FAIL", payload : error})
        console.log(error);
    }
}

export const addToTrash = (newRecord) => async (dispatch) => {
    try {
        dispatch({type : "ADD_TO_TRASH_REQUEST"});
        await request.post("/trash", newRecord);
        dispatch(deleteRecord(newRecord._id));
        dispatch({type : "ADD_TO_TRASH_SUCCESS"});
    } catch (error) {
        dispatch({type : "ADD_TO_TRASH_FAIL", payload : error})
        console.log(error);
    }
}

export const removeFromTrash = (id) => async (dispatch) => {
    try {
        dispatch({type : "REMOVE_TRASH_REQUEST"});
        await request.patch("/trash", {id});
        dispatch(getTrash());
        dispatch({type : "REMOVE_TRASH_SUCCESS"});
    } catch (error) {
        dispatch({type : "REMOVE_TRASH_FAIL", payload : error})
        console.log(error);
    }
}