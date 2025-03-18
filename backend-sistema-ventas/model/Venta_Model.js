import db from '../config/db.js'; 

export const obtener_ventas = async () => {
    const [rows] = await db.query(`
        SELECT v.id, c.nombre AS cliente, v.fecha, v.total 
        FROM Ventas v
        JOIN Clientes c ON v.cliente_id = c.id
    `);
    return rows;
};

export const crear_venta = async (cliente_id, usuario_id, total) => {
    const [result] = await db.query(
        "INSERT INTO Ventas (cliente_id, usuario_id, total) VALUES (?, ?, ?)",
        [cliente_id, usuario_id, total]
    );
    return result.insertId; // Retorna el ID de la nueva venta
};

export const actualizar_venta = async (id, cliente_id, usuario_id, total) => {
    const [result] = await db.query(
        "UPDATE Ventas SET cliente_id = ?, usuario_id = ?, total = ? WHERE id = ?",
        [cliente_id, usuario_id, total, id]
    );
    return result.affectedRows;
};

export const eliminar_venta = async (id) => {
    const [result] = await db.query("DELETE FROM Ventas WHERE id = ?", [id]);
    return result.affectedRows;
};
