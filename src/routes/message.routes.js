import express from "express";
import { client } from "../config/whatsapp.config.js";
import { isWhatsAppReady } from "../services/whatsapp.service.js";

const router = express.Router();

router.post("/message", async (req, res) => {
    const { phone, message, password } = req.body;

    if (!password || password !== process.env.PASSWORD_RESET) {
        return res.status(401).json({
            error: "Senha inválida"
        });
    }

    if (!phone || !message) {
        return res.status(400).json({
            error: "phone e message são obrigatórios"
        });
    }

    
    if (!isWhatsAppReady()) {
        return res.status(503).json({
            error: "WhatsApp não conectado"
        });
    }

    let number = phone.toString().replace(/\D/g, "");
    if (!number.startsWith("55")) number = "55" + number;

    const chatId = `${number}@c.us`;

    await client.sendMessage(chatId, message);

    return res.json({
        success: true,
        message: "Mensagem enviada com sucesso",
        data: {
            phone: number,
            chatId,
            message
        }
    });
});

export default router;