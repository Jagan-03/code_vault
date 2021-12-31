import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";

import "./editor.css";

const Editor = ({displayName, language, value, onChange, expand, toggleEditor}) => {

    const handleChange = (editor, data, value) => {
        onChange(value);
    }

  return (
    <div className={`editor ${expand ? "editorExpand" : "editorCollapse"}`}>
      <div className="editor_header text-light d-flex align-items-center justify-content-between ps-2 pt-1 pb-1">
          <button className="btn btn-sm p-1" onClick={() => toggleEditor(displayName)}>{displayName === "HTML" ? <i class="fab fa-html5 fa-2x text-primary"></i> : displayName === "CSS" ? <i class="fab fa-css3-alt fa-2x text-danger"></i> : <i class="fab fa-js-square fa-2x text-warning"></i>}</button>
      </div>
      <ControlledEditor 
          onBeforeChange={handleChange}
          value={value}
          className="editor_controlledEditor"
          options={{
              lineWrapping: true,
              lint: true,
              mode: language,
              theme: "material",
              lineNumbers: true
          }}
      />
    </div>
  );
};

export default Editor;
