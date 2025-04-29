// testEmail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  }
});

const mailOptions = {
  from: process.env.GMAIL_USER,
  to: 'nicole73711@gmail.com', 
  subject: 'Correo de prueba',
  text: 'Este es un correo de prueba enviado desde Node.js'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('❌ Error al enviar correo:', error);
  } else {
    console.log('✅ Correo enviado:', info.response);
  }
});
