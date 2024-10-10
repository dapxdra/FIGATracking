import React, { useState, useEffect } from "react";
import VehicleTableComponent from "../components/vehicleTableComponent.jsx";
import VehicleFormComponent from "../components/vehicleFormComponent.jsx";

const ListVehicles = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [editingVehiculo, setEditingVehicle] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    const response = await fetch("/vehiculos/vervehiculos");
    const data = await response.json();
    setVehiculos(data);
  };
  console.log(setVehiculos);

  const handleEditVehicle = async (vehicleData) => {
    const response = await fetch(`/vehiculos/actvehiculos/${vehicleData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleData),
    });
    console.log(vehicleData);
    if (response.ok) {
      console.log(response);
      fetchVehicles();
      setEditingVehicle(null);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    const response = await fetch(`/vehiculos/eliminarvehiculos/${vehicleId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchVehicles();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Lista de Vehículos</h1>
      {editingVehiculo ? (
        <VehicleFormComponent
          onSubmit={handleEditVehicle}
          vehiculo={editingVehiculo}
        />
      ) : (
        <VehicleTableComponent
          vehicles={vehiculos}
          onEdit={setEditingVehicle}
          onDelete={handleDeleteVehicle}
        />
      )}
    </div>
  );
};

export default ListVehicles;
