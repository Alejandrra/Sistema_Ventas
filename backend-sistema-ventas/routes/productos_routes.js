//const express = require('express');
import express from "express";
const router = express.Router();
//const productosController = require('../controllers/productos_controllers');
import { obtener_productos, crear_producto,actualizar_producto,eliminar_producto } from'../controllers/productos_controllers.js';

// Definir rutas
router.get('/', obtener_productos);
router.post('/', crear_producto);
router.put('/:id', actualizar_producto);
router.delete('/:id', eliminar_producto);

export default router;
