import qrcode from "qrcode-terminal";

import { CreateWhatsAppClient } from "../config/whatsapp.config.js";

import { GenerateAIResponse } from "./ai.service.js";


export async function StartWhatsApp() {

    const client = CreateWhatsAppClient();


    client.on("qr", (qr) => {

        console.log("\nESCANEIE O QR CODE:\n");

        qrcode.generate(qr, {
            small: true
        });

    });


    client.on("ready", () => {

        console.log(
            "WhatsApp conectado"
        );

    });


    client.on("authenticated", () => {

        console.log(
            "WhatsApp autenticado"
        );

    });


    client.on("auth_failure", (msg) => {

        console.log(
            "Erro autenticação:",
            msg
        );

    });


    client.on("disconnected", (reason) => {

        console.log(
            "WhatsApp desconectado:",
            reason
        );

    });


    client.on("message_create", async (msg) => {

        try {

            if (msg.from.includes("@g.us")) {
                return;
            }


            if (msg.fromMe) {
                return;
            }


            const text = msg.body;

            console.log(
                `[MSG] ${text}`
            );


            if (
                !text
                    .toUpperCase()
                    .startsWith("BOT")
            ) {
                return;
            }


            const prompt = text
                .replace(/BOT/gi, "")
                .trim();


            if (!prompt) {

                await msg.reply(
                    "Envie algo após BOT."
                );

                return;

            }


            const chat = await msg.getChat();

            await chat.sendStateTyping();


            const response =
                await GenerateAIResponse(
                    prompt
                );


            await msg.reply(response);

        } catch (error) {

            console.log(error);

        }

    });


    client.initialize();

}