const express = require("express");
const { pool } = require("./db"); // Importamos la conexión a la base de datos
const router = express.Router();

// Obtener todos los usuarios (GET)
router.get("/usuarios", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Usuarios");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

// Agregar un usuario (POST)
router.post("/usuarios", async (req, res) => {
    const { nombre, correo, contraseña, rol } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO Usuarios (nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)",
            [nombre, correo, contraseña, rol]
        );
        res.json({ message: "Usuario agregado", id: result.insertId });
    } catch (error) {
        console.error("Error al agregar usuario:", error);
        res.status(500).json({ error: "Error al agregar usuario" });
    }
});

// Eliminar un usuario (DELETE)
router.delete("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM Usuarios WHERE id = ?", [id]);
        if (result.affectedRows > 0) {
            res.json({ message: "Usuario eliminado" });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
});

// Actualizar un usuario (PUT)
router.put("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, contraseña, rol } = req.body;
    try {
        const [result] = await pool.query(
            "UPDATE Usuarios SET nombre = ?, correo = ?, contraseña = ?, rol = ? WHERE id = ?",
            [nombre, correo, contraseña, rol, id]
        );
        if (result.affectedRows > 0) {
            res.json({ message: "Usuario actualizado" });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ error: "Error al actualizar usuario" });
    }
});

///////////////////////////////////////////////////////////////////////////////////
// Obtener todos los clientes (GET)
router.get("/clientes", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Clientes");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        res.status(500).json({ error: "Error al obtener clientes" });
    }
});

// Agregar un cliente (POST)
router.post("/clientes", async (req, res) => {
    const { nombre, correo,telefono, direccion } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO Clientes ( nombre, correo, telefono, direccion) VALUES (?, ?, ?, ?)",
            [ nombre, correo,telefono, direccion]
        );
        res.json({ message: "Cliente agregado", id: result.insertId });
    } catch (error) {
        console.error("Error al agregar cliente:", error);
        res.status(500).json({ error: "Error al agregar cliente" });
    }
});

// Eliminar un cliente (DELETE)
router.delete("/clientes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM Clientes WHERE id = ?", [id]);
        if (result.affectedRows > 0) {
            res.json({ message: "Cliente eliminado" });
        } else {
            res.status(404).json({ error: "Cliente no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        res.status(500).json({ error: "Error al eliminar cliente" });
    }
});

// Actualizar un cliente (PUT)
router.put("/clientes/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, correo,telefono, direccion } = req.body;
    try {
        const [result] = await pool.query(
            "UPDATE Clientes SET nombre = ?, correo = ?, telefono = ?, direccion = ? WHERE id = ?",
            [nombre, correo,telefono, direccion, id]
        );
        if (result.affectedRows > 0) {
            res.json({ message: "Cliente actualizado" });
        } else {
            res.status(404).json({ error: "Cliente no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        res.status(500).json({ error: "Error al actualizar cliente" });
    }
});


///////////////////////////////////////////////////////////////////////////////////
// Obtener todos los Productos (GET)
router.get("/productos", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Productos");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

// Agregar un Producto (POST)
router.post("/productos", async (req, res) => {
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO Productos ( nombre, descripcion, precio, stock, categoria) VALUES (?, ?, ?, ?, ?)",
            [ nombre, descripcion, precio, stock, categoria]
        );
        res.json({ message: "Producto agregado", id: result.insertId });
    } catch (error) {
        console.error("Error al agregar producto:", error);
        res.status(500).json({ error: "Error al agregar producto" });
    }
});

// Eliminar un producto (DELETE)
router.delete("/productos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM Productos WHERE id = ?", [id]);
        if (result.affectedRows > 0) {
            res.json({ message: "Producto eliminado" });
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: "Error al eliminar producto" });
    }
});

// Actualizar un producto (PUT)
router.put("/productos/:id", async (req, res) => {
    const { id } = req.params;
    const {  nombre, descripcion, precio, stock, categoria } = req.body;
    try {
        const [result] = await pool.query(
            "UPDATE Productos SET nombre = ?, correo = ?, descripcion = ?, precio = ? , stock = ? , categoria = ?   WHERE id = ?",
            [ nombre, descripcion, precio, stock, categoria, id]
        );
        if (result.affectedRows > 0) {
            res.json({ message: "Producto actualizado" });
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: "Error al actualizar producto" });
    }
});

