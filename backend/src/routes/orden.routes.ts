import { Router } from "express";
import { obtenerOrdenes, crearOrden } from "../controllers/orden.controller";

const router = Router();

router.get("/", obtenerOrdenes);
router.post("/", crearOrden);

export default router;
