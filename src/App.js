import React,{ Component } from 'react';
import './css/App.css';
import Navbar from 'create-react-nav/nav/navSnack'
import Foot from './files/components/footer';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './files/home';
import Skills from './files/skills';
import About from './files/about';
import Contact from './files/contact';
import Project from './files/project';
import Button from 'react-bootstrap/Button'

class App extends Component {
    state = {
      loader: "loader"
    }

  load=()=>{
    setTimeout(() => {
    this.setState({
        loader: "loaderhide"
      })
    }, 1000);
  }
  render(){

  return (
  	<Router>
    <div onLoad={this.load}>
       <Navbar logoImg="/logo.png" links={[
        ["/","Home"],
        ["/about","About"],
        ["/skills","Skills"],
        ["/project","Projects"],
        ["/contact","Contact"]
      ]}/>
      <div id={this.state.loader} className="hidden">
        <img src="./img/loader.svg" alt="Loading..." />
      </div>
       <div id="home">
          <img src="./img/zahin.jpg" alt="zahin" />
          <h1  className="typewriter" id="textanim" style={{textAlign: 'center'}}>Mahir Md. Zahin Afsar</h1><br />
          <h6 className="name" style={{textAlign: 'center'}}>My name is zahin.This is my personal website and made by myself.<br />Still i am a student.My aim is to be an engineer.<br />I like software as well as electronics.<br />You can get enough information about me from this site.</h6><br />
       </div>
          <h1 style={{textAlign: 'center'}}>Hire Me From</h1><hr/>
       <div className="z-btn-group">
        <Button variant="outline-success"><a href="https://www.upwork.com/o/profiles/users/~0117488527450dd94e/">Upwork</a></Button>
        <Button variant="outline-info"><a href="https://www.freelancer.com/u/zahinafsar">Frelancer</a></Button>
        <Button variant="outline-dark"><a href="#footer">Here</a></Button>
      </div><br />
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
}

export default App;
