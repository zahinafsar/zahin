import React from 'react';
import '../App.css';
const Home=()=>{
    return (
    	<div>
<div id="home">
      <img src="./img/zahin.jpg" alt="zahin" />
      <h1  className="typewriter" id="textanim" style={{textAlign: 'center'}}>Mahir Md. Zahin Afsar</h1><br />
      <h6 className="name" style={{textAlign: 'center'}}>My name is zahin.This is my parsonal website and made by myself.<br />Still i am a student.My aim is to be an engineer.<br />I like software as well as electronics.<br />You can get enough information about me from this site.</h6><br /><br /><br />
</div>
<div className="card-deck-me">
<div className="card-deck">
  <div className="card">
    <img alt="navimg"  src="./img/about.png" />
    <div className="card-body">
      <p className="card-text">Here is written all about me.You will find a complete CV here.</p>
    </div>
  </div>
  <div className="card">
    <img alt="navimg"  src="./img/skill.png" />
    <div className="card-body">
      <p className="card-text">My skills are located here so that you can consider about my ability.</p>
    </div>
  </div>
  <div className="card">
    <img alt="navimg"  src="./img/project.png" />
    <div className="card-body">
      <p className="card-text">You will find all my projects from here.It will help you to inspect me.</p>
    </div>
  </div>
  <div className="card">
    <img alt="navimg"  src="./img/contacts.png" />
    <div className="card-body">
      <p className="card-text">Contact with me.Get social link and contact with me</p>
    </div>
  </div>
</div>
</div>
       </div>
    	);
}

export default Home;