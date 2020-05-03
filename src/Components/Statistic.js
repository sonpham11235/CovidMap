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
            let vnData = [];
            let day = [];
            const keys = Object.keys(json);

            for (let i = 0; i < keys.length; i++) {
              day = Object.values(json)[i];
              vnData.push(day[0]);
              vnData.push(day[1]);
              vnData.push(day[2]);
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

        console.log(this.state.vnData);
    }

    render() {
        return(
          <div className="statistic-container">
              <NavButton />
              {/* <div>
                <Chart/>
              </div> */}
          </div>
        )
    }
}

export default Statistic;