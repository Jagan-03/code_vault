import React from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { getRecords } from "./actions/records";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import CodeEditor from "./Pages/CodeEditor/CodeEditor";
import Deleted from "./Pages/Deleted/Deleted";
import Home from "./Pages/Home/Home";
import Records from "./Pages/Records/Records";
import AuthScreen from "./Pages/Auth/Auth";
import { getUser } from "./actions/user";

function App() {
  const [gridView, setGridView] = React.useState(true);

  const handleRecordsView = (data) => {
    setGridView(data);
  };
  

  const Layout = ({ children, handleRecordsView, gridView }) => {
    return (
      <div className="layout">
        <Navbar />
        {/* <Sidebar open={open}/> */}
        <Home gridView={gridView} handleRecordsView={handleRecordsView} />
        {children}
      </div>
    );
  };

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getRecords());
    dispatch(getUser());
  }, [dispatch]);


  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/deleted">
            <Layout handleRecordsView={handleRecordsView} gridView={gridView}>
              <Deleted gridView={gridView} />
            </Layout>
          </Route>
          <Route path="/records">
            <Layout handleRecordsView={handleRecordsView} gridView={gridView}>
              <Records gridView={gridView} />
            </Layout>
          </Route>
          <Route path="/create/:id">
            <CodeEditor />
          </Route>
          <Route path="/view/:id">
            <CodeEditor />
          </Route>
          <Route path="/create">
            <CodeEditor />
          </Route>
          <Route path="/">
            <AuthScreen />
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
