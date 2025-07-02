import { Router } from "express"
import { obtenerProductos, crearProducto, eliminarProducto } from "../controllers/producto.controller"

const router = Router()

router.get("/", obtenerProductos)
router.post("/", crearProducto)
router.delete("/:id", eliminarProducto)

export default router
