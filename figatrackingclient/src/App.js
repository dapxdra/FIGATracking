import logo from "./logo.svg";
import "./App.css";

import React from "react";

const App = () => {
  const googleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div>
      <h1>Login OAuth con Google</h1>
      <button onClick={googleLogin}>Login con Google</button>
    </div>
  );
};

export default App;

/* import React, { useEffect } from 'react';

const GoogleLogin = () => {
  useEffect(() => {
    window.location.href = "http://localhost:3000/auth/google";
  }, []);

  return <div>Logging in...</div>;
};

export default GoogleLogin; */
