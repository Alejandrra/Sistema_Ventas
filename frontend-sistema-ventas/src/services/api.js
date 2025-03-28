import axios from 'axios';

// URL base del backend (ajústala según la configuración de tu servidor)
const API_URL = 'http://localhost:5000'; // Asegúrate de que el puerto y la URL sean correctos

// Función para obtener todos los productos (GET)
export const obtenerProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos`); // Llamada a la ruta GET '/productos' del backend
    return response.data; // Retorna los productos obtenidos
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // En caso de error, retorna un arreglo vacío
  }
};

// Función para agregar un nuevo producto (POST)
export const crearProducto = async (producto) => {  
  try {
    const response = await axios.post(`${API_URL}/productos`, producto); // Llamada a la ruta POST '/productos' del backend
    return response.data; // Retorna el producto agregado
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

// Función para actualizar un producto (PUT)
export const actualizarProducto = async (id, productoActualizado) => {  
  try {
    const response = await axios.put(`${API_URL}/productos/${id}`, productoActualizado); // Llamada a la ruta PUT '/productos/:id' del backend
    return response.data; // Retorna el producto actualizado
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

// Función para eliminar un producto (DELETE)
export const eliminarProducto = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/productos/${id}`); 
    return response.data; // Retorna la respuesta del backend (mensaje de éxito, etc.)
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
