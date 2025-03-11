const db = require('../config/db'); // Importa la conexión a la base de datos

// Obtener todos los clientes
exports.obtener_clientes = (req, res) => {
    db.query('SELECT * FROM Clientes', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Obtener un cliente por ID
exports.obtener_cliente_Id = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Clientes WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        res.json(results[0]);
    });
};

// Crear un nuevo cliente
exports.crear_cliente = (req, res) => {
    const { nombre, correo,telefono, direccion } = req.body;
    db.query("INSERT INTO Clientes ( nombre, correo, telefono, direccion) VALUES (?, ?, ?, ?)",
    [nombre, email, telefono, direccion], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Cliente agregado', id: results.insertId });
    });
};

// Actualizar un cliente
exports.actualizar_cliente = (req, res) => {
    const { id } = req.params;
    const { nombre, correo,telefono, direccion} = req.body;
    db.query("UPDATE Clientes SET nombre = ?, correo = ?, telefono = ?, direccion = ? WHERE id = ?", 
    [nombre, email, telefono, direccion, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Cliente actualizado' });
    });
};

// Eliminar un cliente
exports.eliminar_cliente = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Clientes WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Cliente eliminado' });
    });
};
