import { useEffect, useState } from "react";
import VehiculoFormComponent from "../components/vehicleFormComponent.jsx";
import { useNavigate, useParams } from "react-router-dom";

const CreateVehiculo = () => {
  const { id } = useParams(); //Obtiene el id del vehiculo se está editando
  const [vehicle, setVehicle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchVehicle = async () => {
        try {
          const response = await fetch(`/vehiculos/${id}`);
          if (response.ok) {
            const data = await response.json();
            setVehicle(data);
          } else {
            alert("Error al obtener el vehiculo");
          }
        } catch (error) {
          console.error("Error al obtener el vehiculo:", error);
        }
      };
      fetchVehicle();
    }
  }, [id]);

  const handleSubmitVehicle = async (vehiculoData) => {
    try {
      const url = id
        ? `/vehiculos/actvehiculos/${id}`
        : "/vehiculos/crearvehiculos";
      const method = id ? "PUT" : "POST"; // PUT para editar y POST para crear

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehiculoData),
      });

      if (!response.ok) {
        alert(`Vehiculo ${id ? "actualizado" : "creado"} correctamente`);
        navigate("/verVehiculos");
      } else {
        alert(`Error al ${id ? "actualizar" : "crear"} vehiculo`);
      }
    } catch (error) {
      console.error(
        `Error al ${id ? "actualizar" : "crear"} el vehiculo:`,
        error
      );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold ">
        {id ? "Actualizar Vehículo" : "Crear Vehículo"}
      </h1>
      <VehiculoFormComponent
        onSubmit={handleSubmitVehicle}
        vehiculo={vehicle}
      />
    </div>
  );
};

export default CreateVehiculo;
