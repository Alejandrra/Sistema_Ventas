import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Paper
} from '@mui/material';

const Login = () => {
  const [form, setForm] = useState({ usuario: '', contrasena: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.usuario || !form.contrasena) {
      alert("Completa todos los campos");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        alert("¡Bienvenido!");
        // Aquí puedes guardar token o redirigir
      } else {
        alert(data.mensaje || "Credenciales inválidas");
      }
    } catch (err) {
      console.error("Error en el login:", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 10 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Iniciar sesión
        </Typography>
        <TextField
          fullWidth
          label="Usuario"
          name="usuario"
          margin="normal"
          value={form.usuario}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          name="contrasena"
          margin="normal"
          value={form.contrasena}
          onChange={handleChange}
        />
        <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
