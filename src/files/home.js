import React from 'react';
import '../css/App.css';

function Temp(props){
    return (
    <div className="card">
      <img alt="navimg"  src={props.link} />
      <div className="card-body">
      <p className="card-text">{props.text}</p>
    </div>
    </div>
      );
}

const Home=()=>{
    return (
<div className="card-deck-me">

<div className="card-deck">
  <Temp link="./img/about.png" text="Here is written all about me.You will find a complete CV here."/>
  <Temp link="./img/skill.png" text="My skills are located here so that you can consider about my ability."/>
  <Temp link="./img/project.png" text="You will find all my projects from here.It will help you to inspect me."/>
  <Temp link="./img/contacts.png" text="Get all the social links and contact with me."/>
</div>

</div>
    	);
}

export default Home;