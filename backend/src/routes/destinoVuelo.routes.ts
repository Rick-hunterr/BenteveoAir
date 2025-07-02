import { Router } from "express";
import { obtenerDestinosVuelo, crearDestinoVuelo, eliminarDestinoVuelo } from "../controllers/destinoVuelo.controller";

const router = Router();

router.get("/", obtenerDestinosVuelo);
router.post("/", crearDestinoVuelo);
router.delete("/:id", eliminarDestinoVuelo);

export default router;