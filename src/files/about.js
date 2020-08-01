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

					<AbouttempInto
						title="Name:"
						text="Md. Zahin Afsar"
					/>

					<AbouttempInto
						title="Father Name:"
						text="Md Rezaul Haque"
					/>

					<AbouttempInto
						title="Mother Name:"
						text="Mst. Naharo Akter"
					/>

					<AbouttempInto
						title="Age:"
						text="18 years"
					/>

					<AbouttempInto
						title="Nationality:"
						text="Bangladeshi"
					/>

					<AbouttempInto
						title="Religion:"
						text="Islam"
					/>

				</Abouttemp>

				<Abouttemp
					grid="card col-lg-9 col-xs-12"
					h1Class="about-h1"
					h1Icon="fas fa-info-circle"
					h1Title="Education"
				>

					<AbouttempInto
						title="Play Group to Class three:(2008 - 2012)"
						text="Rajdhani primary School"
					/>

					<AbouttempInto
						title="Class Four to Five:(2012 - 2014)"
						text="Modinabag Gov. School"
					/>

					<AbouttempInto
						title="Class Six:(2014)"
						text="Mujahidnagar Ideal High School"
					/>

					<AbouttempInto
						title="Class Seven to Eight:(2014 - 2016)"
						text="New Vision School and College"
					/>

					<AbouttempInto
						title="Class Nine to Ten:(2016 - 2018)"
						text="Barnomala Ideal School"
					/>

					<AbouttempInto
						title="Class Eleven to Twelve:(2018 - 2020)"
						text="Dania University College"
					/>

				</Abouttemp>

			</div>
		</div>

	)
}

export default About;
