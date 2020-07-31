import React from 'react';
import '../css/App.css';


function Skillbar(props) {
	return (
		<div className="SkillBar">
			<div id={props.skillId}>
				<span className="Skill-Area ">{props.skill}</span>
				<span className="PercentText ">{props.level}</span>
			</div>
		</div>
	);
}

const SkillsMobile = () => {
	return (
		<div id="SkillBox">
			<center><h1>Web Developmant Skills</h1></center><hr /><br />

			<Skillbar skillId="Skill-HTML" skill="HTML" level="99%" />

			<Skillbar skillId="Skill-CSS" skill="CSS" level="99%" />

			<Skillbar skillId="Skill-JS" skill="Javascript" level="99%" />

			<Skillbar skillId="Skill-RJ" skill="React js" level="90%" />

			<Skillbar skillId="Skill-RJ" skill="Vue js" level="90%" />

			<Skillbar skillId="Skill-NJ" skill="Node.js" level="90%" />

			<Skillbar skillId="Skill-MDB" skill="MongoDB" level="90%" />

			<Skillbar skillId="Skill-MDB" skill="MySql" level="90%" />

			<br /><br />



			<center><h1>Graphics Design Skills</h1></center><hr /><br />

			<Skillbar skillId="Skill-CSS" skill="Photoshop" level="99%" />

			<Skillbar skillId="Skill-JS" skill="Illustrator" level="99%" />

			<Skillbar skillId="Skill-MDB" skill="Adobe After Effects" level="90%" />

			<Skillbar skillId="Skill-NJ" skill="Figma" level="90%" />

		</div>
	)
}

export default SkillsMobile;
