import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { resetToken } = useParams(); // Captura el token de la URL
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/reset-password/${resetToken}`, {
        nuevaContraseña,
      });

      setMensaje(res.data.mensaje);
      setError('');
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error desconocido');
      setMensaje('');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Restablecer Contraseña</h2>
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            value={nuevaContraseña}
            onChange={(e) => setNuevaContraseña(e.target.value)}
            required
          />
        </div>
        <button type="submit">Restablecer</button>
      </form>
    </div>
  );
};

export default ResetPassword;
