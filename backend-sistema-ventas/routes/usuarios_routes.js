//const express = require('express');
import express from "express";
const router = express.Router();
//const usuariosController = require('../controllers/usuarios_controllers');
import  { obtener_Usuarios, obtener_Usuarios_Id, crear_Usuario, actualizar_Usuario, eliminar_Usuario } from '../controllers/usuarios_controllers.js'; //llama directamente

// Definir rutas
router.get('/', obtener_Usuarios);
router.get('/:id',obtener_Usuarios_Id);
router.post('/', crear_Usuario);
router.put('/:id', actualizar_Usuario);
router.delete('/:id', eliminar_Usuario);

export default router;
