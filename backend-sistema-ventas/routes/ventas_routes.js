//const express = require('express');
import express from "express";
const router = express.Router();
//const ventasController = require('../controllers/ventas_controllers');
import { obtener_ventas, crear_venta,actualizar_venta,eliminar_venta } from '../controllers/ventas_controllers.js';

router.get("/", obtener_ventas);
router.post("/", crear_venta);
router.put("/:id", actualizar_venta);
router.delete("/:id", eliminar_venta);

export default router;
