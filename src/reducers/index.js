import { combineReducers } from "redux";

import { getRecords, getRecordById } from "./record";
import { getTrash } from "./trash";

export default combineReducers({getRecords, getRecordById, getTrash});
