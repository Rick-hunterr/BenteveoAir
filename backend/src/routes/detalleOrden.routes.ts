import { Router } from "express";
import { obtenerDetallesOrden, crearDetalleOrden } from "../controllers/detalleOrden.controller";

const router = Router();

router.get("/", obtenerDetallesOrden);
router.post("/", crearDetalleOrden);

export default router;