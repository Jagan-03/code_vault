import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from "react-router-dom";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import CodeEditor from "./Pages/CodeEditor/CodeEditor";
import Collections from "./Pages/Collections/Collections";
import Deleted from "./Pages/Deleted/Deleted";
import Home from "./Pages/Home/Home";
import Records from "./Pages/Records/Records";

function App() {
  
      const [open, setOpen] = React.useState(false);
      const [gridView, setGridView] = React.useState(true);

      const handleRecordsView = (data) => {
        setGridView(data);
      }
  const Layout = ({children, open, handleRecordsView, gridView}) => {

    return (
      <div className="layout">
        <Navbar />
        {/* <Sidebar open={open}/> */}
        <Home open={open} gridView={gridView} handleRecordsView={handleRecordsView}/>
        {children}
      </div>
    )
  }

  const [records, setRecords] = React.useState([]);

  const addRecord = (newRecord) => {
    let previousRecords = [...records]; 
    
    setRecords([...records, newRecord]);
  }

  return (
    <div className="app">
      <Router>
        <Switch>
        <Route path="/deleted">
            <Layout handleRecordsView={handleRecordsView} open={open} gridView={gridView}>
              <Deleted gridView={gridView}/>
            </Layout>
          </Route>
        <Route path="/collections">
            <Layout handleRecordsView={handleRecordsView} open={open} gridView={gridView}>
              <Collections gridView={gridView} />
            </Layout>
          </Route>
          <Route path="/records">
            <Layout handleRecordsView={handleRecordsView} open={open} gridView={gridView}>
              <Records records={records} gridView={gridView}/>
            </Layout>
          </Route>
          <Route path="/create">
            <CodeEditor addRecord={addRecord}/>
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
