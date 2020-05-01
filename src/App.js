import React from 'react';
import './App.css';
import PatientMap from './Components/PatientMap';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  render() {
    return(
      <PatientMap/>
    )
  }
}

export default App;