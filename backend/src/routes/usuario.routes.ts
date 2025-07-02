import { Router } from "express"
import { obtenerUsuarios, crearUsuario } from "../controllers/usuario.controller"

const router = Router()

router.get("/", obtenerUsuarios)
router.post("/", crearUsuario)

export default router
