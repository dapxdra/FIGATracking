/* import logo from "./logo.svg";
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

export default App; */

// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout.jsx";
import Home from "./views/home.jsx";
import Dashboard from "./views/dashboard.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya está autenticado cuando la app carga
    fetch("http://localhost:5000/auth/status", {
      credentials: "include", // Permite incluir las cookies de sesión
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) {
          setIsLoggedIn(true);
        }
      });
  }, []);

  // Función para redirigir al login del backend
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google"; // URL del backend para iniciar sesión con Google
  };

  return (
    <Router>
      <Layout isLoggedIn={isLoggedIn} handleLogin={handleLogin}>
        <Routes>
          <Route exact path="/" component={Home} />
          <Route
            path="/dashboard"
            render={() => (isLoggedIn ? <Dashboard /> : <Navigate to="/" />)}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
