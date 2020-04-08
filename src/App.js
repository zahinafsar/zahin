import React,{ useState } from 'react';
import './css/App.css';
import Navbar from './files/components/nav';
import Foot from './files/components/footer';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './files/home';
import Skills from './files/skills';
import About from './files/about';
import Contact from './files/contact';
import Project from './files/project';

const App=()=>{
    const [state,setState] = useState("loader"). 

  load=()=>{
    setTimeout(() => {
    setState("loaderhide");
    }, 1000);
  }

  return (
  	<Router>
    <div onLoad={this.load}>
       <Menubar />

      <div id={state} className="hidden">
        <img src="./img/loader.svg" alt="Loading..." />
      </div>
       <div id="home">
          <img src="./img/zahin.jpg" alt="zahin" />
          <h1  className="typewriter" id="textanim" style={{textAlign: 'center'}}>Mahir Md. Zahin Afsar</h1><br />
          <h6 className="name" style={{textAlign: 'center'}}>My name is zahin.This is my personal website and made by myself.<br />Still i am a student.My aim is to be an engineer.<br />I like software as well as electronics.<br />You can get enough information about me from this site.</h6><br /><br /><br />
       </div>
       
       <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/skills" component={Skills}/>
          <Route path="/project" component={Project}/>
          <Route path="/about" component={About}/>
          <Route path="/contact" component={Contact}/>
       </Switch>


       <Foot />
    </div>
    </Router>
 );
}

export default App;
