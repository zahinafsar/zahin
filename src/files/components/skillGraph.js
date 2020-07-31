import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class SkillGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.chartData,
            height: 30
        }
    };
    componentWillMount() {
        if (window.innerWidth < '760') {
            this.setState({
                height: 60
            })
        }
        if (window.innerWidth < '450') {
            this.setState({
                height: 100
            })
        }
    }
    render() {
        return (
            <div className="chart">
                <Bar
                    data={this.state.chartData}
                    width={100}
                    height={this.state.height}
                    options={{
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        }
                    }}
                />
            </div>
        )
    }
}

export default SkillGraph;