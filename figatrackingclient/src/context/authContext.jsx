import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false); // Estado de autenticación

  console.log(
    "AuthProvider renderizado. isAuthenticated:",
    isAuthenticated,
    "setAuthenticated es función?",
    typeof setAuthenticated === "function"
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
