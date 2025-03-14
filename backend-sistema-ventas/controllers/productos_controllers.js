//const db = require('./db'); 
import db from '../config/db.js'; 

// Obtener todos los productos
export const obtener_productos = (req, res) => {
    db.query('SELECT * FROM Productos', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};


// Crear un nuevo producto
export const crear_producto = (req, res) => {
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    db.query( "INSERT INTO Productos ( nombre, descripcion, precio, stock, categoria) VALUES (?, ?, ?, ?, ?)", [nombre, descripcion, precio, stock, categoria], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Producto agregado', id: results.insertId });
    });
};

// Actualizar un producto
export const actualizar_producto = (req, res) => {
    const { id } = req.params;
    const {nombre, descripcion, precio, stock, categoria } = req.body;
    db.query("UPDATE Productos SET nombre = ?, correo = ?, descripcion = ?, precio = ? , stock = ? , categoria = ?   WHERE id = ?", [nombre, descripcion, precio, stock, categoria, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Producto actualizado' });
    });
};

// Eliminar un usuario
export const eliminar_producto = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM Productos WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Producto eliminado' });
    });
};
