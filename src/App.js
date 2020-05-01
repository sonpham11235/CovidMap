import React from 'react';
import './App.css';
import PatientMap from './Components/PatientMap';
import Statistic from './Components/Statistic';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  render() {
    return(
      <Router>
        <Switch>
          <Route path="/map">
            <PatientMap />
          </Route>
          <Route path="/statistic">
            <Statistic />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;