import React, { useEffect, useState, useCallback } from "react";
import {
  obtenerDetalleVentaPorId,
  actualizarDetalle_Ventas,
} from "../services/api/apiDetalle_Ventas";
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
} from "@mui/material";

const EditorDetalleVenta = () => {
  const { id } = useParams(); // Obtener el id de la URL
  const navigate = useNavigate();
  const [detalleVenta, setDetalleVenta] = useState({
    venta_id: "",
    producto_id: "",
    cantidad: "",
    precio: "",
    subtotal: "",
  });

  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Usamos useCallback para memorizar la función y evitar el warning
  const cargarDetalleVenta = useCallback(async () => {
    try {
      console.log("Cargando detalle de venta con id:", id);  // Verificar que el id es correcto
      const data = await obtenerDetalleVentaPorId(id); // Función para obtener el detalle de la venta por ID
      console.log("Detalle de venta cargado:", data); // Verificar los datos cargados
      if (data) {
        setDetalleVenta(data);
      } else {
        console.error("No se encontró el detalle de la venta.");
      }
    } catch (error) {
      console.error("Error al cargar el detalle de venta:", error);
    } finally {
      setLoading(false); // Terminar el estado de carga
    }
  }, [id]);

  useEffect(() => {
    cargarDetalleVenta(); // Llamamos a la función para cargar los datos
  }, [id, cargarDetalleVenta]); // Añadimos 'cargarDetalleVenta' como dependencia

  const handleActualizarDetalleVenta = async () => {
    const { venta_id, producto_id, cantidad, precio, subtotal } = detalleVenta;

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

    try {
      await actualizarDetalle_Ventas(id, detalleFormateado); // Llamar para actualizar el detalle
      navigate("/detalle_venta"); // Redirigir después de la actualización
    } catch (error) {
      console.error("Error al actualizar el detalle de venta:", error);
    }
  };

  // Si los datos aún se están cargando, mostrar un mensaje de carga
  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: "1000px", margin: "auto", padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Editar Detalle Venta
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>
          Actualizar Detalle Venta
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="ID Venta"
              value={detalleVenta.venta_id}
              onChange={(e) =>
                setDetalleVenta({ ...detalleVenta, venta_id: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="ID Producto"
              value={detalleVenta.producto_id}
              onChange={(e) =>
                setDetalleVenta({ ...detalleVenta, producto_id: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="Cantidad"
              value={detalleVenta.cantidad}
              onChange={(e) =>
                setDetalleVenta({ ...detalleVenta, cantidad: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Precio"
              value={detalleVenta.precio}
              onChange={(e) =>
                setDetalleVenta({ ...detalleVenta, precio: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Subtotal"
              value={detalleVenta.subtotal}
              onChange={(e) =>
                setDetalleVenta({ ...detalleVenta, subtotal: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleActualizarDetalleVenta}>
              Actualizar Detalle Venta
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default EditorDetalleVenta;
