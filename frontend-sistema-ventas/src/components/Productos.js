import React, { useEffect, useState } from 'react';
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from '../services/api/apiProductos';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: ''
  });

  // Cargar productos al cargar el componente
  useEffect(() => {
    cargarProductos(); //obtener la lista de productos desde el backend.
  }, []);
//Funcion para obtener los productos de la api
  const cargarProductos = async () => {
    const data = await obtenerProductos(); //hace un GET al backend.
    setProductos(data); //Guarda los datos en productos con setProductos(data).
  };

  const handleCrearProducto = async () => {
    if (!nuevoProducto.nombre || !nuevoProducto.descripcion || !nuevoProducto.precio || !nuevoProducto.stock) {
      alert("Completa todos los campos");
      return;
    }
    await crearProducto(nuevoProducto); //hace un POST a la API.
    setNuevoProducto({ nombre: '', descripcion: '', precio: '', stock: '' });
    cargarProductos(); //limpia y actualiza la lista de productos
  };

  const handleActualizarProducto = async (id) => {
    const nuevoPrecio = prompt("Nuevo precio:"); //pide un nuevo precio
    const nuevoStock = prompt("Nuevo stock:");
    const nuevoNombre = prompt("Nuevo nombre:");

    if (!nuevoPrecio || !nuevoStock || !nuevoNombre) return;
    await actualizarProducto(id, { precio: nuevoPrecio, stock: nuevoStock, nombre: nuevoNombre }); //hace un PUT a la API.
    cargarProductos(); //vuelve a cargar los datos
  };

  const handleEliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
    await eliminarProducto(id); //hace un DELATE a la API.
    cargarProductos(); //vuelve a cargar los datos
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <strong>{producto.nombre}</strong> - {producto.descripcion} <br />
            💲 {producto.precio} | 🏷 Stock: {producto.stock}
            <br />
            <button onClick={() => handleActualizarProducto(producto.id)}>Editar</button>
            <button onClick={() => handleEliminarProducto(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h3>Agregar Producto</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={nuevoProducto.nombre}
        onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={nuevoProducto.descripcion}
        onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
      />
      <input
        type="number"
        placeholder="Precio"
        value={nuevoProducto.precio}
        onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
      />
      <input
        type="number"
        placeholder="Stock"
        value={nuevoProducto.stock}
        onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
      />
      <button onClick={handleCrearProducto}>Agregar</button>
    </div>
  );
};

export default Productos;
