import { Router } from "express";
import { getProductos, getProductById,getProductCategories, getProductosByCategory} from "../controllers/productos.controller.js";
const router = Router();
router.get('/productos' ,getProductos);
router.get('/productos/category', getProductCategories); // Endpoint para obtener categorías
router.get('/productos/:id', getProductById);
router.get('/productos/category/:categoria', getProductosByCategory); 
export default router;