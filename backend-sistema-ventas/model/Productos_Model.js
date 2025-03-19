import db from '../config/db.js'; 
// Obtener todos los productos
export const obtener_productos = async () => {
    const [results] = await db.query('SELECT * FROM Productos');
    return results;
};

// Crear un nuevo producto
export const crear_producto = async (nombre, descripcion, precio, stock, categoria) => {
    const [results] = await db.query(
        'INSERT INTO Productos (nombre, descripcion, precio, stock, categoria) VALUES (?, ?, ?, ?, ?)',
        [nombre, descripcion, precio, stock, categoria]
    );
    return results.insertId;
};

// Actualizar un producto
export const actualizar_producto = async (id, nombre, descripcion, precio, stock, categoria) => {
    const [results] = await db.query(
        'UPDATE Productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria = ? WHERE id = ?',
        [nombre, descripcion, precio, stock, categoria, id]
    );
    return results.affectedRows > 0;
};

// Eliminar un producto
export const eliminar_producto = async (id) => {
    const [results] = await db.query('DELETE FROM Productos WHERE id = ?', [id]);
    return results.affectedRows > 0;
};
