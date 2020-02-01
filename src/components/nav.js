import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

const Navbar=()=>{

  return (
    <div className="Navbar">
       <div><Link className="link" to="/"><img alt="navimg"  src="./img/home.png" />Home</Link></div>
       <div><Link className="link" to="/about"><img alt="navimg"  src="./img/about.png" />About</Link></div>
       <div><Link className="link" to="/skills"><img alt="navimg"  src="./img/skill.png" />Skills</Link></div>
       <div><Link className="link" to="/project"><img alt="navimg"  src="./img/project.png" />Projects</Link></div>
       <div><Link className="link" to="/contact"><img alt="navimg"  src="./img/contacts.png" />Contact</Link></div>
    </div>
 );
}

export default Navbar;