
import { Auth } from "aws-amplify";

export const getUser = () => async (dispatch) => {
    try {
        dispatch({type : "GET_USER_REQUEST"});
        const user = await Auth.currentAuthenticatedUser();
        console.log(user);
        dispatch({type : "GET_USER_SUCCESS", payload : user});
    } catch (error) {
        dispatch({type : "GET_USER_FAIL", payload : error})
        console.log(error);
    }
}
