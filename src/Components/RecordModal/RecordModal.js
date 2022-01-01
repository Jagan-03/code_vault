import * as React from "react";
import Fade from '@mui/material/Fade';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useHistory } from "react-router-dom";
import { Controlled as ControlledEditor } from "react-codemirror2";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';



const RecordModal = ({open, toggleRecord, viewRecord}) => {
    
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
      };
      
  const history = useHistory();

      const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const editRecord = () => {
    history.push(`/create/${viewRecord?.id}`);
  }

  return (
    <div className="record_modal">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => toggleRecord(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} >
<Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={<i class="fab fa-html5 fa-2x text-primary"></i>} {...a11yProps(0)} />
          <Tab label={<i class="fab fa-css3-alt fa-2x text-danger"></i>} {...a11yProps(1)} />
          <Tab label={<i class="fab fa-js-square fa-2x text-warning"></i>} {...a11yProps(2)} />
          <button className="btn btn-link ms-3" onClick={editRecord}><i className="fas fa-edit text-dark"> EDIT </i></button>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <ControlledEditor 
          value={viewRecord?.html}
          className="editor_controlledEditor"
          options={{
              lineWrapping: true,
              lint: true,
              mode: "xml",
              theme: "material",
              lineNumbers: true
          }}
      />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <ControlledEditor 
          value={viewRecord?.css}
          className="editor_controlledEditor"
          options={{
              lineWrapping: true,
              lint: true,
              mode: "css",
              theme: "material",
              lineNumbers: true
          }}
      />
      </TabPanel>
      <TabPanel value={value} index={2}>
      <ControlledEditor 
          value={viewRecord?.js}
          className="editor_controlledEditor"
          options={{
              lineWrapping: true,
              lint: true,
              mode: "javascript",
              theme: "material",
              lineNumbers: true
          }}
      />
      </TabPanel>
    </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default RecordModal;
