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

export const obtenerVentaPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/ventas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener ventas por ID:", error);
    return null;
  }
};

// Función para agregar una nueva venta (POST)
export const crearVenta = async (venta) => {  
  try {
    // Asegúrate de que los productos se estén enviando correctamente
    console.log("Enviando venta con productos:", venta);

    // Envía la venta con los productos al backend
    const response = await axios.post(`${API_URL}/ventas`, venta, {
      headers: {
        "Content-Type": "application/json", // Agregado para evitar problemas de contenido
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creando venta:", error);
    return null;
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
    return null;
  }
};

// Función para eliminar una venta (DELETE)
export const eliminarVenta = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/ventas/${id}`); 
    return response.data; // Retorna la respuesta del backend (mensaje de éxito, etc.)
  } catch (error) {
    console.error("Error eliminando venta:", error);
    return null;
  }
};
