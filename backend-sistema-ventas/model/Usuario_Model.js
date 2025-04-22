import db from '../config/db.js';
import bcrypt from 'bcryptjs'; // para encriptar las contrasenas
// Obtener todos los usuarios
export const obtener_usuarios = async () => {
    const [rows] = await db.query('SELECT * FROM Usuarios');
    return rows;
};

// Obtener un usuario por ID
export const obtener_usuarios_id = async (id) => {
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

// Crear un nuevo usuario
export const crear_usuario = async (nombre, correo, contraseña, rol) => {
    const contraseñaHasheada = await bcrypt.hash(contraseña, 10); // Encriptar la contraseña
    const [result] = await db.query('INSERT INTO Usuarios (nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)', [nombre, correo, contraseñaHasheada, rol]); // Usar la contraseña encriptada
    return result.insertId;
};

// Actualizar un usuario
export const actualizar_usuario = async (id, nombre, correo, contraseña, rol) => {
    const [result] = await db.query('UPDATE Usuarios SET nombre = ?, correo = ?, contraseña = ?, rol = ? WHERE id = ?', [nombre, correo, contraseña, rol, id]);
    return result.affectedRows > 0;
};

// Eliminar un usuario
export const eliminar_usuario = async (id) => {
    const [result] = await db.query('DELETE FROM Usuarios WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
