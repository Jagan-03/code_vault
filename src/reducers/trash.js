export const getTrash= (trash = {
    loading : false,
    trash : []
}, action) => {
    switch (action.type) {
        case "GET_TRASH_REQUEST" :
            return {...trash, loading : true};
        case "GET_TRASH_SUCCESS":
            return {...trash, loading : false, trash : action.payload};
        case "GET_TRASH_FAIL":
            return {...trash, loading : false, error : action.payload};   
        default : 
            return trash;        
    }  
}

