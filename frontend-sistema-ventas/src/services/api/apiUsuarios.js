import axios from 'axios';

// URL base del backend (ajústala según la configuración de tu servidor)
const API_URL = 'http://localhost:5000/api';

// Función para obtener todos los usuarios (GET)
export const obtenerUsuario = async () => {
  try {
    const response = await axios.get(`${API_URL}/usuarios`); 
    return response.data; 
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return []; // En caso de error, retorna un arreglo vacío
  }
};

export const obtenerUsuarioPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios por ID:", error);
    return null;
  }
};

// Función para agregar un nuevo usuario (POST)
export const crearUsuario = async (usuario) => {  
  try {
    console.log("Enviando usuario:", usuario);
    const response = await axios.post(`${API_URL}/usuarios`, usuario, {
      headers: {
        "Content-Type": "application/json", // Agregado para evitar problemas
      },
    });
    console.log("Respuesta del servidor:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
  }
};

// Función para actualizar un usuario (PUT)
export const actualizarUsuario = async (id, usuarioActualizado) => {  
  try {
    const response = await axios.put(`${API_URL}/usuarios/${id}`, usuarioActualizado, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
  }
};

// Función para eliminar un usuario (DELETE)
export const eliminarUsuario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/usuarios/${id}`); 
    return response.data; // Retorna la respuesta del backend (mensaje de éxito, etc.)
  } catch (error) {
    console.error("Error eliminando usuario:", error);
  }
};
