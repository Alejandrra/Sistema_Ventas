CREATE DATABASE SistemaVentas;
GO
USE SistemaVentas;
GO

--Tabla de usuarios
CREATE TABLE Usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL, -- Hasheada
    rol VARCHAR(50) CHECK (rol IN ('admin', 'vendedor')) NOT NULL,
    fecha_creacion DATETIME DEFAULT GETDATE()
);
--Tabla de productos
CREATE TABLE Productos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    categoria VARCHAR(50),
    fecha_creacion DATETIME DEFAULT GETDATE()
);

--Tabla clientes
CREATE TABLE Clientes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE,
    telefono VARCHAR(20),
    direccion TEXT
);

--Tabla ventas
CREATE TABLE Ventas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    cliente_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    fecha_venta DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (cliente_id) REFERENCES Clientes(id)
);

--Tabla detalle ventas
--Los productos vendidos para cada cliente
CREATE TABLE DetalleVentas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    venta_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES Ventas(id),
    FOREIGN KEY (producto_id) REFERENCES Productos(id)
);

--Insercion de los datos
INSERT INTO Usuarios (nombre, correo, contraseña, rol) 
VALUES ('Admin', 'admin@sistema.com', 'admin123', 'admin');

INSERT INTO Productos (nombre, descripcion, precio, stock, categoria) 
VALUES ('Laptop Dell', 'Laptop Core i7', 1200.50, 10, 'Tecnología');

INSERT INTO Clientes (nombre, correo, telefono, direccion) 
VALUES ('Juan Pérez', 'juanp@gmail.com', '0991234567', 'Quito, Ecuador');