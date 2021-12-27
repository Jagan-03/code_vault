import { CardContent, Typography } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Link from '@mui/material/Link';


import "./card.css";
import { useHistory } from "react-router-dom";
import { addToTrash } from "../../actions/trash";
import { useDispatch } from "react-redux";

const Card = ({record, title, description, html, css, js, recordId}) => {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const [srcDoc, setSrcDoc] = React.useState("")

  React.useEffect(() =>{
    setSrcDoc(`
            <html>
                <body>${html}</body>
                <style>${css}</style>
                <script>${js}</script>
            </html>
        `);
  }, [html, css, js])

  const editRecord = () => {
    history.push(`/create/${recordId}`);
  }
  const moveToTrash = () => {
    dispatch(addToTrash(record));
  }

  return (
    <div className="card">
      <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameborder="0"
          width="100%"
          height="100%"
          className="bg-white codeEditor_iframe"
        />
      <CardContent className="card_details">
        <div className="card_details_info d-flex align-items-center justify-content-between">
          <Typography variant="h6" color="text.secondary" className="m-0 p-0">
            {title}
          </Typography>
          <div class="dropup">
            <Link
            component="button"
            className="text-dark"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
          <MoreHorizIcon />
            </Link>
            <ul class="dropdown-menu">
              <li className="dropdown-item" onClick={editRecord}>
                Edit Record
              </li>
              <li className="dropdown-item" onClick={moveToTrash}>
                Delete Record
              </li>
            </ul>
          </div>
        </div>
        <div className="card_details_description">
          <Typography
            variant="body2"
            color="text.secondary"
            className="m-0 p-0"
          >
            {description}
          </Typography>
        </div>
      </CardContent>
    </div>
  );
};

export default Card;
