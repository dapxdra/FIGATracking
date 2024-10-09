-- Creación de la base de datos
CREATE DATABASE FIGA_Travel;

-- Creación de la tabla Usuarios dentro del esquema FIGA
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
	oauth_id VARCHAR(255) UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    rol VARCHAR(20) CHECK(rol IN ('administrador', 'conductor')) DEFAULT 'conductor',
	estado BOOL DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creación de la tabla Conductores dentro del esquema FIGA
CREATE TABLE Conductores (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES Usuarios(id) ON DELETE CASCADE,
    cedula VARCHAR(50) NOT NULL UNIQUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creación de la tabla Vehículos dentro del esquema FIGA
CREATE TABLE Vehiculos (
    id SERIAL PRIMARY KEY,
    placa VARCHAR(20) NOT NULL UNIQUE,
    modelo VARCHAR(100),
    capacidad INT CHECK(capacidad > 0),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creación de la tabla Rutas dentro del esquema FIGA
CREATE TABLE Rutas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    origen VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
	latitude DECIMAL(9,6) NOT NULL,
  	longitude DECIMAL(9,6) NOT NULL,
    distancia_km DECIMAL(5, 2) CHECK(distancia_km > 0),
    conductor_id INT REFERENCES Conductores(id) ON DELETE SET NULL,
    vehiculo_id INT REFERENCES Vehiculos(id) ON DELETE SET NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado BOOL DEFAULT true
);

