import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout.jsx";
import Dashboard from "./views/dashboard.jsx";
import CrearUsuario from "./views/createUser.jsx";
import VerUsuario from "./views/listUser.jsx";
import CrearVehiculo from "./views/createVehicle.jsx";
import VerVehiculo from "./views/listVehicle.jsx";
import VerRuta from "./views/listRuta.jsx";
import CrearRuta from "./views/createRuta.jsx";

import { AuthProvider } from "./context/authContext.jsx";
import "./index.css";

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
    <AuthProvider>
      <Router>
        <Layout isLoggedIn={isLoggedIn} handleLogin={handleLogin}>
          <Routes>
            <Route path="/" />
            <Route path="/actusuarios/:id" element={<CrearUsuario />} />
            <Route path="/crearUsuario" element={<CrearUsuario />} />
            <Route path="/verUsuario" element={<VerUsuario />} />
            <Route path="/crearVehiculo" element={<CrearVehiculo />} />
            <Route path="/verVehiculo" element={<VerVehiculo />} />
            <Route path="/verRuta" element={<VerRuta />} />
            <Route path="/crearRuta" element={<CrearRuta />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
