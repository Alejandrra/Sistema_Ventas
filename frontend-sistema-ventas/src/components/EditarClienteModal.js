import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Box
} from '@mui/material';
import { obtenerClientePorId, actualizarCliente } from '../services/api/apiClientes';

const EditarClienteModal = ({ open, onClose, clienteId, onGuardado }) => {
  const [cliente, setCliente] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargarCliente = async () => {
      if (clienteId && open) {
        setCargando(true);
        const data = await obtenerClientePorId(clienteId);
        setCliente(data);
        setCargando(false);
      }
    };
    cargarCliente();
  }, [clienteId, open]);

  const handleGuardar = async () => {
    await actualizarCliente(clienteId, cliente);
    onGuardado(); // Actualiza la lista
    onClose(); // Cierra el modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Cliente</DialogTitle>
      <DialogContent>
        {cargando || !cliente ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TextField
              margin="dense"
              label="Nombre"
              name="nombre"
              fullWidth
              value={cliente.nombre}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Correo"
              name="correo"
              fullWidth
              value={cliente.correo}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Teléfono"
              name="telefono"
              fullWidth
              value={cliente.telefono}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Dirección"
              name="direccion"
              fullWidth
              value={cliente.direccion}
              onChange={handleChange}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleGuardar} disabled={!cliente}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarClienteModal;
