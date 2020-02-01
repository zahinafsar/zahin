import React from 'react';
import './App.css';
import Navbar from './components/nav';
import Foot from './components/footer';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './components/home';
import Skills from './components/skills';
import About from './components/about';
import Contact from './components/contact';
import Project from './components/project';

const App=()=>{

  return (
  	<Router>
    <div>
       <Navbar />
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