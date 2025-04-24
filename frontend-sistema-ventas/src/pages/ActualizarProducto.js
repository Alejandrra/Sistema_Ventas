import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { obtenerProductoPorId, actualizarProducto } from '../services/api/apiProductos';

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: ''
  });

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const data = await obtenerProductoPorId(id);
        setProducto({
          nombre: data.nombre || '',
          descripcion: data.descripcion || '',
          precio: data.precio || '',
          stock: data.stock || '',
          categoria: data.categoria || ''
        });
      } catch (error) {
        console.error('Error al obtener producto:', error);
      }
    };

    fetchProducto();
  }, [id]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos
    if (!producto.nombre || !producto.descripcion || !producto.precio || !producto.stock || !producto.categoria) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Validación de precio y stock
    if (isNaN(producto.precio) || producto.precio <= 0) {
      alert('El precio debe ser un número válido mayor a 0');
      return;
    }
    
    if (isNaN(producto.stock) || producto.stock < 0) {
      alert('El stock debe ser un número válido mayor o igual a 0');
      return;
    }

    const productoActualizado = {
      ...producto,
      precio: parseFloat(producto.precio),
      stock: parseInt(producto.stock)
    };

    try {
      await actualizarProducto(id, productoActualizado);
      navigate('/productos');
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>Editar Producto</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descripción"
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Precio"
          name="precio"
          type="number"
          value={producto.precio}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Stock"
          name="stock"
          type="number"
          value={producto.stock}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Categoría"
          name="categoria"
          value={producto.categoria}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Guardar Cambios
        </Button>
      </form>
    </Box>
  );
};

export default EditarProducto;
