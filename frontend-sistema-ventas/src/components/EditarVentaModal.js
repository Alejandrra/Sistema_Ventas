import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { actualizarVenta } from "../services/api/apiVentas";

const EditarVentaModal = ({ open, handleClose, venta, recargarVentas }) => {
  const [ventaEditada, setVentaEditada] = useState({
    cliente_id: "",
    usuario_id: "",
    fecha: "",
    total: "",
  });

  useEffect(() => {
    if (venta) {
      setVentaEditada({
        cliente_id: venta.id_cliente || "",
        usuario_id: venta.id_usuario || "",
        fecha: venta.fecha ? venta.fecha.slice(0, 16) : "",
        total: venta.total || "",
      });
    }
  }, [venta]);

  const handleGuardarCambios = async () => {
    try {
      await actualizarVenta(venta.id, {
        ...ventaEditada,
        total: parseFloat(ventaEditada.total),
        fecha: ventaEditada.fecha + ":00",
      });
      recargarVentas();  // Recarga la lista en el componente padre
      handleClose();     // Cierra el modal
    } catch (error) {
      console.error("Error al actualizar venta:", error);
    }
  };

  const handleChange = (e) => {
    setVentaEditada({ ...ventaEditada, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Venta #{venta?.id}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="cliente_id"
              label="ID Cliente"
              fullWidth
              value={ventaEditada.cliente_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="usuario_id"
              label="ID Usuario"
              fullWidth
              value={ventaEditada.usuario_id}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="fecha"
              label="Fecha"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={ventaEditada.fecha}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="total"
              label="Total"
              type="number"
              fullWidth
              value={ventaEditada.total}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleGuardarCambios} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarVentaModal;
