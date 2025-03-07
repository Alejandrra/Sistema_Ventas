
USE sistema_ventas;

-- Tabla de Usuarios
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'vendedor') NOT NULL
);

-- Tabla de Clientes
CREATE TABLE Clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE,
    telefono VARCHAR(20),
    direccion TEXT
);

-- Tabla de Productos
CREATE TABLE Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    categoria VARCHAR(50) NOT NULL
);

-- Tabla de Ventas
CREATE TABLE Ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    usuario_id INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES Clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE
);

-- Tabla Detalle de Ventas
CREATE TABLE Detalle_Ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES Ventas(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES Productos(id) ON DELETE CASCADE
);

-- Insertar datos de prueba
INSERT INTO Usuarios (nombre, correo, contraseña, rol) 
VALUES ('Admin', 'admin@sistema.com', 'admin123', 'admin');

INSERT INTO Clientes (nombre, correo, telefono, direccion) 
VALUES ('Juan Pérez', 'juanp@gmail.com', '0991234567', 'Quito, Ecuador');

INSERT INTO Productos (nombre, descripcion, precio, stock, categoria) 
VALUES ('Laptop Dell', 'Laptop Core i7', 1200.50, 10, 'Tecnología');

-- Insertar una venta de prueba
INSERT INTO Ventas (cliente_id, usuario_id, total) 
VALUES (1, 1, 1200.50);

-- Insertar detalle de la venta
INSERT INTO Detalle_Ventas (venta_id, producto_id, cantidad, precio, subtotal) 
VALUES (1, 1, 1, 1200.50, 1200.50);
