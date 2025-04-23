import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { obtenerUsuarioPorId, actualizarUsuario } from '../services/api/apiUsuarios';

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    rol: ''
  });

  useEffect(() => {
    obtenerUsuarioPorId(id).then((data) => setUsuario(data));
  }, [id]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actualizarUsuario(id, usuario);
    navigate('/usuarios'); // Vuelve al listado de usuarios
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>Editar Usuario</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="nombre"
          value={usuario.nombre}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Correo"
          name="correo"
          value={usuario.correo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contraseña"
          name="contraseña"
          type="password"
          value={usuario.contraseña}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rol"
          name="rol"
          value={usuario.rol}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">Guardar Cambios</Button>
      </form>
    </Box>
  );
};

export default EditarUsuario;
