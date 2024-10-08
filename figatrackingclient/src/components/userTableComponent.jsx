import React from "react";

const UserTableComponent = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Email</th>
            <th className="py-2">Cédula</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.Conductor.cedula}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => onEdit(user)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTableComponent;
