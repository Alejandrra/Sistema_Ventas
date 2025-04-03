import React, { useEffect, useState } from "react";
import { obtenerDetalle_Ventas, crearDetalle_Ventas, actualizarDetalle_Ventas, eliminarDetalle_Ventas } from "../services/api/apiDetalle_Ventas";

const Detalle_Venta = () => {
  const [detalle_ventas, setDetalle_Ventas] = useState([]);
  const [nuevaDetalle_Venta, setNuevaDetalle_Venta] = useState({ 
    venta_id: "", 
    producto_id: "", 
    cantidad: "", 
    precio: "",
    subtotal: "",

 });

  useEffect(() => {
    cargarDetalle_Ventas();
  }, []);

  const cargarDetalle_Ventas = async () => {
    const data = await obtenerDetalle_Ventas();
    setDetalle_Ventas(data);
  };

  const handleCrearDetalle_Venta = async () => {
    if (!nuevaDetalle_Venta.venta_id || !nuevaDetalle_Venta.producto_id || !nuevaDetalle_Venta.cantidad || !nuevaDetalle_Venta.precio || !nuevaDetalle_Venta.subtotal) {
      alert("Completa todos los campos");
      return;
    }
    const DetalleventaFormateada = {
      venta_id: nuevaDetalle_Venta.venta_id,
      producto_id: nuevaDetalle_Venta.producto_id,
      cantidad: parseInt(nuevaDetalle_Venta.cantidad),
      precio: parseFloat(nuevaDetalle_Venta.precio), // Convertir a número
      subtotal: parseFloat(nuevaDetalle_Venta.subtotal)
    };
    
    await crearDetalle_Ventas(DetalleventaFormateada);
    setNuevaDetalle_Venta({ venta_id: "", producto_id: "", cantidad: "", precio: "", subtotal: ""  });
    cargarDetalle_Ventas();
  };

  const handleActualizarDetalle_Venta = async (id) => {
    const nuevoVentaId = prompt("Nuevo Venta ID:");
    const nuevoProductoId = prompt("Nuevo Producto ID:");
    const nuevaCantidad = prompt("Nueva Cantidad:");
    const nuevoPrecio = prompt("Nuevo Precio:");
    const nuevoSubtototal = prompt("Nuevo Subtotal:");


    if (!nuevoVentaId || !nuevoProductoId || !nuevaCantidad || !nuevoPrecio || !nuevoSubtototal ) return;
    await actualizarDetalle_Ventas(id, { venta_id: nuevoVentaId, producto_id: nuevoProductoId, cantidad: nuevaCantidad, precio: nuevoPrecio, subtotal: nuevoSubtototal });
    cargarDetalle_Ventas();
  };

  const handleEliminarDetalle_Venta = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este detalle venta?")) return;
    await eliminarDetalle_Ventas(id);
    cargarDetalle_Ventas();
  };

  return (
    <div>
      <h2>Lista de Detalle Ventas</h2>
      <ul>
        {detalle_ventas.map((detalleventa) => (
          <li key={detalleventa.id}>
            <strong>ID DetalleVenta:</strong> {detalleventa.id} - <strong>Venta ID:</strong> {detalleventa.venta_id} - <strong>Producto ID:</strong> {detalleventa.producto_id} - <strong>Cantidad:</strong>{detalleventa.cantidad} - <strong>Precio:</strong> {detalleventa.precio} - <strong>SubTotal:</strong> ${detalleventa.subtotal}
            <br />
            <button onClick={() => handleActualizarDetalle_Venta(detalleventa.id)}>Editar</button>
            <button onClick={() => handleEliminarDetalle_Venta(detalleventa.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h3>Agregar Detalle Venta</h3>
      <input
        type="text"
        placeholder="ID Venta"
        value={nuevaDetalle_Venta.venta_id}
        onChange={(e) => setNuevaDetalle_Venta({ ...nuevaDetalle_Venta, venta_id: e.target.value })}
      />
      <input
        type="text"
        placeholder="ID Producto"
        value={nuevaDetalle_Venta.producto_id}
        onChange={(e) => setNuevaDetalle_Venta({ ...nuevaDetalle_Venta, producto_id: e.target.value })}
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={nuevaDetalle_Venta.cantidad}
        onChange={(e) => setNuevaDetalle_Venta({ ...nuevaDetalle_Venta, cantidad: e.target.value })}
      />
      <input
        type="number"
        placeholder="Precio"
        value={nuevaDetalle_Venta.precio}
        onChange={(e) => setNuevaDetalle_Venta({ ...nuevaDetalle_Venta, precio: e.target.value })}
      />
      <input
        type="number"
        placeholder="SubTotal"
        value={nuevaDetalle_Venta.subtotal}
        onChange={(e) => setNuevaDetalle_Venta({ ...nuevaDetalle_Venta, subtotal: e.target.value })}
      />
      <button onClick={handleCrearDetalle_Venta}>Agregar Detalle Venta</button>
    </div>
  );
};

export default Detalle_Venta;
