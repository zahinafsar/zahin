import React, { Component } from 'react';
import SkillGraph from './skillGraph';

class GraphicSkill extends Component {
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
                labels: ['Photoshop', 'Illustrator', 'Blender3D', 'Adobe After Effects', 'Figma'],
                datasets: [
                    {
                        label: 'Skills(%)',
                        data: [
                            99,
                            99,
                            79,
                            90,
                            95
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)'
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

export default GraphicSkill;