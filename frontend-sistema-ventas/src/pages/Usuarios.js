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
  eliminarUsuario,
  obtenerUsuarioPorId
} from '../services/api/apiUsuarios';
import EditarUsuarioModal from '../components/EditarUsuarioModal';



const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    rol: '',
  });

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const data = await obtenerUsuario();
    setUsuarios(data);
  };

  const handleCrearUsuario = async () => {
    const { nombre, correo, contraseña, rol } = nuevoUsuario;

    if (!nombre || !correo || !contraseña || !rol) {
      alert("Completa todos los campos");
      return;
    }

    await crearUsuario(nuevoUsuario);
    setNuevoUsuario({ nombre: '', correo: '', contraseña: '', rol: '' });
    cargarUsuarios();
  };

  const handleEliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;
    await eliminarUsuario(id);
    cargarUsuarios();
  };

  const handleAbrirModal = async (id) => {
    const data = await obtenerUsuarioPorId(id);
    setUsuarioSeleccionado(data);
    setModalAbierto(true);
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
    setUsuarioSeleccionado(null);
    cargarUsuarios(); // actualiza después de editar
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
        Gestión de Usuarios
      </Typography>

      {/* Formulario de creación */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>Agregar Usuario</Typography>
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

      {/* Lista de usuarios */}
      <Typography variant="h6" gutterBottom>Lista de Usuarios</Typography>
      {usuarios.map((usuario) => (
        <Paper key={usuario.id} elevation={1} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
          <Typography variant="subtitle1"><strong>{usuario.nombre}</strong></Typography>
          <Typography variant="body2">{usuario.correo}</Typography>
          <Typography variant="body2">Contraseña: {usuario.contraseña}</Typography>
          <Typography variant="body2" gutterBottom>Rol: {usuario.rol}</Typography>
          <Divider sx={{ my: 1 }} />
          <Box>
            <IconButton color="primary" onClick={() => handleAbrirModal(usuario.id)}>
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={() => handleEliminarUsuario(usuario.id)}>
              <Delete />
            </IconButton>
          </Box>
        </Paper>
      ))}

      {/* Modal de edición */}
      {usuarioSeleccionado && (
        <EditarUsuarioModal
          open={modalAbierto}
          onClose={handleCerrarModal}
          usuario={usuarioSeleccionado}
        />
      )}
    </Container>
  );
};

export default Usuarios;
