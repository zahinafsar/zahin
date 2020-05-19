import React from 'react';
import '../css/App.css';
import Button from 'react-bootstrap/Button'

function HomeTemp(props){
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
       <h6 className="name" style={{textAlign: 'center'}}>My name is zahin.This is my personal website and made by myself.<br />Still i am a student.My aim is to be an engineer.<br />I like software as well as electronics.<br />You can get enough information about me from this site.</h6><br />
        <h1 style={{textAlign: 'center'}}>Hire Me From</h1><hr/>
       <div className="z-btn-group">
        <Button variant="outline-success"><a href="https://www.upwork.com/o/profiles/users/~0117488527450dd94e/">Upwork</a></Button>
        <Button variant="outline-info"><a href="https://www.freelancer.com/u/zahinafsar">Frelancer</a></Button>
        <Button variant="outline-dark"><a href="#footer">Here</a></Button>
       </div><br />
<div className="card-deck">
  <HomeTemp link="./img/about.png" text="Here is written all about me.You will find a complete CV here."/>
  <HomeTemp link="./img/skill.png" text="My skills are located here so that you can consider about my ability."/>
  <HomeTemp link="./img/project.png" text="You will find all my projects from here.It will help you to inspect me."/>
  <HomeTemp link="./img/contacts.png" text="Get all the social links and contact with me."/>
</div>
</div>
 );
}

export default Home;
