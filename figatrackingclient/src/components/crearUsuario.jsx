import React, { useState } from "react";
import axios from "axios";

const CrearUsuario = () => {
  const [email, setEmail] = useState("");
  const [cedula, setCedula] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/usuarios/crear",
        {
          email,
          cedula,
        }
      );
      setMessage("Usuario creado exitosamente");
    } catch (error) {
      setMessage("Error al crear el usuario");
    }
  };

  return (
    <div>
      <h1>Crear Conductor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email de Google"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          required
        />
        <button type="submit">Registrar Conductor</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default CrearUsuario;
