//const express = require('express');
import express from "express";
const router = express.Router();
//const ventasController = require('../controllers/ventas_controllers');
import { obtener_Ventas, crear_Venta,actualizar_Venta,eliminar_Venta } from '../controllers/ventas_controllers.js';

router.get("/", obtener_Ventas);
router.post("/", crear_Venta);
router.put("/:id", actualizar_Venta);
router.delete("/:id", eliminar_Venta);

export default router;
