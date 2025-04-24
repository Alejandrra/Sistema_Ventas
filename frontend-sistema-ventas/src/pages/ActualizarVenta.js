import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import { obtenerVentaPorId, actualizarVenta } from "../services/api/apiVentas";

const EditarVenta = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venta, setVenta] = useState({
    cliente_id: "",
    usuario_id: "",
    fecha: "",
    total: ""
  });

  useEffect(() => {
    const cargarVenta = async () => {
      try {
        const data = await obtenerVentaPorId(id);
        setVenta({
          cliente_id: data.cliente_id || "",
          usuario_id: data.usuario_id || "",
          fecha: data.fecha ? data.fecha.substring(0, 16) : "",
          total: data.total || ""
        });
      } catch (error) {
        console.error("Error al cargar la venta:", error);
      }
    };

    cargarVenta();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenta({ ...venta, [name]: value });
  };

  const handleActualizar = async () => {
    try {
      await actualizarVenta(id, {
        ...venta,
        total: parseFloat(venta.total),
        fecha: venta.fecha + ":00"
      });
      alert("Venta actualizada correctamente");
      navigate("/ventas");
    } catch (error) {
      console.error("Error al actualizar venta:", error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Editar Venta #{id}
      </Typography>

      <TextField
        fullWidth
        label="ID Cliente"
        name="cliente_id"
        value={venta.cliente_id}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="ID Usuario"
        name="usuario_id"
        value={venta.usuario_id}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Fecha"
        name="fecha"
        type="datetime-local"
        value={venta.fecha}
        onChange={handleChange}
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        label="Total"
        name="total"
        type="number"
        value={venta.total}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleActualizar}>
        Guardar Cambios
      </Button>
    </Box>
  );
};

export default EditarVenta;
