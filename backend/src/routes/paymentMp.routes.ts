import { Router } from "express";
import { paymentMercadopago } from "../controllers/mercadopago.controller";

const router = Router();

router.post("/", paymentMercadopago);

export default router;
