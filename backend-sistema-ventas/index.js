const express = require("express");
const cors = require ("cors");
const { sql, pool } = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    try {
        const result = await (await pool).request().query("SELECT GETDATE() as fecha_actual");
        res.json({ mensaje: "Conexión exitosa", fecha: result.recordset[0].fecha_actual });
    } catch (err) {
        res.status(500).json({ error: "Error al conectar a SQL Server" });
    }
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});