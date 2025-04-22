
import React, { useState } from 'react';
import { registroUsuario } from '../services/api/auth';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import axios from 'axios';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [rol, setRol] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Usar el hook useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const result = await registroUsuario(nombre, correo, contraseña, rol);
        
        if (result.success) {
          setSuccessMessage(result.message); // Mensaje de éxito
          setError('');  // Limpiar mensaje de error
          navigate('/login'); // Redirigir al login después de registro exitoso
        } else {
          setError(result.message);  // Si hay error, mostramos el mensaje de error
          setSuccessMessage('');
        }
      };

      return (
        <Grid
          container
          component="main"
          sx={{
            height: '100vh',
            backgroundColor: '#0d1117',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid
            item
            xs={11}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{
              backgroundColor: '#0d1117',
              color: 'white',
              p: 4,
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                Registro
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  InputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: '#aaa' } }}
                  sx={{ backgroundColor: '#161b22', borderRadius: 1 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Correo"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  InputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: '#aaa' } }}
                  sx={{ backgroundColor: '#161b22', borderRadius: 1 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Contraseña"
                  type="password"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  InputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: '#aaa' } }}
                  sx={{ backgroundColor: '#161b22', borderRadius: 1 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Rol"
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  InputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: '#aaa' } }}
                  sx={{ backgroundColor: '#161b22', borderRadius: 1 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2, backgroundColor: '#c9d1d9', color: '#0d1117' }}
                >
                  Registrarse
                </Button>
              </Box>
    
              {error && <Typography color="error">{error}</Typography>}
              {successMessage && <Typography color="primary">{successMessage}</Typography>}
            </Box>
          </Grid>
        </Grid>
      );
    };
    

export default Registro;
