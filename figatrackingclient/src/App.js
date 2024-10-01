import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout.jsx";
import Home from "./views/home.jsx";
import Menu from "./components/menu.jsx";
import Dashboard from "./views/dashboard.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import CrearUsuario from "./components/crearUsuario.jsx";

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
            <Route exact path="/" element={<Home />} />{" "}
            {/* Ruta para la página de inicio */}
            <Route path="/crear-conductor" element={<CrearUsuario />} />
            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/logout" />}
            />
            <Route path="/logout" element={<Menu />} />{" "}
            {/* Ajusta la ruta según sea necesario */}
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );

  /* return (
    <>
      <AuthProvider>
        <Router>
          <Layout isLoggedIn={isLoggedIn} handleLogin={handleLogin}>
            <Routes>
              <Route exact path="/" component={Home} />

              <Route path="/crear-conductor" element={<crearUsuario />} />
              <Route
                path="/dashboard"
                render={() =>
                  isLoggedIn ? <Dashboard /> : <Navigate to="/logout" />
                }
              />
              <Route path="/" Component={Menu} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </>
  ); */
}

export default App;
