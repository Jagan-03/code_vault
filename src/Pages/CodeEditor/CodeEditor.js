import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";

import "./codeEditor.css";
import Editor from "./Editor/Editor";
import { addRecord, getRecordById, updateRecord } from "../../actions/records";

const CodeEditor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {id} = useParams();
  
  React.useEffect(() => {
    dispatch(getRecordById(id));
  }, [dispatch, id]);
  
  const { record } = useSelector(state => state.getRecordById);

  const [html, setHtml] = React.useState("");
  const [css, setCss] = React.useState("");
  const [js, setJs] = React.useState("");
  const [srcDoc, setSrcDoc] = React.useState("");

  React.useEffect(() => {
    setHtml(record ? record.html : "");
    setCss(record ? record.css : "");
    setJs(record ? record.js : "");
  }, [record])

  React.useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(`
            <html>
                <body>${html}</body>
                <style>${css}</style>
                <script>${js}</script>
            </html>
        `);
    }, 250);
    
    return () => clearTimeout(timeOut);
  }, [html, css, js]);
  
  const handleSave = ({title, description}) => {
    const newRecord = {
      title : title,
      description : description,
      html : html,
      css : css,
      js : js,
      createdAt : record ? record.createdAt : (new Date()).toString(),
      lastUpdated : (new Date()).toString()
    }
    if(!record) dispatch(addRecord(newRecord));
    else dispatch(updateRecord(newRecord, id));
    dispatch({type : "EDIT_RECORD_REMOVE"});
    history.push("/records");
  } 

  

  const handleCancel = () => {
    if(window.confirm("All your unsaved data will be lost. Are you sure want to continue?")){
      dispatch({type : "EDIT_RECORD_REMOVE"});
      history.push("/records");
    }
  }

  return (
    <div className="codeEditor">
      <Navbar editorNav recordTitle={record?.title} recordDescription={record?.description} handleSave={handleSave} handleCancel={handleCancel}/>
      <div className="codeEditor_topPane d-flex">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="codeEditor_display">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameborder="0"
          width="100%"
          height="100%"
          className="bg-light codeEditor_iframe"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
