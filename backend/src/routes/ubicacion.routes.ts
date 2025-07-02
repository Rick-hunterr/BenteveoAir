import { Router } from "express"
import { obtenerUbicaciones, crearUbicacion } from "../controllers/ubicacion.controller"

const router = Router()

router.get("/", obtenerUbicaciones)
router.post("/", crearUbicacion)

export default router
