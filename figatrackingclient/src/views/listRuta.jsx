import { useEffect, useState } from "react";
import RutasListComponent from "../components/rutaTableComponent.jsx";

const ListRuta = () => {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const response = await fetch("/rutas/verrutas");
        if (!response.ok) {
          throw new Error("Error al obtener las rutas");
        }
        const data = await response.json();
        setRutas(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRutas();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Listado de Rutas</h1>
      {rutas.length > 0 ? (
        <RutasListComponent rutas={rutas} />
      ) : (
        <p>No se encontraron rutas.</p>
      )}
    </div>
  );
};

export default ListRuta;
