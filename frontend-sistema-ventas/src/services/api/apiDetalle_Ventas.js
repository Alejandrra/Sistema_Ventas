import axios from 'axios';

// URL base del backend (ajústala según la configuración de tu servidor)
const API_URL = 'http://localhost:5000'; 

// Función para obtener todas los detalleVentas (GET)
export const obtenerDetalle_Ventas = async () => {
  try {
    const response = await axios.get(`${API_URL}/detalle_venta`); 
    return response.data; 
  } catch (error) {
    console.error("Error al obtener los detalle ventas:", error);
    return []; // En caso de error, retorna un arreglo vacío
  }
};

// Función para agregar un nuevo detalleVentas (POST)
export const crearDetalle_Ventas = async (detalle_ventas) => {  
  try {
    const response = await axios.post(`${API_URL}/detalle_venta`, detalle_ventas); 
    return response.data; 
  } catch (error) {
    console.error("Error agregando detalle ventas:", error);
  }
};

// Función para actualizar un detalleVenta (PUT)
export const actualizarDetalle_Ventas = async (id, detalle_ventaActualizado) => {  
  try {
    const response = await axios.put(`${API_URL}/detalle_venta/${id}`, detalle_ventaActualizado); 
    return response.data; 
  } catch (error) {
    console.error("Error al actualizar detalle venta:", error);
  }
};

// Función para eliminar una detalleVenta (DELETE)
export const eliminarDetalle_Ventas = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/detalle_venta/${id}`); 
    return response.data; // Retorna la respuesta del backend (mensaje de éxito, etc.)
  } catch (error) {
    console.error("Error eliminando detalle sventa:", error);
  }
};
