const express = require("express");
const { pool } = require("./db"); // Importamos la conexión a la base de datos
const router = express.Router();

// 📌 1️⃣ Obtener todos los usuarios (GET)
router.get("/usuarios", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Usuarios");
        res.json(rows);
    } catch (error) {
        console.error("❌ Error al obtener usuarios:", error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

// 📌 2️⃣ Agregar un usuario (POST)
router.post("/usuarios", async (req, res) => {
    const { nombre, correo, contraseña, rol } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO Usuarios (nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)",
            [nombre, correo, contraseña, rol]
        );
        res.json({ message: "✅ Usuario agregado", id: result.insertId });
    } catch (error) {
        console.error("❌ Error al agregar usuario:", error);
        res.status(500).json({ error: "Error al agregar usuario" });
    }
});

// 📌 3️⃣ Eliminar un usuario (DELETE)
router.delete("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM Usuarios WHERE id = ?", [id]);
        if (result.affectedRows > 0) {
            res.json({ message: "✅ Usuario eliminado" });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("❌ Error al eliminar usuario:", error);
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
});

// 📌 4️⃣ Actualizar un usuario (PUT)
router.put("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, contraseña, rol } = req.body;
    try {
        const [result] = await pool.query(
            "UPDATE Usuarios SET nombre = ?, correo = ?, contraseña = ?, rol = ? WHERE id = ?",
            [nombre, correo, contraseña, rol, id]
        );
        if (result.affectedRows > 0) {
            res.json({ message: "✅ Usuario actualizado" });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("❌ Error al actualizar usuario:", error);
        res.status(500).json({ error: "Error al actualizar usuario" });
    }
});

module.exports = router;
