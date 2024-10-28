import publicRoutes from './routes/publicRoutes';
import privateRoutes from './routes/privateRoutes';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import React, { useState, useEffect } from "react";
// import Navbar from "./components/Navbar";
import { Navbar, Home, About } from './components/components';

import auth from "./utils/auth";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (auth.isLoggedIn()) {
      setIsLoggedIn(true);
    }
  }, [])

  const updateLoggedInState = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  };

  return (

         <>
     <Navbar updateLoggedInState={updateLoggedInState} setIsLoggedIn={setIsLoggedIn} />
      <div>
        <Routes>
          {publicRoutes}
         </Routes>
          <Sidebar>
            <Routes>
              {privateRoutes}
            </Routes>
          </Sidebar>
       
      </div>
      </>

  );
};

export default App;