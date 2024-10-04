import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

export function Header({ isLoggedIn, handleLogin }) {
  // Estado para controlar el dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated } = useAuth();

  // Función para manejar el dropdown
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = async () => {
    try {
      console.log("Logout frontend");
      const response = await fetch("/auth/logout", {
        method: "GET",
        credentials: "include", // Asegura que las cookies se envían con la solicitud
        headers: {
          "Cache-Control": "no-cache", // Desactiva el caché en la solicitud
          "Content-Type": "application/json",
        },
      });

      console.log("Respuesta del logout:", response);

      if (response.ok) {
        console.log("Cierre de sesión exitoso");
        console.log(
          "isAuthenticated:",
          isAuthenticated,
          "setAuthenticated es función?",
          typeof setAuthenticated === "function"
        );
        setAuthenticated(false); // Cambia el estado de autenticación
        navigate("/"); // Redirige al login
        window.location.reload();
      } else {
        console.error("Error al cerrar sesión:", response.status);
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 lg:ps-[260px] dark:bg-neutral-800 dark:border-neutral-700">
      <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
        <div className="me-5 lg:me-0 lg:hidden">
          <a
            className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
            href="/"
            aria-label="Preline"
          >
            {/* Aquí deberías importar el logo como un componente o usar un img */}
            <img src="logo-url" alt="Logo" />
          </a>
        </div>

        <div className="w-full flex items-center justify-end ms-auto gap-x-2 md:gap-x-3">
          <div className="flex flex-row items-center justify-end gap-8">
            {isLoggedIn ? (
              <>
                {/* Botón de dashboard */}
                <button
                  type="button"
                  className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                >
                  <span>Dashboard</span>
                </button>

                {/* Botón de notificaciones */}
                <button
                  type="button"
                  className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                >
                  <span>Conductores</span>
                </button>

                {/* Botón de flota */}
                <button
                  type="button"
                  className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                >
                  <span>Flota</span>
                </button>

                {/* Botón de Rutas */}
                <button
                  type="button"
                  className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                >
                  <span>Rutas</span>
                </button>

                {/* Botón de reservas */}
                <button
                  type="button"
                  className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                >
                  <span>Reservas</span>
                </button>

                {/* Botón de notificaciones */}
                <button
                  type="button"
                  className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                >
                  <span>Reportes</span>
                </button>
                {/* Dropdown */}
                <div className="relative inline-flex">
                  <>
                    <button
                      id="dropdown-button"
                      type="button"
                      onClick={toggleDropdown}
                      className="size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:text-white"
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen ? "true" : "false"}
                    >
                      <img
                        className="shrink-0 size-[38px] rounded-full"
                        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                        alt="Avatar"
                      />
                    </button>

                    {/* Dropdown menú */}
                    {dropdownOpen && (
                      <div className="absolute z-10 right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-800 dark:border dark:border-neutral-700">
                        <div className="py-3 px-5 bg-gray-100 rounded-t-lg dark:bg-neutral-700">
                          <p className="text-sm text-gray-500 dark:text-neutral-500">
                            Signed in as
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                            james@site.com
                          </p>
                        </div>
                        <div className="p-1.5 space-y-0.5">
                          <a
                            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
                            href="#"
                          >
                            Notificaciones
                          </a>
                          <button
                            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
                            onClick={handleLogout}
                          >
                            Cerrar Sesión
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                </div>
              </>
            ) : (
              <button
                className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                onClick={handleLogin}
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
