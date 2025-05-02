import React from 'react';

// Este es un componente funcional llamado VentanaEmergente
// Recibe 4 props:
// - open: booleano que indica si la ventana está abierta o no
// - handleClose: función para cerrar la ventana
// - title: título que se mostrará en la parte superior del diálogo
// - children: el contenido personalizado que se quiera mostrar dentro del cuerpo del diálogo

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const VentanaEmergente = ({ open, handleClose, title, children }) => {
  return (
    
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      aria-labelledby="ventana-emergente-title"
    >
      
      <DialogTitle>{title}</DialogTitle> 
      <DialogContent dividers>
        {children}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VentanaEmergente;
