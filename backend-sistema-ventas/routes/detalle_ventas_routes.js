//const express = require('express');
import express from "express";
const router = express.Router();
//const detalleVentaController = require('../controllers/detalle_venta_controllers');
import { obtener_detalles_venta, agregar_detalle_venta, actualizar_detalle_venta, eliminar_detalle_venta } from '../controllers/detalle_venta_controllers.js';

router.get("/", obtener_detalles_venta);
router.post("/", agregar_detalle_venta);
router.put("/:id", actualizar_detalle_venta);
router.delete("/:id", eliminar_detalle_venta);

export default router;
