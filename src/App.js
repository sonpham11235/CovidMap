import React from 'react';
import './App.css';
import { render } from 'react-dom'
import { Map, TileLayer } from 'react-leaflet'
import PatientMarkers from './Components/PatientMarker'
import Patient from './Components/Patient'
import Slider from 'react-rangeslider'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        patientData: [],
        centerPos: [10.776530, 106.700981],
        currentPatient: null,
        progress: 100,
    };
  }

  fetchPatientInfo() {
    fetch('/list')
      .then(res => res.json())
      .then(json => this.setState({patientData: json.data.sort((a,b) => a.verifyDate > b.verifyDate)}));
  }

  renderMap() {
    const map = (
      <Map center={this.state.centerPos} zoom={13} className='item1'>
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
      currentPatient: patient,
    })
  }

  renderCurrentPatient() {
    const patient = this.state.currentPatient;

    if (this.state.currentPatient != null) {
      return (
        <div>
          <b>Tên: </b> {patient.name} <br/>
          <b>Địa chỉ: </b> {patient.address} <br/>
          <b>Ngày phát hiện: </b> {patient.verifyDate} <br/>
          <b>Ghi chú: </b> {patient.note} <br/>
        </div>
      )
    } else {
      return (
        <div>
          <b>Tên: </b> <span> </span> <br/>
          <b>Địa chỉ: </b> <span> </span> <br/>
          <b>Ngày phát hiện: </b> <span> </span> <br/>
          <b>Ghi chú: </b> <span> </span> <br/>
        </div>
      )
    }
  }

  handleOnChange = (percentage) => {
    this.setState({
      progress: percentage
    })
  }

  render() {
    this.fetchPatientInfo();

    return (
      <div className='grid-container'>
        {this.renderMap()}
        <div className='item2'>
          {this.renderCurrentPatient()}
        </div>
        <div className='item3'>
          <ul>
            {this.renderPatientList()}
          </ul>
        </div>
        <div className='item4'>
          white
        </div>
        <div className='item5'>
          <Slider
            value = {this.state.progress}
            orientation = "horizontal"
            onChange = {this.handleOnChange}
          />
        </div>
      </div>
    )
  }
}

export default App;