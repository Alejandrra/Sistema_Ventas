import db from '../config/db.js';

// Obtener todos los usuarios
export const obtener_usuarios = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Usuarios');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener un usuario por ID
export const obtener_usuarios_id = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM Usuarios WHERE id = ?', [id]);
        if (results.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear un nuevo usuario
export const crear_usuario = async (req, res) => {
    const { nombre, correo, contraseña, rol } = req.body;
    try {
        const [results] = await db.query('INSERT INTO Usuarios (nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)', [nombre, correo, contraseña, rol]);
        res.status(201).json({ mensaje: 'Usuario agregado', id: results.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un usuario
export const actualizar_usuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, contraseña, rol } = req.body;
    try {
        const [results] = await db.query('UPDATE Usuarios SET nombre = ?, correo = ?, contraseña = ?, rol = ? WHERE id = ?', [nombre, correo, contraseña, rol, id]);
        res.json({ mensaje: 'Usuario actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un usuario
export const eliminar_usuario = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
        res.json({ mensaje: 'Usuario eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
