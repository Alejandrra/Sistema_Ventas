import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import { obtenerProductoPorId, actualizarProducto } from '../services/api/apiProductos';

const EditarProductoModal = ({ id, abierto, onCerrar, onGuardado }) => {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: ''
  });

  useEffect(() => {
    if (abierto && id) {
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
    }
  }, [abierto, id]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    if (!producto.nombre || !producto.descripcion || !producto.precio || !producto.stock || !producto.categoria) {
      alert('Todos los campos son obligatorios');
      return;
    }

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
      onGuardado();
      onCerrar();
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  return (
    <Dialog open={abierto} onClose={onCerrar}>
      <DialogTitle>Editar Producto</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onCerrar}>Cancelar</Button>
        <Button onClick={handleGuardar} variant="contained" color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarProductoModal;
