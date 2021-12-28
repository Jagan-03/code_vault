import { combineReducers } from "redux";

import { getRecords, getRecordById } from "./record";
import { getTrash } from "./trash";
import { getUser } from "./user";

export default combineReducers({getRecords, getRecordById, getTrash, getUser});
