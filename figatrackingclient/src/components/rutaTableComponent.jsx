const RutaTableComponent = ({ rutas }) => {
  return (
    <div className="overflow-x-auto">
      <h2>Listado de Rutas</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Conductor</th>
            <th className="py-2">Vehículo</th>
            <th className="py-2">Origen</th>
            <th className="py-2">Destino</th>
            <th className="py-2">Duración Estimada</th>
            <th className="py-2">Distancia (km)</th>
            <th className="py-2">Estado</th>
            <th className="py-2">Fecha de Creación</th>
          </tr>
        </thead>
        <tbody>
          {rutas.map((ruta) => (
            <tr key={ruta.id}>
              <td className="border px-4 py-2">
                {ruta.conductor ? ruta.conductor.nombre : "Sin asignar"}
              </td>
              <td className="border px-4 py-2">
                {ruta.vehiculo ? ruta.vehiculo.placa : "Sin asignar"}
              </td>
              <td className="border px-4 py-2">
                {ruta.punto_inicio.coordinates.join(", ")}
              </td>
              <td className="border px-4 py-2">
                {ruta.punto_destino.coordinates.join(", ")}
              </td>
              <td className="border px-4 py-2">{ruta.duracion_estimada} min</td>
              <td className="border px-4 py-2">{ruta.distancia} km</td>
              <td className="border px-4 py-2">{ruta.estado}</td>
              <td className="border px-4 py-2">
                {new Date(ruta.fecha_creacion).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RutaTableComponent;
