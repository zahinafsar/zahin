import React from 'react';
import '../css/App.css';


const Contact = () => {
	const contact = [
		{
			href: "https://www.facebook.com/m.zahin.afsar",
			src: "https://img.icons8.com/dusk/128/000000/facebook-new.png"
		},
		{
			href: "https://www.instagram.com/zahinafsar/",
			src: "https://img.icons8.com/cotton/128/000000/instagram-new.png"
		},
		{
			href: "https://twitter.com/ZahinAfsar",
			src: "https://img.icons8.com/dusk/128/000000/twitter-circled.png"
		},
		{
			href: "https://github.com/zahinafsar",
			src: "https://img.icons8.com/bubbles/128/000000/github.png"
		},
		{
			href: "tel:+8801787849609",
			src: "https://img.icons8.com/dusk/128/000000/phone.png"
		},
		{
			href: "https://api.whatsapp.com/send?phone: 8801787849609",
			src: "https://img.icons8.com/dusk/128/000000/whatsapp.png"
		},
	]
	return (
		<div>
			<div id="title">
				<div data-aos="zoom-out-down"><img alt="img" src="./img/title-image/gmap.png" /></div>
				<center><h1>Location To Google map</h1></center><hr /><br />
			</div>

			<div className="mapouter">
				<div className="gmap_canvas">
					<iframe title="gmap" width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=madinabag%20jame&t=&z=19&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
					</iframe>
				</div>
			</div>


			<div id="title">
				<div data-aos="zoom-out-down"><img alt="img" src="./img/title-image/socials.png" /></div>
				<center><h1>Contact With Me On</h1></center>
				<hr /><br />
			</div>

			<div className="card-deck " id="cont">
				{
					contact.map(elm => (
						<div className="card">
							<a target="_blank" rel="noopener noreferrer" href={elm.href}><img alt="img" src={elm.src} /></a>
						</div>
					))
				}
			</div>
		</div>
	)
}

export default Contact;
