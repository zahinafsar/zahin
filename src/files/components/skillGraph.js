import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

function SkillGraph(props) {
    const [height, setheight] = useState(30)
    // useEffect(() => {
    //     if (window.innerWidth < '760') {
    //         setheight(60)
    //     }
    //     if (window.innerWidth < '450') {
    //         setheight(100)
    //     }
    // }, [])
    return (
        <div className="chart">
            <Bar
                data={props.chartData}
                width={100}
                height={height}
                options={{
                    legend: {
                        display: props.displayLegend,
                        position: props.legendPosition
                    }
                }}
            />
        </div>
    )
}

export default SkillGraph;