//const pool = require('./db'); // Importa la conexión a la BD
import { obtener_ventas, crear_venta, actualizar_venta, eliminar_venta }  from '../model/Venta_Model.js'; 

export const obtener_Ventas = async (req, res) => {
    try {
        const ventas = await obtener_ventas();
        res.json(ventas);
    } catch (error) {
        console.error("Error al obtener ventas:", error);
        res.status(500).json({ error: "Error al obtener ventas" });
    }
};

export const crear_Venta = async (req, res) => {
    const { cliente_id, usuario_id, productos } = req.body;
    
    if (!productos || productos.length === 0) {
        return res.status(400).json({ error: "Debes agregar al menos un producto" });
    }

    try {
        let total = productos.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        const fecha = new Date(); // Definir fecha antes de usarla
        const venta_id = await crear_venta(cliente_id, usuario_id, fecha, total);

        // Aquí deberías insertar los productos en la tabla detalle_venta
        // Asegúrate de que tu función en el modelo maneje esto

        res.status(201).json({ message: "Venta creada correctamente", venta_id });
    } catch (error) {
        console.error("Error al crear la venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const actualizar_Venta = async (req, res) => {
    const { id } = req.params;
    const { cliente_id, usuario_id, fecha, total } = req.body;

    try {
        const updatedRows = await actualizar_venta(id, cliente_id, usuario_id, fecha, total);
        if (updatedRows === 0) return res.status(404).json({ error: "Venta no encontrada" });

        res.json({ message: "Venta actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar la venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const eliminar_Venta = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRows = await eliminar_venta(id);
        if (deletedRows === 0) return res.status(404).json({ error: "Venta no encontrada" });

        res.json({ message: "Venta eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
