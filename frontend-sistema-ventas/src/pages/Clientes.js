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
  obtenerClientes,
  crearCliente,
  eliminarCliente
} from '../services/api/apiClientes';
import EditarClienteModal from '../components/EditarClienteModal';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: '',
  });

  const [clienteEditandoId, setClienteEditandoId] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    const data = await obtenerClientes();
    setClientes(data);
  };

  const handleCrearCliente = async () => {
    const { nombre, correo, telefono, direccion } = nuevoCliente;

    if (!nombre || !correo || !telefono || !direccion) {
      alert("Completa todos los campos");
      return;
    }

    const clienteFormateado = {
      nombre,
      correo,
      telefono: parseInt(telefono),
      direccion,
    };

    await crearCliente(clienteFormateado);
    setNuevoCliente({ nombre: '', correo: '', telefono: '', direccion: '' });
    cargarClientes();
  };

  const handleEliminarCliente = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este cliente?")) return;
    await eliminarCliente(id);
    cargarClientes();
  };

  const abrirModalEdicion = (id) => {
    setClienteEditandoId(id);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setClienteEditandoId(null);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
        Gestión de Clientes
      </Typography>

      {/* Formulario */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Agregar Cliente
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              fullWidth
              value={nuevoCliente.nombre}
              onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Correo"
              fullWidth
              value={nuevoCliente.correo}
              onChange={(e) => setNuevoCliente({ ...nuevoCliente, correo: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Teléfono"
              fullWidth
              type="number"
              value={nuevoCliente.telefono}
              onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección"
              fullWidth
              value={nuevoCliente.direccion}
              onChange={(e) => setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })}
            />
          </Grid>
        </Grid>
        <Box mt={3}>
          <Button variant="contained" color="primary" fullWidth onClick={handleCrearCliente}>
            Agregar Cliente
          </Button>
        </Box>
      </Paper>

      {/* Lista de Clientes */}
      <Typography variant="h6" gutterBottom>
        Lista de Clientes
      </Typography>
      {clientes.map((cliente) => (
        <Paper key={cliente.id} elevation={1} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
          <Typography variant="subtitle1">
            <strong>{cliente.nombre}</strong>
          </Typography>
          <Typography variant="body2">{cliente.correo}</Typography>
          <Typography variant="body2">{cliente.telefono}</Typography>
          <Typography variant="body2" gutterBottom>{cliente.direccion}</Typography>
          <Divider sx={{ my: 1 }} />
          <Box>
            <IconButton color="primary" onClick={() => abrirModalEdicion(cliente.id)}>
              <Edit />
            </IconButton>
            <IconButton color="error" onClick={() => handleEliminarCliente(cliente.id)}>
              <Delete />
            </IconButton>
          </Box>
        </Paper>
      ))}

      {/* Modal de edición */}
      <EditarClienteModal
        open={modalAbierto}
        onClose={cerrarModal}
        clienteId={clienteEditandoId}
        onGuardado={cargarClientes}
      />
    </Container>
  );
};

export default Clientes;
