const pool = require('../config/db'); // Importa la conexión a la BD

// Obtener todas las ventas
exports.obtener_ventas = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT v.id, c.nombre AS cliente, v.fecha, v.total 
            FROM Ventas v
            JOIN Clientes c ON v.cliente_id = c.id
        `);
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener ventas:", error);
        res.status(500).json({ error: "Error al obtener ventas" });
    }
};

// Crear una nueva venta con su detalle
exports.crear_venta = async (req, res) => {
    const { cliente_id, usuario_id, productos } = req.body;

    if (!productos || productos.length === 0) {
        return res.status(400).json({ error: "Debes agregar al menos un producto" });
    }

    try {
        let total = productos.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

        const [venta] = await pool.query(
            "INSERT INTO Ventas (cliente_id, usuario_id, total) VALUES (?, ?, ?)",
            [cliente_id, usuario_id, total]
        );
        const venta_id = venta.insertId;

        for (let producto of productos) {
            await pool.query(
                "INSERT INTO Detalle_Ventas (venta_id, producto_id, cantidad, precio, subtotal) VALUES (?, ?, ?, ?, ?)",
                [venta_id, producto.producto_id, producto.cantidad, producto.precio, producto.precio * producto.cantidad]
            );
        }

        res.status(201).json({ message: "Venta creada correctamente", venta_id });
    } catch (error) {
        console.error("Error al crear la venta:", error);
        res.status(500).json({ error: "Error al crear la venta" });
    }
};

// Actualizar una venta
exports.actualizar_venta = async (req, res) => {
    const { id } = req.params;
    const { cliente_id, usuario_id, total } = req.body;

    if (!cliente_id || !usuario_id || total === undefined) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        const [result] = await pool.query("SELECT * FROM Ventas WHERE id = ?", [id]);
        if (result.length === 0) {
            return res.status(404).json({ error: "Venta no encontrada" });
        }

        await pool.query(
            "UPDATE Ventas SET cliente_id = ?, usuario_id = ?, total = ? WHERE id = ?",
            [cliente_id, usuario_id, total, id]
        );

        res.json({ message: "Venta actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar la venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Eliminar una venta
exports.eliminar_venta = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query("SELECT * FROM Ventas WHERE id = ?", [id]);
        if (result.length === 0) return res.status(404).json({ error: "Venta no encontrada" });

        await pool.query("DELETE FROM Ventas WHERE id = ?", [id]);

        res.json({ message: "Venta eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la venta:", error);
        res.status(500).json({ error: "Error al eliminar la venta" });
    }
};
