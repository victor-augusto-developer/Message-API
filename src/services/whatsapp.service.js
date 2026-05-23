import QRCode from "qrcode";
import { client } from "../config/whatsapp.config.js";

let isReady = false;
let lastQR = null;

client.on("qr", async (qr) => {
    console.log("QR gerado");
    lastQR = await QRCode.toDataURL(qr);
});

client.on("ready", () => {
    console.log("WhatsApp conectado!");
    isReady = true;
});

client.on("auth_failure", () => {
    console.log("Falha na autenticação");
    isReady = false;
});

client.on("disconnected", () => {
    console.log("Desconectado");
    isReady = false;
});

export function getQR() {
    return lastQR;
}

export function isWhatsAppReady() {
    return isReady;
}

export function startWhatsApp() {
    client.initialize();
}