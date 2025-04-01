import axios from 'axios';

// URL base del backend (ajústala según la configuración de tu servidor)
const API_URL = 'http://localhost:5000/api';

// Función para obtener todas las ventas (GET)
export const obtenerVentas = async () => {
  try {
    const response = await axios.get(`${API_URL}/ventas`); 
    return response.data; 
  } catch (error) {
    console.error("Error al obtener las ventas:", error);
    return []; // En caso de error, retorna un arreglo vacío
  }
};

// Función para agregar una nueva ventas (POST)
export const crearVenta = async (venta) => {  
  try {
    console.log("Enviando venta:", venta);
    const response = await axios.post(`${API_URL}/ventas`, venta, {
      headers: {
        "Content-Type": "application/json", // Agregado para evitar problemas
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear venta:", error);
  }
};

// Función para actualizar una venta (PUT)
export const actualizarVenta = async (id, ventaActualizado) => {  
  try {
    const response = await axios.put(`${API_URL}/ventas/${id}`, ventaActualizado, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar venta:", error);
  }
};

// Función para eliminar una venta (DELETE)
export const eliminarVenta = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/ventas/${id}`); 
    return response.data; // Retorna la respuesta del backend (mensaje de éxito, etc.)
  } catch (error) {
    console.error("Error eliminando venta:", error);
  }
};
