//const express = require('express');
import express from "express";

const router = express.Router();
import clientesController from '../controllers/clientes_controllers';

// Definir rutas
router.get('/', clientesController.obtener_clientes);
router.get('/:id', clientesController.obtener_cliente_Id);
router.post('/', clientesController.crear_cliente);
router.put('/:id', clientesController.actualizar_cliente);
router.delete('/:id', clientesController.eliminar_cliente);

export default router;
