const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas_controllers');

router.get("/", ventasController.obtener_ventas);
router.post("/", ventasController.crear_venta);
router.put("/:id", ventasController.actualizar_venta);
router.delete("/:id", ventasController.eliminar_venta);

module.exports = router;
