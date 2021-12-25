export const getRecords = (records = {
    loading : false,
    records : []
}, action) => {
    switch (action.type) {
        case "GET_RECORDS_REQUEST" :
            return {...records, loading : true};
        case "GET_RECORDS_SUCCESS":
            return {...records, loading : false, records : action.payload};
        case "GET_RECORDS_FAIL":
            return {...records, loading : false, error : action.payload}   
        default : 
            return records;        
    }  
}

export const getRecordById = (record = {
    loading : false,
    record : null
}, action) => {
    switch (action.type) {
        case "EDIT_RECORD_REQUEST" :
            return {...record, loading : true};
        case "EDIT_RECORD_SUCCESS":
            return {...record, loading : false, record : action.payload};
        case "EDIT_RECORD_FAIL":
            return {...record, loading : false, error : action.payload} 
        case "EDIT_RECORD_REMOVE":
            return {...record, record : null}     
        default : 
            return record;        
    }  
}
