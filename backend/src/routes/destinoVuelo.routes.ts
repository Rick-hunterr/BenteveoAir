import { Router } from "express";
import { obtenerDestinosVuelo, crearDestinoVuelo } from "../controllers/destinoVuelo.controller";

const router = Router();

router.get("/", obtenerDestinosVuelo);
router.post("/", crearDestinoVuelo);

export default router;