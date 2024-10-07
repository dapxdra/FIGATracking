import React from "react";
import UserFormComponent from "../components/userFormComponent.jsx";

const CreateUser = () => {
  const handleCreateUser = async (userData) => {
    try {
      const response = await fetch("/usuarios/crearusuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("Usuario creado correctamente");
      } else {
        alert("Error al crear usuario");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Crear Usuario</h1>
      <UserFormComponent onSubmit={handleCreateUser} />
    </div>
  );
};

export default CreateUser;
