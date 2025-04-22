import db from '../config/db.js';
import bcrypt from 'bcryptjs';

import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

// Función para iniciar sesión (login)
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

// Función para registrar un nuevo usuario
export const registrar_usuario = async (req, res) => {
    const { nombre, correo, contraseña, rol } = req.body;
  
    try {
      // Verificar si el correo ya está registrado
      const [rows] = await db.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
  
      if (rows.length > 0) {
        return res.status(400).json({ mensaje: 'El correo ya está registrado' });
      }
  
      // Encriptar la contraseña
      const contraseñaHash = await bcrypt.hash(contraseña, 10);
  
      // Insertar el nuevo usuario en la base de datos
      const [result] = await db.query(
        'INSERT INTO Usuarios (nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)',
        [nombre, correo, contraseñaHash, rol]
      );
  
      res.status(201).json({ mensaje: 'Usuario creado con éxito', id: result.insertId });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error en el servidor' });
    }
  };