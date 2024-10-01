import React from "react";
import { Link } from "react-router-dom";

function Menu({ isLoggedIn, handleLogin, handleLogout }) {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex justify-between">
        <li>
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/crear-conductor"
            className="text-white hover:text-gray-300"
          >
            Crear Usuario
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-gray-300">
                Dashboard
              </Link>
              <></>
              <button
                className="text-white hover:text-gray-300"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <button onClick={handleLogin}>Iniciar Sesión</button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
