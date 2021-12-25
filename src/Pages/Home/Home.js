import React from "react";

import "./home.css";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Navbar from "../../Components/Navbar/Navbar";
import { Link, useHistory, useLocation } from "react-router-dom";
import RecordModal from "../../Components/RecordModal/RecordModal";

const Home = ({ open, gridView, handleRecordsView }) => {
  const { pathname } = useLocation();
  const path = pathname.replace("/", "");
  
  const [value, setValue] = React.useState(
    path === "records"
      ? "one"
      : path === "deleted"
      ? "two"
      : ""
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const history = useHistory();

  const addNewRecord = () => {
    history.push("/create");
  }

  return (
    <div className="home" id="main">
      <div className="home_header container">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab
            value="one"
            className="text-light"
            label="All Records"
            onClick={() => history.push("/records")}
          />
          <Tab
            value="two"
            className="text-light"
            label="Trash Bin"
            onClick={() => history.push("/deleted")}
          />
        </Tabs>
      </div>
      <div className="home_header_actions container p-2 px-4 ps-4 d-flex flex-wrap align-items-center justify-content-between bg-black">
        <div className="home_header_view">
          <span className="text-white-50">GRID</span>{" "}
          <button className={`btn btn-dark btn-sm ${gridView ? "" : "text-muted"}`} onClick={() => handleRecordsView(true)}>
            {" "}
            <i className="fas fa-th-large"></i>{" "}
          </button>{" "}
          <button className={`btn btn-dark btn-sm ${gridView ? "text-muted" : ""}`} onClick={() => handleRecordsView(false)}>
            <i className="fas fa-bars"></i>
          </button>{" "}
          <span className="text-white-50">LIST</span>
        </div>
        <div className="home_header_create">
        { path === "deleted" ? <></> :
          <button
          onClick={addNewRecord}
            class="btn btn-sm btn-secondary"
          >
            New record
          </button>
        }
        {/* <RecordModal open={modalOpen} handleClose={handleClose}/> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
