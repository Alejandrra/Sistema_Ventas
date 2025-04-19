import React, { useEffect, useState } from 'react';
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from '../services/api/apiProductos';
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

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: ''
  });
// Cargar productos al cargar el componente
  useEffect(() => {
    cargarProductos(); //obtener la lista de productos desde el backend
  }, []);

//Funcion para obtener los productos de la api
  const cargarProductos = async () => { 
    const data = await obtenerProductos(); //hace un GET al backend
    setProductos(data); //Guarda los datos en productos con setProductos(data)
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
      precio: parseFloat(precio), // Convertir a número
      stock: parseInt(stock), // Convertir a número entero
      categoria
    };

    await crearProducto(productoFormateado); //hace un POST a la API.
    setNuevoProducto({ nombre: '', descripcion: '', precio: '', stock: '', categoria: '' });
    cargarProductos(); //limpia y actualiza la lista de productos

  };

  const handleActualizarProducto = async (id) => {
    const nuevoPrecio = prompt("Nuevo precio:");
    const nuevoStock = prompt("Nuevo stock:");
    const nuevoNombre = prompt("Nuevo nombre:");
    const nuevoDescripcion = prompt("Nueva descripción:");
    const nuevoCategoria = prompt("Nueva categoría:");

    if (!nuevoPrecio || !nuevoStock || !nuevoNombre || !nuevoDescripcion || !nuevoCategoria) return;

    await actualizarProducto(id, {
      precio: nuevoPrecio,
      stock: nuevoStock,
      nombre: nuevoNombre,
      descripcion: nuevoDescripcion,
      categoria: nuevoCategoria
    });

    cargarProductos(); //vuelve a cargar los datos
  };

  const handleEliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
    await eliminarProducto(id); //hace un DELATE a la API.
    cargarProductos(); //vuelve a cargar los datos
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
                  <Button variant="outlined" size="small" onClick={() => handleActualizarProducto(producto.id)}>Editar</Button>
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
    </Box>
  );
};

export default Productos;
