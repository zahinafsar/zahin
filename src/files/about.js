import React from 'react';
import '../css/App.css';

function AbouttempInto(props) {
	return (
		<div>
			<div className="about-title">
				<img src="./img/title.png" alt="title-icon" />
				{props.title}
			</div>
			<div className="about-text">
				<img src="./img/tag.png" alt="title-icon" />
				{props.text}
			</div>
			<br />
		</div>
	);
}

function Abouttemp(props) {
	return (
		<div className={props.grid}>
			<div className="card-body text">
				<h1 className={props.h1Class}><div className={props.h1Icon}></div>{props.h1Title}</h1><hr />
				{props.children}
			</div>
		</div>
	);
}

const education = [
	{
		title: "B.Sc in CSE (2021 - 2025)",
		text: "Green University of Bangladesh"
	},
	{
		title: "Class Eleven to Twelve (Science):(2018 - 2020)",
		text: "Dania University College"
	},
	{
		title: "Class Nine to Ten (Science):(2016 - 2018)",
		text: "Barnomala Ideal School"
	},
	// {
	// 	title: "Class Seven to Eight:(2014 - 2016)",
	// 	text: "New Vision School and College"
	// },
	// {
	// 	title: "Class Six:(2014)",
	// 	text: "Mujahidnagar Ideal High School"
	// },
	// {
	// 	title: "Class Four to Five:(2012 - 2014)",
	// 	text: "Modinabag Gov. School"
	// },
	// {
	// 	title: "Play Group to Class three:(2008 - 2012)",
	// 	text: "Rajdhani primary School"
	// },
]
const about = [
	{
		title:"Name:",
		text:"Md. Zahin Afsar"
	},
	{
		title:"Father Name:",
		text:"Md Rezaul Haque"
	},
	{
		title:"Mother Name:",
		text:"Mst. Naharo Akter"
	},
	{
		title:"Age:",
		text:"20 years"
	},
	{
		title:"Nationality:",
		text:"Bangladeshi"
	},
	{
		title:"Religion:",
		text:"Islam"
	}
]

const About = () => {
	return (
		<div>
			<div id="title"><img src="./img/title-image/about.png" alt="skill-icon" /></div>
			<div id="card-deck-about" className="card-deck row">
				<Abouttemp
					grid="card col-lg-3 col-xs-12"
					h1Class="about-h1"
					h1Icon="fas fa-info-circle"
					h1Title="Info">
					{
						about.map(elm => (
							<AbouttempInto
								title={elm.title}
								text={elm.text}
							/>
						))
					}
				</Abouttemp>

				<Abouttemp
					grid="card col-lg-9 col-xs-12"
					h1Class="about-h1"
					h1Icon="fas fa-info-circle"
					h1Title="Education"
				>
					{
						education.map(elm => (
							<AbouttempInto
								title={elm.title}
								text={elm.text}
							/>
						))
					}

				</Abouttemp>

			</div>
		</div>

	)
}

export default About;
