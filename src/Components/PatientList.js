import React from 'react';
import Marker from './Marker';

class PatientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: [{
                lattitude: Number,
                longtitude: Number,
                name: String,
                address: String,
                comfirmDate: Date,
                description: String,
            }]
        };
    }

    renderMarker(i) {
        return (
            <Marker
                lattitude = {this.state.patients[i].lattitude}
                longtitude = {this.state.patients[i].longtitude}
                name = {this.state.patients[i].name}
                address = {this.state.patients[i].address}
                comfirmDate = {this.state.patients[i].comfirmDate}
                description = {this.state.patients[i].description}
            />
        );
    }
}

export default PatientList;