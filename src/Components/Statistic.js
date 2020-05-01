import React from 'react'

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

    componentDidMount() {
        this.fetchVNData();
        this.fetchWorldData();
    }

    render() {
        return(
            <div className="statistic-container">
                <div className='item6'>
                  <button>
                    Covid Map
                  </button>
                  <button>
                    Covid Stats
                  </button>
                </div>
            </div>
        )
    }
}

export default Statistic;