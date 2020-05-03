import React from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends React.Component {
    prepDataLabels() {
        let dataPoints = [];

        for (let i = 0; i < this.props.days; i++) {
            dataPoints.push(i.toString());
        }

        return dataPoints;
    }

    prepChart() {
        const data = {
            labels: this.prepDataLabels(),
            datasets: [
                {
                    label: "Confirmed Cases",
                    backgroundColor: "rgba(255, 0, 255, 0.75)",
                    data: this.props.confirmedCases,
                },
                {
                    label: "Suspect Cases",
                    backgroundColor: "rgba(255, 255, 0, 0.75)",
                    data: this.props.suspectCases,
                },
                {
                    label: "Cured Cases",
                    backgroundColor: "rgba(0, 255, 255, 0.75)",
                    data: this.props.curedCases,
                },
            ]
        };

        return data;
    }

    prepOptions() {
        const options = {
            responsive: true,
        }

        return options;
    }

    render() {
        return (
            <div>
                <Line
                    options={this.prepOptions()}
                    data={this.prepChart()}
                />
            </div>
        )
    }
}

export default Chart;