import { useNavigate } from "react-router-dom";
import RutaFormComponent from "../components/rutaFormComponent.jsx";

const CreateRuta = () => {
  const navigate = useNavigate();

  const handleCreateRuta = async (rutaData) => {
    try {
      const response = await fetch("/rutas/crearrutas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rutaData),
      });

      if (response.ok) {
        alert(`Ruta creada correctamente`);
        navigate("/verRutas");
      } else {
        console.error("Error al crear la ruta");
      }
    } catch (error) {
      console.error("Error en el fetch:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Crear Nueva Ruta</h1>
      <RutaFormComponent onSubmit={handleCreateRuta} />
    </div>
  );
};

export default CreateRuta;
