import express from "express";
import { getQR, isWhatsAppReady } from "../services/whatsapp.service.js";

const router = express.Router();

router.get("/", (req, res) => {
    if (isWhatsAppReady()) {
        return res.json({
            connected: true
        });
    }

    const qr = getQR();

    return res.json({
        connected: false,
        qr
    });
});

export default router;