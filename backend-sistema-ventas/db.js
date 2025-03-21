require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

pool.getConnection()
    .then(() => console.log("Conectado a MySQL"))
    .catch(err => console.error("Error al conectar a MySQL:", err));




module.exports = { pool };
