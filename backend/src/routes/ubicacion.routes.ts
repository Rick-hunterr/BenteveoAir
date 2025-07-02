import { Router } from "express"
import { obtenerUbicaciones, crearUbicacion, eliminarUbicacion } from "../controllers/ubicacion.controller"

const router = Router()

router.get("/", obtenerUbicaciones)
router.post("/", crearUbicacion)
router.delete("/:id", eliminarUbicacion)

export default router
