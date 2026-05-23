import express from "express";
import { getQR } from "../services/whatsapp.service.js";

const router = express.Router();

router.get("/", (req, res) => {
    const qr = getQR();

    if (!qr) {
        return res.status(404).json({
            error: "QR não disponível ou WhatsApp conectado!"
        });
    }

    return res.json({ qr });
});

export default router;