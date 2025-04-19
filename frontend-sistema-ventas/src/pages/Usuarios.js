import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../services/api/apiUsuarios';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    rol: '',
  });
 // Cargar usuarios al cargar el componente
  useEffect(() => {
    cargarUsuarios(); //obtener la lista de usuarios desde el backend
  }, []);

//Funcion para obtener los usuarios de la api
  const cargarUsuarios = async () => {
    const data = await obtenerUsuario(); //hace un GET al backend
    setUsuarios(data); //Guarda los datos en usuarios
  };

  const handleCrearUsuario = async () => {
    const { nombre, correo, contraseña, rol } = nuevoUsuario;

    if (!nombre || !correo || !contraseña || !rol) {
      alert("Completa todos los campos");
      return;
    }

    console.log("Datos enviados desde el frontend:", nuevoUsuario); // Debug

    await crearUsuario(nuevoUsuario); //hace un POST a la API
    setNuevoUsuario({ nombre: '', correo: '', contraseña: '', rol: '' });
    cargarUsuarios(); //limpia y actualiza la lista de usuarios
  };

  const handleActualizarUsuario = async (id) => {
    const nuevoNombre = prompt("Nuevo nombre:");
    const nuevoCorreo = prompt("Nuevo correo:");
    const nuevaContraseña = prompt("Nueva contraseña:");
    const nuevoRol = prompt("Nuevo rol:");

    if (!nuevoNombre || !nuevoCorreo || !nuevaContraseña || !nuevoRol) return;

    await actualizarUsuario(id, {
      nombre: nuevoNombre,
      correo: nuevoCorreo,
      contraseña: nuevaContraseña,
      rol: nuevoRol,
    });

    cargarUsuarios(); //vuelve a cargar los datos
  };

  const handleEliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;
    await eliminarUsuario(id); //hace un DELATE a la API
    cargarUsuarios(); //vuelve a cargar los datos
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
        Gestión de Usuarios
      </Typography>

      {/* Formulario */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Agregar Usuario
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              fullWidth
              value={nuevoUsuario.nombre}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Correo"
              fullWidth
              value={nuevoUsuario.correo}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              value={nuevoUsuario.contraseña}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, contraseña: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Rol"
              fullWidth
              value={nuevoUsuario.rol}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}
            />
          </Grid>
        </Grid>
        <Box mt={3}>
          <Button variant="contained" color="primary" fullWidth onClick={handleCrearUsuario}>
            Agregar Usuario
          </Button>
        </Box>
      </Paper>

      {/* Lista de Usuarios */}
      <Typography variant="h6" gutterBottom>
        Lista de Usuarios
      </Typography>
      {usuarios.map((usuario) => (
        <Paper key={usuario.id} elevation={1} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
          <Typography variant="subtitle1">
            <strong>{usuario.nombre}</strong>
          </Typography>
          <Typography variant="body2">{usuario.correo}</Typography>
          <Typography variant="body2">Contraseña: {usuario.contraseña}</Typography>
          <Typography variant="body2" gutterBottom>Rol: {usuario.rol}</Typography>
          <Divider sx={{ my: 1 }} />
          <Box>
            <IconButton color="primary" onClick={() => handleActualizarUsuario(usuario.id)}>
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={() => handleEliminarUsuario(usuario.id)}>
              <Delete />
            </IconButton>
          </Box>
        </Paper>
      ))}
    </Container>
  );
};

export default Usuarios;
