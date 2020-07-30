import React from 'react';
import '../css/App.css';
import WebSkills from "./components/WebSkill"
import GraphicSkills from "./components/GraphicSkill"

const Skills = () => {
    return (
        <div id="SkillBox">
            <div><img src="https://img.icons8.com/dusk/512/000000/development-skill.png" alt="skill-icon" /></div>
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

export default Skills;
