import pkg from "whatsapp-web.js";

const { Client, LocalAuth } = pkg;


export function CreateWhatsAppClient() {

    return new Client({

        authStrategy: new LocalAuth({

            clientId: "main"

        }),

        puppeteer: {

            headless: true,

            executablePath:
                process.env.PUPPETEER_EXECUTABLE_PATH,

            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-accelerated-2d-canvas",
                "--disable-gpu"
            ]

        },

        webVersionCache: {
            type: "none"
        }

    });

}