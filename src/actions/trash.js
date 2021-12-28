import { API, graphqlOperation } from "aws-amplify";
import { createTrash, deleteTrash } from "../graphql/mutations";
import { listTrashes } from "../graphql/queries";
import { deleteRecords } from "./records";

export const getTrash = (username) => async (dispatch) => {
    try {
        dispatch({type : "GET_TRASH_REQUEST"});
        let {
            data: {
              listTrashes: { items },
            },
          } = await API.graphql({query : listTrashes, variables : { filter : { userId : { eq : username } }}});
          if(username) dispatch({ type: "GET_TRASH_SUCCESS", payload: items });
    } catch (error) {
        dispatch({type : "GET_TRASH_FAIL", payload : error})
        console.log(error);
    }
}

export const addToTrash = (newRecord) => async (dispatch) => {
    try {
        dispatch({type : "ADD_TO_TRASH_REQUEST"});
        delete newRecord.updatedAt;
        await API.graphql(graphqlOperation(createTrash, { input : newRecord }));
        dispatch(deleteRecords(newRecord.id, newRecord.userId));
        dispatch({type : "ADD_TO_TRASH_SUCCESS"});
    } catch (error) {
        dispatch({type : "ADD_TO_TRASH_FAIL", payload : error})
        console.log(error);
    }
}

export const removeFromTrash = (id, userId) => async (dispatch) => {
    try {
        dispatch({type : "REMOVE_TRASH_REQUEST"});
        await API.graphql({ query: deleteTrash, variables: {input: { id : id }}});
        dispatch(getTrash(userId));
        dispatch({type : "REMOVE_TRASH_SUCCESS"});
    } catch (error) {
        dispatch({type : "REMOVE_TRASH_FAIL", payload : error})
        console.log(error);
    }
}