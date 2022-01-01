export const getUser = (user = {
    loading : false,
    user : ""
}, action) => {
    switch (action.type) {
        case "GET_USER_REQUEST" :
            return {...user, loading : true};
        case "GET_USER_SUCCESS":
            return {...user, loading : false, user : action.payload};
        case "GET_USER_FAIL":
            return {...user, loading : false, error : action.payload, user : null}   
        default : 
            return user;        
    }  
}