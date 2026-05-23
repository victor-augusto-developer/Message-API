import express from "express";
import { client } from "../config/whatsapp.config.js";
import fs from "fs";
import { resetState } from "../services/whatsapp.service.js";

const router = express.Router();

router.post("/reset", async (req, res) => {
    const { password } = req.body;


    if (!password || password !== process.env.PASSWORD_RESET) {
        return res.status(401).json({
            error: "Senha incorreta"
        });
    }

    try {
        await client.destroy().catch(() => {});

        const authPath = "./.wwebjs_auth";

        if (fs.existsSync(authPath)) {
            fs.rmSync(authPath, { recursive: true, force: true });
        }
        resetState();

 
        setTimeout(() => {
            console.log("Reiniciando WhatsApp...");
            client.initialize();
        }, 3000);

        return res.json({
            success: true,
            message: "Sessão resetada e reiniciada com sucesso"
        });

    } catch (error) {
        return res.status(500).json({
            error: "Erro ao resetar sessão"
        });
    }
});

export default router;