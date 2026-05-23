import express from "express";
import { client } from "../config/whatsapp.config.js";
import { isWhatsAppReady } from "../services/whatsapp.service.js";

const router = express.Router();

router.post("/message", async (req, res) => {
    const { phone, message } = req.body;

    if (!phone || !message) {
        return res.status(400).json({ error: "phone e message são obrigatórios" });
    }

    if (!isWhatsAppReady()) {
        return res.status(503).json({ error: "WhatsApp não conectado" });
    }

    let number = phone.toString().replace(/\D/g, "");
    if (!number.startsWith("55")) number = "55" + number;

    await client.sendMessage(`${number}@c.us`, message);

    return res.json({
        success: true,
        phone: number,
        message
    });
});

export default router;