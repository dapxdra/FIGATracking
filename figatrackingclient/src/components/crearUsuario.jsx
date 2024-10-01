import React, { useState } from "react";
/* import axios from "axios";

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

export default CrearUsuario; */

function CrearUsuario() {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center">Crear Conductor</h1>
      <form className="mt-8 space-y-6">
        <div className="rounded-md shadow-sm">
          <div>
            <label htmlFor="name" className="sr-only">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Nombre completo"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Correo Electrónico"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Crear Conductor
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearUsuario;
