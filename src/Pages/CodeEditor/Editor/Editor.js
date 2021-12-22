import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";

import "./editor.css";

const Editor = ({displayName, language, value, onChange}) => {

    const handleChange = (editor, data, value) => {
        onChange(value);
    }

  return (
    <div className="editor w-100">
      <div className="editor_header text-light">
          {displayName}
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
