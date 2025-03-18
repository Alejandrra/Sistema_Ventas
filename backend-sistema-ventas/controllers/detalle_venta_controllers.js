//const pool = require('./db'); // Importa la conexión a la BD
import {obtener_detalles_venta,agregar_detalle_venta,actualizar_detalle_venta,eliminar_detalle_venta} from '../model/Detalle_Venta_Model.js'; 


// Obtener todos los detalles de ventas
/*export const obtener_detalles_venta = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Detalle_Ventas");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener detalles de venta:", error.message);  // Detalle del error
        res.status(500).json({ error: "Error interno del servidor", details: error.message });
    }
};

// Agregar un nuevo producto a una venta
export const agregar_detalle_venta = async (req, res) => {
    const { venta_id, producto_id, cantidad, precio, subtotal } = req.body;

    try {
        const [result] = await db.query(
            "INSERT INTO Detalle_Ventas (venta_id, producto_id, cantidad, precio, subtotal) VALUES (?, ?, ?, ?, ?)",
            [venta_id, producto_id, cantidad, precio, subtotal]
        );

        res.json({ message: "Producto agregado a la venta", id: result.insertId });
    } catch (error) {
        console.error("Error al agregar el producto a la venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Actualizar un detalle de venta
export const actualizar_detalle_venta = async (req, res) => {
    const { id } = req.params;
    const { cantidad, precio, subtotal } = req.body;

    try {
        const [result] = await db.query("SELECT * FROM Detalle_Ventas WHERE id = ?", [id]);
        if (result.length === 0) return res.status(404).json({ error: "Detalle de venta no encontrado" });

        await db.query(
            "UPDATE Detalle_Ventas SET cantidad = ?, precio = ?, subtotal = ? WHERE id = ?",
            [cantidad, precio, subtotal, id]
        );

        res.json({ message: "Detalle de venta actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el detalle de venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Eliminar un detalle de venta
export const eliminar_detalle_venta = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query("DELETE FROM Detalle_Ventas WHERE id = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Detalle de venta no encontrado" });

        res.json({ message: "Producto eliminado de la venta correctamente" });
    } catch (error) {
        console.error("Error al eliminar el producto de la venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
*/


// Obtener todos los detalles de ventas
export const Obtener_Detalles_Venta = async (req, res) => {
    try {
        const detalles = await obtener_detalles_venta();
        res.json(detalles);
    } catch (error) {
        console.error("Error al obtener detalles de venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Agregar un nuevo producto a una venta
export const Agregar_Detalle_Venta = async (req, res) => {
    const { venta_id, producto_id, cantidad, precio, subtotal } = req.body;
    
    try {
        const detalle_id = await agregar_detalle_venta(venta_id, producto_id, cantidad, precio, subtotal);
        res.status(201).json({ message: "Producto agregado a la venta", detalle_id });
    } catch (error) {
        console.error("Error al agregar el producto a la venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Actualizar un detalle de venta
export const Actualizar_Detalle_Venta = async (req, res) => {
    const { id } = req.params;
    const { cantidad, precio, subtotal } = req.body;

    try {
        const updatedRows = await actualizar_detalle_venta(id, cantidad, precio, subtotal);
        if (updatedRows === 0) return res.status(404).json({ error: "Detalle de venta no encontrado" });

        res.json({ message: "Detalle de venta actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el detalle de venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Eliminar un detalle de venta
export const Eliminar_Detalle_Venta = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRows = await eliminar_detalle_venta(id);
        if (deletedRows === 0) return res.status(404).json({ error: "Detalle de venta no encontrado" });

        res.json({ message: "Producto eliminado de la venta correctamente" });
    } catch (error) {
        console.error("Error al eliminar el producto de la venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
