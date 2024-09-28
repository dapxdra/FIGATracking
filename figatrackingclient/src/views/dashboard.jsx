import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx"; // Importa el contexto

function Dashboard() {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth(); // Accede al contexto

  const handleLogout = async () => {
    try {
      const response = await fetch("/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setAuthenticated(false); // Cambia el estado de autenticación
        navigate.push("/login"); // Redirige al login
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Dashboard;
