import React from 'react';
import '../css/App.css';


const Contact=()=>{
    return (
    <div>
	<div id="SkillBox">
	<div data-aos="zoom-out-down"><img alt="img" src="https://img.icons8.com/clouds/500/000000/google-maps.png"/></div>
	<center><h1>Location To Google map</h1></center><hr/><br/>
	</div>

	<div className="mapouter">
		<div className="gmap_canvas">
		<iframe title="gmap" width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=madinabag%20jame&t=&z=19&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
		</iframe>
		</div>
	</div>


	<div id="SkillBox">
		<div data-aos="zoom-out-down"><img alt="img" src="https://img.icons8.com/clouds/500/000000/internet.png"/></div>
		<center><h1>Contact With Me On</h1></center>
		<hr/><br/>
	</div>

	<div className="card-deck " id="cont">
	  <div className="card">
	    <a href="https://www.facebook.com/m.zahin.afsar"><img alt="img" src="https://img.icons8.com/dusk/128/000000/facebook-new.png"/></a>
	  </div>
	  <div className="card" >
	    <a href="https://www.instagram.com/zahinafsar/"><img alt="img" src="https://img.icons8.com/cotton/128/000000/instagram-new.png"/></a>
	  </div>
	  <div className="card">
	    <a href="https://twitter.com/ZahinAfsar"><img alt="img" src="https://img.icons8.com/cool-color/128/000000/twitter.png"/></a>
	  </div>
	  <div className="card" >
	    <a href="https://github.com/mdzahin"><img alt="img" src="https://img.icons8.com/bubbles/128/000000/github.png"/></a>
	  </div>
	  <div className="card" data-aos="flip-left">
	    <a href="tel:+8801787849609"><img alt="img" src="https://img.icons8.com/dusk/128/000000/phone.png"/></a>
	  </div>
	  <div className="card" >
	    <a href="https://api.whatsapp.com/send?phone=8801787849609"><img alt="img" src="https://img.icons8.com/dusk/128/000000/whatsapp.png"/></a>
	  </div>
	</div>
	</div>
    	)
}

export default Contact;
