import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx"; // Importa el contexto
import Layout from "../components/layout.jsx";

export function Dashboard() {
  return <Layout />;
}

export default Dashboard;
