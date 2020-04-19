import React from 'react';
import {Marker, Popup} from 'react-leaflet';

class PatientMarkers extends React.Component {
    renderMarker(i) {
        const position = [this.props.patientData[i].lat, this.props.patientData[i].lng];

        return (
            <Marker position={position}>
                <Popup>
                    <b>Tên: </b> {this.props.patientData[i].name} <br/>
                    <b>Địa chỉ: </b> {this.props.patientData[i].address} <br/>
                    <b>Ngày phát hiện: </b> {this.props.patientData[i].verifyDate} <br/>
                    <b>Ghi chú: </b> {this.props.patientData[i].note} <br/>
                </Popup>
            </Marker>
        );
    }

    renderAllMarkers() {
        let markers = [];
        const patientData = this.props.patientData;

        for (let i = 0; i < patientData.length; i++) {
            markers.push(this.renderMarker(i));
        }

        return markers;
    }

    render() {
        return(
            <div>
                {this.renderAllMarkers()}
            </div>
        )
    }
}

export default PatientMarkers;