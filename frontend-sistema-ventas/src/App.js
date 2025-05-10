import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Usuarios from "./pages/Usuarios";
import Clientes from "./pages/Clientes";
import Productos from './pages/Productos';
import Ventas from "./pages/Ventas";
import Detalle_Ventas from "./pages/Detalle_Venta";
import Login from './pages/Login';
import Navbar from './components/MNavegacion';
import Registro from './pages/Registro';
import Bienvenida from './pages/Bienvenido';
import EditarClienteModal from './components/EditarClienteModal';
import EditarUsuarioModal from './components/EditarUsuarioModal';
import EditarProductooModal from './components/EditarProductoModal';
import EditarVentaModal from './components/EditarVentaModal';

import EditarDetalleVentaModal from './components/EditarDetalleVentaModal';
import ForgotPassword from './pages/ForgotPassword'; 
import ResetPassword from './pages/ResetPassword'; 



function App() {
  // Verificar si el token existe en el localStorage
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirigir desde la raíz al login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Ruta de bienvenida solo si está autenticado */}
        <Route path="/inicio" element={isAuthenticated ? <Bienvenida /> : <Navigate to="/login" />} />
        
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password/:resetToken" element={<ResetPassword />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas protegidas */}
        <Route path="/clientes" element={isAuthenticated ? <Clientes /> : <Navigate to="/login" />} />
        <Route path="/clientes/editar/:id" element={isAuthenticated ? <EditarClienteModal/>: <Navigate to="/login" />} />

        <Route path="/usuarios" element={isAuthenticated ? <Usuarios /> : <Navigate to="/login" />} />
        <Route path="/usuarios/editar/:id" element={isAuthenticated ? <EditarUsuarioModal/>: <Navigate to="/login" />} />
        
        <Route path="/productos" element={isAuthenticated ? <Productos /> : <Navigate to="/login" />} />
        <Route path="/productos/editar/:id" element={isAuthenticated ? <EditarProductooModal/>: <Navigate to="/login" />} />

        <Route path="/ventas" element={isAuthenticated ? <Ventas /> : <Navigate to="/login" />} />
        <Route path="/ventas/editar/:id" element={isAuthenticated ? <EditarVentaModal/>: <Navigate to="/login" />} />

        <Route path="/detalle_venta" element={isAuthenticated ? <Detalle_Ventas /> : <Navigate to="/login" />} />
        <Route path="detalle_venta/editar/:id" element={isAuthenticated ? <EditarDetalleVentaModal/>: <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
