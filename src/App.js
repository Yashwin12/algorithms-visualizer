import React from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import LinearSearch from '../src/searchingVisualiser/LinearSearch'
import LandingPage from '../src/commonUtils/LandingPage'
import BinarySearch from '../src/searchingVisualiser/BinarySearch'


function App() {  
  return (
    <div className="App">
      <Router>
        <Switch> 
          <Route exact path = "/" component = {LandingPage} />
          <Route path = "/linear-search" component = {LinearSearch} />       
          <Route path = "/binary-search" component = {BinarySearch} />   
          <Route path="*" component = {LandingPage} />          
        </Switch>        
      </Router>      
    </div>
  );
}

export default App;
