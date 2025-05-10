import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";

const EditarDetalleVentaModal = ({ open, onClose, detalle, onGuardar }) => {
  const [detalleEditado, setDetalleEditado] = useState({
    venta_id: "",
    producto_id: "",
    cantidad: "",
    precio: "",
    subtotal: "",
  });

  useEffect(() => {
    if (detalle) {
      setDetalleEditado(detalle);
    }
  }, [detalle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetalleEditado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuardar = () => {
    const { venta_id, producto_id, cantidad, precio, subtotal } = detalleEditado;

    if (!venta_id || !producto_id || !cantidad || !precio || !subtotal) {
      alert("Completa todos los campos.");
      return;
    }

    const detalleFormateado = {
      ...detalleEditado,
      cantidad: parseInt(cantidad),
      precio: parseFloat(precio),
      subtotal: parseFloat(subtotal),
    };

    onGuardar(detalleFormateado);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Editar Detalle de Venta</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ID Venta"
              name="venta_id"
              value={detalleEditado.venta_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ID Producto"
              name="producto_id"
              value={detalleEditado.producto_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Cantidad"
              name="cantidad"
              type="number"
              value={detalleEditado.cantidad}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Precio"
              name="precio"
              type="number"
              value={detalleEditado.precio}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Subtotal"
              name="subtotal"
              type="number"
              value={detalleEditado.subtotal}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleGuardar} color="primary" variant="contained">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarDetalleVentaModal;
