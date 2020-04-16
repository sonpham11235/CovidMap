import React from 'react';
import { Marker, Popup } from 'react-leaflet';

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

    
}