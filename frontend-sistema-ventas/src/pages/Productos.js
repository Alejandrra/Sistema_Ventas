import React, { useEffect, useState } from 'react';
import { obtenerProductos, crearProducto, eliminarProducto } from '../services/api/apiProductos';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Stack
} from '@mui/material';

import EditarProductoModal from '../components/EditarProductoModal';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: ''
  });

  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const data = await obtenerProductos();
    setProductos(data);
  };

  const handleCrearProducto = async () => {
    const { nombre, descripcion, precio, stock, categoria } = nuevoProducto;
    if (!nombre || !descripcion || !precio || !stock || !categoria) {
      alert("Completa todos los campos");
      return;
    }

    const productoFormateado = {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      categoria
    };

    await crearProducto(productoFormateado);
    setNuevoProducto({ nombre: '', descripcion: '', precio: '', stock: '', categoria: '' });
    cargarProductos();
  };

  const handleEliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
    await eliminarProducto(id);
    cargarProductos();
  };

  const handleAbrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setModalAbierto(true);
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
    setProductoSeleccionado(null);
  };

  const handleProductoActualizado = () => {
    cargarProductos();
    handleCerrarModal();
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Lista de Productos</Typography>

      <Grid container spacing={2}>
        {productos.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">{producto.nombre}</Typography>
                <Typography variant="body2" color="text.secondary">{producto.descripcion}</Typography>
                <Typography variant="body2">💲{producto.precio} | Stock: {producto.stock}</Typography>
                <Typography variant="body2">Categoría: {producto.categoria}</Typography>
                <Stack direction="row" spacing={1} mt={2}>
                  <Button variant="outlined" size="small" onClick={() => handleAbrirModal(producto)}>Editar</Button>
                  <Button variant="contained" color="error" size="small" onClick={() => handleEliminarProducto(producto.id)}>Eliminar</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={5}>
        <Typography variant="h5" gutterBottom>Agregar Producto</Typography>
        <Stack spacing={2} direction="column" maxWidth={400}>
          <TextField
            label="Nombre"
            value={nuevoProducto.nombre}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
            fullWidth
          />
          <TextField
            label="Descripción"
            value={nuevoProducto.descripcion}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
            fullWidth
          />
          <TextField
            label="Precio"
            type="number"
            value={nuevoProducto.precio}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
            fullWidth
          />
          <TextField
            label="Stock"
            type="number"
            value={nuevoProducto.stock}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
            fullWidth
          />
          <TextField
            label="Categoría"
            value={nuevoProducto.categoria}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleCrearProducto}>
            Agregar
          </Button>
        </Stack>
      </Box>

      {modalAbierto && productoSeleccionado && (
        <EditarProductoModal
          id={productoSeleccionado.id}
          abierto={modalAbierto}
          onCerrar={handleCerrarModal}
          onGuardado={handleProductoActualizado}
        />
      )}
    </Box>
  );
};

export default Productos;
