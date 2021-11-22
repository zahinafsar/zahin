import React from 'react';
import SkillGraph from './skillGraph';

function WebSkills() {
    const chartData = {
        labels: ['Html&CSS', 'Javascript', 'React.js', 'Vue.js', 'Node.js/Express', 'Asp.Net Core', 'MongoDB', 'PostgreSQL'],
        datasets: [
            {
                label: 'Skills(%)',
                data: [
                    99,
                    99,
                    99,
                    99,
                    90,
                    90,
                    90,
                    90,
                    0
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)'
                ]
            }
        ]
    }
    return (
        <div>
            <SkillGraph chartData={chartData} />
        </div>
    );
}

export default WebSkills;