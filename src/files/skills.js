import React from 'react';
import '../css/App.css';


function Skillbar(props){
	return (
	<div className="SkillBar">
    <div id={props.skillId}> 
      <span className="Skill-Area ">{props.skill}</span>
      <span className="PercentText ">{props.level}</span>
    </div>
  </div>
      );
}

const Skills=()=>{
    return (
<div id="SkillBox">
<div><img src="https://img.icons8.com/dusk/512/000000/development-skill.png" alt="skill-icon" /></div>
<center><h1>Web Developmant Skills</h1></center><hr/><br/>

	<Skillbar skillId="Skill-HTML" skill="HTML" level="99%" />

	<Skillbar skillId="Skill-CSS" skill="CSS" level="99%" />

	<Skillbar skillId="Skill-JS" skill="Javascript" level="99%" />

	<Skillbar skillId="Skill-RJ" skill="React js" level="90%" />

	<Skillbar skillId="Skill-NJ" skill="Node.js" level="90%" />

	<Skillbar skillId="Skill-MDB" skill="MongoDB" level="90%" />

<br/><br/>



<center><h1>Graphics Design Skills</h1></center><hr/><br/>

	<Skillbar skillId="Skill-photo" skill="Photoshop" level="90%" />

	<Skillbar skillId="Skill-illust" skill="Illustrator" level="90%" />

	<Skillbar skillId="Skill-after" skill="Adobe After Effects" level="70%" />
</div>
    	)
}

export default Skills;
