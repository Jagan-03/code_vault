import React from "react";

import "./collectionRow.css";
const CollectionRow = ({title, createdAt}) => {
  return <div className="collectionRow row mb-1 text-white-50">
    <div className="col-sm-6 collectionRow_title p-2">{title}</div>
    <div className="col-sm-3 collectionRow_created p-2">{"createdAt"}</div>
    <div className="col-sm-3 collectionRow_updated p-2">He</div>
  </div>;
};

export default CollectionRow;
