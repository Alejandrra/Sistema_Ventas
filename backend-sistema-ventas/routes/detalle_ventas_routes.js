//const express = require('express');
import express from "express";
const router = express.Router();
//const detalleVentaController = require('../controllers/detalle_venta_controllers');
import detalleVentaController from '../controllers/detalle_venta_controllers';

router.get("/", detalleVentaController.obtener_detalles_venta);
router.post("/", detalleVentaController.agregar_detalle_venta);
router.put("/:id", detalleVentaController.actualizar_detalle_venta);
router.delete("/:id", detalleVentaController.eliminar_detalle_venta);

export default router;
