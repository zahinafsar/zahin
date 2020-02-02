import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

class Navbar extends Component {
	navtoogle = () =>{
	var i;
	var navbtn=document.querySelector('.Navbar');
	var key=document.querySelector('.key');
	var key2=document.querySelector('.key2');
			for (i = 0; i < navbtn.children.length; i++) {
			  navbtn.children[i].style.position = "relative";
			}
			key.style.display = "none";
			key2.style.display = "block";
	}
	navtoogle2 = () =>{
	var i;
	var navbtn=document.querySelector('.Navbar');
	var key=document.querySelector('.key');
	var key2=document.querySelector('.key2');
			for (i = 0; i < navbtn.children.length; i++) {
			  navbtn.children[i].style.position = "fixed";
			}
			key.style.display = "block";
			key2.style.display = "none";
	}
	render(){
  return (
    <div className="Navbar">
       <div className="key" onClick={this.navtoogle}><img alt="navimg"  src="./img/arrow.png" /></div>
       <div className="key2" onClick={this.navtoogle2}><img alt="navimg"  src="./img/arrow2.png" /></div>
       <div><Link className="link" to="/"><img alt="navimg"  src="./img/home.png" />Home</Link></div>
       <div><Link className="link" to="/about"><img alt="navimg"  src="./img/about.png" />About</Link></div>
       <div><Link className="link" to="/skills"><img alt="navimg"  src="./img/skill.png" />Skills</Link></div>
       <div><Link className="link" to="/project"><img alt="navimg"  src="./img/project.png" />Projects</Link></div>
       <div><Link className="link" to="/contact"><img alt="navimg"  src="./img/contacts.png" />Contact</Link></div>
    </div>
 );
}
}

export default Navbar;