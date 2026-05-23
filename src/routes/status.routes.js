import express from "express";
import { isWhatsAppReady } from "../services/whatsapp.service.js";

const router = express.Router();

router.get("/", (req, res) => {
    return res.json({
        api: "online",
        whatsapp: isWhatsAppReady() ? "connected" : "disconnected",
        timestamp: new Date().toISOString()
    });
});

export default router;