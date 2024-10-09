import { useState, useEffect } from "react";

const VehicleFormComponent = ({ vehiculo, onSubmit }) => {
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [capacidad, setCapacidad] = useState("");

  useEffect(() => {
    if (vehiculo) {
      setPlaca(vehiculo.placa);
      setModelo(vehiculo.modelo);
      setCapacidad(vehiculo.capacidad);
    } else {
      setPlaca("");
      setModelo("");
      setCapacidad("");
    }
  }, [vehiculo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ placa, modelo, capacidad });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="placa"
          className="block text-sm font-medium text-gray-700"
        >
          Placa
        </label>
        <input
          id="placa"
          name="placa"
          type="placa"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="modelo"
          className="block text-sm font-medium text-gray-700"
        >
          Modelo
        </label>
        <input
          id="modelo"
          name="modelo"
          type="modelo"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="capacidad"
          className="block text-sm font-medium text-gray-700"
        >
          Capacidad
        </label>
        <input
          id="capacidad"
          name="capacidad"
          type="number"
          value={capacidad}
          onChange={(e) => setCapacidad(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          {vehiculo ? "Actualizar Vehículo" : "Crear Vehículo"}
        </button>
      </div>
    </form>
  );
};

export default VehicleFormComponent;
