import React, { useEffect, useState } from "react";
import { obtenerVentas, crearVenta, actualizarVenta, eliminarVenta } from "../services/api/apiVentas";

const Venta = () => {
  const [ventas, setVentas] = useState([]);
  const [nuevaVenta, setNuevaVenta] = useState({
    cliente_id: "",
    usuario_id: "",
    fecha: "",
    total: "",
    productos: [] // Aquí agregamos productos
  });
  const [producto, setProducto] = useState({ producto_id: "", cantidad: "", precio: "" });

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    try {
      const data = await obtenerVentas();
      setVentas(data);
    } catch (error) {
      console.error("Error al cargar ventas:", error);
    }
  };

  // Función para formatear la fecha correctamente
  const formatearFecha = (fecha) => {
    return fecha ? fecha.replace("T", " ") + ":00" : null;
  };

  const handleCrearVenta = async () => {
    if (!nuevaVenta.cliente_id || !nuevaVenta.usuario_id || !nuevaVenta.total || nuevaVenta.productos.length === 0) {
      alert("Completa todos los campos obligatorios y agrega al menos un producto");
      return;
    }

    const ventaFormateada = {
      cliente_id: nuevaVenta.cliente_id,
      usuario_id: nuevaVenta.usuario_id,
      fecha: nuevaVenta.fecha ? formatearFecha(nuevaVenta.fecha) : undefined,
      total: parseFloat(nuevaVenta.total),
      productos: nuevaVenta.productos, // Agregar productos a la venta
    };

    console.log("Venta enviada:", ventaFormateada);

    try {
      await crearVenta(ventaFormateada);
      alert("Venta creada correctamente");
      setNuevaVenta({ cliente_id: "", usuario_id: "", fecha: "", total: "", productos: [] }); // Limpiar después de agregar
      cargarVentas();
    } catch (error) {
      console.error("Error al crear venta:", error);
    }
  };

  // Función para agregar un producto a la venta
  const handleAgregarProducto = () => {
    if (!producto.producto_id || !producto.cantidad || !producto.precio) {
      alert("Por favor, completa todos los campos del producto.");
      return;
    }

    const nuevoProducto = {
      producto_id: producto.producto_id,
      cantidad: producto.cantidad,
      precio: producto.precio,
    };

    setNuevaVenta({ ...nuevaVenta, productos: [...nuevaVenta.productos, nuevoProducto] });
    setProducto({ producto_id: "", cantidad: "", precio: "" }); // Limpiar campos de producto
  };

  const handleActualizarVenta = async (id) => {
    const nuevoClienteId = prompt("Nuevo Cliente ID:");
    const nuevoUsuarioId = prompt("Nuevo Usuario ID:");
    const nuevaFecha = prompt("Nueva Fecha (YYYY-MM-DD HH:MM:SS):");
    const nuevoTotal = prompt("Nuevo Total:");

    if (!nuevoClienteId || !nuevoUsuarioId || !nuevaFecha || !nuevoTotal) return;

    try {
      await actualizarVenta(id, { 
        cliente_id: nuevoClienteId, 
        usuario_id: nuevoUsuarioId, 
        fecha: nuevaFecha, 
        total: parseFloat(nuevoTotal) 
      });
      cargarVentas();
    } catch (error) {
      console.error("Error al actualizar venta:", error);
    }
  };

  const handleEliminarVenta = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta venta?")) return;
    
    try {
      await eliminarVenta(id);
      cargarVentas();
    } catch (error) {
      console.error("Error al eliminar venta:", error);
    }
  };

  return (
    <div>
      <h2>Lista de Ventas</h2>
      <ul>
        {ventas.map((venta) => (
          <li key={venta.id}>
            <strong>ID Venta:</strong> {venta.id} - <strong>Cliente ID:</strong> {venta.cliente_id} - 
            <strong>Usuario ID:</strong> {venta.usuario_id} - <strong>Fecha:</strong> {venta.fecha} - 
            <strong>Total:</strong> ${venta.total}
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
        onChange={(e) => {
          const fechaFormateada = e.target.value ? e.target.value + ":00" : "";
          setNuevaVenta({ ...nuevaVenta, fecha: fechaFormateada });
        }}
      />
      <input
        type="number"
        placeholder="Total"
        value={nuevaVenta.total}
        onChange={(e) => setNuevaVenta({ ...nuevaVenta, total: e.target.value })}
      />
      
      {/* Sección para agregar productos */}
      <h4>Agregar Producto</h4>
      <input
        type="text"
        placeholder="ID Producto"
        value={producto.producto_id}
        onChange={(e) => setProducto({ ...producto, producto_id: e.target.value })}
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={producto.cantidad}
        onChange={(e) => setProducto({ ...producto, cantidad: e.target.value })}
      />
      <input
        type="number"
        placeholder="Precio"
        value={producto.precio}
        onChange={(e) => setProducto({ ...producto, precio: e.target.value })}
      />
      <button onClick={handleAgregarProducto}>Agregar Producto</button>

      <button onClick={handleCrearVenta}>Agregar Venta</button>
    </div>
  );
};

export default Venta;
