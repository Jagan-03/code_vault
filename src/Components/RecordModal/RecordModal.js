import * as React from "react";
import Fade from '@mui/material/Fade';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";

const RecordModal = ({open, handleClose}) => {
    

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      
  const history = useHistory();
      const createRecord = () => {
          history.push("/create", {title : "Hello", description : "Everyone"});
      }

  return (
    <div className="record_modal">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <button className="btn btn-outline-dark" onClick={createRecord}>Create</button>
            <button className="btn btn-dark" onClick={handleClose}>Cancel</button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default RecordModal;
