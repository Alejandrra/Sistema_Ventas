import React from 'react';
import Usuarios from "./components/Usuarios";
import Clientes from "./components/Clientes";
import Productos from './components/Productos';
import Ventas from "./components/Ventas";
import Detalle_Ventas from "./components/Detalle_Venta";


function App() {
  return (
    <div>
      <h1>Sistema de Ventas</h1>
      <Usuarios />
      <Clientes />
      <Productos />
      <Ventas />
      <Detalle_Ventas />
    </div>
  );
}

export default App;
