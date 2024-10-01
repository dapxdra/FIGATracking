import React from "react";

const Menu = ({ isLoggedIn, handleLogin }) => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Inicio</a>
        </li>
        <li>
          <a href="/about">Acerca de</a>
        </li>
        <li>
          {isLoggedIn ? (
            <>
              <a href="/dashboard">Dashboard</a>
              <button
                onClick={() =>
                  (window.location.href = "http://localhost:5000/auth/logout")
                }
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
};

export default Menu;
