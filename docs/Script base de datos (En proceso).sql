CREATE DATABASE bd_benteveoair;


-- Tabla Servicios: servicios que ofrece la aerolínea
CREATE TABLE Servicio (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Tabla Productos: productos vinculados a servicios
CREATE TABLE Producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10,2) NOT NULL,
    servicio_id INTEGER REFERENCES Servicio(id) ON DELETE SET NULL
);

-- Tabla Usuarios: clientes o empleados
CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol_id INTEGER REFERENCES Rol(id) ON DELETE SET NULL
);

-- Tabla Orden: pedidos realizados por usuarios
CREATE TABLE Orden (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES Usuario(id) ON DELETE CASCADE,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) NOT NULL
);

-- Tabla DetalleOrden: detalle de productos por orden
CREATE TABLE DetalleOrden (
    id SERIAL PRIMARY KEY,
    orden_id INTEGER REFERENCES Orden(id) ON DELETE CASCADE,
    producto_id INTEGER REFERENCES Producto(id) ON DELETE SET NULL,
    cantidad INTEGER NOT NULL,
    precio NUMERIC(10,2) NOT NULL
);