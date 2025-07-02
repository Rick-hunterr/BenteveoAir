import { Router } from "express"
import { obtenerUsuarios, crearUsuario, eliminarUsuario, actualizarUsuario} from "../controllers/usuario.controller"

const router = Router()

router.get("/", obtenerUsuarios)
router.post("/", crearUsuario)
router.delete("/:id", eliminarUsuario)
router.put("/:id", actualizarUsuario)

export default router

