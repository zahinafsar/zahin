import React from 'react';
import '../../css/App.css';


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

			<Skillbar skillId="Skill-99" skill="HTML" level="99%" />

			<Skillbar skillId="Skill-99" skill="CSS" level="99%" />

			<Skillbar skillId="Skill-99" skill="Javascript" level="99%" />

			<Skillbar skillId="Skill-99" skill="React js" level="90%" />

			<Skillbar skillId="Skill-99" skill="Vue js" level="90%" />

			<Skillbar skillId="Skill-90" skill="Node.js/Express" level="90%" />

			<Skillbar skillId="Skill-90" skill="MongoDB" level="90%" />

			<Skillbar skillId="Skill-90" skill="Asp.Net Core" level="90%" />

			<Skillbar skillId="Skill-90" skill="PostgreSQL" level="90%" />

			<br /><br />



			<center><h1>Graphics Design Skills</h1></center><hr /><br />

			<Skillbar skillId="Skill-99" skill="Photoshop" level="99%" />

			<Skillbar skillId="Skill-99" skill="Illustrator" level="99%" />

			<Skillbar skillId="Skill-90" skill="Adobe After Effects" level="90%" />

			<Skillbar skillId="Skill-90" skill="Figma" level="90%" />

		</div>
	)
}

export default SkillsMobile;
