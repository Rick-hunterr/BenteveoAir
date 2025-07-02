
CREATE DATABASE bd_benteveoair;



CREATE TABLE Ubicacion (
    id SERIAL PRIMARY KEY,
    ciudad VARCHAR(100) NOT NULL,
    pais VARCHAR(100) NOT NULL
);

CREATE TABLE Destino_Vuelo (
    id SERIAL PRIMARY KEY,
    origen_id INTEGER REFERENCES Ubicacion(id) ON DELETE SET NULL,
    destino_id INTEGER REFERENCES Ubicacion(id) ON DELETE SET NULL
);

CREATE TABLE Servicio (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);

CREATE TABLE Producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    viaje TEXT,
    fecha DATE,
    imagen TEXT,
    hotel TEXT,
    descuento REAL,
    calificacion REAL,
    precio NUMERIC(10,2) NOT NULL CHECK (precio >= 0),
    servicio_id INTEGER REFERENCES Servicio(id) ON DELETE SET NULL,
    destino_vuelo_id INTEGER REFERENCES Destino_Vuelo(id) ON DELETE SET NULL
);


CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    ubicacion_id INTEGER REFERENCES Ubicacion(id) ON DELETE SET NULL
);

CREATE TABLE Orden (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES Usuario(id) ON DELETE CASCADE,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) NOT NULL
);

CREATE TABLE Detalle_Orden (
    id SERIAL PRIMARY KEY,
    orden_id INTEGER REFERENCES Orden(id) ON DELETE CASCADE,
    producto_id INTEGER REFERENCES Producto(id) ON DELETE SET NULL,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio NUMERIC(10,2) NOT NULL CHECK (precio >= 0)
);