///////////////////////////////////////////////////////////////////////////////////
// Obtener todos los ventas (GET)
router.get("/ventas", async (req, res) => {
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
});

// Agregar una nueva con su detalle (POST)
router.post("/ventas", async (req, res) => {
    const {  cliente_id, usuario_id, productos } = req.body;

    if (!productos || productos.length === 0) {
        return res.status(400).json({ error: "Debes agregar al menos un producto" });
    }
    try {
        // Calcular el total de la venta
        let total = productos.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

        // Insertar la venta en la base de datos
        const [venta] = await pool.query(
            "INSERT INTO Ventas (cliente_id, usuario_id, total) VALUES (?, ?, ?)",
            [cliente_id, usuario_id, total]
        );
        const venta_id = venta.insertId;

        // Insertar el detalle de la venta
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

});

// Actualizar una venta (PUT)
router.put("/ventas/:id", async (req, res) => {
    const { id } = req.params;
    const { cliente_id, usuario_id, total } = req.body; // Asegurar que total esté incluido

    if (!cliente_id || !usuario_id || total === undefined) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        // Verificar si la venta existe
        const [result] = await pool.query("SELECT * FROM Ventas WHERE id = ?", [id]);

        if (result.length === 0) {
            return res.status(404).json({ error: "Venta no encontrada" });
        }

        // Actualizar la venta
        await pool.query(
            "UPDATE Ventas SET cliente_id = ?, usuario_id = ?, total = ? WHERE id = ?",
            [cliente_id, usuario_id, total, id]
        );

        res.json({ message: "Venta actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar la venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


// Eliminar una venta (DELETE)
router.delete("/ventas/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar si la venta existe
        const [result] = await pool.query("SELECT * FROM Ventas WHERE id = ?", [id]);
        if (result.length === 0) return res.status(404).json({ error: "Venta no encontrada" });

        // Eliminar la venta
        await pool.query("DELETE FROM Ventas WHERE id = ?", [id]);

        res.json({ message: "Venta eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la venta:", error);
        res.status(500).json({ error: "Error al eliminar la venta" });
    }
});
/////////////////////////////////////////////////////////////
//Obtener todos los detalles de las ventas (GET)
router.get("/detalle-venta", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Detalle_Ventas");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener detalles de venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }

});

// Agregar una nuevo producto a una venta (POST)
router.post("/detalle-venta", async (req, res) => {
    const { venta_id, producto_id, cantidad, precio,subtotal } = req.body;

    try {
        // Insertar un nuevo detalle de venta
        const [result] = await pool.query(
            "INSERT INTO Detalle_Ventas (venta_id, producto_id, cantidad, precio, subtotal) VALUES (?, ?, ?, ? , ?)",
            [venta_id, producto_id, cantidad, precio,subtotal]
        );

        res.json({ message: "Producto agregado a la venta", id: result.insertId });
    } catch (error) {
        console.error("Error al agregar el producto a la venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Actualizar un detalle venta (PUT)
router.put("/detalle-venta/:id", async (req, res) => {
    const { id } = req.params;
    const { cantidad, precio, subtotal } = req.body;

    try {
        // Verificar si existe el detalle de venta
        const [result] = await pool.query("SELECT * FROM Detalle_Ventas WHERE id = ?", [id]);
        if (result.length === 0) return res.status(404).json({ error: "Detalle de venta no encontrado" });

        // Actualizar el detalle de venta
        await pool.query(
            "UPDATE Detalle_Ventas SET cantidad = ?, precio = ? , subtotal = ? WHERE id = ?",
            [cantidad, precio, subtotal, id]
        );

        res.json({ message: "Detalle de venta actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el detalle de venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


// Eliminaar un detalle venta (DELETE)
router.delete("/detalle-venta/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query("DELETE FROM DetalleVenta WHERE id = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Detalle de venta no encontrado" });

        res.json({ message: "Producto eliminado de la venta correctamente" });
    } catch (error) {
        console.error("Error al eliminar el producto de la venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});



module.exports = router;
