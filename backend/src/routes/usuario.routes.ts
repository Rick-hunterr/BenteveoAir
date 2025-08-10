import { Router } from "express"
import { obtenerUsuarios, crearUsuario, eliminarUsuario, actualizarUsuario, loginUsuario, verificarRol, verifyEmail } from "../controllers/usuario.controller";

const router = Router()

router.get("/", obtenerUsuarios)
router.post("/", crearUsuario)
router.delete("/:id", eliminarUsuario)
router.put("/:id", actualizarUsuario)
router.post("/login", loginUsuario)
router.get("/rol", (req, res) => verificarRol(req, res))
router.get("/verify-email", verifyEmail)

export default router
