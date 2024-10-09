import React from "react";

const VehicleTableComponent = ({ vehicles, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Placa</th>
            <th className="py-2">Modelo</th>
            <th className="py-2">Capacidad</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td className="border px-4 py-2">{vehicle.placa}</td>
              <td className="border px-4 py-2">{vehicle.modelo}</td>
              <td className="border px-4 py-2">{vehicle.capacidad}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => onEdit(vehicle)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(vehicle.id)}
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

export default VehicleTableComponent;
