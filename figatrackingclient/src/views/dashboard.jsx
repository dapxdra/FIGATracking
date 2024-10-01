import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx"; // Importa el contexto

function Dashboard() {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth(); // Accede al contexto

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "GET",
        credentials: "include", // Asegura que las cookies se envían con la solicitud
        headers: {
          "Cache-Control": "no-cache", // Desactiva el caché en la solicitud
          "Content-Type": "application/json",
        },
      });

      console.log("Respuesta del logout:", response);

      if (response.ok) {
        console.log("Cierre de sesión exitoso");
        setAuthenticated(false); // Cambia el estado de autenticación
        navigate("/logout"); // Redirige al login
      } else {
        console.error("Error al cerrar sesión:", response.status);
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
