import React, { useEffect, useState } from "react";
import {
  obtenerDetalle_Ventas,
  crearDetalle_Ventas,
  eliminarDetalle_Ventas,
} from "../services/api/apiDetalle_Ventas";
import { Box, TextField, Button, Typography, Paper, Grid, List, ListItem, ListItemText } from "@mui/material";
import EditarDetalleVentaModal from "../components/EditarDetalleVentaModal";

const Detalle_Venta = () => {
  const [detalle_ventas, setDetalle_Ventas] = useState([]);
  const [nuevaDetalle_Venta, setNuevaDetalle_Venta] = useState({
    venta_id: "",
    producto_id: "",
    cantidad: "",
    precio: "",
    subtotal: "",
  });
  const [detalleSeleccionado, setDetalleSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    cargarDetalle_Ventas();
  }, []);

  const cargarDetalle_Ventas = async () => {
    const data = await obtenerDetalle_Ventas();
    setDetalle_Ventas(data);
  };

  const handleCrearDetalle_Venta = async () => {
    const { venta_id, producto_id, cantidad, precio, subtotal } = nuevaDetalle_Venta;
    if (!venta_id || !producto_id || !cantidad || !precio || !subtotal) {
      alert("Completa todos los campos");
      return;
    }

    const detalleFormateado = {
      venta_id,
      producto_id,
      cantidad: parseInt(cantidad),
      precio: parseFloat(precio),
      subtotal: parseFloat(subtotal),
    };

    await crearDetalle_Ventas(detalleFormateado);
    setNuevaDetalle_Venta({
      venta_id: "",
      producto_id: "",
      cantidad: "",
      precio: "",
      subtotal: "",
    });
    cargarDetalle_Ventas();
  };

  const handleEliminarDetalle_Venta = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este detalle venta?")) return;
    await eliminarDetalle_Ventas(id);
    cargarDetalle_Ventas();
  };

  const abrirModalEditar = (detalle) => {
    setDetalleSeleccionado(detalle);
    setModalAbierto(true);
  };

  const cerrarModalEditar = () => {
    setDetalleSeleccionado(null);
    setModalAbierto(false);
  };

  return (
    <Box sx={{ maxWidth: "1000px", margin: "auto", padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Detalles de Ventas
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Agregar Detalle Venta
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="ID Venta"
              value={nuevaDetalle_Venta.venta_id}
              onChange={(e) => setNuevaDetalle_Venta({ ...nuevaDetalle_Venta, venta_id: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="ID Producto"
              value={nuevaDetalle_Venta.producto_id}
              onChange={(e) => setNuevaDetalle_Venta({ ...nuevaDetalle_Venta, producto_id: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="Cantidad"
              value={nuevaDetalle_Venta.cantidad}
              onChange={(e) => setNuevaDetalle_Venta({ ...nuevaDetalle_Venta, cantidad: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Precio"
              value={nuevaDetalle_Venta.precio}
              onChange={(e) => setNuevaDetalle_Venta({ ...nuevaDetalle_Venta, precio: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Subtotal"
              value={nuevaDetalle_Venta.subtotal}
              onChange={(e) => setNuevaDetalle_Venta({ ...nuevaDetalle_Venta, subtotal: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleCrearDetalle_Venta}>
              Agregar Detalle Venta
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Lista de Detalles de Ventas
      </Typography>
      <List>
        {detalle_ventas.map((detalle) => (
          <Paper key={detalle.id} elevation={2} sx={{ marginBottom: 2, padding: 2 }}>
            <ListItem>
              <ListItemText
                primary={`Detalle ID: ${detalle.id}`}
                secondary={
                  <>
                    <strong>Venta ID:</strong> {detalle.venta_id} |{" "}
                    <strong>Producto ID:</strong> {detalle.producto_id} |{" "}
                    <strong>Cantidad:</strong> {detalle.cantidad} |{" "}
                    <strong>Precio:</strong> ${detalle.precio} |{" "}
                    <strong>Subtotal:</strong> ${detalle.subtotal}
                  </>
                }
              />
            </ListItem>
            <Box sx={{ display: "flex", gap: 1, paddingLeft: 2 }}>
              <Button variant="outlined" color="primary" onClick={() => abrirModalEditar(detalle)}>
                Editar
              </Button>
              <Button variant="outlined" color="error" onClick={() => handleEliminarDetalle_Venta(detalle.id)}>
                Eliminar
              </Button>
            </Box>
          </Paper>
        ))}
      </List>

      <EditarDetalleVentaModal
        open={modalAbierto}
        onClose={cerrarModalEditar}
        detalle={detalleSeleccionado}
        onSave={cargarDetalle_Ventas}
      />
    </Box>
  );
};

export default Detalle_Venta;
