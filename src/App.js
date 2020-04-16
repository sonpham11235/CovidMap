import React from 'react';
import './App.css';
import { render } from 'react-dom'
import { Map, TileLayer } from 'react-leaflet'
import PatientList from './Components/PatientList';

class App extends React.Component {
  renderMap() {
    const position = [10.776530, 106.700981];
    const map = (
      <Map center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
      </Map>
    );

    return map;
  }

  render() {
    return this.renderMap();
  }
}

export default App;