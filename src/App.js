import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { getRecords } from "./actions/records";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import CodeEditor from "./Pages/CodeEditor/CodeEditor";
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

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getRecords());
  }, [dispatch])

  return (
    <div className="app">
      <Router>
        <Switch>
        <Route path="/deleted">
            <Layout handleRecordsView={handleRecordsView} open={open} gridView={gridView}>
              <Deleted gridView={gridView}/>
            </Layout>
          </Route>
          <Route path="/records">
            <Layout handleRecordsView={handleRecordsView} open={open} gridView={gridView}>
              <Records gridView={gridView}/>
            </Layout>
          </Route>
          <Route path="/create/:id">
            <CodeEditor />
          </Route>
          <Route path="/create">
            <CodeEditor />
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
