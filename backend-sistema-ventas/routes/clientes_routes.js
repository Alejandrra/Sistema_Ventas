//const express = require('express');
import express from "express";

const router = express.Router();
import { obtener_Clientes, obtener_Cliente_Id, crear_Cliente, actualizar_Cliente, eliminar_Cliente }  from '../controllers/clientes_controllers.js';

// Definir rutas
router.get('/', obtener_Clientes);
router.get('/:id', obtener_Cliente_Id);
router.post('/', crear_Cliente);
router.put('/:id', actualizar_Cliente);
router.delete('/:id', eliminar_Cliente);

export default router;
