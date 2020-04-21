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

  renderPatientList() {
    let patientList = [];
    const patientData = this.state.patientData.slice();

    for (let i = 0; i < patientData.length; i++) {
      patientList.push(
        <Patient
          patientName={patientData[i].name}
          onClick={() => this.handleClick(patientData[i])}
          />
      )
    }

    return patientList;
  }

  handleClick(patient) {
    this.setState({
      centerPos: [patient.lat, patient.lng],
    })
  }

  render() {
    this.fetchPatientInfo();
    const patientList = this.renderPatientList();

    return (
      <div className='app-container'>
        <div className='patient-list'>
          <ul>
            {this.renderPatientList()}
          </ul>
        </div>
        {this.renderMap()}
      </div>
    )
  }
}

export default App;