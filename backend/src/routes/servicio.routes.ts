import { Router } from "express";
import { obtenerServicios, crearServicio, eliminarServicio, actualizarServicio } from "../controllers/servicio.controller";

const router = Router();

router.get("/", obtenerServicios);
router.post("/", crearServicio);
router.delete("/:id", eliminarServicio);
router.put("/:id", actualizarServicio);

export default router;
