import React, { useEffect, useState } from "react";
import UserFormComponent from "../components/userFormComponent.jsx";
import { useNavigate, useParams } from "react-router-dom"; // Para navegar y obtener el ID de usuario

const CreateUser = () => {
  const { id } = useParams(); // Obtiene el id del usuario si estás editando
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Si estamos en modo edición, buscamos el usuario por id
  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`/usuarios/${id}`);
          if (response.ok) {
            const data = await response.json();
            setUser(data); // Establecemos los datos del usuario
          } else {
            alert("Error al obtener usuario");
          }
        } catch (error) {
          console.error("Error al obtener el usuario:", error);
        }
      };

      fetchUser();
    }
  }, [id]);

  const handleSubmitUser = async (userData) => {
    try {
      const url = id
        ? `/usuarios/actusuarios/${id}`
        : "/usuarios/crearusuarios";
      const method = id ? "PUT" : "POST"; // Usamos PUT para editar, POST para crear

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert(`Usuario ${id ? "actualizado" : "creado"} correctamente`);
        navigate("/usuarios"); // Redirigir a la página de usuarios
      } else {
        alert(`Error al ${id ? "actualizar" : "crear"} usuario`);
      }
    } catch (error) {
      console.error(
        `Error al ${id ? "actualizar" : "crear"} el usuario:`,
        error
      );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">
        {id ? "Actualizar Usuario" : "Crear Usuario"}
      </h1>
      <UserFormComponent onSubmit={handleSubmitUser} user={user} />
    </div>
  );
};

export default CreateUser;

/* import React from "react";
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
        console.log(response);
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
 */
