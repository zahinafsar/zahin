import React from 'react';
import '../../css/App.css';
import WebSkills from './WebSkill';
import GraphicSkills from './GraphicSkill';

const SkillsDesktop = () => {
    return (
        <div id="SkillBox">
            <div className="card-body">
                <center><h1>Web Developmant Skills</h1></center><hr /><br />
                <div className="graph">
                    <WebSkills />
                </div>
                <br />
                <br />
                <center><h1>Graphics Design Skills</h1></center><hr /><br />
                <div className="graph">
                    <GraphicSkills />
                </div>
            </div>
        </div>
    )
}

export default SkillsDesktop;
