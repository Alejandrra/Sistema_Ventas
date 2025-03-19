//const db = require('./db'); // Importa la conexión a la base de datos
import { obtener_clientes, obtener_cliente_id, crear_cliente, actualizar_cliente, eliminar_cliente }  from '../model/Clientes_Model.js'; 
// Obtener todos los clientes
export const obtener_Clientes = async (req, res) => {
    try {
        const clientes = await obtener_clientes();
        res.json(clientes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener un cliente por ID
export const obtener_Cliente_Id = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await obtener_cliente_id(id);
        if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        res.json(cliente);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear un nuevo cliente
export const crear_Cliente = async (req, res) => {
    const { nombre, correo, telefono, direccion } = req.body;
    try {
        const clienteId = await crear_cliente(nombre, correo, telefono, direccion);
        res.status(201).json({ mensaje: 'Cliente agregado', id: clienteId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un cliente
export const actualizar_Cliente = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, telefono, direccion } = req.body;
    try {
        const actualizado = await actualizar_cliente(id, nombre, correo, telefono, direccion);
        if (!actualizado) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        res.json({ mensaje: 'Cliente actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un cliente
export const eliminar_Cliente = async (req, res) => {
    const { id } = req.params;
    try {
        const eliminado = await eliminar_cliente(id);
        if (!eliminado) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        res.json({ mensaje: 'Cliente eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


/*
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

*/