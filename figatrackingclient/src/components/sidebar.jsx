import React from "react";

function Sidebar() {
  return (
    <div
      id="hs-application-sidebar"
      className="hs-overlay transition-all duration-300 w-[260px] h-full fixed inset-y-0 start-0 z-[60] bg-white border-e border-gray-200 lg:block lg:translate-x-0 dark:bg-neutral-800 dark:border-neutral-700"
      role="dialog"
      aria-label="Sidebar"
    >
      <div className="relative flex flex-col h-full max-h-full">
        <div className="px-6 pt-4">
          {/* Logo */}
          <a
            className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none"
            href="#"
            aria-label="Preline"
          >
            <img src="logo-url" alt="Logo" />
          </a>
        </div>

        <div className="h-full overflow-y-auto">
          <nav className="p-3 w-full flex flex-col">
            <ul className="flex flex-col space-y-1">
              <li>
                <a
                  className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg dark:bg-neutral-700 dark:text-white"
                  href="#"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg dark:bg-neutral-800 dark:text-neutral-200"
                  href="#"
                >
                  Conductores
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg dark:bg-neutral-800 dark:text-neutral-200"
                  href="#"
                >
                  Flota
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg dark:bg-neutral-800 dark:text-neutral-200"
                  href="#"
                >
                  Rutas
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg dark:bg-neutral-800 dark:text-neutral-200"
                  href="#"
                >
                  Reservas
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg dark:bg-neutral-800 dark:text-neutral-200"
                  href="#"
                >
                  Reportes
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
