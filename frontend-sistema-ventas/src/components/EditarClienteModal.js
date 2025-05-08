
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { obtenerClientePorId, actualizarCliente } from '../services/api/apiClientes';

const EditarCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: ''
  });

  useEffect(() => {
    obtenerClientePorId(id).then((data) => setCliente(data));
  }, [id]);

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actualizarCliente(id, cliente);
    navigate('/clientes'); // Vuelve al listado
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>Editar Cliente</Typography>
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
          label="Direccion"
          name="direccion"
          value={cliente.direccion}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">Guardar Cambios</Button>
      </form>
    </Box>
  );
};

export default EditarCliente;
