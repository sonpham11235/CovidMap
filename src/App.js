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
        startDate: new Date(2019, 12, 8),
        currentDate: new Date(),
        targetDate: new Date(),
        isPlaying: false,
    };
  }

  fetchPatientInfo() {
    fetch('https://cors-anywhere.herokuapp.com/https://maps.vnpost.vn/apps/covid19/api/patientapi/list')
      .then(res => res.json())
      .then(json => {
        this.setState({
          patientData: json.data.sort((a,b) => (new Date(a.verifyDate).getTime()) > (new Date(b.verifyDate).getTime()))
        });
      });
  }

  renderMap() {
    let targetDate = this.percentageIntoDate(this.state.progress);

    const map = (
      <Map center={this.state.centerPos} zoom={13} className='item1'>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <PatientMarkers
          patientData = {this.state.patientData}
          targetDate = {targetDate}
        />
      </Map>
    );

    return map;
  }

  renderPatientList() {
    const patientData = this.state.patientData.slice();
    const percentage = this.state.progress;

    let patientList = [];
    let targetDate = this.percentageIntoDate(percentage);
    let verifyDate = new Date();

    for (let i = 0; i < patientData.length; i++) {
      verifyDate = new Date(patientData[i].verifyDate);

      if (verifyDate < targetDate) {
        patientList.push(
          <Patient
            patientName={patientData[i].name}
            onClick={() => this.handleClick(patientData[i])}
            />
        )
      }
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
    let date  = this.percentageIntoDate();

    this.setState({
      progress: percentage,
      targetDate: date,
    })
  }

  handlePlay = () => {
    console.log("play")

    this.setState({
      isPlaying: true,
      progress: 0,
    })
  }

  handlePause = () => {
    console.log("pause")
    this.setState({
      isPlaying: false,
    })
  }

  tick() {
    if (this.state.isPlaying) {
      this.setState({
        progress: this.state.progress + 1,
      })
    }

    if (this.state.progress >= 100) {
      this.setState({
        progress: 100,
        isPlaying: false,
      })
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  dateIntoPercentage = (date) => {
    let startDateInMS = this.state.startDate.getTime();
    let currentDateInMS = this.state.currentDate.getTime();

    let targetDateInMS = date.getTime();
    let percentage = ((targetDateInMS - startDateInMS) / (currentDateInMS - startDateInMS)) * 100;

    return percentage;
  }

  percentageIntoDate = (percentage) => {
    let startDateInMS = this.state.startDate.getTime();
    let currentDateInMS = this.state.currentDate.getTime();

    let inMS = ((percentage / 100) * (currentDateInMS - startDateInMS)) + startDateInMS;

    let result = new Date(inMS);
    return result;
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
          <button onClick={this.handlePlay}>
            Play
          </button>
          <button onClick={this.handlePause}>
            Pause
          </button>
        </div>
        <div className='item5'>
          <Slider
            min = {0}
            max = {100}
            value = {this.state.progress}
            tooltip = {false}
            orientation = "horizontal"
            onChange = {this.handleOnChange}
          />
        </div>
      </div>
    )
  }
}

export default App;