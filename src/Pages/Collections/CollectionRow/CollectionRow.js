import React from "react";
import { useDispatch } from "react-redux";
import { addRecord } from "../../../actions/records";
import {removeFromTrash } from "../../../actions/trash";

import "./collectionRow.css";
const CollectionRow = ({record, trash}) => {
  
  const dispatch = useDispatch();

  const restoreRecord = () => {
    dispatch(addRecord(record));
    dispatch(removeFromTrash(record._id));
  }

  const deleteRecord = () => {
    dispatch(removeFromTrash(record._id));
  }

  return <div className="collectionRow row mb-1 text-white-50 text-start">
    <div className="col-sm-6 collectionRow_title p-2">{record.title}</div>
    <div className="col-sm-3 collectionRow_updated p-2 text-center align-items-center d-flex justify-content-center">{trash ? <button className="btn btn-danger btn-sm" onClick={restoreRecord}><i class="fas fa-recycle fa-2x"></i></button> : record.createdAt}</div>
    <div className="col-sm-3 collectionRow_updated p-2 text-center align-items-center d-flex justify-content-center">{trash ? <button className="btn btn-danger btn-sm" onClick={deleteRecord}><i class="far fa-trash-alt fa-2x"></i></button> : record.lastUpdated}</div>
  </div>;
};

export default CollectionRow;
