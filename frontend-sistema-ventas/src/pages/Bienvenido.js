import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // react-router-dom v6
import { Button } from '@mui/material';
import VentanaEmergente from '../components/VentanaEmergente'; // Ajusta la ruta si está en otra carpeta

const Bienvenida = () => {
  const [open, setOpen] = useState(false); // Controla si la ventana está abierta
  const navigate = useNavigate();

  useEffect(() => {
    // Abre la ventana emergente al cargar el componente
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const irAVista = (ruta) => {
    navigate(ruta);
    handleClose();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenido al Sistema de Ventas</h1>
      <p>Selecciona una opción del menú para comenzar.</p>

      {/* Ventana emergente de menú */}
      <VentanaEmergente open={open} handleClose={handleClose} title="Menú Principal">
        <Button fullWidth variant="contained" color="primary" onClick={() => irAVista('/clientes')}>
          Clientes
        </Button>
        <Button fullWidth variant="contained" color="secondary" onClick={() => irAVista('/productos')}>
          Productos
        </Button>
        <Button fullWidth variant="contained" color="success" onClick={() => irAVista('/ventas')}>
          Ventas
        </Button>
      </VentanaEmergente>
    </div>
  );
};

export default Bienvenida;
