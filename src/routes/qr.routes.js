import express from "express";
import { getQR } from "../services/whatsapp.service.js";

const router = express.Router();

router.get("/qr", (req, res) => {
    const qr = getQR();

    if (!qr) {
        return res.send("QR ainda não gerado ou WhatsApp já conectado.");
    }

    res.send(`
        <html>
            <body style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
                <h2>Escaneie o QR Code</h2>
                <img src="${qr}" />
            </body>
        </html>
    `);
});

export default router;