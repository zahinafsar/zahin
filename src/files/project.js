import React, { useState, useEffect } from 'react';
import '../css/App.css';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'


function Project(props) {
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

const Projects = () => {
	const [info, setInfo] = useState([""]);

	useEffect(() => {
		axios.get('https://api.github.com/users/Mdzahin/repos').then((res) => setInfo(res.data))
	}, [])

	return (
		<div>
			<div id="title">
				<div><img src="./img/title-image/project.png" alt="img" /></div>
				<center><h1>All My Projects</h1></center><br />
				<center><h6>Not Much Experianced</h6></center>
				<hr /><br />
			</div>

			<div className="card-deck" id="pro">

				<Project
					title="Ubuntu Store (Under Development)"
					text="This is a online app store to install free softwares for linux."
					link="http://ubuntu-store.netlify.app/"
				/>

				<Project
					title="Create-React-Nav"
					text="This is a React ui library for creating react navigation bar easily"
					link="https://www.npmjs.com/package/create-react-nav"
				/>

				<Project
					title="Dania Science Club"
					text="This was made for our Science Club. We have used html, css, javascript for the front-end and node.js + mongoDB as the back-end."
					link="https://daniasc.team/"
				/>

			</div><br />
			<div id="SkillBox">
				<div><img src="./img/title-image/github-repo.png" alt="img" /></div>
				<center><h1>All My Github Repositories</h1></center><br />
				<br />
			</div>
			<ListGroup>
				{info.map((a) => (
					<ListGroup.Item style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>{a.name} <Button variant="outline-primary"><a href={a.svn_url}>Link</a></Button></ListGroup.Item>
				))}
			</ListGroup>

		</div>
	)
}

export default Projects;
