import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx"; // Importa el contexto

export function Dashboard() {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth(); // Accede al contexto

  const handleLogout = async () => {
    try {
      const response = await fetch("/auth/logout", {
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
        navigate("/"); // Redirige al login
        window.location.reload();
      } else {
        console.error("Error al cerrar sesión:", response.status);
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <button
        onClick={handleLogout}
        className="mt-5 px-4 py-2 bg-red-600 text-white rounded-lg"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Dashboard;
