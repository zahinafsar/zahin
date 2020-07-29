import React,{ useEffect,useState } from 'react';
import './css/App.css';
import Navbar from 'create-react-nav/nav/navSnack'
import Foot from './files/components/footer';
import Home from './files/home';
import Skills from './files/skills';
import About from './files/about';
import Contact from './files/contact';
import Project from './files/project';


const App =()=> {
    const [loader,setLoader] = useState("loader")
    
    useEffect(()=>{
        const load = setTimeout(() => {
          setLoader("loaderhide");
        }, 2000);
        return () => clearTimeout(load);
    },[])
    
    const links = [
        ["/","Home",Home],
        ["/about","About",About],
        ["/skills","Skills",Skills],
        ["/project","Projects",Project],
        ["/contact","Contact",Contact]
      ]

  return (
    <div>
      <div id={loader} className="hidden">
        <img src="./img/loader.svg" alt="Loading..." />
      </div>
       <div id="home">
          <img src="./img/zahin.jpg" alt="zahin" />
          <h1  className="typewriter" id="textanim" style={{textAlign: 'center'}}>Mahir Md. Zahin Afsar</h1><br />
       </div>
       <Navbar logoImg="/logo.png" routes={links}/>
       <Foot />
    </div>
 );
}

export default App;
