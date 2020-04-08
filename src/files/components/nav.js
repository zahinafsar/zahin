import React, {Component} from 'react';
import '../../css/App.css';
import '../../css/nav.css';
import {Link} from 'react-router-dom';

class Navbar extends Component {
		state = {
			navKey : "key",
			navChild : "navtoggle",
			cover : ""
		}

	navtoogle=()=>{
		if(this.state.navKey === "key"){
			this.setState({
				navKey : "key2",
				navChild : "navtoggle2",
				cover : "cover"
			})
		}else{
			this.setState({
				navKey : "key",
				navChild : "navtoggle",
				cover : ""
			})
		}
	}
	render(){
  return (
  	<div>
    <div className="Navbar">
       <div className={this.state.navKey} onClick={this.navtoogle}><img alt="navimg"  src="./img/arrow.png" /></div>
       <div className={this.state.navChild} onClick={this.navtoogle} ><Link className="link" to="/"><img alt="navimg"  src="./img/home.png" />Home</Link></div>
       <div className={this.state.navChild} onClick={this.navtoogle} ><Link className="link" to="/about"><img alt="navimg"  src="./img/about.png" />About</Link></div>
       <div className={this.state.navChild} onClick={this.navtoogle} ><Link className="link" to="/skills"><img alt="navimg"  src="./img/skill.png" />Skills</Link></div>
       <div className={this.state.navChild} onClick={this.navtoogle} ><Link className="link" to="/project"><img alt="navimg"  src="./img/project.png" />Projects</Link></div>
       <div className={this.state.navChild} onClick={this.navtoogle} ><Link className="link" to="/contact"><img alt="navimg"  src="./img/contacts.png" />Contact</Link></div>
    </div>
    <div className={this.state.cover}></div>
    </div>
 );
}
}

export default Navbar;
