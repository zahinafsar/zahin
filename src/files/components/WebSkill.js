import React, { Component } from 'react';
import SkillGraph from './skillGraph';

class WebSkills extends Component {
    constructor() {
        super();
        this.state = {
            chartData: {}
        }
    }

    componentWillMount() {
        this.getChartData();
    }

    getChartData() {
        this.setState({
            chartData: {
                labels: ['Html&CSS', 'Javascript', 'Node.js', 'React.js', 'Vue.js', 'MongoDB', 'MySql', 'C#', 'DotNet Core 3.0'],
                datasets: [
                    {
                        label: 'Skills(%)',
                        data: [
                            99,
                            99,
                            90,
                            95,
                            95,
                            95,
                            90,
                            59,
                            59
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)'
                        ]
                    }
                ]
            }
        });
    }

    render() {
        return (
            <div>
                <SkillGraph chartData={this.state.chartData} />
            </div>
        );
    }
}

export default WebSkills;