import express from "express";
import dotenv from "dotenv";

import qrRoutes from "./routes/qr.routes.js";
import { startWhatsApp } from "./services/whatsapp.service.js";
import "./services/message.handler.js";

dotenv.config();

const app = express();

app.use(express.json());

// rotas
app.use(qrRoutes);

app.get("/", (req, res) => {
    res.send("Message API rodando 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("API rodando na porta", PORT);
});

// inicia WhatsApp
startWhatsApp();