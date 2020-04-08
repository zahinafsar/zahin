import React, {Component} from 'react';
import Navbar from "create-react-nav/nav/navSnack"  

class Navbar extends Component {
  render(){
  return (
   <Navbar links={[
      ["/","Home"],
      ["/about","About"],
      ["/skills","Skills"],
      ["/project","Projects"],
      ["/contact","Contact"]
    ]}/>
 );
}
}

export default Navbar;
