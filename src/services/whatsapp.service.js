import QRCode from "qrcode";
import { client } from "../config/whatsapp.config.js";

let lastQR = null;

client.on("qr", async (qr) => {
    console.log("QR gerado");
    lastQR = await QRCode.toDataURL(qr);
});

client.on("ready", () => {
    console.log("WhatsApp conectado!");
});

client.on("auth_failure", () => {
    console.log("Falha na autenticação");
});

export function getQR() {
    return lastQR;
}

export function startWhatsApp() {
    client.initialize();
}

export { client };