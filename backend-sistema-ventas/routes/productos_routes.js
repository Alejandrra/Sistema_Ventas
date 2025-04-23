import express from 'express';
const router = express.Router();
import  { obtener_Productos,obtener_Producto_Id, crear_Producto, actualizar_Producto, eliminar_Producto } from '../controllers/productos_controllers.js'; //llama directamente

// Definir rutas
router.get('/', obtener_Productos);
router.get('/:id', obtener_Producto_Id);
router.post('/', crear_Producto);
router.put('/:id', actualizar_Producto);
router.delete('/:id', eliminar_Producto);

export default router;
