import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import HowItWorks from '../../Pages/HowItWorks';
import MoreInfo from '../../Pages/MoreInfo';

const App = () => (
  <div className="App">
    <header className="App-header">
    <Router>
      <Switch>
        <Route path="/find-out-more/:claimID">
          <MoreInfo />
        </Route>
        <Route path="/">
          <HowItWorks />
        </Route>
      </Switch>
    </Router>
    </header>
  </div>
);


export default App;
