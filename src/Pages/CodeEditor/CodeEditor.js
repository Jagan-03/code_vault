import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import "./codeEditor.css";
import Editor from "./Editor/Editor";
import { getRecordById } from "../../actions/records";
import { API, graphqlOperation } from "aws-amplify";
import { createRecord, updateRecord } from "../../graphql/mutations";

const CodeEditor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {id} = useParams();
  
  React.useEffect(() => {
    dispatch(getRecordById(id));
  }, [dispatch, id]);
  
  const { record } = useSelector(state => state.getRecordById);
  const { user } = useSelector(state => state.getUser);

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
  
  const handleSave = async ({title, description}) => {
    const newRecord = {
      userId : user.username,
      title : title,
      description : description,
      html : html,
      css : css,
      js : js,
      createdAt : record ? record.createdAt : (new Date()).toString(),
      lastUpdated : (new Date()).toString()
    }
    // if(!record) dispatch(addRecord(newRecord));
    // else dispatch(updateRecord(newRecord, id));
    try {
      if(!record) {
        await API.graphql(graphqlOperation(createRecord, { input : newRecord }));
      } else {
        await API.graphql({ query: updateRecord, variables: {input: { id : id, ...newRecord}}});
      }
      history.push("/records");
      dispatch({type : "EDIT_RECORD_REMOVE"});
    } catch (error) {
      console.log(error);
    }
  } 

  

  const handleCancel = () => {
    if(window.confirm("All your unsaved data will be lost. Are you sure want to continue?")){
      dispatch({type : "EDIT_RECORD_REMOVE"});
      history.push("/records");
    }
  }
  const [screenWidth, setScreenWidth] = React.useState(700);

  const [htmlExpand, setHtmlExpand] = React.useState(true);
  const [cssExpand, setCssExpand] = React.useState(true);
  const [jsExpand, setJsExpand] = React.useState(true);
  

  React.useEffect(() => {
    window.addEventListener("resize", () => {
        setScreenWidth(window.screen.width);
    });
}, [])

React.useEffect(() => {
  if(screenWidth < 700) {
    setHtmlExpand(true);
    setCssExpand(false);
    setJsExpand(false);
  }
}, [screenWidth])

  const toggleEditor = (name) => {
    if(screenWidth < 700) {
      if(name === "HTML") {
        setHtmlExpand(true);
        setCssExpand(false);
        setJsExpand(false);
      } else if(name === "CSS") {
        setHtmlExpand(false);
        setCssExpand(true);
        setJsExpand(false);
      } else {
        setHtmlExpand(false);
        setCssExpand(false);
        setJsExpand(true);
      } 
    } else {
      if(name === "HTML") {
        if(!cssExpand && !jsExpand) setHtmlExpand(true);
        else setHtmlExpand(!htmlExpand);
      } else if(name === "CSS") {
        if(!htmlExpand && !jsExpand) setCssExpand(true);
        else setCssExpand(!cssExpand);
      } else {
        if(!htmlExpand && !cssExpand) setJsExpand(true);
        else setJsExpand(!jsExpand);
      } 
    }
  }

  React.useEffect(() => {
    $("#codeEditor_iframe").contents().find("body").css("word-wrap", "break-word");
  }, [])

  return (
    <div className="codeEditor">
      <Navbar editorNav recordTitle={record?.title} recordDescription={record?.description} handleSave={handleSave} handleCancel={handleCancel}/>
      <div className="codeEditor_topPane d-flex">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
          expand={htmlExpand}
          toggleEditor={toggleEditor}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
          expand={cssExpand}
          toggleEditor={toggleEditor}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
          expand={jsExpand}
          toggleEditor={toggleEditor}
        />
      </div>
      <div className="codeEditor_display">
        <iframe
          id="codeEditor_iframe"
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
          className="bg-light codeEditor_iframe"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
