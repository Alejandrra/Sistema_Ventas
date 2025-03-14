//const express = require('express');
import express from "express";

const router = express.Router();
import { obtener_clientes, obtener_cliente_Id, crear_cliente, actualizar_cliente, eliminar_cliente }  from '../controllers/clientes_controllers.js';

// Definir rutas
router.get('/', obtener_clientes);
router.get('/:id', obtener_cliente_Id);
router.post('/', crear_cliente);
router.put('/:id', actualizar_cliente);
router.delete('/:id', eliminar_cliente);

export default router;
