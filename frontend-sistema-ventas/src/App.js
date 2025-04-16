import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Usuarios from "./pages/Usuarios";
import Clientes from "./pages/Clientes";
import Productos from './pages/Productos';
import Ventas from "./pages/Ventas";
import Detalle_Ventas from "./pages/Detalle_Venta";
import Login from './pages/Login';
import Navbar from './components/MNavegacion';
import Bienvenida  from './pages/Bienvenido';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Bienvenida />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/detalle_venta" element={<Detalle_Ventas />} />
      </Routes>
    </Router>
  );
}

export default App;


/*
function App() {
  return (
    <div>
      <h1>Sistema de Ventas</h1>
      <Login/>
      <Usuarios />
      <Clientes />
      <Productos />
      <Ventas />
      <Detalle_Ventas />
    </div>
  );
}

export default App;
*/

