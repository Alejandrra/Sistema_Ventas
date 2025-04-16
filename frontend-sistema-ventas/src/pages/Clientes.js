import React, { useEffect, useState } from 'react';
import { obtenerClientes, crearCliente, actualizarCliente, eliminarCliente } from '../services/api/apiClientes';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: ''

  });

  // Cargar clientes al cargar el componente
  useEffect(() => {
    cargarClientes(); //obtener la lista de clientes desde el backend.
  }, []);
//Funcion para obtener los usuarios de la api
  const cargarClientes = async () => {
    const data = await obtenerClientes(); //hace un GET al backend.
    setClientes(data); //Guarda los datos en clientes.
  };

  const handleCrearCliente = async () => {
    if (!nuevoCliente.nombre || !nuevoCliente.correo || !nuevoCliente.telefono || !nuevoCliente.direccion) 
    {
      alert("Completa todos los campos");
      return;
    }

    const clienteFormateado = {
        nombre: nuevoCliente.nombre,
        correo: nuevoCliente.correo,
        telefono: parseInt(nuevoCliente.telefono), // Convertir a número entero
        direccion: nuevoCliente.direccion
      };



    await crearCliente(clienteFormateado); //hace un POST a la API.
    setNuevoCliente({ nombre: '', correo: '', telefono: '', direccion: '' });
    cargarClientes(); //limpia y actualiza la lista de clientes
  };

  const handleActualizarCliente = async (id) => {
    const nuevoNombre = prompt("Nuevo nombre:"); 
    const nuevoCorreo = prompt("Nuevo correo:");
    const nuevoTelefono = prompt("Nuevo telefono:");
    const nuevoDireccion = prompt("Nuevo direccion:");


    if (!nuevoNombre || !nuevoCorreo || !nuevoTelefono || !nuevoDireccion ) return;
    await actualizarCliente(id, { nombre: nuevoNombre, correo: nuevoCorreo, telefono: nuevoTelefono, direccion: nuevoDireccion}); //hace un PUT a la API.
    cargarClientes(); //vuelve a cargar los datos
  };

  const handleEliminarCliente = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este cliente?")) return;
    await eliminarCliente(id); //hace un DELATE a la API.
    cargarClientes(); //vuelve a cargar los datos
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            <strong>{cliente.nombre}</strong> - {cliente.correo} <br />
            {cliente.telefono} | {cliente.direccion} 
            <br />
            <button onClick={() => handleActualizarCliente(cliente.id)}>Editar</button>
            <button onClick={() => handleEliminarCliente(cliente.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h3>Agregar Cliente</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={nuevoCliente.nombre}
        onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
      />
      <input
        type="text"
        placeholder="Correo"
        value={nuevoCliente.correo}
        onChange={(e) => setNuevoCliente({ ...nuevoCliente, correo: e.target.value })}
      />
      <input
        type="number"
        placeholder="Telefono"
        value={nuevoCliente.telefono}
        onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
      />

      <input
        type="text"
        placeholder="Direccion"
        value={nuevoCliente.direccion}
        onChange={(e) => setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })}
      />
            <button onClick={handleCrearCliente}>Agregar</button>
    </div>
  );
};

export default Clientes;
