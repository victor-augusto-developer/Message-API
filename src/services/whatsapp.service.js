import QRCode from "qrcode";
import { client } from "../config/whatsapp.config.js";

let isReady = false;
let lastQR = null;
let qrGenerated = false;

client.on("qr", async (qr) => {
    console.log("QR gerado/atualizado");

    try {
        lastQR = await QRCode.toDataURL(qr);
        qrGenerated = true;
        isReady = false;
    } catch (error) {
        console.error("Erro ao gerar QR:", error);
    }
});

client.on("ready", () => {
    console.log("WhatsApp conectado!");

    isReady = true;
    lastQR = null;
    qrGenerated = false;
});

client.on("auth_failure", (msg) => {
    console.log("Falha na autenticação:", msg);

    isReady = false;
    lastQR = null;
    qrGenerated = false;
});

client.on("disconnected", (reason) => {
    console.log("WhatsApp desconectado:", reason);

    isReady = false;
    lastQR = null;
    qrGenerated = false;

    client.initialize().catch(console.error);
});

export function getQR() {
    return lastQR;
}

export function isWhatsAppReady() {
    return isReady;
}

export function resetState() {
    isReady = false;
    lastQR = null;
    qrGenerated = false;
}

export function startWhatsApp() {
    client.initialize();
}

export { client };