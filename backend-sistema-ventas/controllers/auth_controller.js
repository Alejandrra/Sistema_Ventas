import db from '../config/db.js';
import bcrypt from 'bcryptjs';

import dotenv from 'dotenv';
dotenv.config();


import jwt from 'jsonwebtoken';

import nodemailer from 'nodemailer';
import crypto from 'crypto';

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

  // Crear el transporte de correo
const transporter = nodemailer.createTransport({
  service: 'gmail', // el servicio de correo
  auth: {
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_PASS  
  }
});

// Función para manejar la recuperación de contraseña
export const forgotPassword = async (req, res) => {
  const { correo } = req.body;

  try {
    // Verificar si el usuario existe
    const [rows] = await db.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);

    if (rows.length === 0) {
      return res.status(400).json({ mensaje: 'Usuario no encontrado' });
    }

    const usuario = rows[0];

    // Generar un token único para la recuperación de la contraseña
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiracion = Date.now() + 3600000; // 1 hora de validez

    // Guardar el token y su fecha de expiración en la base de datos
    await db.query('UPDATE Usuarios SET resetToken = ?, resetTokenExpiracion = ? WHERE correo = ?', [resetToken, resetTokenExpiracion, correo]);

    // Crear el enlace de recuperación
    const resetLink = `${process.env.FRONTEND_URL}/forgot-password/${resetToken}`;


    // Configurar el correo
    const mailOptions = {
      from: process.env.GMAIL_USER, 
      to: correo,
      subject: 'Recuperación de Contraseña',
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error al enviar el correo', error });
      }
      res.status(200).json({ mensaje: 'Correo de recuperación enviado' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Función para manejar el restablecimiento de contraseña
export const resetPassword = async (req, res) => {
  const { resetToken } = req.params; // el token viene en la URL
  const { nuevaContraseña } = req.body; // la nueva contraseña la manda el usuario en el formulario

  try {
    // Buscar usuario con ese token y que el token no haya expirado
    const [rows] = await db.query(
      'SELECT * FROM Usuarios WHERE resetToken = ? AND resetTokenExpiracion > ?',
      [resetToken, Date.now()]
    );

    if (rows.length === 0) {
      return res.status(400).json({ mensaje: 'Token inválido o expirado' });
    }

    const usuario = rows[0];

    // Encriptar la nueva contraseña
    const contraseñaHash = await bcrypt.hash(nuevaContraseña, 10);

    // Actualizar la contraseña y limpiar el resetToken y resetTokenExpiracion
    await db.query(
      'UPDATE Usuarios SET contraseña = ?, resetToken = NULL, resetTokenExpiracion = NULL WHERE id = ?',
      [contraseñaHash, usuario.id]
    );

    res.status(200).json({ mensaje: 'Contraseña restablecida correctamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};



