import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

export const loginUsuario = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    const { token } = response.data;
    localStorage.setItem('token', token); // guarda el token
    return { success: true, token };
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return { success: false, message: error.response?.data?.message || 'Error desconocido' };
  }
};

export const registroUsuario = async (nombre, correo, contraseña, rol) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios`, {
      nombre,
      correo,
      contraseña,
      rol,
    });

    return { success: true, message: 'Usuario registrado exitosamente' };
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return { success: false, message: error.response?.data?.message || 'Error desconocido' };
  }
};