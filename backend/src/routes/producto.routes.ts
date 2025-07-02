import { Router } from "express"
import { obtenerProductos, crearProducto, eliminarProducto, actualizarProducto, obtenerProductoPorId } from "../controllers/producto.controller"

const router = Router()

router.get("/", obtenerProductos)
router.post("/", crearProducto)
router.delete("/:id", eliminarProducto)
router.put("/:id", actualizarProducto)
router.get("/:id", obtenerProductoPorId)

export default router
