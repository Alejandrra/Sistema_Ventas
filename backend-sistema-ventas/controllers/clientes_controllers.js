//const db = require('./db'); // Importa la conexión a la base de datos
import db from '../config/db.js'; 

// Obtener todos los clientes
export const obtener_clientes = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Clientes');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Obtener un cliente por ID
export const obtener_cliente_Id = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM Clientes WHERE id = ?', [id]);
        if (results.length === 0) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear un nuevo cliente
export const crear_cliente = async (req, res) => {
    const {nombre, correo,telefono, direccion } = req.body;
    try {
        const [results] = await db.query('INSERT INTO Clientes (nombre, correo, telefono, direccion) VALUES (?, ?, ?, ?)', [nombre, correo,telefono, direccion]);
        res.status(201).json({ mensaje: 'Cliente agregado', id: results.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un cliente
export const actualizar_cliente = async(req, res) => {
    const { id } = req.params;
    const { nombre, correo,telefono, direccion } = req.body;
    try {
        const [results] = await db.query("UPDATE Clientes SET nombre = ?, correo = ?, telefono = ?, direccion = ? WHERE id = ?", [nombre, correo,telefono, direccion, id]);
        res.json({ mensaje: 'Cliente actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un cliente
export const eliminar_cliente = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('"DELETE FROM Clientes WHERE id = ?"', [id]);
        res.json({ mensaje: 'Cliente eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

