import axios from 'axios';

// URL base del backend (ajústala según la configuración de tu servidor)
const API_URL = 'http://localhost:5000'; 

// Función para obtener todos los clientes (GET)
export const obtenerClientes = async () => {
  try {
    const response = await axios.get(`${API_URL}/clientes`); 
    return response.data; 
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return []; // En caso de error, retorna un arreglo vacío
  }
};

// Función para agregar un nuevo cliente (POST)
export const crearCliente = async (cliente) => {  
  try {
    const response = await axios.post(`${API_URL}/clientes`, cliente); 
    return response.data; 
  } catch (error) {
    console.error("Error agregando cliente:", error);
  }
};

// Función para actualizar un cliente (PUT)
export const actualizarCliente = async (id, clinteActualizado) => {  
  try {
    const response = await axios.put(`${API_URL}/clientes/${id}`, clinteActualizado); 
    return response.data; 
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
  }
};

// Función para eliminar un cliente (DELETE)
export const eliminarCliente = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/clientes/${id}`); 
    return response.data; // Retorna la respuesta del backend (mensaje de éxito, etc.)
  } catch (error) {
    console.error("Error eliminando cliente:", error);
  }
};
