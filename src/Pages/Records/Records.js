import React from "react";
import Card from "../../Components/Card/Card";
import CollectionRow from "../Collections/CollectionRow/CollectionRow";
import { useSelector, useDispatch } from "react-redux";
import RecordModal from "../../Components/RecordModal/RecordModal";

import { getRecords } from "../../actions/records";

import "./records.css";
import { useHistory } from "react-router-dom";

const Records = ({ gridView}) => {

    const [screenWidth, setScreenWidth] = React.useState(window.screen.width);
    const [searchKey, setSearchKey] = React.useState("");

    const {records, loading} = useSelector(state => state.getRecords);
    const { user } = useSelector(state => state.getUser);
    
    const dispatch = useDispatch();
    
    const history = useHistory();
  
    React.useEffect(() => {
      if(user === null) {
        history.push("/");
      } 
    }, [history, user])

    React.useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.screen.width);
        });
        dispatch(getRecords(user?.username));
    }, [dispatch, user])

    const searchValue = (value) => {
      setSearchKey(value);
    }

    const [openModal, setOpenModal] = React.useState(false);
    const [viewRecord, setViewRecord] = React.useState("");

    const toggleRecord = (data, record) => {
      setOpenModal(data);
      setViewRecord(record);
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
            {loading ? <>Loading...</>: records.map((record) => {
              return (
                record.title.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 && 
                <div className="col-md-4 p-3" key={record.id}>
                    <Card record={record} toggleRecord={toggleRecord} title={record.title} description={record.description} html={record.html} css={record.css} js={record.js} recordId={record.id}/>  
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
              record.title.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 && <CollectionRow toggleRecord={toggleRecord} record={record}/>
            ))}
          </>
        ) : <h1 className="display-1">No Records to display</h1>
      }
      </div>

      <RecordModal open={openModal} toggleRecord={toggleRecord} viewRecord={viewRecord}/>

    </div>
  );
};

export default Records;
