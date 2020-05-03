import React from 'react';

class Chart extends React.Component {
    prepDataPoints() {
        let dataPoints = [];

        for (let i = 0; i < this.props.data.length; i++) {
            dataPoints.push({
                x: i, y: this.props.data[i],
            })
        }

        return dataPoints;
    }

    prepChart() {
        const option = {
            animationEnabled: true,
			exportEnabled: true,
			theme: "light2",
			title: {
				text: "Viet Nam Covid Stats"
			},
			axisY: {
				title: "Confirmed Cases",
				suffix: "Cases"
			},
			axisX: {
				title: "Days",
				prefix: "Day",
				interval: 1
			},
			data: [{
				type: "line",
				dataPoints: this.prepDataPoints(),
			}]
        };

        return option;
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Chart;