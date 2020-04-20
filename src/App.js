import React from 'react';
import './App.css';
import { render } from 'react-dom'
import { Map, TileLayer } from 'react-leaflet'
import PatientMarkers from './Components/PatientMarker'
import Patient from './Components/Patient'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        patientData: [],
        centerPos: [10.776530, 106.700981],
    };
  }

  fetchPatientInfo() {
    fetch("https://cors-anywhere.herokuapp.com/https://maps.vnpost.vn/apps/covid19/api/patientapi/list",
        {Headers: new Headers({
            'Origin': 'localhost:3000'
        })})
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    patientData: result.data,
                });
            },

            (error) => {
                console.log('Cannot retrieve data from server');
            }
        )
  }

  renderMap() {
    const map = (
      <Map center={this.state.centerPos} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <PatientMarkers
          patientData = {this.state.patientData}
        />
      </Map>
    );

    return map;
  }

  render() {
    this.fetchPatientInfo();
    const patientList = this.state.patientData.map(patient => {
      return (
        <Patient patientName={patient.name}/>
      );
    });

    return (
      <div class='app-container'>
        <div class='patient-list'>
          <ul>
            {patientList}
          </ul>
        </div>
        {this.renderMap()}
      </div>
    )
  }
}

export default App;