import QRCode from "qrcode";
import { client } from "../config/whatsapp.config.js";

let isReady = false;
let lastQR = null;
let qrGenerated = false;


client.on("qr", async (qr) => {
    console.log("QR gerado");

    if (qrGenerated) return;

    lastQR = await QRCode.toDataURL(qr);
    qrGenerated = true;
});

client.on("ready", () => {
    console.log("WhatsApp conectado!");

    isReady = true;
    qrGenerated = false;
});


client.on("auth_failure", (msg) => {


    isReady = false;
    lastQR = null;
    qrGenerated = false;
});

client.on("disconnected", (reason) => {

    isReady = false;
    lastQR = null;
    qrGenerated = false;
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