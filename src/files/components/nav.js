import React from 'react';
import Navbar from "create-react-nav/nav/navSnack"  

const Menubar=()=>{
  return (
   <Navbar links={[
      ["/","Home"],
      ["/about","About"],
      ["/skills","Skills"],
      ["/project","Projects"],
      ["/contact","Contact"]
    ]}/>
}
}

export default Navbar;
