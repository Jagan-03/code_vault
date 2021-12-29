import React from "react";
import Card from "../../Components/Card/Card";
import CollectionRow from "../Collections/CollectionRow/CollectionRow";
import { useSelector, useDispatch } from "react-redux";


import { getRecords } from "../../actions/records";

import "./records.css";

const Records = ({ gridView}) => {

    const [screenWidth, setScreenWidth] = React.useState(600);
    const [searchKey, setSearchKey] = React.useState("");

    const {records, loading} = useSelector(state => state.getRecords);
    const { user } = useSelector(state => state.getUser);
    
    const dispatch = useDispatch();

    React.useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.screen.width);
        });
        dispatch(getRecords(user?.username));
    }, [dispatch, user])

    const searchValue = (value) => {
      setSearchKey(value);
    }

  return (
    <div className="records" id="records">
       <div className="home_header_actions container p-2 px-4 ps-4 d-flex flex-wrap align-items-center justify-content-between bg-black">
        <div className="navbar_profile_search">
          <input type="text" className="form-control bg-dark text-light" placeholder="Search by title..." value={searchKey} onChange={(e) => searchValue(e.target.value)}/>
        </div>
      </div>
      <div className="container text-center">
        {
         records.length > 0 ?  
        
        gridView ? (
          <div className="row">
            {!loading && records.map((record) => {
              return (
                <div className="col-md-4 p-3" key={record.id}>
                  {
                    record.title.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 && <Card record={record} title={record.title} description={record.description} html={record.html} css={record.css} js={record.js} recordId={record.id}/>
                  }
                  
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
              record.title.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 && <CollectionRow record={record}/>
            ))}
          </>
        ) : <h1 className="display-1">No Records to display</h1>
      }
      </div>
    </div>
  );
};

export default Records;
