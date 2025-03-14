//const db = require('./db'); 
import db from '../config/db.js'; 

// Obtener todos los productos
export const obtener_productos = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Productos');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Crear un nuevo producto
export const crear_producto = async (req, res) => {
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    try {
        const [results] = await db.query( "INSERT INTO Productos ( nombre, descripcion, precio, stock, categoria) VALUES (?, ?, ?, ?, ?)", [ nombre, descripcion, precio, stock, categoria]);
        res.status(201).json({ mensaje: 'Producto agregado', id: results.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un producto
export const actualizar_producto = async(req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    try {
        const [results] = await db.query("UPDATE Productos SET nombre = ?, correo = ?, descripcion = ?, precio = ? , stock = ? , categoria = ?   WHERE id = ?", [nombre, descripcion, precio, stock, categoria, id]);
        res.json({ mensaje: 'Producto actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Eliminar un usuario
export const eliminar_producto = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query("DELETE FROM Productos WHERE id = ?", [id]);
        res.json({ mensaje: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
