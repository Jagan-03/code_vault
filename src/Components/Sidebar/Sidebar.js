import React from "react";

import "./sidebar.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, useLocation, useParams } from "react-router-dom";


const Sidebar = () => {

  const [open, setOpen] = React.useState(false);

  const { pathname } = useLocation();

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById(pathname.replace("/", "")).style.marginLeft = "250px";
    setOpen(true);
  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "30px";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById(pathname.replace("/", "")).style.marginLeft = "0";
    setOpen(false);
  }

  return (
    <div className="sidebar">
      <div id="mySidenav" className="sidenav">
        <a className="closebtn">
          {open ? <ChevronLeftIcon onClick={closeNav}/> : <ChevronRightIcon onClick={openNav}/>}
        </a>
        <Link to="/records" className="d-flex align-items-center justify-content-center border">All Records</Link>
        <a href="#">Collections</a>
        <a href="#">Trash Bin</a>
      </div>
    </div>
  );
};

export default Sidebar;
