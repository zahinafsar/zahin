import React, { useEffect, useState } from 'react';
import Navbar from 'create-react-nav/nav/navSnack'
import Home from './home';
import About from './about';


const App = () => {
  const links = [
    ["/", "Home", Home],
    ["/about", "About", About]
  ]

  return (
    <div>
      <Navbar logoTxt="hello" routes={links} />
    </div>
  );
}

export default App;
