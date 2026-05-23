import express from "express";
import dotenv from "dotenv";

import { startWhatsApp } from "./services/whatsapp.service.js";

// rotas antigas
import qrRoutes from "./routes/qr.routes.js";
import msgRoutes from "./routes/message.routes.js";
import exitRoutes from "./routes/exit.routes.js";

// novas rotas
import statusRoutes from "./routes/status.routes.js";
import clientRoutes from "./routes/client.routes.js";
import healthRoutes from "./routes/health.routes.js";

dotenv.config();

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/plain");

    res.send(`
MESSAGECORE API - GUIDE

STATUS
GET /status

HEALTH CHECK
GET /health

CLIENT INFO
GET /client

QR CODE
GET /qr

SEND MESSAGE
POST /invite/message
Body:
{
  "phone": "5516999999999",
  "message": "Olá"
}

RESET SESSION
POST /exit/reset
Body:
{
  "password": "sua_senha"
}
`);
});

app.use("/qr", qrRoutes);
app.use("/invite", msgRoutes);
app.use("/exit", exitRoutes);


app.use("/status", statusRoutes);
app.use("/client", clientRoutes);
app.use("/health", healthRoutes);

app.listen(process.env.PORT || 3000);

startWhatsApp();