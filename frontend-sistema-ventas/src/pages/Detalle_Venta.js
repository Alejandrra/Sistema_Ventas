import React, { useEffect, useState } from "react";
import {
  obtenerDetalle_Ventas,
  crearDetalle_Ventas,
  eliminarDetalle_Ventas,
} from "../services/api/apiDetalle_Ventas";
import { Link } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Detalle_Venta = () => {
  const [detalle_ventas, setDetalle_Ventas] = useState([]);
  const [nuevaDetalle_Venta, setNuevaDetalle_Venta] = useState({
    venta_id: "",
    producto_id: "",
    cantidad: "",
    precio: "",
    subtotal: "",
  });

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
/*
  const handleActualizarDetalle_Venta = async (id) => {
    const nuevoVentaId = prompt("Nuevo Venta ID:");
    const nuevoProductoId = prompt("Nuevo Producto ID:");
    const nuevaCantidad = prompt("Nueva Cantidad:");
    const nuevoPrecio = prompt("Nuevo Precio:");
    const nuevoSubtotal = prompt("Nuevo Subtotal:");

    if (!nuevoVentaId || !nuevoProductoId || !nuevaCantidad || !nuevoPrecio || !nuevoSubtotal) return;

    await actualizarDetalle_Ventas(id, {
      venta_id: nuevoVentaId,
      producto_id: nuevoProductoId,
      cantidad: nuevaCantidad,
      precio: nuevoPrecio,
      subtotal: nuevoSubtotal,
    });

    cargarDetalle_Ventas();
  };
*/

  const handleEliminarDetalle_Venta = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este detalle venta?")) return;
    await eliminarDetalle_Ventas(id);
    cargarDetalle_Ventas();
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
              onChange={(e) =>
                setNuevaDetalle_Venta({ ...nuevaDetalle_Venta, venta_id: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="ID Producto"
              value={nuevaDetalle_Venta.producto_id}
              onChange={(e) =>
                setNuevaDetalle_Venta({ ...nuevaDetalle_Venta, producto_id: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="Cantidad"
              value={nuevaDetalle_Venta.cantidad}
              onChange={(e) =>
                setNuevaDetalle_Venta({ ...nuevaDetalle_Venta, cantidad: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Precio"
              value={nuevaDetalle_Venta.precio}
              onChange={(e) =>
                setNuevaDetalle_Venta({ ...nuevaDetalle_Venta, precio: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Subtotal"
              value={nuevaDetalle_Venta.subtotal}
              onChange={(e) =>
                setNuevaDetalle_Venta({ ...nuevaDetalle_Venta, subtotal: e.target.value })
              }
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
              <Link to={`detalle_venta/editar/${detalle.id}`} style={{ textDecoration: 'none' }}>
                <Button variant="outlined" size="small">Editar</Button>
              </Link>
              <Button variant="outlined" color="error" onClick={() => handleEliminarDetalle_Venta(detalle.id)}>
                Eliminar
              </Button>
            </Box>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default Detalle_Venta;
