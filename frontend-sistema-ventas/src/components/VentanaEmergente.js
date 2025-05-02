import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Popup = ({ open, handleClose, children, title }) => {
  // Función para abrir el popup
  const openPopup = () => {
    setPopupOpen(true);
  };
    return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
    
  );
};

export default Popup;
