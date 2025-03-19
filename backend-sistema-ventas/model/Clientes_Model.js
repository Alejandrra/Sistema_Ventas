import db from '../config/db.js';
// Obtener todos los clientes
export const obtener_clientes = async () => {
    const [rows] = await db.query('SELECT * FROM Clientes');
    return rows;
};

// Obtener un cliente por ID
export const obtener_cliente_id = async (id) => {
    const [rows] = await db.query('SELECT * FROM Clientes WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

// Crear un nuevo cliente
export const crear_cliente = async (nombre, correo, telefono, direccion) => {
    const [result] = await db.query('INSERT INTO Clientes (nombre, correo, telefono, direccion) VALUES (?, ?, ?, ?)', [nombre, correo, telefono, direccion]);
    return result.insertId;
};

// Actualizar un cliente
export const actualizar_cliente = async (id, nombre, correo, telefono, direccion) => {
    const [result] = await db.query('UPDATE Clientes SET nombre = ?, correo = ?, telefono = ?, direccion = ? WHERE id = ?', [nombre, correo, telefono, direccion, id]);
    return result.affectedRows > 0;
};

// Eliminar un cliente
export const eliminar_cliente = async (id) => {
    const [result] = await db.query('DELETE FROM Clientes WHERE id = ?', [id]);
    return result.affectedRows > 0;
};