import React from 'react';
import '../css/App.css';

function Project(props){
	return (
	<div className="card">
		<div className="card-body">
			<h5 className="card-title">{props.title}</h5>
			<p className="card-text">{props.text}</p>
			<a href={props.link} className="btn btn-primary">Visit Site</a>
		</div>
	</div>
      );
}

const Projects=()=>{
    return (
	<div>
			<div id="SkillBox">
				<div><img src="https://img.icons8.com/clouds/500/000000/blueprint.png" alt="img" /></div>
				<center><h1>All My Projects</h1></center><br/>
				<center><h6>Not Much Experianced</h6></center>
				<hr/><br/>
			</div>

		<div className="card-deck" id="pro">

			<Project 
			title="Barta App (Under Development)" 
			text="This is social networking site (made by Vue) where you can express your daily moments.You can customize your profile design with diamonds which you will have to buy"
			link=""
			/>

			<Project 
			title="Create-React-Nav" 
			text="This is a React ui library for creating react navigation bar easily"
			link="https://www.npmjs.com/package/create-react-nav"
			/>

			<Project 
			title="Dania cience Club" 
			text="Thats was made for our College Science Club.In-fact i am the Front-End developer and graphics designer of this site."
			link="https://daniasc.team/"
			/>

		</div>
	</div>
    	)
}

export default Projects;