import React from 'react';
import {Marker, Popup} from 'react-leaflet';

class PatientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patientData: [],
        };
    }

    renderMarker(i) {
        const position = [this.state.patientData[i].lat, this.state.patientData[i].lng];

        return (
            <Marker position={position}>
                <Popup>
                    <b>Tên: </b> {this.state.patientData[i].name} <br/>
                    <b>Địa chỉ: </b> {this.state.patientData[i].address} <br/>
                    <b>Ngày phát hiện: </b> {this.state.patientData[i].verifyDate} <br/>
                    <b>Ghi chú: </b> {this.state.patientData[i].note} <br/>
                </Popup>
            </Marker>
        );
    }

    renderAllMarkers() {
        let markers = [];
        const patientData = this.state.patientData;

        for (let i = 0; i < patientData.length; i++) {
            markers.push(this.renderMarker(i));
        }

        return markers;
    }

    getPatientInfo() {
        let myData = {};
        let request = new XMLHttpRequest();
        request.open('GET','https://cors-anywhere.herokuapp.com/https://maps.vnpost.vn/apps/covid19/api/patientapi/list');
        request.onload = () => {
            myData = JSON.parse(request.responseText);
        };
        request.send();

        this.setState({
            patientData: myData.data,
        });

        console.log(this.state.patientData);
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
                    console.log('an lon real');
                }
            )
    }

    render() {
        this.fetchPatientInfo();

        return(
            <div>
                {this.renderAllMarkers()}
            </div>
        )
    }
}

export default PatientList;