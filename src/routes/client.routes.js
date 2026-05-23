import express from "express";
import { client } from "../config/whatsapp.config.js";
import { isWhatsAppReady } from "../services/whatsapp.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
    if (!isWhatsAppReady()) {
        return res.status(503).json({
            error: "WhatsApp não conectado"
        });
    }

    try {
        const info = client.info;

        return res.json({
            pushname: info.pushname,
            wid: info.wid._serialized,
            platform: info.platform,
            phone: info.wid.user
        });
    } catch (err) {
        return res.status(500).json({
            error: "Erro ao obter informações do cliente"
        });
    }
});

export default router;