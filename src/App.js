import './App.css';
import React from "react"
import { Route } from "react-router-dom";
import Home from "./components/Home/Home"
//import Nav from "./components/Nav/Nav"
import CountryDetail from "./components/CountryDetail/CountryDetail";
import ActivityBox from './components/ActivityBox/ActivityBox';
import Landing from "./components/Landing/Landing"

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/countries" component={Home} />      
      <Route path="/country/:id" component={CountryDetail}/>
      <Route path="/activities/create" component={ActivityBox}/>      
    </div>
  );
}

export default App;
