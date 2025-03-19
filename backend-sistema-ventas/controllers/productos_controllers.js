//const db = require('./db'); 
import { obtener_productos, crear_producto, actualizar_producto, eliminar_producto } from '../model/Productos_Model.js';

// Obtener todos los productos
export const obtener_Productos = async (req, res) => {
    try {
        const productos = await obtener_productos();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Crear un nuevo producto
export const crear_Producto = async (req, res) => {
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    try {
        const productoId = await crear_producto(nombre, descripcion, precio, stock, categoria);
        res.status(201).json({ mensaje: 'Producto agregado', id: productoId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un producto
export const actualizar_Producto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    try {
        const actualizado = await actualizar_producto(id, nombre, descripcion, precio, stock, categoria);
        if (!actualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json({ mensaje: 'Producto actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un producto
export const eliminar_Producto = async (req, res) => {
    const { id } = req.params;
    try {
        const eliminado = await eliminar_producto(id);
        if (!eliminado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json({ mensaje: 'Producto eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/*
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
        const [results] = await db.query("UPDATE Productos SET nombre = ?, descripcion = ?, precio = ? , stock = ? , categoria = ?   WHERE id = ?", [nombre, descripcion, precio, stock, categoria, id]);
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
*/