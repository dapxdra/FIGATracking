import React, { useState } from "react";

const UserFormComponent = ({ onSubmit, user }) => {
  const [email, setEmail] = useState(user ? user.email : "");
  const [cedula, setCedula] = useState(user?.cedula || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, cedula, id: user?.id });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="cedula"
          className="block text-sm font-medium text-gray-700"
        >
          Cédula
        </label>
        <input
          id="cedula"
          name="cedula"
          type="text"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          {user ? "Actualizar Usuario" : "Crear Usuario"}
        </button>
      </div>
    </form>
  );
};

export default UserFormComponent;
