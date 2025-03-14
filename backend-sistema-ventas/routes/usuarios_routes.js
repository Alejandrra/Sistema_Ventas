//const express = require('express');
import express from "express";
const router = express.Router();
//const usuariosController = require('../controllers/usuarios_controllers');
import  { obtener_usuarios, obtener_usuarios_id, crear_usuario, actualizar_usuario, eliminar_usuario } from '../controllers/usuarios_controllers.js'; //llama directamente

// Definir rutas
router.get('/', obtener_usuarios);
router.get('/:id',obtener_usuarios_id);
router.post('/', crear_usuario);
router.put('/:id', actualizar_usuario);
router.delete('/:id', eliminar_usuario);

export default router;
