import React from "react";
import Menu from "./menu.jsx";

const Layout = ({ isLoggedIn, handleLogin, children }) => {
  return (
    <div>
      <Menu isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
