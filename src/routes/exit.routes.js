import express from "express";
import { client } from "../config/whatsapp.config.js";
import fs from "fs";

const router = express.Router();

router.post("/reset", async (req, res) => {
    const { password } = req.body;

    if (password !== process.env.PASSWORD_RESET) {
        return res.status(401).json({ error: "Senha incorreta" });
    }

    await client.destroy().catch(() => {});

    fs.rmSync("./.wwebjs_auth", { recursive: true, force: true });

    return res.json({
        success: true,
        message: "Sessão resetada"
    });
});

export default router;