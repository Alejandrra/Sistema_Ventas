//una barra de menú que aparece en la parte superior de la aplicación y  permite
//  moverte entre las diferentes páginas fácilmente, sin recargar la página completa

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#333', color: 'white' }}>
      <Link to="/" style={{ margin: '0 10px', color: 'white' }}>Inicio</Link>
      <Link to="/login" style={{ margin: '0 10px', color: 'white' }}>Login</Link>
      <Link to="/clientes" style={{ margin: '0 10px', color: 'white' }}>Clientes</Link>
      <Link to="/usuarios" style={{ margin: '0 10px', color: 'white' }}>Usuarios</Link>
      <Link to="/productos" style={{ margin: '0 10px', color: 'white' }}>Productos</Link>
      <Link to="/ventas" style={{ margin: '0 10px', color: 'white' }}>Ventas</Link>
      <Link to="/detalle_venta" style={{ margin: '0 10px', color: 'white' }}>Detalle_Venta</Link>
     
    </nav>
  );
};

export default Navbar;
