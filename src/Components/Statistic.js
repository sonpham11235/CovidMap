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

    }

    fetchWorldData() {

    }

    componentDidMount() {
        this.fetchVNData();
        this.fetchWorldData();
        
    }
}