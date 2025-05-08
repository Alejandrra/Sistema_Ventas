import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerClientePorId, actualizarCliente } from '../services/api/apiClientes';

const EditarClienteModal = ({ open, onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: ''
  });

  useEffect(() => {
    if (open) {
      obtenerClientePorId(id).then((data) => setCliente(data));
    }
  }, [id, open]);

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actualizarCliente(id, cliente);
    onClose(); // Cierra el modal
    navigate('/clientes'); // Redirige
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Cliente</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            name="nombre"
            value={cliente.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Correo"
            name="correo"
            value={cliente.correo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teléfono"
            name="telefono"
            value={cliente.telefono}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Dirección"
            name="direccion"
            value={cliente.direccion}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <DialogActions>
            <Button onClick={onClose} color="secondary">Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">Guardar Cambios</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditarClienteModal;
