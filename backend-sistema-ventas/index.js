//const express = require("express");
//const cors = require("cors");
//const { pool } =  require('./db');// Importamos la conexión a MySQL desde db.js


//importamos la ruta
//const rutas = require("./routes");

import express from "express";
import cors from "cors";
import pool from "./config/db.js"; // Importacion bd

import rutas from "./routes.js";


const app = express();
const PORT = 5000; 

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/api", rutas);

// app.get("/", (req, res) => {
//     res.send("Servidor funcionando correctamente.");
// });


// Verificar conexión a la base de datos
pool.getConnection()
    .then(connection => {
        console.log("Conexión a MySQL establecida");
        connection.release(); // Liberar conexión
    })
    .catch(err => console.error("Error al conectar a MySQL:", err));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
