import React,{ useEffect,useState } from 'react';
import './css/App.css';
import Navbar from 'create-react-nav/nav/navSnack'
import Foot from './files/components/footer';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './files/home';
import Skills from './files/skills';
import About from './files/about';
import Contact from './files/contact';
import Project from './files/project';


const App =()=> {
    const [loader,setLoader] = useState("loader")
    
    useEffect(()=>{
        setLoader("loaderhide");
    },[])

  return (
  	<Router>
    <div>
       <Navbar logoImg="/logo.png" links={[
        ["/","Home"],
        ["/about","About"],
        ["/skills","Skills"],
        ["/project","Projects"],
        ["/contact","Contact"]
      ]}/>
      <div id={loader} className="hidden">
        <img src="./img/loader.svg" alt="Loading..." />
      </div>
       <div id="home">
          <img src="./img/zahin.jpg" alt="zahin" />
          <h1  className="typewriter" id="textanim" style={{textAlign: 'center'}}>Mahir Md. Zahin Afsar</h1><br />
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
