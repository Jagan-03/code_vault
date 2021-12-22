import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

import "./codeEditor.css";
import Editor from "./Editor/Editor";

const CodeEditor = ({addRecord}) => {
  const [html, setHtml] = React.useState("");
  const [css, setCss] = React.useState("");
  const [js, setJs] = React.useState("");
  const [srcDoc, setSrcDoc] = React.useState("");

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
      srcDoc : srcDoc,
      createdAt : new Date(),
    }
    addRecord(newRecord);
  } 

  
  const history = useHistory();

  const handleCancel = () => {
    if(window.confirm("All your unsaved data will be lost. Are you sure want to continue?")){
      history.push("/records");
    }
  }

  return (
    <div className="codeEditor">
      <Navbar editorNav handleSave={handleSave} handleCancel={handleCancel}/>
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
