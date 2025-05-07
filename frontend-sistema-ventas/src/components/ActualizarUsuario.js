/*import React, { useEffect, useState } from 'react';
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
*/
import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { obtenerUsuarioPorId, actualizarUsuario } from '../services/api/apiUsuarios';

const estiloModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const EditarUsuarioModal = ({ open, onClose, usuarioId, onGuardado }) => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    rol: ''
  });

  useEffect(() => {
    if (usuarioId) {
      obtenerUsuarioPorId(usuarioId).then((data) => setUsuario(data));
    }
  }, [usuarioId]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actualizarUsuario(usuarioId, usuario);
    onGuardado(); // Notifica al padre que se ha guardado
    onClose(); // Cierra el modal
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={estiloModal}>
        <Typography variant="h6" gutterBottom>Editar Usuario</Typography>
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
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>Guardar Cambios</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditarUsuarioModal;
