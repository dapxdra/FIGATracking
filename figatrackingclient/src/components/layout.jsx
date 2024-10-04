import React from "react";
import Menu from "./menu.jsx";
import Header from "./header.jsx";

const Layout = ({ isLoggedIn, handleLogin, children }) => {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
