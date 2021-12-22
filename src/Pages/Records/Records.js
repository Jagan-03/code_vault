import React from "react";
import Card from "../../Components/Card/Card";
import CollectionRow from "../Collections/CollectionRow/CollectionRow";

import "./records.css";

const Records = ({ records, gridView }) => {


    const [screenWidth, setScreenWidth] = React.useState(600);

    React.useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.screen.width);
        })
    }, [records])

  return (
    <div className="records" id="records">
      <div className="container">
        {gridView ? (
          <div className="row">
            {records?.map((record, index) => {
              return (
                <div className="col-md-4 p-3" key={index}>
                  <Card title={record.title} description={record.description} srcDoc={record.srcDoc} index={index}/>
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
              <CollectionRow title={record.title} createdAt={record.createdAt}/>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Records;
