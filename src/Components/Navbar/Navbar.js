import React from "react";

import "./navbar.css";

import Avatar from "@mui/material/Avatar";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useSelector } from "react-redux";

const Navbar = ({editorNav, recordTitle, recordDescription, handleSave, handleCancel}) => {
  const [screenWidth, setScreenWidth] = React.useState(500);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.screen.width);
    });
  }, [screenWidth]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const history = useHistory();
  
  const [title, setTitle] = React.useState("");
  const [ description, setDescription] = React.useState("");
  const { user } = useSelector(state => state.getUser);
  
  React.useEffect(() => {
    setTitle(recordTitle);
    setDescription(recordDescription);
  }, [recordTitle, recordDescription])

  const addNewRecord = () => {
    history.push("/create");
  }

  return (
    <div className="navbar ps-3 px-3">
      <div className="navbar_logo d-flex align-items-center">
        {screenWidth <= 410 ? <></> : <h5 className="navbar_logo_home" onClick={() => history.push("/records")}>Code</h5>}
        {editorNav ? (
          <div className="d-flex flex-column ms-4 w-100">
          <input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border-0 record-info" placeholder="Title  🖉"/>
          <input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} className=" border-0 record-info" placeholder="description  🖉"/>
        </div>
        ) : (<></>)}
               
      </div>
      <div className="navbar_profile d-flex align-items-center justify-content-end">
        {editorNav ? (
          <div className="navbar_editRecord justify-content-end d-flex flex-wrap">
            <button className="btn btn-dark btn-sm mx-2" onClick={() => handleSave({title, description})}>Save</button>
            <button className="btn btn-outline-dark btn-sm" onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <div className="navbar_profile_new">
          <button
          onClick={addNewRecord}
            class="btn btn-sm btn-secondary"
          >
            New record
          </button>
          </div>
        )}
        {!editorNav && <>
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
              <i class="fas fa-user-alt"></i>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <Avatar alt={user?.attributes?.name} src={user?.attributes?.picture} />
              <h6 className="mt-2">{user?.attributes?.name}</h6>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => Auth.signOut()}>
            <div className="text-center w-100">
              Logout <i className="fas fa-sign-out-alt text-danger ms-2"></i>
            </div>
          </MenuItem>
        </Menu>
        </> }
        
      </div>
    </div>
  );
};

export default Navbar;
