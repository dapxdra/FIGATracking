import React, { useState, useEffect } from "react";
import UserTableComponent from "../components/userTableComponent.jsx";
import UserFormComponent from "../components/userFormComponent.jsx";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("/usuarios/verusuarios");
    const data = await response.json();
    setUsers(data);
  };

  const handleEditUser = async (userData) => {
    const response = await fetch(`/usuarios/actusuarios/${userData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    console.log(userData);
    if (response.ok) {
      console.log(response);
      fetchUsers();
      setEditingUser(null);
    }
  };

  const handleDeleteUser = async (userId) => {
    const response = await fetch(`/usuarios/elimusuarios/${userId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchUsers();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Listar Usuarios</h1>
      {editingUser ? (
        <UserFormComponent onSubmit={handleEditUser} user={editingUser} />
      ) : (
        <UserTableComponent
          users={users}
          onEdit={setEditingUser}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default ListUser;
