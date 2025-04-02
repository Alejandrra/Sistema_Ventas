import React, { useEffect, useState } from 'react';
import { obtenerUsuario, crearUsuario, actualizarUsuario, eliminarUsuario } from '../services/api/apiUsuarios';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    rol: ''

  });

  // Cargar usuarios al cargar el componente
  useEffect(() => {
    cargarUsuarios(); //obtener la lista de usuarios desde el backend.
  }, []);
//Funcion para obtener los usuarios de la api
  const cargarUsuarios = async () => {
    const data = await obtenerUsuario(); //hace un GET al backend.
    setUsuarios(data); //Guarda los datos en usuarios.
  };

  const handleCrearUsuario = async () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.correo || !nuevoUsuario.contraseña || !nuevoUsuario.rol) 
    {
      alert("Completa todos los campos");
      return;
    }
    console.log("Datos enviados desde el frontend:", nuevoUsuario); // Debug

    await crearUsuario(nuevoUsuario); //hace un POST a la API.
    setNuevoUsuario({ nombre: '', correo: '', contraseña: '', rol: '' });
    cargarUsuarios(); //limpia y actualiza la lista de usuarios
  };

  const handleActualizarUsuario = async (id) => {
    const nuevoNombre = prompt("Nuevo nombre:"); 
    const nuevoCorreo = prompt("Nuevo correo:");
    const nuevoContrasena = prompt("Nuevo contraseña:");
    const nuevoRol = prompt("Nuevo rol:");


    if (!nuevoNombre || !nuevoCorreo || !nuevoContrasena || !nuevoRol ) return;
    await actualizarUsuario(id, { nombre: nuevoNombre, correo: nuevoCorreo, contraseña: nuevoContrasena, rol: nuevoRol}); //hace un PUT a la API.
    cargarUsuarios(); //vuelve a cargar los datos
  };

  const handleEliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;
    await eliminarUsuario(id); //hace un DELATE a la API.
    cargarUsuarios(); //vuelve a cargar los datos
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <strong>{usuario.nombre}</strong> - {usuario.correo} <br />
            {usuario.contraseña} | {usuario.rol} 
            <br />
            <button onClick={() => handleActualizarUsuario(usuario.id)}>Editar</button>
            <button onClick={() => handleEliminarUsuario(usuario.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h3>Agregar Usuario</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={nuevoUsuario.nombre}
        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
      />
      <input
        type="text"
        placeholder="Correo"
        value={nuevoUsuario.correo}
        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={nuevoUsuario.contraseña}
        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, contraseña: e.target.value })}
      />
      <input
        type="text"
        placeholder="Rol"
        value={nuevoUsuario.rol}
        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}
      />
            <button onClick={handleCrearUsuario}>Agregar</button>
    </div>
  );
};

export default Usuarios;
