import { Router } from "express";
import { obtenerOrdenes, crearOrden, eliminarOrden } from "../controllers/orden.controller";

const router = Router();

router.get("/", obtenerOrdenes);
router.post("/", crearOrden);
router.delete("/:id", eliminarOrden);

export default router;
