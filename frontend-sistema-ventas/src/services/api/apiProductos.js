import axios from 'axios';

// URL base del backend (ajústala según la configuración de tu servidor)
const API_URL = 'http://localhost:5000/api';

// Función para obtener todos los productos (GET)
export const obtenerProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos`); // Llamada a la ruta GET '/productos' del backend
    return response.data; // Retorna los productos obtenidos
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return []; // En caso de error, retorna un arreglo vacío
  }
};

// Función para agregar un nuevo producto (POST)
export const crearProducto = async (producto) => {  
  try {
    console.log("Enviando producto:", producto);
    const response = await axios.post(`${API_URL}/productos`, producto, {
      headers: {
        "Content-Type": "application/json", // ✅ Agregado para evitar problemas
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear producto:", error);
  }
};

// Función para actualizar un producto (PUT)
export const actualizarProducto = async (id, productoActualizado) => {  
  try {
    const response = await axios.put(`${API_URL}/productos/${id}`, productoActualizado, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
  }
};

// Función para eliminar un producto (DELETE)
export const eliminarProducto = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
  }
};
