import db from '../config/db.js'; 

export const obtener_detalles_venta = async () => {
    const [rows] = await db.query("SELECT * FROM Detalle_Ventas");
    return rows;
};

export const agregar_detalle_venta  = async (venta_id, producto_id, cantidad, precio, subtotal) => {
    const [result] = await db.query(
        "INSERT INTO Detalle_Ventas (venta_id, producto_id, cantidad, precio, subtotal) VALUES (?, ?, ?, ?, ?)",
        [venta_id, producto_id, cantidad, precio, subtotal]
    );
    return result.insertId;
};

export const actualizar_detalle_venta = async (id, cantidad, precio, subtotal) => {
    const [result] = await db.query(
        "UPDATE Detalle_Ventas SET cantidad = ?, precio = ?, subtotal = ? WHERE id = ?",
        [cantidad, precio, subtotal, id]
    );
    return result.affectedRows;
};

export const eliminar_detalle_venta = async (id) => {
    const [result] = await db.query("DELETE FROM Detalle_Ventas WHERE id = ?", [id]);
    return result.affectedRows;
};
