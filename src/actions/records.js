import request from "../api";
import { API, graphqlOperation } from "aws-amplify";
import { getRecord, listRecords } from "../graphql/queries";
import { deleteRecord } from "../graphql/mutations";

export const getRecords = (username) => async (dispatch) => {
  try {
    dispatch({ type: "GET_RECORDS_REQUEST" });
    // const { data } = await request("/records");
    let {
      data: {
        listRecords: { items },
      },
    } = await API.graphql({query : listRecords, variables : { filter : { userId : { eq : username } }}});
    if(username) dispatch({ type: "GET_RECORDS_SUCCESS", payload: items });
  } catch (error) {
    dispatch({ type: "GET_RECORDS_FAIL", payload: error });
    console.log(error);
  }
};

export const getRecordById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "EDIT_RECORD_REQUEST" });
    // const { data } = await request(`/records/${id}`);
    let data = await API.graphql(graphqlOperation(getRecord, { id : id }));
    dispatch({ type: "EDIT_RECORD_SUCCESS", payload: data.data.getRecord });
    // dispatch(getRecords());
  } catch (error) {
    console.log(error);
    dispatch({ type: "EDIT_RECORD_FAIL", payload: error });
  }
};

export const addRecord = (newRecord) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_RECORDS_REQUEST" });
    await request.post("/records", newRecord);
    dispatch({ type: "ADD_RECORDS_SUCCESS" });
  } catch (error) {
    dispatch({ type: "ADD_RECORDS_FAIL", payload: error });
    console.log(error);
  }
};

export const updateRecord = (newRecord, id) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_RECORD_REQUEST" });
    await request.put("/records", { newRecord, id });
    dispatch({ type: "UPDATE_RECORD_SUCCESS" });
  } catch (error) {
    dispatch({ type: "UPDATE_RECORD_FAIL", payload: error });
    console.log(error);
  }
};

export const deleteRecords = (id, userId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_RECORD_REQUEST" });
    // await request.patch("/records", { id });
    await API.graphql({ query: deleteRecord, variables: {input: { id : id }}});
    dispatch({ type: "DELETE_RECORD_SUCCESS" });
    dispatch(getRecords(userId));
  } catch (error) {
    dispatch({ type: "DELETE_RECORD_FAIL", payload: error });
    console.log(error);
  }
};
