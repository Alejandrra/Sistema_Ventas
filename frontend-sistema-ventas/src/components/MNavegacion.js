import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const Navbar = () => {
  const isAuthenticated = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Toolbar>
        {isAuthenticated ? (
          <>
            <Button component={Link} to="/inicio" sx={{ color: 'white', margin: '0 10px' }}>Inicio</Button>
            <Button component={Link} to="/clientes" sx={{ color: 'white', margin: '0 10px' }}>Clientes</Button>
            <Button component={Link} to="/usuarios" sx={{ color: 'white', margin: '0 10px' }}>Usuarios</Button>
            <Button component={Link} to="/productos" sx={{ color: 'white', margin: '0 10px' }}>Productos</Button>
            <Button component={Link} to="/ventas" sx={{ color: 'white', margin: '0 10px' }}>Ventas</Button>
            <Button component={Link} to="/detalle_venta" sx={{ color: 'white', margin: '0 10px' }}>Detalle Venta</Button>
            <Button onClick={handleLogout} sx={{ color: 'white', margin: '0 10px' }}>Cerrar sesión</Button>
          </>
        ) : (
          <Button component={Link} to="/login" sx={{ color: 'white', margin: '0 10px' }}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
