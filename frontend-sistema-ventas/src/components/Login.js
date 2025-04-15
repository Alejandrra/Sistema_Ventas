// Importamos React y useState para manejar estados del formulario
import React, { useState } from 'react';

// Importamos componentes de MUI para construir la interfaz
import {
  Box,           // Contenedor flexible
  Button,        // Botón
  TextField,     // Campo de texto
  Typography,    // Texto estilizado
  Paper,         // Contenedor con sombra (tarjeta)
  CssBaseline,   // Normaliza el CSS
  Avatar,        // Ícono de usuario
  Container      // Centra y da márgenes automáticos
} from '@mui/material';

// Icono de candado para el login
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// Componente de Login
const Login = () => {

  // Estados locales para capturar correo y contraseña
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    console.log("Correo:", correo, "Contraseña:", contrasena); // Solo para prueba
    
  };

  return (
    <Container component="main" maxWidth="xs"> {/* Contenedor centrado y pequeño */}
      <CssBaseline /> {/* Normaliza el estilo base */}

      {/* Tarjeta del login con fondo oscuro */}
      <Paper
        elevation={6} // Nivel de sombra
        sx={{
          mt: 8,           // Margen superior
          p: 4,            // Padding interno
          bgcolor: '#1e1e1e', // Fondo oscuro
          color: 'white',  // Texto blanco
          borderRadius: 3  // Bordes redondeados
        }}
      >

        <Box
          sx={{
            display: 'flex',          // Flexbox
            flexDirection: 'column',  // Apilar verticalmente
            alignItems: 'center'      // Centrar horizontalmente
          }}
        >
          {/* Ícono de candado en la parte superior */}
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          {/* Título del formulario */}
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>

          {/* Formulario */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            
            {/* Campo para el correo */}
            <TextField
              fullWidth
              required
              label="Correo electrónico"
              type="email"
              variant="filled"
              margin="normal"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              InputProps={{ sx: { color: 'white' } }}         // Estilo del texto
              InputLabelProps={{ sx: { color: 'white' } }}    // Estilo del label
            />

            {/* Campo para la contraseña */}
            <TextField
              fullWidth
              required
              label="Contraseña"
              type="password"
              variant="filled"
              margin="normal"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              InputProps={{ sx: { color: 'white' } }}
              InputLabelProps={{ sx: { color: 'white' } }}
            />

            {/* Botón para enviar */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

// Exportamos el componente para usarlo en App.js u otras partes
export default Login;
