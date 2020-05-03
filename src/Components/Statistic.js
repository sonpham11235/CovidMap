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
            let vnData = this.state.vnData;
            let keys = Object.keys(json);

            for (let i = 0; i < keys.length; i++) {
              let day = Object.values(json)[i];
              vnData.push(day);
            }

            this.setState({
              vnData: vnData,
            });
        });
    }

    fetchWorldData() {
        fetch('https://cors-anywhere.herokuapp.com/https://td.fpt.ai/corona/corona-total.json')
          .then(res => res.json())
          .then(json => {
            let worldData = this.state.worldData;
            let keys = Object.keys(json);

            for (let i = 0; i < keys.length; i++) {
              let day = Object.values(json)[i];
              worldData.push(day);
            }

            this.setState({
              worldData: worldData,
            });
        });
    }

    prepareVNDataCC() {
      let confirmedCases = []
      const vnData = this.state.vnData;

      for (let i = 0; i < vnData.length; i++) {
        confirmedCases.push(vnData[i][0]);
      }

      return confirmedCases;
    }

    prepareVNDataSC() {
      let suspectCases = []
      const vnData = this.state.vnData;

      for (let i = 0; i < vnData.length; i++) {
        suspectCases.push(vnData[i][1]);
      }

      return suspectCases;
    }

    prepareVNDataCured() {
      let cured = []
      const vnData = this.state.vnData;

      for (let i = 0; i < vnData.length; i++) {
        cured.push(vnData[i][2]);
      }

      return cured;
    }

    prepareWorldDataCC() {
      let confirmedCases = []
      const vnData = this.state.vnData;

      for (let i = 0; i < vnData.length; i++) {
        confirmedCases.push(vnData[i][0]);
      }

      return confirmedCases;
    }

    prepareWorldDataSC() {
      let suspectCases = []
      const vnData = this.state.vnData;

      for (let i = 0; i < vnData.length; i++) {
        suspectCases.push(vnData[i][1]);
      }

      return suspectCases;
    }

    prepareWorldDataCured() {
      let cured = []
      const vnData = this.state.vnData;

      for (let i = 0; i < vnData.length; i++) {
        cured.push(vnData[i][2]);
      }

      return cured;
    }

    componentDidMount() {
        this.fetchVNData();
        this.fetchWorldData();
    }

    render() {
        return(
          <div className="statistic-container">
              <NavButton />
              <div>
                <Chart
                  days={this.state.vnData.length}
                  confirmedCases={this.prepareVNDataCC()}
                  suspectCases={this.prepareVNDataSC()}
                  curedCases={this.prepareVNDataCured()}
                />
              </div>
              <div>
                <Chart
                  days={this.state.worldData.length}
                  confirmedCases={this.prepareWorldDataCC()}
                  suspectCases={this.prepareWorldDataSC()}
                  curedCases={this.prepareWorldDataCured()}
                />
              </div>
          </div>
        )
    }
}

export default Statistic;