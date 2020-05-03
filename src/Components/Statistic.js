import React from 'react'
import NavButton from './NavButton'
import Chart from './Chart'

class Statistic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vnData: [],
            worldData: [],
            active: false,
        }
    }

    fetchVNData() {
        fetch('https://cors-anywhere.herokuapp.com/https://td.fpt.ai/corona/corona-chart-vn.json')
          .then(res => res.json())
          .then(json => {
            this.setState({
              patientData: json
            });
        });
    }

    fetchWorldData() {
        fetch('https://cors-anywhere.herokuapp.com/https://td.fpt.ai/corona/corona-total.json')
          .then(res => res.json())
          .then(json => {
            this.setState({
              worldData: json
            });
        });
    }

    prepareVNData() {
      let Data = [];

      for (let i = 0; i < this.state.vnData.length; i++) {
        Data.push(this.state.vnData[i][0]);
      }

      return Data;
    }

    componentDidMount() {
        this.fetchVNData();
        this.fetchWorldData();
    }

    render() {
        return(
          <div className="statistic-container">
              <NavButton />
              {/* <div>
                <Chart data={this.prepareVNData()}/>
              </div> */}
          </div>
        )
    }
}

export default Statistic;