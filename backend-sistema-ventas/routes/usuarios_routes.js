//const express = require('express');
import express from "express";
const router = express.Router();
//const usuariosController = require('../controllers/usuarios_controllers');
import usuariosController from '../controllers/usuarios_controllers';

// Definir rutas
router.get('/', usuariosController.obtener_usuarios);
router.get('/:id', usuariosController.obtener_usuarios_id);
router.post('/', usuariosController.crear_usuario);
router.put('/:id', usuariosController.actualizar_usuario);
router.delete('/:id', usuariosController.eliminar_usuario);

export default router;
