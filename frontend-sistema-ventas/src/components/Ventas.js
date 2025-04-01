import React, { useEffect, useState } from "react";
import { obtenerVentas, crearVenta, actualizarVenta, eliminarVenta } from "../services/api/apiVentas";

const Venta = () => {
  const [ventas, setVentas] = useState([]);
  const [nuevaVenta, setNuevaVenta] = useState({ cliente_id: "", usuario_id: "", fecha: "", total: "" });

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    const data = await obtenerVentas();
    setVentas(data);
  };

  const handleCrearVenta = async () => {
    if (!nuevaVenta.cliente_id || !nuevaVenta.usuario_id || !nuevaVenta.fecha || !nuevaVenta.total) {
      alert("Completa todos los campos");
      return;
    }
    const ventaFormateada = {
      cliente_id: nuevaVenta.cliente_id,
      usuario_id: nuevaVenta.usuario_id,
      fecha: nuevaVenta.fecha,
      total: parseFloat(nuevaVenta.total) // Convertir a número
    };
    
    await crearVenta(ventaFormateada);
    setNuevaVenta({ cliente_id: "", usuario_id: "", fecha: "", total: "" });
    cargarVentas();
  };

  const handleActualizarVenta = async (id) => {
    const nuevoClienteId = prompt("Nuevo Cliente ID:");
    const nuevoUsuarioId = prompt("Nuevo Usuario ID:");
    const nuevaFecha = prompt("Nueva Fecha (YYYY-MM-DD HH:MM:SS):");
    const nuevoTotal = prompt("Nuevo Total:");


    if (!nuevoClienteId || !nuevoUsuarioId || !nuevaFecha || !nuevoTotal) return;
    await actualizarVenta(id, { cliente_id: nuevoClienteId, usuario_id: nuevoUsuarioId, fecha: nuevaFecha, total: parseFloat(nuevoTotal) });
    cargarVentas();
  };

  const handleEliminarVenta = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta venta?")) return;
    await eliminarVenta(id);
    cargarVentas();
  };

  return (
    <div>
      <h2>Lista de Ventas</h2>
      <ul>
        {ventas.map((venta) => (
          <li key={venta.id}>
            <strong>ID Venta:</strong> {venta.id} - <strong>Cliente ID:</strong> {venta.cliente_id} - <strong>Usuario ID:</strong> {venta.usuario_id} - <strong>Fecha:</strong> {venta.fecha} - <strong>Total:</strong> ${venta.total}
            <br />
            <button onClick={() => handleActualizarVenta(venta.id)}>Editar</button>
            <button onClick={() => handleEliminarVenta(venta.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h3>Agregar Venta</h3>
      <input
        type="text"
        placeholder="ID Cliente"
        value={nuevaVenta.cliente_id}
        onChange={(e) => setNuevaVenta({ ...nuevaVenta, cliente_id: e.target.value })}
      />
      <input
        type="text"
        placeholder="ID Usuario"
        value={nuevaVenta.usuario_id}
        onChange={(e) => setNuevaVenta({ ...nuevaVenta, usuario_id: e.target.value })}
      />
      <input
        type="datetime-local"
        placeholder="Fecha"
        value={nuevaVenta.fecha}
        onChange={(e) => setNuevaVenta({ ...nuevaVenta, fecha: e.target.value })}
      />
      <input
        type="number"
        placeholder="Total"
        value={nuevaVenta.total}
        onChange={(e) => setNuevaVenta({ ...nuevaVenta, total: e.target.value })}
      />
      <button onClick={handleCrearVenta}>Agregar Venta</button>
    </div>
  );
};

export default Venta;
