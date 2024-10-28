// Layout.js
import React from 'react';
import { Sidebar } from "react-pro-sidebar";

const Layout = ({ children, updateLoggedInState, setIsLoggedIn }) => {
  return (
    <>
      <Sidebar>
        {children}
      </Sidebar>
    </>
  );
};

export default Layout;