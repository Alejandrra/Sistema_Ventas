import React, { useEffect, useState } from "react";
import {
  obtenerVentas,
  crearVenta,
  actualizarVenta,
  eliminarVenta,
} from "../services/api/apiVentas";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";

const Venta = () => {
  const [ventas, setVentas] = useState([]);
  const [nuevaVenta, setNuevaVenta] = useState({
    cliente_id: "",
    usuario_id: "",
    fecha: "",
    total: "",
    productos: [],
  });
  const [producto, setProducto] = useState({
    producto_id: "",
    cantidad: "",
    precio: "",
  });

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    try {
      const data = await obtenerVentas();
      setVentas(data);
    } catch (error) {
      console.error("Error al cargar ventas:", error);
    }
  };

// Función para formatear la fecha correctamente
  const formatearFecha = (fecha) => {
    return fecha ? fecha.replace("T", " ") + ":00" : null;
  };

  const handleCrearVenta = async () => {
    if (
      !nuevaVenta.cliente_id ||
      !nuevaVenta.usuario_id ||
      !nuevaVenta.total ||
      nuevaVenta.productos.length === 0
    ) {
      alert("Completa todos los campos obligatorios y agrega al menos un producto");
      return;
    }

    const ventaFormateada = {
      cliente_id: nuevaVenta.cliente_id,
      usuario_id: nuevaVenta.usuario_id,
      fecha: nuevaVenta.fecha ? formatearFecha(nuevaVenta.fecha) : undefined,
      total: parseFloat(nuevaVenta.total),
      productos: nuevaVenta.productos, // Agregar productos a la venta
    };

    try {
      await crearVenta(ventaFormateada);
      alert("Venta creada correctamente");
      setNuevaVenta({ cliente_id: "", usuario_id: "", fecha: "", total: "", productos: [] }); // Limpiar después de agregar
      cargarVentas();
    } catch (error) {
      console.error("Error al crear venta:", error);
    }
  };
// Función para agregar un producto a la venta
  const handleAgregarProducto = () => {
    if (!producto.producto_id || !producto.cantidad || !producto.precio) {
      alert("Completa todos los campos del producto.");
      return;
    }

    const nuevoProducto = {
      producto_id: producto.producto_id,
      cantidad: producto.cantidad,
      precio: producto.precio,
    };

    setNuevaVenta({
      ...nuevaVenta,
      productos: [...nuevaVenta.productos, nuevoProducto],
    });

    setProducto({ producto_id: "", cantidad: "", precio: "" }); // Limpiar campos de producto
  };

  const handleActualizarVenta = async (id) => {
    const nuevoClienteId = prompt("Nuevo Cliente ID:");
    const nuevoUsuarioId = prompt("Nuevo Usuario ID:");
    const nuevaFecha = prompt("Nueva Fecha (YYYY-MM-DD HH:MM:SS):");
    const nuevoTotal = prompt("Nuevo Total:");

    if (!nuevoClienteId || !nuevoUsuarioId || !nuevaFecha || !nuevoTotal) return;

    try {
      await actualizarVenta(id, {
        cliente_id: nuevoClienteId,
        usuario_id: nuevoUsuarioId,
        fecha: nuevaFecha,
        total: parseFloat(nuevoTotal),
      });
      cargarVentas();
    } catch (error) {
      console.error("Error al actualizar venta:", error);
    }
  };

  const handleEliminarVenta = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta venta?")) return;

    try {
      await eliminarVenta(id);
      cargarVentas();
    } catch (error) {
      console.error("Error al eliminar venta:", error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Ventas
      </Typography>

      <Grid container spacing={2}>
        {ventas.map((venta) => (
          <Grid item xs={12} md={6} key={venta.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Venta #{venta.id}</Typography>
                <Typography>🧑 Cliente ID: {venta.cliente_id}</Typography>
                <Typography>👨‍💼 Usuario ID: {venta.usuario_id}</Typography>
                <Typography>📅 Fecha: {venta.fecha}</Typography>
                <Typography>💰 Total: ${venta.total}</Typography>

                <Stack direction="row" spacing={1} mt={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleActualizarVenta(venta.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleEliminarVenta(venta.id)}
                  >
                    Eliminar
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Agregar Nueva Venta
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="ID Cliente"
            value={nuevaVenta.cliente_id}
            onChange={(e) => setNuevaVenta({ ...nuevaVenta, cliente_id: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="ID Usuario"
            value={nuevaVenta.usuario_id}
            onChange={(e) => setNuevaVenta({ ...nuevaVenta, usuario_id: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            type="datetime-local"
            label="Fecha"
            InputLabelProps={{ shrink: true }}
            value={nuevaVenta.fecha}
            onChange={(e) =>
              setNuevaVenta({ ...nuevaVenta, fecha: e.target.value + ":00" })
            }
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            type="number"
            label="Total"
            value={nuevaVenta.total}
            onChange={(e) => setNuevaVenta({ ...nuevaVenta, total: e.target.value })}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" mt={4}>
        Agregar Producto a la Venta
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="ID Producto"
            value={producto.producto_id}
            onChange={(e) => setProducto({ ...producto, producto_id: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Cantidad"
            type="number"
            value={producto.cantidad}
            onChange={(e) => setProducto({ ...producto, cantidad: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Precio"
            type="number"
            value={producto.precio}
            onChange={(e) => setProducto({ ...producto, precio: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleAgregarProducto}>
            Agregar Producto
          </Button>
        </Grid>
      </Grid>

      <Box mt={2}>
        <Typography variant="body1">Productos Agregados:</Typography>
        <List dense>
          {nuevaVenta.productos.map((prod, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`ID: ${prod.producto_id}, Cantidad: ${prod.cantidad}, Precio: ${prod.precio}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Button variant="contained" color="primary" onClick={handleCrearVenta} sx={{ mt: 3 }}>
        Guardar Venta
      </Button>
    </Box>
  );
};

export default Venta;
