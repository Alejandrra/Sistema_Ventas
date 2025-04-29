import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importar axios
import { TextField, Button, Box, Typography, Paper, Grid } from '@mui/material';

const ForgotPassword = () => {
  const [correo, setCorreo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/recuperar-password', { correo });
      alert(response.data.mensaje); // Mostrar mensaje del servidor
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Error al intentar recuperar la contraseña');
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh', backgroundColor: '#0d1117', justifyContent: 'center', alignItems: 'center' }}>
      <Grid item xs={11} sm={8} md={5} component={Paper} elevation={6} square sx={{ backgroundColor: '#0d1117', color: 'white', p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Recuperar contraseña
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: '#aaa' } }}
              sx={{ backgroundColor: '#161b22', borderRadius: 1 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#c9d1d9', color: '#0d1117' }}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
