const pool = require('./config/db'); // Importa la conexión a la BD

// Obtener todos los detalles de ventas
exports.obtener_detalles_venta = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Detalle_Ventas");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener detalles de venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Agregar un nuevo producto a una venta
exports.agregar_detalle_venta = async (req, res) => {
    const { venta_id, producto_id, cantidad, precio, subtotal } = req.body;

    try {
        const [result] = await pool.query(
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
exports.actualizar_detalle_venta = async (req, res) => {
    const { id } = req.params;
    const { cantidad, precio, subtotal } = req.body;

    try {
        const [result] = await pool.query("SELECT * FROM Detalle_Ventas WHERE id = ?", [id]);
        if (result.length === 0) return res.status(404).json({ error: "Detalle de venta no encontrado" });

        await pool.query(
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
exports.eliminar_detalle_venta = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query("DELETE FROM Detalle_Ventas WHERE id = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Detalle de venta no encontrado" });

        res.json({ message: "Producto eliminado de la venta correctamente" });
    } catch (error) {
        console.error("Error al eliminar el producto de la venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
