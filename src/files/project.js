import React from 'react';
import '../css/App.css';

function Project(props){
	return (
	<div className="card">
		<img className="card-img-top" src="" alt="img" />
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
			title="Md. Rezaul Haque" 
			text="That was my first website made for my father.I have used HTML,CSS,JS(simple).This is not a profesional website so you may not get the link"
			link="http://rezaul.cf/"
			/>

			<Project 
			title="Space Shooter Game" 
			text="Thats was made for our College Science Club.In-fact i am the Front-End developer and graphics designer of this site."
			link="https://Mdzahin.github.io/games"
			/>

			<Project 
			title="Dania cience Club" 
			text="This is a game made by pure javascript.I think you will enjoy the game.
			This is also availabe as an android apk file."
			link="https://daniasc.team/"
			/>

		</div>
	</div>
    	)
}

export default Projects;