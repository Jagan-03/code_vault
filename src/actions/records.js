import request from "../api";

export const getRecords = () => async (dispatch) => {
    try {
        dispatch({type : "GET_RECORDS_REQUEST"});
        const { data } = await request("/records");
        dispatch({type : "GET_RECORDS_SUCCESS", payload : data})
    } catch (error) {
        dispatch({type : "GET_RECORDS_FAIL", payload : error})
        console.log(error);
    }
}

export const getRecordById = (id) => async (dispatch) => {
    try {
        dispatch({type : "EDIT_RECORD_REQUEST"});
        const { data } = await request(`/records/${id}`);
        dispatch({type : "EDIT_RECORD_SUCCESS", payload : data[0]})
    } catch (error) {
        console.log(error);
        dispatch({type : "EDIT_RECORD_FAIL", payload : error})
    }
}

export const addRecord = (newRecord) => async (dispatch) => {
    try {
        dispatch({type : "ADD_RECORDS_REQUEST"});
        await request.post("/records", newRecord);
        dispatch({type : "ADD_RECORDS_SUCCESS"});
    } catch (error) {
        dispatch({type : "ADD_RECORDS_FAIL", payload : error})
        console.log(error);
    }
}

export const updateRecord = (newRecord, id) => async (dispatch) => {
    try {
        dispatch({type : "UPDATE_RECORD_REQUEST"});
        await request.put("/records", {newRecord, id});
        dispatch({type : "UPDATE_RECORD_SUCCESS"});
    } catch (error) {
        dispatch({type : "UPDATE_RECORD_FAIL", payload : error})
        console.log(error);
    }
}

export const deleteRecord = (id) => async (dispatch) => {
    try {
        dispatch({type : "DELETE_RECORD_REQUEST"});
        await request.patch("/records", {id});
        dispatch({type : "DELETE_RECORD_SUCCESS"});
        dispatch(getRecords());
    } catch (error) {
        dispatch({type : "DELETE_RECORD_FAIL", payload : error})
        console.log(error);
    }
}