import { API, graphqlOperation } from "aws-amplify";
import React from "react";
import { useDispatch } from "react-redux";
import {removeFromTrash } from "../../../actions/trash";
import { createRecord } from "../../../graphql/mutations";

import "./collectionRow.css";
const CollectionRow = ({record, trash}) => {
  
  const dispatch = useDispatch();

  const restoreRecord = async () => {
    // dispatch(addRecord(record));
    try {
      delete record.updatedAt;
      await API.graphql(graphqlOperation(createRecord, { input : record }));
      dispatch(removeFromTrash(record.id, record.userId));
    } catch (error) {
      console.log(error);
    }
  }

  const deleteRecord = () => {
    dispatch(removeFromTrash(record.id, record.userId));
  }

  return <div className="collectionRow row mb-1 text-white-50 text-start">
    <div className="col-sm-6 collectionRow_title p-2">{record.title}</div>
    <div className="col-sm-3 collectionRow_updated p-2 text-center align-items-center d-flex justify-content-center">{trash ? <button className="btn btn-success btn-sm" onClick={restoreRecord}><i class="fas fa-recycle fa-2x"></i></button> : <p className="m-0 p-0 timestamps">{record.createdAt}</p>}</div>
    <div className="col-sm-3 collectionRow_updated p-2 text-center align-items-center d-flex justify-content-center">{trash ? <button className="btn btn-danger btn-sm" onClick={deleteRecord}><i class="far fa-trash-alt fa-2x"></i></button> : <p className="m-0 p-0 timestamps">{record.lastUpdated}</p>}</div>
  </div>;
};

export default CollectionRow;
