//const db = require('./db');
import db from '../config/db.js'; 

// Obtener todos los usuarios
export const obtener_usuarios = (req, res) => {
    db.query('SELECT * FROM Usuarios', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Obtener un usuario por ID
export const obtener_usuarios_id  = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Usuarios WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.json(results[0]);
    });
};

// Crear un nuevo usuario
export const crear_usuario = (req, res) => {
    const { nombre, correo, contraseña, rol } = req.body;
    db.query('INSERT INTO Usuarios (nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)', [nombre, correo,contraseña,rol], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Usuario agregado', id: results.insertId });
    });
};

// Actualizar un usuario
export const actualizar_usuario = (req, res) => {
    const { id } = req.params;
    const { nombre, correo, contraseña, rol } = req.body;
    db.query('UPDATE Usuarios SET nombre = ?, correo = ?, contraseña = ?, rol = ? WHERE id = ?', [nombre, correo, contraseña, rol, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Usuario actualizado' });
    });
};

// Eliminar un usuario
export const eliminar_usuario = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Usuario eliminado' });
    });
};
