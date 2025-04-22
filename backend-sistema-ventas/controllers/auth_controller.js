import db from '../config/db.js';
import bcrypt from 'bcryptjs';

import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

export const login_usuario = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);

    if (rows.length === 0) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    const usuario = rows[0];

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
        { id: usuario.id, correo: usuario.correo, rol: usuario.rol },
        process.env.JWT_SECRET, //variable de entorno
        { expiresIn: '1h' }
      );
      

    res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};
