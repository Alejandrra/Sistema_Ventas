const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos_controllers');

// Definir rutas
router.get('/', productosController.obtener_productos);
//router.get('/:id', usuariosController.obtener_usuarios_id);
router.post('/', productosController.crear_producto);
router.put('/:id', productosController.actualizar_producto);
router.delete('/:id', productosController.delete);

module.exports = router;
