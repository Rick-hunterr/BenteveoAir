import { Router } from "express";
import { obtenerServicios, crearServicio } from "../controllers/servicio.controller";

const router = Router();

router.get("/", obtenerServicios);
router.post("/", crearServicio);

export default router;
