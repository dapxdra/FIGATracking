import { useEffect, useState } from "react";
import MapComponent from "./mapComponent.jsx"; // Importar el componente del mapa

const RutaFormComponent = ({ onSubmit }) => {
  const [conductor_id, setConductorId] = useState("");
  const [vehiculo_id, setVehiculoId] = useState("");
  const [origen, setOrigen] = useState([0, 0]); // Coordenadas del origen
  const [destino, setDestino] = useState([0, 0]); // Coordenadas del destino
  const [duracion_estimada, setDuracionEstimada] = useState("");
  const [distancia, setDistancia] = useState("");
  const [estado, setEstado] = useState("en progreso");
  const [conductores, setConductores] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  // Fetch para obtener los conductores y vehículos
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch("/rutas/opcrutas");
        const data = await response.json();
        setConductores(data.conductores);
        setVehiculos(data.vehiculos);
      } catch (error) {
        console.error("Error al obtener conductores y vehículos:", error);
      }
    };

    fetchOptions();
  }, []);

  console.log(conductores);

  const handleSubmitRoute = (e) => {
    e.preventDefault();
    onSubmit({
      conductor_id,
      vehiculo_id,
      punto_inicio: origen, // Coordenadas del origen
      punto_destino: destino, // Coordenadas del destino
      duracion_estimada,
      distancia,
      estado,
    });
  };

  return (
    <form onSubmit={handleSubmitRoute} className="space-y-6">
      {/* Select de Conductores */}
      <div>
        <label
          htmlFor="conductor"
          className="block text-sm font-medium text-gray-700"
        >
          Conductor:
        </label>
        <select
          id="conductor"
          value={conductor_id}
          onChange={(e) => setConductorId(e.target.value)}
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="">Seleccione un conductor</option>
          {conductores.map((conductor) => (
            <option key={conductor.id} value={conductor.id}>
              {conductor.Usuario.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Select de Vehículos */}
      <div>
        <label
          htmlFor="vehiculo"
          className="block text-sm font-medium text-gray-700"
        >
          Vehículo:
        </label>
        <select
          id="vehiculo"
          value={vehiculo_id}
          onChange={(e) => setVehiculoId(e.target.value)}
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="">Seleccione un vehículo</option>
          {vehiculos.map((vehiculo) => (
            <option key={vehiculo.id} value={vehiculo.id}>
              {vehiculo.placa}
            </option>
          ))}
        </select>
      </div>

      {/* Mapa para seleccionar puntos */}
      <div>
        <h3>Selecciona el origen y el destino en el mapa</h3>
        <MapComponent
          onSelectOrigin={setOrigen}
          onSelectDestination={setDestino}
        />
      </div>

      {/* Otros campos */}
      <div>
        <label
          htmlFor="duracion_estimada"
          className="block text-sm font-medium text-gray-700"
        >
          Duración Estimada (min):
        </label>
        <input
          type="number"
          id="duracion_estimada"
          value={duracion_estimada}
          onChange={(e) => setDuracionEstimada(e.target.value)}
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="distancia"
          className="block text-sm font-medium text-gray-700"
        >
          Distancia (km):
        </label>
        <input
          type="number"
          id="distancia"
          value={distancia}
          onChange={(e) => setDistancia(e.target.value)}
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label
          htmlFor="estado"
          className="block text-sm font-medium text-gray-700"
        >
          Estado:
        </label>
        <select
          id="estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="en progreso">En Progreso</option>
          <option value="completada">Completada</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Crear Ruta
      </button>
    </form>
  );
};

export default RutaFormComponent;
