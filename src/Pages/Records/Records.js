import React from "react";
import Card from "../../Components/Card/Card";
import CollectionRow from "../Collections/CollectionRow/CollectionRow";
import { useSelector, useDispatch } from "react-redux";

import { getRecords } from "../../actions/records";

import "./records.css";

const Records = ({ gridView }) => {

    const [screenWidth, setScreenWidth] = React.useState(600);

    const {records} = useSelector(state => state.getRecords);

    const dispatch = useDispatch();

    React.useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.screen.width);
        });
        dispatch(getRecords());
    }, [dispatch])



  return (
    <div className="records" id="records">
      <div className="container">
        {gridView ? (
          <div className="row">
            {records?.map((record, index) => {
              return (
                <div className="col-md-4 p-3" key={record._id}>
                  <Card record={record} title={record.title} description={record.description} html={record.html} css={record.css} js={record.js} recordId={record._id}/>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {screenWidth >= 576 ? (
              <div className="collectionRow_title row text-light">
                <div className="col-sm-6 p-2">Title</div>
                <div className="col-sm-3 p-2">Created at</div>
                <div className="col-sm-3 p-2">Last Updated</div>
              </div>
            ) : (
              <></>
            )}

            {records?.map((record) => (
              <CollectionRow record={record}/>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Records;
