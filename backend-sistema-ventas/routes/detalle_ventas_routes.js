//const express = require('express');
import express from "express";
const router = express.Router();
//const detalleVentaController = require('../controllers/detalle_venta_controllers');
import { Obtener_Detalles_Venta, obtener_Detalle_Venta_Id,Agregar_Detalle_Venta, Actualizar_Detalle_Venta, Eliminar_Detalle_Venta } from '../controllers/detalle_venta_controllers.js';

router.get("/", Obtener_Detalles_Venta);
router.get("/:id", obtener_Detalle_Venta_Id);
router.post("/", Agregar_Detalle_Venta);
router.put("/:id", Actualizar_Detalle_Venta);
router.delete("/:id", Eliminar_Detalle_Venta);

export default router;
